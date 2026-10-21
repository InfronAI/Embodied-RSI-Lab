'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let state={}, view='external', replaying=false, busy=false, timelineKey='', hydrated=false, cameraPending=false, executionSupported=false, sensorBusy=false, sensorKey='';
async function api(path,options){const r=await fetch(path,options),b=await r.json();if(!r.ok)throw Error(typeof b.detail==='string'?b.detail:JSON.stringify(b.detail));return b;}
const controlNames={skills:'预设技能选择',incremental:'逐步 XYZ · 闭环规划',hierarchical:'分层 XYZ · 子目标规划'};
let deploymentBusy=false;
const trainingHidden=()=>document.hidden || (document.documentElement.dataset.activeView && document.documentElement.dataset.activeView!=='simulation');
const cameraNames={none:'无相机',external:'仅外部相机',wrist:'仅腕部相机',both:'双相机'};
function executionSelection(){
 const mode=$('sim-camera-mode').value;
 return {control_mode:$('sim-control-mode').value,observation_mode:$('sim-observation-mode').value,
  camera_views:mode==='both'?['external','wrist']:mode==='none'?[]:[mode]};
}
function cameraMode(views=[]){return views.length===2?'both':views[0]||'none';}
function renderExecution(active){
 const selected=executionSelection(), actual=state.execution||selected;
 for(const id of ['sim-control-mode','sim-observation-mode','sim-camera-mode'])$(id).disabled=active||!executionSupported;
 $('sim-camera-mode').querySelector('[value="none"]').disabled=selected.observation_mode==='rgbd';
 $('sim-execution-help').textContent=!executionSupported?'后端更新中，执行配置暂不可用；请稍后刷新。':
  (selected.control_mode==='skills'?'模型选择技能，程序执行技能轨迹。':selected.control_mode==='incremental'?'每步重新观测，模型选择固定 XYZ 小步或夹爪动作。':'每步由模型选择子目标，再分别决定 X / Y / Z 与夹爪。')+
  (selected.observation_mode==='rgbd'?' 使用已选相机的 RGB-D 检测坐标；检测失败不回退到真值。':' 使用仿真真值；所选相机仅作观测预览。');
 $('sim-active-control').textContent=controlNames[actual.control_mode];
 $('sim-active-observation').textContent=actual.observation_mode==='rgbd'?'RGB-D 检测坐标':'仿真真值';
 $('sim-active-cameras').textContent=cameraNames[cameraMode(actual.camera_views)];
 const capture=state.sensor_capture;
 $('sim-observation-summary').textContent=actual.observation_mode==='rgbd'?`模型观测 · RGB-D${capture?.status==='unavailable'?' · 检测不可用':''}`:'模型观测 · 仿真真值';
 $('sim-sensor-status').textContent=capture?
  `${capture.camera_views?.map(v=>v==='wrist'?'腕部':'外部').join(' + ')} · ${capture.source==='rgbd'?'RGB-D 定位':'仅预览'} · ${capture.latency_ms} ms${capture.message?' · '+capture.message:''}`:
  actual.camera_views?.length?'启动后显示所选相机的实际采集画面。':'未启用模型相机；中央画面为仿真预览。';
 if(!capture){$('sim-sensor-views').replaceChildren();sensorKey='';}
}
async function pollSensors(){
 if(sensorBusy||!executionSupported||!$('sim-sensors').open||document.querySelector('.simulation-workspace').hidden||!state.sensor_capture)return;
 const key=JSON.stringify([state.collection_run,state.seed,state.sensor_capture.capture_id,state.sensor_capture.camera_views]);
 if(key===sensorKey)return;
 sensorBusy=true;
 try{
  const capture=await api('/api/simulation/cameras');
  if(capture){
   $('sim-sensor-views').innerHTML=Object.entries(capture.views).map(([view,frame])=>`<figure><figcaption>${view==='wrist'?'腕部相机':'外部相机'} · ${capture.metadata.source==='rgbd'?'用于 RGB-D 定位':'仅预览'}</figcaption><img src="${esc(frame.rgb)}" alt="${view==='wrist'?'腕部':'外部'}相机实际 RGB 观测"></figure>`).join('');
   sensorKey=key;
  }
 }catch(error){$('sim-sensor-status').textContent=`相机观测读取失败：${error.message}`;}
 finally{sensorBusy=false;}
}
async function executionCapabilities(){
 try{const capabilities=await api('/api/simulation/capabilities');executionSupported=capabilities.execution_version>=1;}catch{executionSupported=false;}
 render();
}
$('sim-control-mode').onchange=()=>render();
$('sim-camera-mode').onchange=()=>render();
$('sim-observation-mode').onchange=()=>{
 if($('sim-observation-mode').value==='rgbd'&&$('sim-camera-mode').value==='none')$('sim-camera-mode').value='both';
 render();
};
$('sim-sensors').ontoggle=pollSensors;
function observation(o){if(!o){for(const id of ['tcp','object','grip','sim-time','hud-tcp','hud-grip'])$(id).textContent='等待观测';return;}$('tcp').textContent=o.tcp.map(n=>n.toFixed(3)).join(', ');$('object').textContent=o.object.map(n=>n.toFixed(3)).join(', ');$('grip').textContent=o.held?'夹持物体':o.gripper==='closed'?'夹爪闭合':'夹爪打开';$('sim-time').textContent=`${o.sim_seconds.toFixed(2)} s`;$('hud-tcp').textContent=o.tcp.map(n=>n.toFixed(3)).join(' / ');$('hud-grip').textContent=o.held?'OBJECT GRASPED':o.gripper==='closed'?'GRIPPER CLOSED':'GRIPPER OPEN';}

