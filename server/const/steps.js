// const STATUSES = {
//   names: [
//     "application_submitted",
//     "application_checked",
//     "application_accepted",
//     "application_needs_update",
//     "application_updated",
//     "application_rejected",
//     "testdata_delivered",
//     "script_submitted",
//     "script_checked",
//     "script_executed",
//     "script_failed",
//     "results_submitted",
//   ],
//   strings: [
//     "Sie haben den Antrag eingereicht",
//     "Der Antrag wurde überprüft",
//     "Der Antrag wurde aktzeptiert",
//     "Der Antrag muss überarbeitet werden",
//     "Der Antrag wurde überarbeitet",
//     "Der Antrag wurde abgewiesen",
//     "Die Testdaten wurden zugestellt",
//     "Das Ausführungsskript wurde eingereicht",
//     "Das Ausführungsskript wurde überprüft",
//     "Das Ausführungsskript wurde ausgeführt",
//     "Das Ausführungsskript konnte nicht ausgeführt werden",
//     "Die Ergebnismenge wurde übermittelt",
//   ],
// };

const STEPS = [
  {
    name: "application_submitted",
    string: "Sie haben den Antrag eingereicht",
    mainStep: 1,
    newBubble: true,
    showDefault: false,
    type: "success",
    actionRequiered: false,
  },
  {
    name: "application_unchecked",
    string: "Der Antrag wird überprüft",
    mainStep: 1,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    actionRequiered: false,
  },
  {
    name: "application_checked",
    string: "Der Antrag wurde erfolgreich überprüft",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "success",
    actionRequiered: true,
  },
  {
    name: "application_needs_update",
    string: "Der Antrag muss überarbeitet werden",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "probem",
    actionRequiered: true,
  },
  {
    name: "application_updated",
    string: "Der Antrag wurde überarbeitet",
    mainStep: 1,
    newBubble: true,
    showDefault: false,
    type: "success",
    actionRequiered: false,
  },
  {
    name: "application_rejected",
    string: "Der Antrag wurde abgewiesen",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "fail",
    actionRequiered: false,
  },
  {
    name: "testdata_prepared",
    string: "Die Testdaten werden bereitgestellt",
    mainStep: 2,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    actionRequiered: false,
  },
  {
    name: "testdata_delivered",
    string: "Der Zugang zu den Testdaten wurde übermittelt",
    mainStep: 2,
    newBubble: false,
    showDefault: false,
    type: "success",
    actionRequiered: false,
  },
  {
    name: "script_unsubmitted",
    string: "Sie müssen ein Skript einreichen",
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "unsubmitted",
    actionRequiered: true,
  },
  {
    name: "script_submitted",
    string: "Sie haben das Script {1} eingereicht",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    actionRequiered: false,
  },
  {
    name: "script_unchecked",
    string: "Das Skript wird überprüft",
    mainStep: 3,
    newBubble: true,
    showDefault: false,
    type: "waiting",
    actionRequiered: false,
  },
  {
    name: "script_checked",
    string: "Das Sript wurde erfolgreich überprüft",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    actionRequiered: false,
  },
  {
    name: "script_needs_update",
    string: "Das Skript {1} muss überarbeitet werden. Siehe Meldung.",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "problem",
    actionRequiered: true,
  },
  {
    name: "script_unexecuted",
    string: "Das Skript wird ausgeführt",
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    actionRequiered: false,
  },
  {
    name: "script_executed",
    string: "Das Sript wurde erfolgreich ausgeführt",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    actionRequiered: false,
  },
  {
    name: "results_preparing",
    string: "Die Ergebnismenge wird bereitgestellt",
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    actionRequiered: false,
  },
  {
    name: "results_delivered",
    string: "Die Ergebnismenge wurde übermittelt",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    actionRequiered: false,
  },
  {
    name: "close_application",
    string: "Den Antrag abschließen",
    mainStep: 4,
    newBubble: true,
    showDefault: true,
    type: "submitted",
    actionRequiered: true,
  },
];

const MAIN_STEPS = [
  { id: 1, name: "Antrag" },
  { id: 2, name: "Testdaten" },
  { id: 3, name: "Skript" },
  { id: 4, name: "Ergebnismenge" },
];

const getStatusNames = () => {
  return STEPS.map((step) => step.name);
};
const STATUSES_NAMES = getStatusNames();

module.exports = {
  STEPS,
  STATUSES_NAMES,
  MAIN_STEPS,
};
