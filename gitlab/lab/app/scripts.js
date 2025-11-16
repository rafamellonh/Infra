const notes = [
  "Relembrar como desfazer alterações com git checkout.",
  "Testar criação de branchs: git checkout -b feature/css.",
  "Experimentar git stash para salvar mudanças temporariamente."
];

const listEl = document.querySelector("#notes-list");
const addBtn = document.querySelector("#add-note");

function renderNotes() {
  listEl.innerHTML = "";
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.textContent = note;
    listEl.appendChild(li);
  });
}

function addRandomNote() {
  const ideas = [
    "Criar um commit semântico descrevendo a última mudança.",
    "Rodar git log --oneline para ver histórico compactado.",
    "Configurar um remote e testar git push origin main."
  ];
  const idea = ideas[Math.floor(Math.random() * ideas.length)];
  notes.push(idea);
  renderNotes();
}

if (listEl && addBtn) {
  renderNotes();
  addBtn.addEventListener("click", addRandomNote);
}
