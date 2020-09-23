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
// const STEPS2 = [
//   {
//     name: "application_submitted",
//     string_before: "-",
//     string_after: "Sie haben den Antrag eingereicht",
//     string_fail: "-",
//   },
//   {
//     name: "application_checked",
//     string_before: "Der Antrag wird überprüft",
//     string_after: "Der Antrag wurde erfolgreich überprüft",
//     string_update: "Der Antrag muss überarbeitet werden",
//     string_fail: "Der Antrag wurde abgelehnt",
//   },
//   {
//     name: "application_checked",
//     string_before: "Der Antrag wird überprüft",
//     string_after: "Der Antrag wurde erfolgreich überprüft",
//     string_update: "Der Antrag muss überarbeitet werden",
//     string_fail: "Der Antrag wurde abgelehnt",
//   },
// ];

const STEPS = [
  {
    name = "application_submitted",
    string = "Sie haben den Antrag eingereicht",
    newBubble = true,
    type = "submitted",
    actionRequiered = false
  },
  {
    name = "application_unchecked",
    string = "Der Antrag wird überprüft",
    newBubble = true,
    type = "waiting",
    actionRequiered = false
  },
  {
    name = "application_checked",
    string = "Der Antrag wurde überprüft",
    newBubble = false,
    type = "success",
    actionRequiered = true
  },
  {
    name = "application_needs_update",
    string = "Der Antrag muss überarbeitet werden",
    newBubble = false,
    type = "update",
    actionRequiered = true
  },
  {
    name = "application_needs_update",
    string = "Der Antrag muss überarbeitet werden",
    newBubble = false,
    type = "update",
    actionRequiered = true
  },
  {
    name = "application_updated",
    string = "Der Antrag wurde überarbeitet",
    newBubble = false,
    type = "submitted",
    actionRequiered = false
  },
  {
    name = "application_rejected",
    string = "Der Antrag wurde abgewiesen",
    newBubble = false,
    type = "fail",
    actionRequiered = false
  },
  {
    name = "testdata_prepared",
    string = "Die Testdaten werden bereitgestellt",
    newBubble = true,
    type = "waiting",
    actionRequiered = false
  },
  {
    name = "testdata_delivered",
    string = "Der Zugang zu den Testdaten wurde übermittelt",
    newBubble = false,
    type = "success",
    actionRequiered = true
  },
  {
    name = "script_submitted",
    string = "Sie haben das Script {1} eingereicht",
    newBubble = true,
    type = "submitted",
    actionRequiered = false
  },
  {
    name = "script_unchecked",
    string = "Das Skript wird überprüft",
    newBubble = true,
    type = "waiting",
    actionRequiered = false
  },
  {
    name = "script_checked",
    string = "Das Sript wurde erfolgreich überprüft",
    newBubble = false,
    type = "success",
    actionRequiered = false
  },
  {
    name = "script_needs_update",
    string = "Das Skript {1} muss überarbeitet werden. Siehe Meldung.",
    newBubble = false,
    type = "update",
    actionRequiered = true
  },
  {
    name = "script_unexecuted",
    string = "Das Skript wird ausgeführt",
    newBubble = true,
    type = "waiting",
    actionRequiered = false
  },
  {
    name = "script_executed",
    string = "Das Sript wurde erfolgreich ausgeführt",
    newBubble = false,
    type = "success",
    actionRequiered = false
  },
  {
    name = "results_preparing",
    string = "Die Ergebnismenge wird bereitgestellt",
    newBubble = true,
    type = "waiting",
    actionRequiered = false
  },
  {
    name = "results_delivered",
    string = "Die Ergebnismenge wurde übermittelt",
    newBubble = false,
    type = "success",
    actionRequiered = false
  },
]

const STATUSES_NAMES = STEPS2.map(step => {
  return step.name
})



module.exports = {
  STEPS, STATUSES_NAMES
};
