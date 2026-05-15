(function(){
  var tracks=[
    {name:'🎵 Lofi Chill Beats',type:'Study Mode · Lofi',freq:220,wave:'sine'},
    {name:'🎮 Game Boss Theme',type:'Epic · Gaming',freq:110,wave:'sawtooth'},
    {name:'🌊 Ocean Waves Focus',type:'Nature · Ambient',freq:80,wave:'sine'},
    {name:'⚡ Electric Focus',type:'Energy · Electronic',freq:440,wave:'square'},
    {name:'🌙 Midnight Code',type:'Dark · Lofi',freq:165,wave:'triangle'},
    {name:'⭐ Star Journey',type:'Cinematic · Epic',freq:330,wave:'sine'}
  ];
  var cur=0,playing=false,audioCtx=null,osc=null,gainNode=null,prog=0,progTimer=null;
  var $ = function(id){return document.getElementById(id);};
  function stopAudio(){if(osc){try{osc.stop();}catch{}osc=null;}if(progTimer){clearInterval(progTimer);progTimer=null;}}
  function startAudio(t){
    stopAudio();
    if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();
    osc=audioCtx.createOscillator();gainNode=audioCtx.createGain();
    osc.type=t.wave;osc.frequency.value=t.freq;
    gainNode.gain.value=parseFloat($('mpVol').value)*0.04;
    osc.connect(gainNode);gainNode.connect(audioCtx.destination);osc.start();
    prog=0;var dur=180+Math.floor(Math.random()*120);
    $('mpDur').textContent=Math.floor(dur/60)+':'+(dur%60<10?'0':'')+dur%60;
    progTimer=setInterval(function(){prog++;$('mpProgress').style.width=Math.min(100,prog/dur*100)+'%';$('mpTime').textContent=Math.floor(prog/60)+':'+(prog%60<10?'0':'')+prog%60;if(prog>=dur)nextTrack();},1000);
  }
  function updateUI(){var t=tracks[cur];$('mpTrackName').textContent=t.name;$('mpTrackType').textContent=t.type;$('mpPlay').textContent=playing?'⏸ Pause':'▶ Play';document.getElementById('vizBars').classList.toggle('paused',!playing);renderList();}
  function renderList(){
    $('mpTrackList').innerHTML=tracks.map(function(t,i){return '<button onclick="selectTrack('+i+')" style="padding:6px 12px;border-radius:999px;border:1px solid '+(i===cur?'#00f2ff':'rgba(255,255,255,.1)')+';background:'+(i===cur?'rgba(0,242,255,.12)':'rgba(255,255,255,.04)')+';color:'+(i===cur?'#00f2ff':'#a9c6e7')+';cursor:pointer;font-size:.75rem;transition:all .2s;">'+t.name.split(' ').slice(0,3).join(' ')+'</button>';}).join('');
  }
  function play(){if(!playing){playing=true;startAudio(tracks[cur]);updateUI();}}
  function pause(){if(playing){playing=false;stopAudio();updateUI();}}
  function nextTrack(){cur=(cur+1)%tracks.length;if(playing){startAudio(tracks[cur]);}prog=0;updateUI();}
  function prevTrack(){cur=(cur-1+tracks.length)%tracks.length;if(playing){startAudio(tracks[cur]);}prog=0;updateUI();}
  window.selectTrack=function(i){cur=i;prog=0;if(playing)startAudio(tracks[cur]);updateUI();};
  $('mpPlay').addEventListener('click',function(){playing?pause():play();});
  $('mpNext').addEventListener('click',nextTrack);
  $('mpPrev').addEventListener('click',prevTrack);
  $('mpVol').addEventListener('input',function(){if(gainNode)gainNode.gain.value=parseFloat(this.value)*0.04;});
  updateUI();
})();
