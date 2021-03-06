/* Copyright (C) 2018-2020 Martin Väth <martin@mvath.de>
 * This project is under the GNU public license 2.0
 */

"use strict";

function getTop() {
  return document.getElementById("top");
}

function setTitle(title) {
  changeText("pageTitle", title);
}

function setHead(text) {
  changeText("textHead", text);
}

function getCheckboxTextarea() {
  return document.getElementById("checkboxTextarea");
}

function getCheckboxClipboard() {
  return document.getElementById("checkboxClipboard");
}

function getCheckboxAccordion() {
  return document.getElementById("checkboxAccordion");
}

function getCheckboxStore() {
  return document.getElementById("checkboxStore");
}

function getInputSize() {
  return document.getElementById("inputSize");
}

function getInputBase() {
  return document.getElementById("inputBase");
}

function getButtonClearStorage() {
  return document.getElementById("buttonClearStorage");
}

function getLastHead() {
  return document.getElementById("lastHead");
}

function enableButtonClipboard() {
  enableButton(document.getElementById("buttonClipboard"), true);
}

function displayLastString(lastString) {
  changeText("lastString", lastString);
  enableButtonClipboard();
}

function enableStorageButtons(enable) {
  enableButton(document.getElementById("buttonRestoreSession"), enable);
  enableButton(document.getElementById("buttonAddSession"), enable);
  enableButton(document.getElementById("buttonClearStored"), enable);
}

function isCheckedTextarea() {
  return isChecked(getCheckboxTextarea());
}

function setCheckboxTextarea(checked) {
  setChecked(getCheckboxTextarea(), checked);
}

function isCheckedClipboard() {
  return isChecked(getCheckboxClipboard());
}

function setCheckboxClipboard(checked) {
  setChecked(getCheckboxClipboard(), checked);
}

function isCheckedAccordion() {
  return isChecked(getCheckboxAccordion());
}

function setCheckboxAccordion(checked) {
  setChecked(getCheckboxAccordion(), checked);
}

function isCheckedStore() {
  return isChecked(getCheckboxStore());
}

function setCheckboxStore(checked) {
  setChecked(getCheckboxStore(), checked);
}

function enableCurrent(lines, enable) {
  if (!lines.enabled == !enable) {
    return;
  }
  lines.enabled = !!enable;
  for (let i of State.buttonsAbbrArray) {
    enableButton(document.getElementById(i), enable);
  }
  for (let i of [
    "buttonBackspace",
    "buttonRedrawLine",
    "buttonCleanLine",
    "buttonRemoveLine",
    "buttonMoveLineUp",
    "buttonMoveLineDown",
    "buttonInsertLine"
    ]) {
    enableButton(document.getElementById(i), enable);
  }
}

function setInputSize(size) {
  const inputSize = getInputSize();
  if (!inputSize) {
    return;
  }
  const text = getSizeText(size);
  if (inputSize.value !== text) {
    inputSize.value = text;
  }
}

function setInputBase(base) {
  const inputBase = getInputBase();
  if (!inputBase) {
    return;
  }
  const text = getBaseText(base);
  if (inputBase.value !== text) {
    inputBase.value = text;
  }
}

function translateExamples() {
  const examples = document.getElementById("textExamples");
  const td = document.createElement("TD");
  appendTextNode(td, "textResult");
  for (let table of examples.children) {
    if (table.nodeName !== "TABLE") {
      continue;
    }
    let row = table;
    while (row.nodeName !== "TR") {
      row = row.firstChild;
    }
    row.insertBefore(td.cloneNode(true), row.firstChild);
  }
  for (let id of [
    "textResult1",
    "textResult2"
    ]) {
    const element = document.getElementById(id);
    element.textContent =
      compatible.getMessage("messageResult", [element.textContent, "16"]);
  }
}

