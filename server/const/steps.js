// Status Sub-Steps
const STEPS = [
  {
    name: "application_unsubmitted",
    string: "Sie müssen den Antrag hochladen",
    stringFDZ: "User muss den Antrag hochladen",
    mainStep: 1,
    newBubble: true,
    showDefault: true,
    type: "unsubmitted",
    next: "application_submitted",
    link: `/applications/:id:/upload`,
    actionRequiered: true,
  },
  {
    name: "application_submitted",
    string: "Sie haben den Antrag eingereicht",
    stringFDZ: "User hat den Antrag eingereicht",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "application_unchecked",
    actionRequiered: false,
  },
  {
    name: "application_unchecked",
    string: "Wir überprüfen den Antrag",
    stringFDZ: "Der Antrag muss überprüft werden",
    mainStep: 1,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "application_checked",
    actionRequiered: false,
  },
  {
    name: "application_checked",
    string: "Wir haben den Antrag erfolgreich überprüft",
    stringFDZ: "Der Antrag wurde erfolgreich überprüft",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "testdata_undelivered",
    actionRequiered: false,
  },
  {
    name: "application_failed",
    string: "Der Antrag ist unvollständig oder fehlerhaft",
    stringFDZ: "Der Antrag ist unvollständig oder fehlerhaft",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "probem",
    auto_next: "application_needs_update",
    actionRequiered: false,
  },
  {
    name: "application_needs_update",
    string: "Sie müssen den Antrag überarbeiten",
    stringFDZ: "User muss den Antrag überarbeiten",
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
    stringFDZ: "Der Antrag wurde überarbeitet",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "application_unchecked",
    actionRequiered: false,
  },
  {
    name: "application_rejected",
    string: "Wir haben den Antrag abgelehnt",
    stringFDZ: "Der Antrag wurde abgelehnt",
    mainStep: 1,
    newBubble: false,
    showDefault: false,
    type: "problem",
    actionRequiered: false,
  },
  {
    name: "testdata_undelivered",
    string: "Wir stellen die Testdaten bereit",
    stringFDZ: "Testdaten müssen bereitgestellt werden",
    mainStep: 2,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "testdata_delivered",
    actionRequiered: false,
  },
  {
    name: "testdata_delivered",
    string: "Wir haben den Zugang zu den Testdaten übermittelt",
    stringFDZ: "Der Zugang zu den Testdaten wurde übermittelt",
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
    stringFDZ: "User muss ein Skript einreichen",
    link: `/applications/:id:/script/first`,
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "unsubmitted",
    next: "script_submitted",
    actionRequiered: true,
  },
  {
    name: "script_submitted",
    string: "Sie haben das Skript :var: eingereicht",
    stringFDZ: "User hat das Skript :var: eingereicht",
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
    string: "Wir führen das Skript :var: aus",
    stringFDZ: "Das Skript :var: muss ausgeführt werden",
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "script_executed",
    actionRequiered: false,
  },
  {
    name: "script_executed",
    string: "Wir haben das Skript erfolgreich ausgeführt",
    stringFDZ: "Das Skript wurde erfolgreich ausgeführt",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "results_preparing",
    actionRequiered: false,
  },
  {
    name: "script_failed",
    string: "Die Ausführung von :var: war fehlerhaft",
    stringFDZ: "Die Ausführung von :var: war fehlerhaft",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "problem",
    auto_next: "script_needs_update",
    actionRequiered: false,
  },
  {
    name: "script_needs_update",
    string: "Sie müssen das Skript :var: überarbeiten",
    stringFDZ: "User muss das Skript :var: überarbeiten",
    mainStep: 3,
    link: `/applications/:id:/script/update`,
    newBubble: true,
    showDefault: false,
    type: "unsubmitted",
    next: "script_updated",
    actionRequiered: true,
  },
  {
    name: "script_updated",
    string: "Überarbeitetes Skript (:var:) wurde eingereicht",
    stringFDZ: "Überarbeitetes Skript (:var:) wurde eingereicht",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "script_unexecuted",
    actionRequiered: false,
  },
  {
    name: "results_preparing",
    string: "Wir stellen die Ergebnismenge bereit",
    stringFDZ: "Ergebnismenge muss bereitgestellt werden",
    mainStep: 3,
    newBubble: true,
    showDefault: true,
    type: "waiting",
    next: "results_delivered",
    actionRequiered: false,
  },
  {
    name: "results_delivered",
    string: "Wir haben die Ergebnismenge übermittelt",
    stringFDZ: "Die Ergebnismenge wurde übermittelt",
    mainStep: 3,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "give_feedback",
    actionRequiered: false,
  },
  {
    name: "give_feedback",
    string: "Bitte bewerten Sie den Service",
    stringFDZ: "User muss Service bewerten",
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
    string: "Sie haben den Service bewertet",
    stringFDZ: "User hat den Service bewertet",
    mainStep: 4,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "application_closed",
    actionRequiered: false,
  },
  {
    name: "submit_publication",
    string: "Bitte reichen Sie die Publikation der Ergebnisse ein",
    stringFDZ: "User muss Publikation einreichen",
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
    stringFDZ: "User hat Publikation eingereicht",
    mainStep: 4,
    newBubble: false,
    showDefault: false,
    type: "success",
    auto_next: "application_closed",
    actionRequiered: false,
  },
  {
    name: "application_closed",
    string: "Sie haben den Antrag erfolgreich abgeschlossen",
    stringFDZ: "Der Antrag wurde erfolgreich abgeschlossen",
    mainStep: 4,
    newBubble: true,
    showDefault: true,
    type: "success",
    actionRequiered: false,
  },
];

// Main Steps
const MAIN_STEPS = [
  { id: 1, name: "Antrag einreichen" },
  { id: 2, name: "Testdatenzugang" },
  { id: 3, name: "Skript-Analyse" },
  { id: 4, name: "Antrag abschließen" },
];

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