const skillNames={approach:'对齐物体',descend:'下降到抓取位置',grasp:'闭合夹爪',lift:'抬升物体',carry:'移向目标盘',lower:'降低放置',release:'松开夹爪',withdraw:'撤离物体',recover:'张开夹爪重试'};
function renderLiveDecision(){
  const r=state.decision||state.records?.at(-1), active=!!state.decision;
  const phase=state.status==='paused'?'机械臂已暂停':active?(r.phase==='inference'?'模型正在选择下一个动作':'正在执行模型动作'):r?'上一个动作已完成':'等待开始任务';
  $('live-action-phase').textContent=phase;
  $('live-action-summary').textContent=r?.choice?(r.action?.label||skillNames[r.choice]||r.choice):active?'根据当前物体、夹爪和目标位置决定下一步':'开始任务后，实时观察模型如何操控机械臂';
  $('live-action-step').textContent=r?`第 ${r.step+1} 个动作`:'0 动作';
  document.querySelector('.live-decision').classList.toggle('is-executing',active&&state.status!=='paused');
}
function actionCard(r, pending = false) {
  const probabilities = r.probabilities || [];
  const probs = Object.keys(r.criteria || {}).map((key, i) => [key, probabilities[i]])
    .filter(([, p]) => Number.isFinite(p)).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const inference = r.phase === 'inference';
  const channels=(r.decisions||[]).map(d=>{const i=Object.keys(d.criteria).indexOf(d.choice),p=d.probabilities?.[i];return `<small>${esc(({subgoal:'子目标',gripper:'夹爪'})[d.channel]||d.channel.toUpperCase())}：${esc(skillNames[d.choice]||d.choice)}${Number.isFinite(p)?` · ${(p*100).toFixed(1)}%`:''}</small>`;}).join('');
  const status = pending ? (state.status === 'paused' ? 'Ⅱ 已暂停' : inference ? '模型推理中…' : '▶ 动作执行中…')
    : r.executed ? '✓ 已执行' : r.rejection || '未执行';
  const latency = Number.isFinite(r.latency_ms) ? ` · ${r.latency_ms.toFixed(1)} ms` : '';
  return `<div class="action-card${pending ? ' action-current' : ''}" data-step="${r.step}"><span class="action-number">${r.step + 1}</span><div><b>${esc(r.action?.label || skillNames[r.choice] || r.choice || '等待模型选择动作')}</b><small>${esc(status)}${latency}</small>${probs.map(([key, probability]) => `<div class="probability"><span>${esc(skillNames[key]||key)}</span><progress value="${probability}" max="1"></progress><b>${(probability * 100).toFixed(0)}%</b></div>`).join('')}${channels}</div></div>`;
}
function renderTimeline() {
  const rows = state.records || [], decision = state.decision;
  $('step-count').textContent = `场景 ${state.seed ?? '—'} · ${rows.length} 已完成${decision ? ' · 1 进行中' : ''}`;
  // A new scene can have the same number of actions, and a decision changes before its action finishes.
  const key = JSON.stringify([state.collection_run, state.seed, state.version, state.status, rows, decision]);
  if (key === timelineKey) return;
  const timeline = $('timeline');
  const newScene = timeline.dataset.scene !== `${state.collection_run}:${state.seed}`;
  const scroll = newScene ? 0 : timeline.scrollTop;
  const waiting = state.status === 'loading_model' ? '正在加载模型…' : ['starting', 'running'].includes(state.status)
    ? '等待本局首次决策…' : '开始一局任务，观察模型如何选择和执行动作。';
  timeline.innerHTML = (decision ? actionCard(decision, true) : '') + rows.slice().reverse().map(r => actionCard(r)).join('') || `<div class="empty">${waiting}</div>`;
  timeline.dataset.scene = `${state.collection_run}:${state.seed}`;
  timeline.scrollTop = scroll;
  timelineKey = key;
}
async function control(action){try{state=await api('/api/simulation/control',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(['stop','pause','resume'].includes(action)?{action}:{action,...executionSelection(),task:$('task').value,seed:Number($('seed').value),policy:$('policy').value,view,azimuth:Number($('azimuth').value),distance:Number($('distance').value),explore:$('explore').checked,continuous:$('continuous').checked,max_steps:Number($('max-steps').value),checkpoint:$('model-select').value||null,random_tasks:$('random-tasks').checked,randomize_scene:$('random-scene').checked,auto_train:$('auto-train').checked,train_every:Number($('train-every').value),min_successes:Number($('min-successes').value),train_steps:Number($('train-steps').value)})});if(action==='run'||action==='reset'){replaying=false;timelineKey='';}render();return true;}catch(e){$('notice').hidden=false;$('notice').textContent=e.message;return false;}}
function render(){if(!state.status){renderExecution(true);return;}renderLiveDecision();window.RSIMonitor?.updateSimulation(state);window.SimulationWorkspace?.updateSimulation(state);const active=['running','paused','loading_model','starting','stopping'].includes(state.status);if(!hydrated&&state.continuous!==undefined){for(const [id,key] of [['task','task'],['policy','policy'],['max-steps','max_steps'],['train-every','train_every'],['min-successes','min_successes'],['train-steps','train_steps'],['sim-control-mode','control_mode'],['sim-observation-mode','observation_mode']])if(state[key]!=null)$(id).value=state[key];for(const [id,key] of [['continuous','continuous'],['random-tasks','random_tasks'],['random-scene','randomize_scene'],['auto-train','auto_train'],['explore','explore']])if(state[key]!=null)$(id).checked=state[key];view=state.camera?.view||view;if(state.camera){$('azimuth').value=state.camera.azimuth;$('distance').value=state.camera.distance;}if(state.camera_views)$('sim-camera-mode').value=cameraMode(state.camera_views);hydrated=true;}renderExecution(active);if(!cameraPending&&state.camera?.view)view=state.camera.view;$('wrist').textContent=cameraPending?'切换视角中…':view==='wrist'?'切换外部视角':'切换腕部视角';$('wrist').classList.toggle('camera-selected',view==='wrist');$('wrist').setAttribute('aria-pressed',String(view==='wrist'));$('wrist').disabled=cameraPending||replaying;$('azimuth').disabled=view==='wrist'||replaying;$('distance').disabled=view==='wrist'||replaying;if(active)$('seed').value=state.seed;$('status').textContent=state.status.toUpperCase();$('connection').textContent='● LIVE';$('scene-label').textContent=`${({transfer:"搬运入盘",stack:"堆叠物体",barrier:"越障搬运"})[state.task]||state.task} · 场景 ${state.seed} · ${state.policy==='teacher'?'规则基线':state.policy==='rsi-auto'?'RSI 自动更新':state.policy==='rsi-initial'?'初始 RSI-Jev':state.policy==='rsi-selected'?'RSI 检查点':'部署模型'}`;$('version').textContent=state.version||'尚未开始';const col=state.collection||{};$('collection-rate').textContent=col.episodes?`${(col.success_rate*100).toFixed(1)}%`:'—';$('collection-count').textContent=`${col.episodes||0} 局 · ${col.successful_episodes||0} 成功 · ${col.failed_episodes||0} 失败`;$('failure-memory').textContent=state.result?.exploration_update?`${state.result.exploration_update.diagnosed_failure_actions} 个失败动作已反馈`:'失败经验用于后续探索';$('render-quality').textContent=state.render_resolution||'1024 × 640';$('request-protocol').textContent=state.request_protocol||'等待模型请求';$('sampling-mode').textContent=state.sampling||'—';$('run').disabled=active;$('task').disabled=active;$('seed').disabled=active;$('policy').disabled=active;$('explore').disabled=active;$('continuous').disabled=active;$('max-steps').disabled=active;$('model-select').disabled=active||$('policy').value!=='rsi-selected';$('model-select').closest('label').hidden=$('policy').value!=='rsi-selected';for(const id of ['random-tasks','random-scene','auto-train','train-every','min-successes','train-steps'])$(id).disabled=active;const a=state.automatic_training;if(a){$('auto-state').textContent=a.status==='training'?`后台学习闭环运行中 · ${active?'采集继续':'采集已停止'} · ${a.job||'后台作业运行中'}`:['completed','cancelled','failed','idle'].includes(a.status)?a.message:a.status==='disabled'?(a.message||'自动训练未启用'):`新增 ${a.new_episodes||0}/${a.episodes_threshold||30} 局 · 成功 ${a.new_successes||0}/${a.successes_threshold||5} 局 · 满额自动训练`;}$('stop').disabled=!active||state.status==='stopping';$('stop').textContent=state.status==='stopping'?'正在停止…':'■ 停止采集';$('pause').textContent=state.status==='paused'?'▶ 继续':'Ⅱ 暂停';$('pause').disabled=!active;$('step').disabled=state.status==='running'||state.status==='loading_model';$('result').textContent=state.result?(state.result.success?'✓ 任务完成':`未完成 · ${state.result.failure}`):state.status==='paused'?'暂停中':'等待任务结果';if(!replaying&&state.frame){$('robot-view').src=state.frame;observation(state.execution?.observation_mode==='rgbd'?state.model_observation:state.observation);}const frames=state.replay_frames||0;$('replay').max=Math.max(0,frames-1);$('replay').disabled=active||!frames;$('replay-count').textContent=`${frames} 帧`;if(!replaying)$('replay').value=Math.max(0,frames-1);$('view-label').textContent=replaying?'轨迹回放':view==='wrist'?'腕部视角':'外部视角';if(state.error){$('notice').hidden=false;$('notice').textContent=state.error;}else $('notice').hidden=true;renderTimeline();}

