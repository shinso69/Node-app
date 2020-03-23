const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body
    });

    console.log(chalk.green(`New "${title}" note added!`));
  } else {
    console.log(chalk.red(`Note title "${title}" already exists!`));
  }

  saveNotes(notes);
};

const removeNote = title => {
  const notes = loadNotes();

  const deleteIndex = notes.find(note => note.title === title);

  if (deleteIndex) {
    const notesToKeep = notes.filter(note => note.title !== title);

    saveNotes(notesToKeep);

    console.log(chalk.green(`Note titled "${title}" has been removed!`));
  } else {
    console.log(chalk.red(`Note title "${title}" does not exists!`));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue("Your Notes"));

  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();

  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.blue(title));
    console.log(chalk.inverse(note.body));
  } else {
    console.log(chalk.red(`No note with the title "${title}" was found`));
  }
};

const saveNotes = notes => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (err) {
    return [];
  }
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote
};
