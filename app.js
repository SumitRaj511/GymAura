'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
const GOALS={strength:'The strength edit.',endurance:'The endurance edit.',mobility:'The mobility edit.'};
const schedules={3:[0,2,4],4:[0,1,3,5],5:[0,1,2,4,5]};
const exercises={
 gym:[['Goblet squat','Legs · Controlled movement'],['Dumbbell bench press','Chest · Steady tempo'],['Seated cable row','Back · Smooth pulls'],['Dead bug','Core · Slow and controlled'],['Romanian deadlift','Posterior chain · Hip hinge'],['Lat pulldown','Back · Comfortable range'],['Dumbbell shoulder press','Shoulders · Controlled press'],['Step-up','Legs · Stable platform']],
 dumbbells:[['Dumbbell squat','Legs · Controlled movement'],['Dumbbell floor press','Chest · Steady tempo'],['One-arm dumbbell row','Back · Each side'],['Dead bug','Core · Slow and controlled'],['Dumbbell Romanian deadlift','Posterior chain · Hip hinge'],['Dumbbell reverse lunge','Legs · Each side'],['Dumbbell shoulder press','Shoulders · Comfortable range'],['Farmer carry','Core · Tall posture']],
 home:[['Chair squat','Legs · Stable chair'],['Incline push-up','Chest · Stable surface'],['Prone W raise','Upper back · Slow squeeze'],['Dead bug','Core · Slow and controlled'],['Glute bridge','Glutes · Gentle squeeze'],['Reverse lunge','Legs · Each side'],['Bird dog','Core · Balance and control'],['Calf raise','Calves · Hold a support']],
 endurance:[['Brisk walk or march','Warm-up · Easy pace'],['Low-impact step jacks','Cardio · Steady breathing'],['Alternating step-back','Conditioning · Controlled pace'],['Standing knee drive','Cardio · Each side'],['Side step and reach','Conditioning · Comfortable range'],['Shadow boxing','Cardio · Light punches'],['Heel digs','Cardio · Easy rhythm'],['Easy walk','Cool-down · Recover']],
 mobility:[['Cat-cow','Spine · Gentle movement'],['Standing hip circles','Hips · Each direction'],['Open-book rotation','Upper back · Each side'],['Kneeling hip-flexor stretch','Hips · Gentle range'],['Ankle rocks','Ankles · Each side'],['Child’s pose','Recovery · Slow breathing'],['Wall shoulder slides','Shoulders · Comfortable range'],['Seated hamstring stretch','Legs · Each side']]
};
let plan={goal:'strength',level:'beginner',days:3,equipment:'gym',time:30},selectedDay=0,checks={},mealIndexes=[0,0,0,0],diet='balanced',toastTimer;
function notify(text){$('#toast').textContent=text;$('#toast').classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),3300)}
function writeStore(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{notify('Browser storage is unavailable. You can still download your plan.');return false}}
function readStore(key){try{return JSON.parse(localStorage.getItem(key))}catch{return null}}
function validPlan(p){return p&&Object.hasOwn(GOALS,p.goal)&&['beginner','intermediate','advanced'].includes(p.level)&&[3,4,5].includes(p.days)&&['gym','home','dumbbells'].includes(p.equipment)&&(Number.isInteger(p.time)&&p.time>=20&&p.time<=60)}
const saved=readStore('fitgen-workout-v1');if(saved&&validPlan(saved.plan)){plan=saved.plan;checks=saved.checks&&typeof saved.checks==='object'?saved.checks:{};$('#plan-status').textContent='YOUR SAVED PLAN'}
function reflectForm(){for(const key of ['goal','days','equipment','time'])$('#'+key).value=plan[key];updateSessionPower();$$('[data-level]').forEach(b=>{const active=b.dataset.level===plan.level;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active)})}
function getSession(day){const sessionIndex=schedules[plan.days].indexOf(day);if(sessionIndex<0)return null;const pool=exercises[plan.goal==='strength'?plan.equipment:plan.goal];const n=plan.time<=20?3:plan.time<=30?4:plan.time<=40?5:6;const offset=plan.goal==='strength'?(sessionIndex%2)*4:sessionIndex%3;return Array.from({length:n},(_,i)=>{let e=pool[(offset+i)%pool.length];let reps=plan.goal==='mobility'?'2 × 30 sec':plan.goal==='endurance'?(plan.level==='beginner'?'3 × 30 sec':plan.level==='intermediate'?'3 × 45 sec':'4 × 45 sec'):(plan.level==='beginner'?'2 × 10':plan.level==='intermediate'?'3 × 10':'4 × 8');if(e[0]==='Farmer carry')reps='3 × 30 sec';return {name:e[0],detail:e[1],reps,key:`${day}-${i}`}})}
function renderPlan(){ $('#plan-title').textContent=GOALS[plan.goal];$('#plan-badge').textContent=`${plan.days} DAYS / WEEK`;$('#week-tabs').innerHTML=DAYS.map((d,i)=>`<button type="button" role="tab" aria-selected="${i===selectedDay}" aria-label="${d}, ${schedules[plan.days].includes(i)?'training':'recovery'}" class="${schedules[plan.days].includes(i)?'':'rest'}" data-day="${i}">${d.slice(0,3).toUpperCase()}<i aria-hidden="true"></i></button>`).join('');const session=getSession(selectedDay);$('#session-label').textContent=DAYS[selectedDay].toUpperCase()+' / '+(session?(plan.goal==='strength'?'FULL BODY':plan.goal.toUpperCase()):'RECOVERY');$('#session-title').textContent=session?(['Start strong.','Keep showing up.','Make it count.'][schedules[plan.days].indexOf(selectedDay)%3]):'Rest is part of the work.';$('#session-duration').textContent=session?plan.time+' min':'YOUR PACE';$('#exercise-list').innerHTML=session?session.map(e=>`<div class="exercise ${checks[e.key]?'done':''}"><button class="exercise-check" aria-label="Mark ${e.name} complete" aria-pressed="${!!checks[e.key]}" data-check="${e.key}">✓</button><div><strong>${e.name}</strong><small>${e.detail}</small></div><span class="reps">${e.reps}</span></div>`).join(''):'<div class="rest-panel"><span aria-hidden="true">✳</span><h4>Recharge your energy.</h4><p>Take an easy walk, stretch gently, or simply rest. Your next session will be here.</p></div>';$('#reset-day').hidden=!session;$('#progress-label').textContent=session?`${session.filter(e=>checks[e.key]).length} of ${session.length} exercises complete`:'Recovery day · Give yourself room to reset';$('#workout-progress').style.width=session?100*session.filter(e=>checks[e.key]).length/session.length+'%':'0%';}
function updateSessionPower(){
 const input=$('#time'),minutes=Number(input.value),progress=(minutes-20)/40;
 const index=Math.round(progress*4),modes=['Reset','Focus','Build','Power','Peak'];
 const slider=$('#power-slider');
 slider.style.setProperty('--power-progress',progress*100+'%');
 slider.style.setProperty('--power-height',(6+progress*18)+'px');
 slider.style.setProperty('--power-thumb',(22+progress*10)+'px');
 slider.style.setProperty('--power-glow',(4+progress*18)+'px');
 $('#time-label').textContent=minutes+' min';
 $('#power-label').textContent=modes[index]+' mode';
 input.setAttribute('aria-valuetext',minutes+' minutes, '+modes[index].toLowerCase()+' session');
 $$('.power-bars i').forEach((bar,i)=>bar.classList.toggle('active',i<=index));
}
$('#time').addEventListener('input',updateSessionPower);
$('#level-group').addEventListener('click',e=>{const b=e.target.closest('[data-level]');if(!b)return;$$('[data-level]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)})});
$('#plan-form').addEventListener('submit',e=>{e.preventDefault();plan={goal:$('#goal').value,level:$('.selected[data-level]').dataset.level,days:Number($('#days').value),equipment:$('#equipment').value,time:Number($('#time').value)};checks={};selectedDay=0;$('#plan-status').textContent='BUILT AROUND YOU';renderPlan();notify('Your new weekly workout is ready.');if(innerWidth<760)$('.plan-preview').scrollIntoView({behavior:reduced()?'instant':'smooth',block:'start'})});
$('#week-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-day]');if(b){selectedDay=Number(b.dataset.day);renderPlan()}});
$('#week-tabs').addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();selectedDay=e.key==='Home'?0:e.key==='End'?6:(selectedDay+(e.key==='ArrowRight'?1:6))%7;renderPlan();$(`[data-day="${selectedDay}"]`).focus()}});
$('#exercise-list').addEventListener('click',e=>{const b=e.target.closest('[data-check]');if(!b)return;checks[b.dataset.check]=!checks[b.dataset.check];renderPlan();$(`[data-check="${b.dataset.check}"]`).focus();if(readStore('fitgen-workout-v1'))writeStore('fitgen-workout-v1',{plan,checks});if(getSession(selectedDay).every(x=>checks[x.key]))notify('Session complete. That’s progress worth celebrating.');});
$('#reset-day').addEventListener('click',()=>{(getSession(selectedDay)||[]).forEach(e=>delete checks[e.key]);renderPlan();if(readStore('fitgen-workout-v1'))writeStore('fitgen-workout-v1',{plan,checks})});
$('#save-plan').addEventListener('click',()=>{if(writeStore('fitgen-workout-v1',{plan,checks})){notify('Workout plan saved in this browser.');$('#plan-status').textContent='YOUR SAVED PLAN'}});
$$('[data-goal]').forEach(b=>b.addEventListener('click',()=>{$('#goal').value=b.dataset.goal;$('#planner').scrollIntoView({behavior:reduced()?'instant':'smooth'});notify('Goal selected. Choose your preferences and generate a plan.')}));
function downloadFile(filename,text){const u=URL.createObjectURL(new Blob([text],{type:'text/plain'}));const a=document.createElement('a');a.href=u;a.download=filename;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000)}
$('#download-plan').addEventListener('click',()=>{let text=`GYMAURA — ${GOALS[plan.goal]}\n${plan.level} | ${plan.days} days per week | ${plan.equipment} | ${plan.time} min\n\n`;DAYS.forEach((d,i)=>{text+=d+'\n';let session=getSession(i);text+=session?session.map(e=>`[${checks[e.key]?'✓':' '}] ${e.name}: ${e.reps}`).join('\n'):'Recovery day: rest or easy movement.';text+='\n\n'});text+='Warm up gently. Use a comfortable effort. Rest between sets as needed; session times are approximate. Stop if a movement hurts.\n';downloadFile('GymAura-workout-plan.txt',text);notify('Your workout plan is ready to download.')});
// Illustrative per-meal estimates: kcal, protein g, carbs g, fat g.
const meals={
 balanced:[
 [{name:'Greek yogurt & berry oat bowl',n:[480,28,61,14],items:['Greek yogurt','Rolled oats','Mixed berries','Almonds']},{name:'Eggs, avocado & wholegrain toast',n:[510,25,45,26],items:['Eggs','Avocado','Wholegrain bread','Tomatoes']}],
 [{name:'Grilled chicken & quinoa bowl',n:[650,46,70,21],items:['Chicken breast','Quinoa','Mixed greens','Olive oil']},{name:'Tuna & chickpea salad',n:[590,42,55,22],items:['Tuna','Chickpeas','Cucumber','Tomatoes','Olive oil']}],
 [{name:'Salmon, rice & roasted greens',n:[690,43,75,25],items:['Salmon','Brown rice','Broccoli','Olive oil']},{name:'Chicken, rice & vegetable stir-fry',n:[640,44,72,19],items:['Chicken breast','Brown rice','Bell peppers','Broccoli','Soy sauce']}],
 [{name:'Apple, almonds & cottage cheese',n:[280,19,25,12],items:['Apple','Almonds','Cottage cheese']},{name:'Banana & peanut butter',n:[260,7,35,12],items:['Banana','Peanut butter']}]
 ],
 vegetarian:[
 [{name:'Greek yogurt & berry oat bowl',n:[480,28,61,14],items:['Greek yogurt','Rolled oats','Mixed berries','Almonds']},{name:'Cottage cheese toast & tomatoes',n:[450,27,48,17],items:['Cottage cheese','Wholegrain bread','Tomatoes','Olive oil']}],
 [{name:'Paneer, chickpea & quinoa bowl',n:[670,32,72,28],items:['Paneer','Chickpeas','Quinoa','Spinach']},{name:'Lentil dal, rice & cucumber',n:[620,25,95,16],items:['Lentils','Brown rice','Cucumber','Tomatoes','Spices']}],
 [{name:'Tofu stir-fry & brown rice',n:[610,30,78,20],items:['Tofu','Brown rice','Broccoli','Bell peppers','Soy sauce']},{name:'Paneer & vegetable wraps',n:[640,31,65,27],items:['Paneer','Wholegrain wraps','Bell peppers','Onions','Yogurt']}],
 [{name:'Fruit, yogurt & mixed nuts',n:[290,16,30,13],items:['Greek yogurt','Banana','Mixed nuts']},{name:'Hummus & vegetable sticks',n:[250,9,27,14],items:['Hummus','Carrots','Cucumber','Wholegrain crackers']}]
 ],
 vegan:[
 [{name:'Overnight oats with soy milk',n:[490,21,66,16],items:['Rolled oats','Soy milk','Chia seeds','Mixed berries']},{name:'Tofu scramble on toast',n:[470,26,46,20],items:['Tofu','Wholegrain bread','Tomatoes','Spinach','Olive oil']}],
 [{name:'Chickpea & quinoa power bowl',n:[650,25,91,21],items:['Chickpeas','Quinoa','Mixed greens','Tahini']},{name:'Lentil dal, rice & cucumber',n:[620,25,95,16],items:['Lentils','Brown rice','Cucumber','Tomatoes','Spices']}],
 [{name:'Tofu, rice & sesame greens',n:[620,31,78,21],items:['Tofu','Brown rice','Broccoli','Sesame seeds','Soy sauce']},{name:'Black bean & sweet potato bowl',n:[640,24,100,17],items:['Black beans','Sweet potato','Avocado','Mixed greens','Lime']}],
 [{name:'Apple, almonds & soy yogurt',n:[290,12,31,15],items:['Apple','Almonds','Soy yogurt']},{name:'Hummus & vegetable sticks',n:[250,9,27,14],items:['Hummus','Carrots','Cucumber','Wholegrain crackers']}]
 ]};