function initLayout() {
  const title = compatible.getMessage("extensionName");
  setTitle(title);
  setHead(title);
  for (let id of [
    "summaryExamples",
    "summaryBinaryOperators",
    "summaryFunctions",
    "summaryConstants",
    "summaryNumbers",
    "summaryLast",
    "summaryOptions",
    "summaryStorage",
    "summaryEditing"
    ]) {
    const translation = compatible.getMessage(id);
    document.getElementById(id).textContent = translation;
  }
  translateExamples();
  for (let i of [
    [ "AbbrUarr", "AbbrDoubleAst" ],
    [ "AbbrTimes", "AbbrMiddot", "AbbrAst" ],
    [ "AbbrSlash", "AbbrColon" ],
    "AbbrPercentage",
    "AbbrPlus",
    "AbbrMinus",
    "AbbrAmp",
    "AbbrPow",
    "AbbrVert",
    "AbbrAssign",
    "AbbrSin",
    "AbbrCos",
    "AbbrTan",
    "AbbrAsin",
    "AbbrAcos",
    "AbbrAtan",
    "AbbrSinh",
    "AbbrCosh",
    "AbbrTanh",
    "AbbrAsinh",
    "AbbrAcosh",
    "AbbrAtanh",
    "AbbrLog10",
    "AbbrLog2",
    "AbbrLog",
    "AbbrLog1p",
    "AbbrExp",
    "AbbrExpm1",
    [ "AbbrRadic", "AbbrSqrt" ],
    [ "AbbrCuberoot", "AbbrCbrt" ],
    "AbbrClz32",
    "AbbrAbs",
    "AbbrSign",
    "AbbrFloor",
    "AbbrCeil",
    "AbbrRound",
    "AbbrTrunc",
    "AbbrFround",
    "AbbrE",
    [ "AbbrPi", "AbbrPI" ],
    "AbbrSQRT2",
    "AbbrSQRT1_2",
    [ "AbbrEpsilon", "AbbrEPSILON" ],
    "AbbrLN2",
    "AbbrLN10",
    "AbbrLOG2E",
    "AbbrLOG10E",
    [ "AbbrUnaryPlus", "AbbrUnaryMinus" ],
    [ "AbbrOpen", "AbbrClose" ],
    "Backspace",
    "AbbrSpace",
    [ "AbbrVarA",
      "AbbrVarB", "AbbrVarC", "AbbrVarD", "AbbrVarE", "AbbrVarF",
      "AbbrVarG", "AbbrVarH", "AbbrVarI", "AbbrVarJ", "AbbrVarK",
      "AbbrVarL", "AbbrVarM", "AbbrVarN", "AbbrVarO", "AbbrVarP",
      "AbbrVarQ", "AbbrVarR", "AbbrVarS", "AbbrVarT", "AbbrVarU",
      "AbbrVarV", "AbbrVarW", "AbbrVarX", "AbbrVarY", "AbbrVarZ" ],
    "Abbr0x",
    "Abbr0",
    [ "Abbr1", "Abbr2", "Abbr3", "Abbr4", "Abbr5", "Abbr6", "Abbr7", "Abbr8",
      "Abbr9" ],
    [ "AbbrHexA", "AbbrHexB", "AbbrHexC", "AbbrHexD", "AbbrHexE", "AbbrHexF" ],
    "AbbrDot",
    "AbbrNumericE",
    "AbbrLast"
    ]) {
    if (!Array.isArray(i)) {
      i = [ i ];
    }
    const translation = compatible.getMessage("titleButton" + i[0]);
    for (let j of i) {
      document.getElementById("button" + j).title = translation;
    }
  }
  for (let i of [
    "Log1p",
    "Expm1",
    "Clz32",
    "E",
    "Pi",
    "SQRT2",
    "SQRT1_2",
    "LN2",
    "LN10",
    "LOG2E",
    "LOG10E"
    ]) {
    const name = "titleButtonAbbr" + i;
    document.getElementById(name).title = compatible.getMessage(name);
  }
  const textRightToLeft = compatible.getMessage("textRightToLeft");
  const titleTextRightToLeft = compatible.getMessage("titleTextRightToLeft");
  for (let id of [
    "textRightToLeft1",
    "textRightToLeft2"
    ]) {
    const col = document.getElementById(id);
    col.textContent = textRightToLeft;
    col.title = titleTextRightToLeft;
  }
}

function clearWindow() {
  const top = getTop();
  while (top.lastChild) {
    top.removeChild(top.lastChild);
  }
}

function getResultDiv(line, input, size) {
  const div = document.createElement("DIV");
  div.id = line.div;
  if (line.isInput) {
    appendFormInput(div, line.form, line.input, size,
      input && input.replace(/[\r\n]+/g, " "), "titleInput");
  } else {
    appendTextarea(div, line.input, size, input, "titleTextarea");
  }
  return div;
}

function getResultTable(line, output) {
  const table = document.createElement("TABLE");
  const row = document.createElement("TR");
  const button = appendX(row, "TD", appendButton, line.button, "buttonResult",
    null, null, "titleButtonResult");
  if (line.isInput) {
    button.tabIndex = -1;
  }
  appendX(row, "TD", appendTextNode, null, line.output, null, output);
  table.id = line.table;
  table.appendChild(row);
  return table;
}

