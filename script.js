const log = console.log;

let topics = qsa('.topic');
let topicResult = qs('.js.topic-result--1');
let topicResult2 = qs('.js.topic-result--2');

// states
let activeResultToggle = false;
let actives = [];
// ----------------------

let onResultClick = () => {
  event.stopPropagation();
  event.preventDefault();
  actives = [];
  mapStateToDOM();
};

//topicResult.addEventListener("touchstart", onResultClick);
//topicResult2.addEventListener("touchstart", onResultClick);
topicResult.addEventListener('click', onResultClick);
topicResult2.addEventListener('click', onResultClick);

function onClick(event) {
  event.stopPropagation();
  event.preventDefault();
  let topic = this.closest('.topic');
  let anim = document.createElement('div');
  anim.className = 'btn-clicked';
  topic.appendChild(anim);

  setTimeout(() => {
    try {
      // DOM cleanup
      anim && topic.removeChild(anim);
    } catch (ex) {}
  }, 2000);

  let type = topic.getAttribute('data-topic');

  if (!actives.includes(type)) {
    actives.push(type);
    if (actives.length > 2) actives.shift();
  } else {
    actives = actives.filter(t => t !== type);
  }

  mapStateToDOM();
}

let mapStateToDOM = () => {
  if (actives.length === 2) {
    activeResultToggle = !activeResultToggle;

    if (actives.includes('good') && actives.includes('cheap')) {
      if (activeResultToggle) {
        topicResult.textContent = '🐌';
        topicResult2.textContent = '';
      } else {
        topicResult.textContent = '';
        topicResult2.textContent = '🐌';
      }

      topicResult.style.backgroundColor = 'cyan';
      topicResult2.style.backgroundColor = 'cyan';
    } else if (actives.includes('good') && actives.includes('fast')) {
      if (activeResultToggle) {
        topicResult.textContent = '💰';
        topicResult2.textContent = '';
      } else {
        topicResult.textContent = '';
        topicResult2.textContent = '💰';
      }

      topicResult.style.backgroundColor = 'hotpink';
      topicResult2.style.backgroundColor = 'hotpink';
    } else {
      if (activeResultToggle) {
        topicResult.textContent = '💩';
        topicResult2.textContent = '';
      } else {
        topicResult.textContent = '';
        topicResult2.textContent = '💩';
      }

      topicResult.style.backgroundColor = '#fff000';
      topicResult2.style.backgroundColor = '#fff000';
    }
    if (activeResultToggle) {
      topicResult.classList.add('is-active');
      topicResult2.classList.remove('is-active');
      topicResult.style.zIndex = 1;
      topicResult2.style.zIndex = 0;
    } else {
      topicResult.classList.remove('is-active');
      topicResult2.classList.add('is-active');
      topicResult.style.zIndex = 0;
      topicResult2.style.zIndex = 1;
    }
  } else {
    topicResult.classList.remove('is-active');
    topicResult2.classList.remove('is-active');
  }

  topics.forEach(t => t.classList.remove('is-active'));
  actives.forEach(active => {
    topics.forEach(topic => {
      // O(n*n)
      let topicType = topic.getAttribute('data-topic');
      if (topicType === active) {
        topic.classList.add('is-active');
      }
    });
  });
};

let buttons = qsa('.js.btn');
buttons.forEach(b => {
  //  b.addEventListener("touchstart", onClick);
  b.addEventListener('click', onClick);
});

function qs(expr, context) {
  return (context || document).querySelector(expr);
}
function qsa(expr, context) {
  return [].slice.call((context || document).querySelectorAll(expr), 0);
}
