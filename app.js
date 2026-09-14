const seed=[];
if(!localStorage.getItem('mindforge_clean_v1')){
  localStorage.removeItem('mf_materials');
  localStorage.setItem('mindforge_clean_v1','1');
}
const state={page:'Início',tab:'Essencial',materials:JSON.parse(localStorage.getItem('mf_materials')||'null')||seed,timer:0,running:false};
const nav=['Início','Biblioteca','Adicionar','Conhecimento','Treinar','Progresso','Perfil'];
const tabs=['Essencial','Leitura','Mapa','Fluxogramas','Professor IA','Testes','Aplicação','Revisão','Complementar'];
const save=()=>localStorage.setItem('mf_materials',JSON.stringify(state.materials));
function bar(v){return `<div class="bar"><i style="width:${v}%"></i></div>`}function go(p){state.page=p;render()}function tab(t){state.tab=t;render()}function notify(t){let n=document.createElement('div');n.className='notice';n.textContent=t;document.body.appendChild(n);setTimeout(()=>n.remove(),2200)}
function shell(content){return `<div class="app"><header class="top"><div class="brand">🧠 MindForge</div><span class="subtitle">Conteúdo → conhecimento → aplicação → domínio</span><div class="spacer"></div><button class="btn" onclick="go('Adicionar')">+ Adicionar</button></header><div class="layout"><aside class="side">${nav.map(n=>`<button class="${state.page===n?'active':''}" onclick="go('${n}')">${n}</button>`).join('')}</aside><main class="main">${content}</main></div><nav class="bottom">${['Início','Biblioteca','Adicionar','Treinar','Progresso'].map(n=>`<button onclick="go('${n}')">${n}</button>`).join('')}</nav></div>`}
function dashboard(){
  const total = state.materials.length;

  return `
    <section class="hero">
      <small>🧠 MINDFORGE</small>

      <h1>
        ${
          total
            ? "Continua o teu percurso de aprendizagem."
            : "Transforma conteúdos em conhecimento utilizável."
        }
      </h1>

      <p>
        ${
          total
            ? `Tens ${total} conteúdo${total === 1 ? "" : "s"} na biblioteca.`
            : "Adiciona o teu primeiro PDF, texto, artigo ou vídeo para começar."
        }
      </p>

      <button
        class="btn alt"
        onclick="go('${total ? "Biblioteca" : "Adicionar"}')"
      >
        ${total ? "Abrir biblioteca" : "Adicionar conteúdo"}
      </button>
    </section>

    <div class="grid">
      <div class="card stat">
        <strong>${total}</strong>
        <div>Conteúdos</div>
      </div>

      <div class="card stat">
        <strong>0</strong>
        <div>Revisões</div>
      </div>

      <div class="card stat">
        <strong>0h00</strong>
        <div>Tempo estudado</div>
      </div>

      <div class="card stat">
        <strong>0%</strong>
        <div>Domínio</div>
      </div>
    </div>

    <div class="card" style="margin-top:18px">
      <h3>
        ${
          total
            ? "Próximo passo"
            : "Ainda não existem dados de aprendizagem"
        }
      </h3>

      <p>
        ${
          total
            ? "Abre um conteúdo para iniciar a leitura, análise e treino."
            : "Os conceitos, dificuldades, revisões, mapas, testes e níveis de domínio aparecerão apenas depois de adicionares e estudares conteúdos reais."
        }
      </p>
    </div>
  `;
}
``
function add(){return `<h1>Adicionar conteúdo</h1><div class="card"><select id="type" class="input"><option>PDF</option><option>Texto</option><option>Artigo</option><option>YouTube</option></select><input id="title" class="input" placeholder="Título ou link"><input id="file" class="input" type="file" accept=".pdf,.txt,.epub"><textarea id="text" class="input" rows="6" placeholder="Cola aqui o texto, quando aplicável"></textarea><button class="btn" onclick="analyze()">✨ Analisar conteúdo</button><p><small>Na versão local, o material é registado no dispositivo. A análise por IA exigirá ligação segura a um serviço externo.</small></p></div>`}function analyze(){let t=document.querySelector('#title').value.trim()||'Novo conteúdo';let type=document.querySelector('#type').value;state.materials.unshift({id:Date.now(),title:t,type,read:0,mastery:0});save();notify('Conteúdo guardado e preparado para análise');go('Biblioteca')}
function knowledge(){
const material=state.materials[0];
if(!material)return `<h1>Centro de conhecimento</h1><div class="card"><h2>Nenhum conteúdo disponível</h2><p>Adiciona um conteúdo para começar.</p><button class="btn" onclick="go('Adicionar')">Adicionar conteúdo</button></div>`;
return `<h1>Centro de conhecimento</h1><div class="card"><h2>${material.title}</h2><p>Este conteúdo foi guardado, mas ainda não possui análise inteligente real.</p><div class="priority orange"><b>Análise pendente</b><p>Os conceitos, mapas, fluxogramas, testes, aplicações e revisões aparecerão apenas depois do processamento real deste conteúdo.</p></div></div>`;
}
function progress(){
  if(!state.materials.length){
    return `
      <h1>Progresso</h1>

      <div class="card">
        <h3>Sem dados de progresso</h3>

        <p>
          O progresso de leitura e o domínio aparecerão depois
          de adicionares e estudares conteúdos reais.
        </p>
      </div>
    `;
  }

  return `
    <h1>Progresso</h1>

    ${state.materials.map(material => `
      <div class="card material">
        <h3>${material.title}</h3>

        <small>${material.type || "Conteúdo"}</small>

        <p>
          Progresso de leitura:
          <b>${material.read || 0}%</b>
        </p>

        ${bar(material.read || 0)}

        <p>
          Nível de domínio:
          <b>${material.mastery || 0}%</b>
        </p>

        ${bar(material.mastery || 0)}

        <p>
          <small>
            O domínio será calculado com base nos testes,
            exercícios práticos e revisões realizados.
          </small>
        </p>
      </div>
    `).join("")}
  `;
}

function profile(){
  return `
    <h1>Perfil</h1>
    <div class="card">
      <p>Define aqui os teus objetivos e preferências de aprendizagem.</p>
      <label>Objetivo
        <input class="input" value="Dominar conteúdos e aplicá-los">
      </label>
      <label>Tempo diário
        <input class="input" value="45 minutos">
      </label>
      <label>Meta semanal
        <input class="input" value="7 horas">
      </label>
      <button class="btn" onclick="notify('Preferências guardadas')">
        Guardar preferências
      </button>
    </div>
  `;
}

function fmt(seconds){
  return new Date(seconds * 1000).toISOString().slice(11,19);
}

function toggleTimer(){
  state.running = !state.running;
  render();
}

setInterval(() => {
  if(state.running){
    state.timer++;
    const timer = document.querySelector("#timer");
    if(timer) timer.textContent = fmt(state.timer);
  }
}, 1000);

function render(){
  const views = {
    "Início": dashboard,
    "Biblioteca": library,
    "Adicionar": add,
    "Conhecimento": knowledge,
    "Treinar": train,
    "Progresso": progress,
    "Perfil": profile
  };

  const view = views[state.page] || dashboard;
  document.querySelector("#app").innerHTML = shell(view());
}

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("./sw.js");
}

render();
