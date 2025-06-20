main();

const width = 900;
const height = 900;
const imgUrl = "https://lh3.googleusercontent.com/d/";

async function main() {
  const data = (await d3.csv("CargueroData.csv", d3.autoType))
    .map(e => ({...e, url: imgUrl + e.id, otros: e.otros === "False" ? false : e.otros == "True" ? true : e.otros}))
  const scenesJson = await (await fetch("scenes.json")).text();
  let newScenes = JSON.parse(scenesJson);
  newScenes = await setScenes(data, newScenes);
  showPanel(newScenes, "start");
}

function showPanel(scenes, start) {
  let prevScene = start;

  const a = new Aventura('en', {
    adventureContainer: "panel-container",
    typewriterSpeed: 0,
    sceneCallbackStart: (scene) => {
      if (prevScene === scene.key) return
      
      if (scene.options === undefined) {
        scene.options = [{ btn: "<<<", scene: prevScene, back: true }];
      } else {
        if (scene.options[0].back) {
          scene.options[0].scene = prevScene;
        } else {
          scene.options.unshift({ btn: "<<<", scene: prevScene, back: true });
        }
      }

      if (!scene.key.includes("ind_")) {
        prevScene = scene.key;
      }
      
    }
  })
  a.setScenes(scenes).testScenes().startAdventure(start)
  return scenes
}

async function setScenes(data, scenes) {
  const msg = d3.select("#panel-container")
    .append("div")
    .style("text-align", "center")
    .style("font-size", "24px")
    .text("Loading Atlas...");
  // sintaxis = {filter: () => {}, type: pack, scatter, compare, x:, y:}
  const keys = Object.keys(scenes);
  const vizFunction = {'pack': vanillaCanvasPack, 'scatter': vanillaCanvasScatter, 'compare': vanillaCanvasCompare}

  function pbar(v, n = 20) {
    let str = "";
    for (let i = 0; i < Math.ceil(n); i++) {
      str += i < v ? "|" : "-";
    }
    return str
  }

  let progress = 0;
  for (let k of keys) {

    if (scenes[k].viz !== undefined) {
      const {filter, type, x, y} = scenes[k].viz;
      let filtered = data;
      for (let f of filter) {
        const fn = filterFn(f)
        filtered = fn(filtered);        
      }
      msg.text(`Loading Atlas... ${pbar(Math.floor((progress/keys.length) * 20), 20)} ${Math.floor((progress/keys.length) * 100)}%`);
      const {viz, areas} = await vizFunction[type](filtered, x, y);
      scenes[k].image = viz;
      scenes[k].areas = areas;
    }

    let newText = "";
    if (scenes[k].meta)  {
      newText += getMeta(data[scenes[k].meta]);
      scenes[k].image = data[scenes[k].meta].url;
      delete scenes[k].meta;
    }
    
    if (scenes[k].title) {
      newText += `<h3>${scenes[k].title}</h3>`;
      delete scenes[k].title;
    }

    // console.log(scenes[k], viz);
    
    scenes[k].text = newText + (scenes[k].text || "");

    if (scenes[k].info) { scenes[k].text +=`<a href=${scenes[k].info[1]} target="_blank">${scenes[k].info[0]}</a>` }
    progress++;
  }

  function getMeta(d) {
    return `<div class="meta-container"><p><b>Title:</b> ${d.obras}</p><p><b>Date:</b> ${d.fecha}</p><p><b>Author:</b> ${d.autor}</p><p><b>Source:</b> ${d.fuente}</p><a class="repo-link" href="${d.repositorio}" target="_blank">Repository</a></div>`    
  }

  function filterFn(f) {
    if (f[1] === "=" || f[1] === "==" || f[1] === "===") {
      const condition = /true|True/i.test(""+f[2]) ? true : /false|False/i.test(""+f[2]) ? false : f[2];
      return data => data.filter(d => d[f[0]] == condition)
    } else if (f[1] === "<") {
      return data => data.filter(d => d[f[0]] < f[2]) 
    } else if (f[1] === ">") {
      return data => data.filter(d => d[f[0]] > f[2]) 
    } else {
      return data => data
    }
  }

  for (let d of data) {
    scenes[`ind_${d.n}`] = {
      image: d.url,
      text: getMeta(d),
      options: [{ btn: "<<<", scene: `ind_${d.n}`, back: true }]
    }
  }

  msg.remove();

  return scenes
}