const savedMeals=readStore('fitgen-meals-v1');if(savedMeals&&Object.hasOwn(meals,savedMeals.diet)&&Array.isArray(savedMeals.indexes)&&savedMeals.indexes.length===4&&savedMeals.indexes.every(i=>i===0||i===1)){diet=savedMeals.diet;mealIndexes=savedMeals.indexes;$('#diet').value=diet}
function currentMeals(){return meals[diet].map((m,i)=>m[mealIndexes[i]])}
function renderMeals(){const selected=currentMeals(),totals=selected.reduce((t,m)=>t.map((n,i)=>n+m.n[i]),[0,0,0,0]);$('#calories').textContent=totals[0].toLocaleString();$('#protein').textContent=totals[1]+'g';$('#carbs').textContent=totals[2]+'g';$('#fat').textContent=totals[3]+'g';$('#meal-list').innerHTML=selected.map((m,i)=>`<div class="meal"><span class="meal-icon" aria-hidden="true">${['☀','◒','☾','✳'][i]}</span><div><small>${['BREAKFAST','LUNCH','DINNER','SNACK'][i]} · ${m.n[0]} KCAL</small><strong>${m.name}</strong></div><button data-swap="${i}" aria-label="Swap ${['breakfast','lunch','dinner','snack'][i]}" title="Swap meal">↻</button></div>`).join('')}
$('#diet').addEventListener('change',e=>{diet=e.target.value;mealIndexes=[0,0,0,0];renderMeals()});
$('#meal-list').addEventListener('click',e=>{const b=e.target.closest('[data-swap]');if(!b)return;const index=Number(b.dataset.swap);mealIndexes[index]=1-mealIndexes[index];renderMeals();$(`[data-swap="${index}"]`).focus();notify('Meal swapped. Nutrition totals updated.')});
$('#save-meals').addEventListener('click',()=>{if(writeStore('fitgen-meals-v1',{diet,indexes:mealIndexes}))notify('Meal plan saved in this browser.')});
function openDialog(dialog){dialog.showModal();document.body.classList.add('modal-open')}
function showInfo(title,html){$('#info-title').textContent=title;$('#info-content').innerHTML=html;openDialog($('#info-dialog'))}
$('#shopping-list').addEventListener('click',()=>{const items=[...new Set(currentMeals().flatMap(m=>m.items))].sort();showInfo('Your shopping list',`<p>Ingredients for your current ${diet} meal plan. Choose quantities to suit your portions.</p><ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul><button class="button small" id="download-shopping">Download list</button>`);$('#download-shopping').addEventListener('click',()=>downloadFile('GymAura-shopping-list.txt','GYMAURA — Shopping list\n\n'+items.map(i=>'□ '+i).join('\n'))) });
$$('[data-play]').forEach(b=>b.addEventListener('click',()=>{$('#studio-video').src=b.dataset.play==='studio'?'assets/studio.mp4':'assets/training.mp4';openDialog($('#video-dialog'));$('#studio-video').play().catch(()=>{})}));
$$('dialog').forEach(d=>{d.querySelector('[data-close]').addEventListener('click',()=>d.close());d.addEventListener('close',()=>{document.body.classList.remove('modal-open');if(d.id==='video-dialog')$('#studio-video').pause()});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
$('#studio-video').addEventListener('loadedmetadata',()=>{const seconds=Math.round($('#studio-video').duration);if(Number.isFinite(seconds)&&!$('#studio-video').src.endsWith('studio.mp4'))$('.duration').textContent=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0')});
$('#studio-video').addEventListener('error',()=>notify('The video could not load. Please try again when connected.'));
$('#credits-button').addEventListener('click',()=>showInfo('Media credits','<p>Fitness and food photography from <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>. Hero image from the supplied <a href="https://lightpink-eagle-586211.hostingersite.com/" target="_blank" rel="noopener">Original design reference</a>.</p><p style="margin-top:18px">Gym training footage from <a href="https://mixkit.co/free-stock-video/workout/" target="_blank" rel="noopener">Mixkit</a>. This is a portfolio concept by Sumit Raj; meal and workout content is illustrative.</p>'));
function reduced(){return document.body.classList.contains('reduce-motion')||matchMedia('(prefers-reduced-motion: reduce)').matches}
if(readStore('fitgen-reduce-motion')){document.body.classList.add('reduce-motion');$('#motion-toggle').textContent='Enable animations';$('#motion-toggle').setAttribute('aria-pressed','true')}
$('#motion-toggle').addEventListener('click',()=>{const active=document.body.classList.toggle('reduce-motion');$('#motion-toggle').textContent=active?'Enable animations':'Reduce motion';$('#motion-toggle').setAttribute('aria-pressed',active);writeStore('fitgen-reduce-motion',active)});
// Sideways reveals replay when sections re-enter the viewport.
$$('.reveal').forEach((el,i)=>{
 el.classList.add(i%2?'reveal-right':'reveal-left');
 if(el.matches('.nutrition-content')){el.classList.remove('reveal-left');el.classList.add('reveal-right')}
 if(el.matches('.nutrition-photo')){el.classList.remove('reveal-right');el.classList.add('reveal-left')}
 el.querySelectorAll('.eyebrow,h2,p,.card-bottom strong,.card-description').forEach((text,i)=>{
  text.classList.add('reveal-copy');text.style.setProperty('--copy-delay',Math.min(i,4)*80+'ms');
 });
});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{
 e.target.classList.toggle('visible',e.isIntersecting);
}),{threshold:0,rootMargin:'0px 0px -36px 0px'});
$$('.reveal').forEach(e=>observer.observe(e));
function updateScrollMotion(){
 const max=document.documentElement.scrollHeight-innerHeight;
 $('.scroll-progress').style.width=(max>0?scrollY/max*100:0)+'%';
 const amount=reduced()?0:Math.min(1,Math.max(0,scrollY/Math.max(1,$('#home').offsetHeight*.85)));
 $('.hero-content').style.setProperty('--hero-slide',amount);
 $('.hero-image').style.translate=reduced()?'none':`0 ${Math.min(scrollY,innerHeight)*.18}px`;
}
let queued=false;addEventListener('scroll',()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{updateScrollMotion();queued=false})},{passive:true});
$('#motion-toggle').addEventListener('click',updateScrollMotion);
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',updateScrollMotion);
updateScrollMotion();
reflectForm();renderPlan();renderMeals();

