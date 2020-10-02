// Status Sub-Steps
const STEPS = [
  {
    name: "application_submitted",
    string: "Sie haben den Antrag eingereicht",
    mainStep: 1,
    newBubble: true,
    showDefault: false,
    type: "success",
    auto_next: "application_unchecked",
    actionRequiered: false,
  },
  {
    name: "application_unchecked",
    string: "Der Antrag wird überprüft",
    mainStep: 1,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "application_checked",
    actionRequiered: false,
  },
  {
    name: "application_checked",
    string: "Der Antrag wurde erfolgreich überprüft",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "testdata_prepared",
    actionRequiered: false,
  },
  {
    name: "application_failed",
    string: "Der Antrag ist unvollständig oder fehlerhaft ",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "probem",
    auto_next: "application_needs_update",
    actionRequiered: false,
  },
  {
    name: "application_needs_update",
    string: "Der Antrag muss überarbeitet überarbeitet werden",
    mainStep: 1,
    link: `/applications/:id:/update`,
    newBubble: true,
    showDefault: false,
    type: "unsubmitted",
    next: "application_updated",
    actionRequiered: true,
  },
  {
    name: "application_updated",
    string: "Der Antrag wurde überarbeitet",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "application_unchecked",
    actionRequiered: false,
  },
  {
    name: "application_rejected",
    string: "Der Antrag wurde abgewiesen",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "problem",
    actionRequiered: false,
  },
  {
    name: "testdata_prepared",
    string: "Die Testdaten werden bereitgestellt",
    mainStep: 2,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "testdata_delivered",
    actionRequiered: false,
  },
  {
    name: "testdata_delivered",
    string: "Der Zugang zu den Testdaten wurde übermittelt",
    mainStep: 2,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "script_unsubmitted",
    actionRequiered: false,
  },
  {
    name: "script_unsubmitted",
    string: "Sie müssen ein Skript einreichen",
    link: `/applications/:id:/script`,
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "unsubmitted",
    next: "script_submitted",
    actionRequiered: true,
  },
  {
    name: "script_submitted",
    string: "Sie haben das Skript (:var:) eingereicht",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "script_unexecuted",
    actionRequiered: false,
  },
  // {
  //   name: "script_unchecked",
  //   string: "Das Skript wird überprüft",
  //   mainStep: 3,
  //   newBubble: true,
  //   showDefault: false,
  //   type: "waiting",
  //   next: "script_checked",
  //   actionRequiered: false,
  // },
  // {
  //   name: "script_checked",
  //   string: "Das Sript wurde erfolgreich überprüft",
  //   mainStep: 3,
  //   newBubble: false,
  //   showDefault: false,
  //   type: "success",
  //   actionRequiered: false,
  // },
  {
    name: "script_unexecuted",
    string: "Das Skript wird ausgeführt",
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "script_executed",
    actionRequiered: false,
  },
  {
    name: "script_executed",
    string: "Das Sript wurde erfolgreich ausgeführt",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "results_preparing",
    actionRequiered: false,
  },
  {
    name: "script_failed",
    string: "Die Ausführung von :var: war fehlerhaft ",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "problem",
    auto_next: "script_needs_update",
    actionRequiered: false,
  },
  {
    name: "script_needs_update",
    string: "Das Skript :var: muss überarbeitet werden",
    mainStep: 3,
    link: `/applications/:id:/script`,
    newBubble: true,
    showDefault: false,
    type: "unsubmitted",
    next: "script_updated",
    actionRequiered: true,
  },
  {
    name: "script_updated",
    string: "Überarbeitetes Skript (:var:) wurde eingereicht",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "script_unexecuted",
    actionRequiered: false,
  },
  {
    name: "results_preparing",
    string: "Die Ergebnismenge wird bereitgestellt",
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "results_delivered",
    actionRequiered: false,
  },
  {
    name: "results_delivered",
    string: "Die Ergebnismenge wurde übermittelt",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "give_feedback",
    actionRequiered: false,
  },
  {
    name: "give_feedback",
    string: "Bitte Bewerten Sie den Service",
    mainStep: 4,
    newBubble: true,
    showDefault: true,
    link: `/applications/:id:/feedback`,
    type: "unsubmitted",
    next: "feddback_given",
    actionRequiered: true,
  },
  {
    name: "feddback_given",
    string: "Der Service wurde berwertet",
    mainStep: 4,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "application_closed",
    actionRequiered: false,
  },
  {
    name: "submit_publication",
    string: "Bitte reichen Sie die Publikation der Ergebnise ein",
    mainStep: 4,
    newBubble: true,
    showDefault: true,
    link: `/applications/:id:/publication`,
    type: "unsubmitted",
    next: "feddback_given",
    actionRequiered: true,
  },
  {
    name: "publication_submitted",
    string: "Publikation erfolgreich eingereicht",
    mainStep: 4,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "application_closed",
    actionRequiered: false,
  },
  {
    name: "application_closed",
    string: "Den Antrag wurde erfolgreich abgeschloßen",
    mainStep: 4,
    newBubble: true,
    showDefault: true,
    type: "success",
    actionRequiered: false,
  },
];

// Main Steps
const MAIN_STEPS = [
  { id: 1, name: "Antrag" },
  { id: 2, name: "Testdaten" },
  { id: 3, name: "Skript" },
  { id: 4, name: "Antrag abschließen" },
];

// Script Wizard - html code hier? Text ist mit html formatiert
const SCRIPT_WIZARD = [];

// Only for Database model
const getStatusNames = () => {
  return STEPS.map((step) => step.name);
};
const STATUSES_NAMES = getStatusNames();

module.exports = {
  STEPS,
  STATUSES_NAMES,
  MAIN_STEPS,
};