async function vanillaCanvasScatter(data, vx, vy) {
  const size = 50;
  const margin = {l: 0.2 * width, r: 0.1 * width, t: 0.1 * height, b: 0.1 * height};
  const wm = width - margin.l - margin.r;
  const hm = height - margin.t - margin.b;
  
  const filtered = data;

  const domainX = [...new Set(filtered.map(d => d[vx]))];
  const domainY = [...new Set(filtered.map(d => d[vy]))];
  const scaleX = d3.scalePoint().domain(domainX).range([0, wm]).padding(0.5).round(true);
  const scaleY = d3.scalePoint().domain(domainY).range([0, hm]).padding(0.5).round(true);

  const imgs = [];
  for (let d of filtered) {
    const img = new Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.src = d.url;
    await new Promise(r => { img.onload = () => { r(true) }});
    imgs.push({ url: d.url, x: scaleX(d[vx]), y: scaleY(d[vy]), img: img, r: size, n: d.n });
  }

  const simulation = d3.forceSimulation(imgs)
    .force("charge", d3.forceManyBody().strength(5))
    .force("collide", d3.forceCollide(10))
    .tick(200)

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  
  ctx.fillStyle = "#313131";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "white";
  ctx.font = "14px serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for (let d of domainX) {
    ctx.fillStyle = "white";
    ctx.fillText(d, margin.l + scaleX(d), margin.t + hm + (margin.b / 2));
  }
  ctx.beginPath();
  ctx.moveTo(margin.l, margin.t + hm);
  ctx.lineTo(margin.l + wm, margin.t + hm);
  ctx.stroke();

  ctx.textAlign = "right";
  for (let d of domainY) {
    ctx.fillStyle = "white";
    ctx.fillText(d, margin.l - 5, margin.t + scaleY(d));
  }
  ctx.beginPath();
  ctx.moveTo(margin.l, margin.t);
  ctx.lineTo(margin.l, margin.t + hm);
  ctx.stroke();

  ctx.strokeStyle = "black";

  const areas = [];
  for (let i of imgs) {
    const w = size;
    const h = w * i.img.height / i.img.width;
    const j = Math.random() * 100;
    const x = i.x + margin.l + j;
    const y = i.y + margin.t // + Math.random() * 10;

    ctx.save();
    ctx.translate(-w/2, -h/2);
    ctx.drawImage(i.img, x, y, w, h);
    ctx.restore();

    const area = {
      x, y, w, h,
      btn: "",
      scene: `ind_${i.n}`,
      tooltip: ""
    }
    areas.push(area);
  }

  return {viz: canvas.toDataURL('image/png'), areas}
}

async function vanillaCanvasPack(data, h1, h2) {
  const filtered = data;
  const groups = d3.rollup(filtered, v => v.length, d => d[h1], d => d[h2])
  const childrenAccessorFn = ([ key, value ]) => value.size && Array.from(value)
  const root = d3.hierarchy(groups, childrenAccessorFn)
    .sum(([,value]) => value)
    .sort((a, b) => b.value - a.value)

  const scheme = [...d3.schemeGreys[4]].reverse();
  // scheme[0] = "#313131";
  
  const desc = root.descendants();

  const color = (v) => scheme[v];

  d3.pack(root)
    .size([width, height])
    .padding(20)
    (root)
  
  const imgs = [];
  for (let f of filtered) {
    for (let d of root.leaves()) {
      if (f[h1] === d.parent.data[0] && f[h2] === d.data[0]) {
        const img = new Image();
        img.setAttribute('crossorigin', 'anonymous');
        img.src = f.url;
        await new Promise(r => { img.onload = () => { r(true) }});
        imgs.push({ url: f.url, x: d.x, y: d.y, r: 25, img: img, n: f.n });
      }
    }
  }
  
  const simulation = d3.forceSimulation(imgs)
    .force("collide", d3.forceCollide(20))
    .tick(200)
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  
  ctx.fillStyle = "#313131";;
  ctx.fillRect(0, 0, width, height);
  
  ctx.font = "12px serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  for (let d of desc) {
    ctx.save();
    ctx.translate(d.x, d.y);
    
      ctx.strokeStyle = "black";
      ctx.fillStyle = color(d.depth);
    
      ctx.beginPath();
      ctx.ellipse(0, 0, d.r, d.r, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "black";
      ctx.fillText(d.depth === 1 || d.depth === 2 ? d.data[0] : "", 0, -d.r - 5);
    ctx.restore();
  }

  const areas = [];
  for (let i of imgs) {
    const w = parseInt(50);
    const h = parseInt(w * i.img.height / i.img.width);
    const j = (Math.random() - 0.5) * 100;
    const x = i.x // + j;
    const y = i.y // + j;
    
    ctx.save();
    ctx.translate(-w/2, -h/2);
    ctx.drawImage(i.img, x, y, w, h);
    ctx.restore();

    const area = {
      x, y, w, h,
      btn: "",
      scene: `ind_${i.n}`, // ¿Cómo definir esto?
      tooltip: ""
    }
    areas.push(area);
  }

  return {viz: canvas.toDataURL('image/png'), areas}
}

async function vanillaCanvasCompare(data, h1, h2) {
  const filtered = [data.find(d => d.n == h1), data.find(d => d.n == h2)];
  const imgs = [];
  for (let f of filtered) {
    const img = new Image();
    img.setAttribute('crossorigin', 'anonymous');
    img.src = f.url;
    
    await new Promise(r => { img.onload = () => { r(true) }});
    imgs.push({ url: f.url, img: img, n: f.n  });
  }
  
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  
  ctx.fillStyle = "#313131";
  ctx.fillRect(0, 0, width, height);
  
  ctx.font = "12px serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";

  const areas = [];
  let count = 0;
  for (let i of imgs) {
    const m = parseInt(width / 2) * 0.1
    const w = parseInt(width / 2) - m;
    const h = parseInt(w * i.img.height / i.img.width);
    const x = (count * (w + m)) + (w/2) + (m/2);
    const y = height/2;
    
    ctx.save();
    ctx.translate(-w/2, -h/2);
    ctx.drawImage(i.img, x, y, w, h);
    ctx.restore();

    const area = {
      x, y, w, h,
      btn: "",
      scene: `ind_${i.n}`, // ¿Cómo definir esto?
      tooltip: ""
    }
    areas.push(area);
    count++;
  }
  return {viz: canvas.toDataURL('image/png'), areas}
  // return canvas
}