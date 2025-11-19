// js/brigade-order.js
(() => {
  // глобален масив (достъпен отвън)
  window.importantThings = [];

  // draggable = елементите, които потребителя дръпва (slot-овете)
  const draggableSelector = '.box.slot';
  const dropSelector = '.box.green.empty'; // контейнерите box1..box4 (в твоят HTML са div.box.green.empty в <a id="boxN">)

  const draggables = Array.from(document.querySelectorAll(draggableSelector));
  const drops = Array.from(document.querySelectorAll(dropSelector));

  // helper: ако елементът няма id — сложи уникален
  function ensureId(el) {
    if (!el.id) {
      el.id = 'draggable-' + Math.random().toString(36).slice(2, 9);
    }
    return el.id;
  }

  // Запазваме оригиналния контейнер, за да можем да върнем елемент при размяна/премахване
  draggables.forEach(d => {
    const realDraggable = d; // очакваме .box.slot да е самият draggable
    ensureId(realDraggable);
    realDraggable.setAttribute('draggable', 'true');
    // запаметяване на оригинален родител (за връщане)
    realDraggable.dataset.origParentSelector = realDraggable.parentElement ? getElementSelectorForRestore(realDraggable.parentElement) : '';
  });

  // дава селектор/маркер за възстановяване на оригиналното място
  function getElementSelectorForRestore(el) {
    // опитваме да намерим id на родителя; ако няма, връщаме HTMLCollection родител
    if (el.id) return '#' + el.id;
    // ако родителят е <a id="box1"> вероятно той има id; ако не, можем да fallback към parent index
    if (el.classList && el.classList.contains('navbar-collapse')) return null;
    return null;
  }

  // dragstart
  draggables.forEach(d => {
    d.addEventListener('dragstart', (e) => {
      // ако е кликнат вътрешен елемент, вземаме най-близкия .box.slot
      const dragEl = e.target.closest(draggableSelector) || d;
      const id = ensureId(dragEl);
      e.dataTransfer.setData('text/plain', id);
      // малко визуално
      dragEl.classList.add('dragging');
    });
    d.addEventListener('dragend', (e) => {
      const dragEl = e.target.closest(draggableSelector) || d;
      dragEl.classList.remove('dragging');
    });
  });

  // allow drop
  drops.forEach(drop => {
    drop.addEventListener('dragover', (e) => {
      e.preventDefault();
      drop.classList.add('drag-over');
    });
    drop.addEventListener('dragleave', () => {
      drop.classList.remove('drag-over');
    });

    drop.addEventListener('drop', (e) => {
      e.preventDefault();
      drop.classList.remove('drag-over');

      const draggedId = e.dataTransfer.getData('text/plain');
      if (!draggedId) {
        console.warn('Няма зареден draggedId в dataTransfer.');
        return;
      }

      const draggedEl = document.getElementById(draggedId);
      if (!draggedEl) {
        console.warn('Не намерих елемент с id', draggedId);
        return;
      }

      // Ако в таргетната кутия вече има .box.slot — премествай старата на оригиналното ѝ място (или я махни)
      const existingSlot = drop.querySelector('.box.slot');
      if (existingSlot) {
        // Опитваме да върнем existingSlot в неговия оригинален контейнер, ако е възможно
        const orig = existingSlot.dataset.origParentSelector ? document.querySelector(existingSlot.dataset.origParentSelector) : null;
        if (orig) {
          orig.appendChild(existingSlot);
        } else {
          // ако нямаме къде да го върнем, просто махаме (или добавяме в основна зона)
          document.body.appendChild(existingSlot); // fallback — сложи в body (може да смениш)
        }
      }

      // Слагаме влачения елемент в тази празна кутия
      drop.appendChild(draggedEl);
      draggedEl.classList.add('placed');

      updateImportantThings();
    });
  });

  // Ако искаш да можеш да добавяш/взимаш чрез клик (не само drag), можеш да добавиш логика тук.

  // Обновява window.importantThings според box1..box4
  function updateImportantThings() {
    window.importantThings = [];

    // Твоите drop-контейнери (box1..box4 може да са на <a id="box1"> или parent на .box.green.empty)
    // Опитваме да намерим по id 'box1'..'box4' в DOM, и за всеки да видим дали има .box.slot в него.
    ['box1','box2','box3','box4'].forEach(id => {
      const container = document.getElementById(id);
      if (!container) {
        // ако контейнерът ти е структурно различен (например id е върху <a> а .box.green.empty е вътре),
        // опитваме да търсим .box.green.empty вътре
        const alt = document.querySelector(`#${id} .box.green.empty`) || document.querySelector(`.box.green.empty[data-box="${id}"]`);
        if (alt) {
          const slot = alt.querySelector('.box.slot');
          if (slot) window.importantThings.push(slot.id || slot.textContent.trim());
        }
        return;
      }
      // търсим в container за .box.slot (вътре в неговия .box.green.empty)
      const slot = container.querySelector('.box.slot');
      if (slot) {
        // записваме нещо смислено — предпочитам id на slot или attribute като data-key
        window.importantThings.push(slot.id || slot.dataset.key || slot.textContent.trim());
      }
    });

    console.log('Important things:', window.importantThings);
    console.log(window.importantThings.length)  
    if (window.importantThings.length === 4) {
  proceedToSite(window.importantThings);
}   
    
    
<<<<<<< HEAD
}})();
=======
  }

  const pages = {
  period: "../brigades/brigade-year.html",
  salary: "../brigades/brigade-salary.html",
  location: "../brigades/brigade-location.html",
  sector: "../brigades/brigade-sector.html"
};

// Това ще пази състоянието
let progress = {
  importantThings: [],
  currentStep: 0,
  completed: {
    period: false,
    salary: false,
    location: false,
    sector: false
  }
};

function proceedToSite(importantThings) {
  progress.importantThings = importantThings;
  progress.currentStep = 0;

  // Запази напредъка в localStorage, за да е достъпен и на другите страници
  localStorage.setItem("brigadeProgress", JSON.stringify(progress));

  console.log(`[INFO] Стартирам навигацията: ${importantThings.join(', ')}`);
  goToCurrentPage();
}

// Зарежда текущата страница
function goToCurrentPage() {
  const currentId = progress.importantThings[progress.currentStep];
  const targetUrl = pages[currentId];
  if (!targetUrl) {
    console.error(`[ERROR] Няма път за ${currentId}`);
    return;
  }

  console.log(`[INFO] Пренасочване към: ${targetUrl}`);
  window.location.href = targetUrl; // ще пренасочи към правилната страница
}

// Извиква се от бутоните „<“ и „>“
function goNext() {
  const curr = progress.importantThings[progress.currentStep];
  progress.completed[curr] = true;

  if (progress.currentStep < progress.importantThings.length - 1) {
    progress.currentStep++;
    goToCurrentPage();
  } else {
    console.log("[INFO] Всички стъпки завършени!");
    // тук можеш да направиш финална страница
  }
}

function goPrevious() {
  if (progress.currentStep > 0) {
    progress.currentStep--;
    goToCurrentPage();
  }
}

  
})();
>>>>>>> 228f494da240a0b0aed6724a6300628a2fd09d45