// Motion has an explicit pause control and respects the device preference.
let backgroundPaused=false;
const bg=$('#background-video');
function syncBackground(){if(reduced()||backgroundPaused){bg.pause();$('#background-toggle').textContent='Play background video';$('#background-toggle').setAttribute('aria-pressed','true')}else{bg.play().then(()=>{$('#background-toggle').textContent='Pause background video';$('#background-toggle').setAttribute('aria-pressed','false')}).catch(()=>{$('#background-toggle').textContent='Play background video'})}}
new IntersectionObserver(es=>{for(const e of es){if(e.isIntersecting)syncBackground();else bg.pause()}},{threshold:.2}).observe($('#studio'));
$('#background-toggle').addEventListener('click',()=>{if(bg.paused){backgroundPaused=false;bg.play().then(()=>{$('#background-toggle').textContent='Pause background video';$('#background-toggle').setAttribute('aria-pressed','false')}).catch(()=>notify('Video could not play. Please try again.'))}else{backgroundPaused=true;syncBackground()}});
$('#motion-toggle').addEventListener('click',syncBackground);
$$('.workout-card').forEach(card=>{card.addEventListener('pointermove',e=>{if(reduced()||e.pointerType==='touch')return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${-y*5}deg) rotateY(${x*6}deg) translateY(-4px)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