$('run').onclick=()=>control('run');$('pause').onclick=()=>control(state.status==='paused'?'resume':'pause');$('step').onclick=()=>control('step');$('reset').onclick=()=>control('reset');$('stop').onclick=()=>control('stop');$('policy').onchange=()=>{render();};$('wrist').onclick=async()=>{if(cameraPending)return;const previous=view;cameraPending=true;view=view==='external'?'wrist':'external';render();const success=await control('camera');cameraPending=false;if(!success)view=previous;else view=state.camera?.view||view;render();};$('azimuth').oninput=()=>control('camera');$('distance').oninput=()=>control('camera');$('replay').oninput=async e=>{replaying=true;try{const f=await api(`/api/simulation/replay/${e.target.value}`);$('robot-view').src=f.image;observation(f.observation);$('view-label').textContent=`回放 · 第 ${Number(e.target.value)+1} 帧`;}catch(e){$('notice').hidden=false;$('notice').textContent=e.message;}};$('live').onclick=()=>{replaying=false;render();};
function renderStage(){if(!state.control)return;const names={acquire:'获取物体',transport:'搬运',place:'放置',approach:'对齐',descend:'下降',grasp:'抓取',lift:'抬升',carry:'搬运',lower:'降低',release:'释放',withdraw:'撤离',recover:'重试'};$('request-protocol').textContent+=` · 当前阶段：${names[state.control.stage]||state.control.stage}`;$('request-protocol').title=state.prompt?`${state.prompt.instructions}\n\n${state.prompt.state}`:'';}
async function poll(){if(busy||trainingHidden())return;busy=true;try{state=await api('/api/simulation');render();renderStage();}catch(e){$('connection').textContent='连接中断';}finally{busy=false;}}
async function deployment(){if(deploymentBusy||trainingHidden())return;deploymentBusy=true;try{const o=await api('/api/overview');window.SimulationWorkspace?.updateOverview(o);const models=o.runs.filter(r=>['train','task-train','self-train','initialize'].includes(r.kind)&&r.backend.includes('rsi')&&r.status==='completed');const chosen=$('model-select').value;$('model-select').innerHTML='<option value="">选择 RSI 模型</option>'+models.map(r=>`<option value="${esc(r.id)}">${esc(r.id)} · ${r.summary.objective==='successful_episode_replay'?'自我提升':'初始化'}</option>`).join('');if(models.some(r=>r.id===chosen))$('model-select').value=chosen;else if(models.length)$('model-select').value=models[0].id;$('deployed').textContent=o.rsi_champion?(o.rsi_champion.version||o.rsi_champion.sha256.slice(0,12)):'RSI 尚未通过发布评测';}catch(e){$('deployed').textContent='服务未连接';}finally{deploymentBusy=false;}}
poll();deployment();executionCapabilities();setInterval(pollSensors,1000);setInterval(poll,150);setInterval(deployment,3000);