function appendNext(lines, options, input, output, before, size) {
  const beforeNode = (lines.isValidIndex(before) ?
    document.getElementById(lines.getLine(before).div) : null);
  let useTextarea;
  if (typeof(size) == "number") {
    useTextarea = false;
  } else if (Array.isArray(size)) {
    useTextarea = true;
  } else {
    useTextarea = options.textarea;
    size = options.size;
  }
  const line = lines.generateLine(useTextarea);
  lines.currentIndex = lines.insertLine(line, before);
  const div = getResultDiv(line, input, size);
  const table = getResultTable(line, output);
  const top = getTop();
  top.insertBefore(div, beforeNode);
  top.insertBefore(table, beforeNode);
}

function swapLines(line1, line2) {
  const top = getTop();
  const a1 = document.getElementById(line1.div);
  const b1 = document.getElementById(line1.table);
  const a2 = document.getElementById(line2.div);
  const b2 = document.getElementById(line2.table);
  top.removeChild(b1);
  top.insertBefore(b1, a2);
  top.removeChild(b2);
  top.insertBefore(b2, a1);
  top.removeChild(a1);
  top.insertBefore(a1, b1);
  top.removeChild(a2);
  top.insertBefore(a2, b2);
}

function removeLine(lines, index) {
  const line = lines.getLine(index);
  if (!line) {
    return false;
  }
  if (!lines.isValidIndex(index) || (index === lines.currentIndex)) {
    enableCurrent(lines, false);  // race: disable until we get focus again
  }
  lines.removeLine(index);  // order matters: first invalidate currentIndex
  const top = getTop();
  top.removeChild(document.getElementById(line.table));
  top.removeChild(document.getElementById(line.div));
  return true;
}

function initWindowHead() {
  appendButton(document.getElementById("spanButtonCollapseAccordion"),
    "buttonCollapseAccordion", null, null, null,
    "titleButtonCollapseAccordion");
  appendButton(document.getElementById("spanButtonExpandAccordion"),
    "buttonExpandAccordion", null, null, null, "titleButtonExpandAccordion");
}

function initWindowLast(clipboard) {
  const rowLast = document.getElementById("rowLast");
  appendCheckboxCol(rowLast, "checkboxClipboard", clipboard, null,
    "titleCheckboxClipboard");
  appendX(rowLast, "TD", appendButton, "buttonClipboard", null, true, null,
    "titleButtonClipBoard");
  appendX(rowLast, "TD", appendButton, "buttonAllClipboard", null, null, null,
    "titleButtonAllClipboard");
}

function initWindowOptions(textarea, size, base, linesEnabled) {
  const disabled = !linesEnabled;
  const rowTextarea = document.getElementById("rowTextarea");
  clearItem(rowTextarea);
  appendCheckboxCol(rowTextarea, "checkboxTextarea", textarea,
    null, "titleCheckboxTextarea");
  appendX(rowTextarea, "TD", appendButton, "buttonAbbrExclam",
    null, disabled, "!", "titleTextOptionOn");
  appendX(rowTextarea, "TD", appendTextNode, "textOptionOn", null,
    "titleTextOptionOn");
  appendX(rowTextarea, "TD", appendButton, "buttonAbbrQuestion",
    null, disabled, "?", "titleTextOptionOff");
  appendX(rowTextarea, "TD", appendTextNode, "textOptionOff", null,
    "titleTextOptionOff");
  appendX(rowTextarea, "TD", appendButton, "buttonRedrawLine", null,
    disabled, null, "titleButtonRedrawLine");
  appendX(rowTextarea, "TD", appendButton, "buttonRedrawWindow", null,
    null, null, "titleButtonRedrawWindow");
  const rowSize = document.getElementById("rowSize");
  clearItem(rowSize);
  appendInputCol(rowSize, "inputSize", 3, getSizeText(size),
    "inputSize", "titleInputSize");
  appendX(rowSize, "TD", appendButton, "buttonAbbrSize603",
    null, disabled, "'60:3'", "titleButtonAbbrSize");
  appendX(rowSize, "TD", appendButton, "buttonAbbrSize00",
    null, disabled, "'0:0'", "titleButtonAbbrSize");
  const rowBase = document.getElementById("rowBase");
  clearItem(rowBase);
  appendInputCol(rowBase, "inputBase", 1, getBaseText(base),
    "inputBase", "titleinputBase");
  appendX(rowBase, "TD", appendButton, "buttonAbbrBase16", null,
    disabled, '"16"', "titleButtonAbbrBase");
  appendX(rowBase, "TD", appendButton, "buttonAbbrBase8", null,
    disabled, '"8"', "titleButtonAbbrBase");
  appendX(rowBase, "TD", appendButton, "buttonAbbrBaseEmpty", null,
    disabled, '""', "titleButtonAbbrBase");
}

