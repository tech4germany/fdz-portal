const STATUSES = {
  names: [
    "application_submitted",
    "application_checked",
    "application_accepted",
    "application_needs_update",
    "application_updated",
    "application_rejected",
    "testdata_delivered",
    "script_submitted",
    "script_checked",
    "script_executed",
    "script_failed",
    "results_submitted",
  ],
  strings: [
    "Sie haben den Antrag eingereicht",
    "Der Antrag wurde überprüft",
    "Der Antrag wurde aktzeptiert",
    "Der Antrag muss überarbeitet werden",
    "Der Antrag wurde überarbeitet",
    "Der Antrag wurde abgewiesen",
    "Die Testdaten wurden zugestellt",
    "Das Ausführungsskript wurde eingereicht",
    "Das Ausführungsskript wurde überprüft",
    "Das Ausführungsskript wurde ausgeführt",
    "Das Ausführungsskript konnte nicht ausgeführt werden",
    "Die Ergebnismenge wurde übermittelt",
  ],
};

const STEPS = [
  {
    name: "application_submitted",
    string_before: "Bitte Antrag einreichen",
    string_after: "Sie haben den Antrag eingereicht",
    string_fail: "Antrag wurde nicht erfolgreich eingereicht",
  },
  {
    name: "application_checked",
    string_before: "Bitte Antrag einreichen",
    string_after: "Sie haben den Antrag eingereicht",
    string_fail: "Antrag wurde nicht erfolgreich eingereicht",
  },
  {
    name: "application_accepted",
    string_before: "Bitte Antrag einreichen",
    string_after: "Sie haben den Antrag eingereicht",
    string_fail: "Antrag wurde nicht erfolgreich eingereicht",
  },
];

module.exports = {
  STATUSES,
};
