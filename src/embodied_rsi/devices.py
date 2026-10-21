"""Use the same requested or available PyTorch device for training and serving."""
from __future__ import annotations

import os


def rsi_device(device=None):
    import torch
    from serve.runtime import best_device, keep_fused_kernels_off

    device = device or os.environ.get("EMBODIED_RSI_DEVICE") or best_device(torch)
    if str(device).split(":", 1)[0] == "cuda":
        # Initialize the CUDA context before materializing CPU checkpoint
        # tensors. Delayed context creation can fail on GB10 unified memory.
        torch.cuda.init()
        # init() alone is lazy in recent CUDA runtimes; this creates the
        # primary device context while host memory is still available.
        torch.cuda.mem_get_info(device)
    keep_fused_kernels_off(device)
    return device


def release_unused_memory(device):
    """Return completed model allocations before another round or audit loads."""
    import gc

    gc.collect()
    kind = str(device).split(":", 1)[0]
    if kind in {"cuda", "mps"}:
        import torch

        if kind == "mps":
            torch.mps.empty_cache()
        else:
            torch.cuda.empty_cache()