function initWindowStorage(accordion, store, haveStored, haveStorage) {
  const disabled = !haveStored;
  const rowSession = document.getElementById("rowSession");
  clearItem(rowSession);
  appendX(rowSession, "TD", appendButton, "buttonStoreSession", null,
    null, null, "titleButtonStoreSession");
  appendX(rowSession, "TD", appendButton, "buttonRestoreSession", null,
    disabled, null, "titleButtonRestoreSession");
  appendX(rowSession, "TD", appendButton, "buttonAddSession", null,
    disabled, null, "titleButtonAddSession");
  appendX(rowSession, "TD", appendButton, "buttonClearStored", null,
    disabled, null, "titleButtonClearStored");
  const rowStorage = document.getElementById("rowStorage");
  clearItem(rowStorage);
  appendCheckboxCol(rowStorage, "checkboxAccordion", accordion, null,
    "titleCheckboxAccordion");
  appendCheckboxCol(rowStorage, "checkboxStore", store, null,
    "titleCheckboxStore");
  appendX(rowStorage, "TD", appendTextNode, null, null, null, "\xa0");
  appendX(rowStorage, "TD", appendButton, "buttonClearStorage", null,
    !haveStorage, null, "titleButtonClearStorage");
}

function initWindowEditing(linesEnabled) {
  const disabled = !linesEnabled;
  const rowEditing = document.getElementById("rowEditing");
  clearItem(rowEditing);
  appendX(rowEditing, "TD", appendButton, "buttonCleanLine", null, disabled,
    null, "titleButtonCleanLine");
  appendX(rowEditing, "TD", appendTextNode, "textRemoveLine", null,
    "titleTextRemoveLine");
  appendX(rowEditing, "TD", appendButton, "buttonRemoveLine", null, disabled,
    null, "titleButtonRemoveLine");
  appendX(rowEditing, "TD", appendButton, "buttonMoveLineUp", null, disabled,
    null, "titleButtonMoveLineUp", "buttonMoveLineUpFontWeight");
  appendX(rowEditing, "TD", appendButton, "buttonMoveLineDown", null, disabled,
    null, "titleButtonMoveLineDown", "buttonMoveLineDownFontWeight");
  appendX(rowEditing, "TD", appendButton, "buttonInsertLine", null, disabled,
    null, "titleButtonInsertLine");
  appendX(rowEditing, "TD", appendButton, "buttonClearWindow", null, null,
    null, "titleButtonClearWindow");
}

function initWindow(lines, options, storedLast, haveStorage) {
  initWindowHead();
  initWindowLast(options.clipboard);
  initWindowOptions(options.textarea, options.size, options.base,
    lines.enabled);
  initWindowStorage(options.accordion, options.store, storedLast, haveStorage);
  initWindowEditing(lines.enabled);
  appendNext(lines, options);
}

function clearAllLines(lines) {
  enableCurrent(lines, false);  // race: disable until we get focus again
  lines.clearLines();  // order matters: first invalidate lines data
  clearWindow();
}

function clearAll(lines, options) {
  clearAllLines(lines);
  appendNext(lines, options);
}

function changeInputWidth(lines, width) {
  for (let line of lines.lines) {
    if (line.isInput) {
      document.getElementById(line.input).size = width;
    }
  }
}

function changeTextareaValue(options, value, forceRedisplay) {
  const changes = booleanChanges(options, "textarea", value);
  if (changes) {
    State.storeChanges(options, "textarea");
  }
  if (forceRedisplay || changes) {
    setCheckboxTextarea(value);
  }
}

function changeSizeValue(lines, options, size, forceRedisplay) {
  const oldSize = (options.size || [ 0, 0 ]);
  if (isDefaultSize(size)) {
    delete options.size;
  } else {
    options.size = size;
  }
  if (!equalSize(oldSize, size)) {
    setInputSize(size);
    State.storeChanges(options, "size");
  } else if (forceRedisplay) {
    setInputSize(size);
  }
  if (oldSize[0] != size[0]) {
    changeInputWidth(lines, size[0] || 80);
  }
}

function changeBaseValue(options, base, forceRedisplay) {
  const oldBase = (options.base || 0);
  if (isDefaultBase(base)) {
    delete options.base;
  } else {
    options.base = base;
  }
  if (oldBase != base) {
    setInputBase(base);
    State.storeChanges(options, "base");
  } else if (forceRedisplay) {
    setInputBase(base);
  }
}

function toClipboardUnsafe(text) {
  const textarea = document.createElement("TEXTAREA");
  textarea.value = (text || "");
  const top = getTop();
  top.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  top.removeChild(textarea);
}

function toClipboard(text) {
  try {
    toClipboardUnsafe(text);
  }
  catch (error) {  // tacitly ignore clipboard issues
  }
}

function lastToClipboard(lastString) {
  if (typeof(lastString) == "string") {
    toClipboard(lastString);
  }
}
