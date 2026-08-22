// w3dev specs — single static JS file, passthrough-copied as-is.
// No framework. The registry table is filtered/sorted client-side over the
// server-rendered DOM only (no fetch); the "copy raw markdown" button on the
// spec detail page is the one place that fetches, by design (see brief).
(function () {
  "use strict";

  var THEME_KEY = "w3dev-specs-theme";

  function safeSet(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      /* storage unavailable (private mode, blocked cookies, ...) — ignore */
    }
  }

  function initThemeToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var root = document.documentElement;
      var current = root.getAttribute("data-theme");
      var prefersDark =
        window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      var isDark = current ? current === "dark" : prefersDark;
      var next = isDark ? "light" : "dark";
      root.setAttribute("data-theme", next);
      safeSet(THEME_KEY, next);
    });
  }

  function initRegistry() {
    var tableBody = document.getElementById("table-body");
    if (!tableBody) return; // not the landing page

    var rows = Array.prototype.slice.call(tableBody.querySelectorAll(".table-row"));
    var searchInput = document.getElementById("search-input");
    var sortSelect = document.getElementById("sort-select");
    var statusChips = Array.prototype.slice.call(
      document.querySelectorAll("#status-chips .chip")
    );
    var tagChips = Array.prototype.slice.call(document.querySelectorAll("#tag-chips .chip"));
    var emptyMsg = document.getElementById("results-empty");

    var state = { q: "", status: [], tag: [], sort: "name" };

    function parseStateFromUrl() {
      var params = new URLSearchParams(window.location.search);
      state.q = params.get("q") || "";
      state.status = (params.get("status") || "").split(",").filter(Boolean);
      state.tag = (params.get("tag") || "").split(",").filter(Boolean);
      state.sort = params.get("sort") || "name";
    }

    function writeStateToUrl() {
      var params = new URLSearchParams();
      if (state.q) params.set("q", state.q);
      if (state.status.length) params.set("status", state.status.join(","));
      if (state.tag.length) params.set("tag", state.tag.join(","));
      if (state.sort && state.sort !== "name") params.set("sort", state.sort);
      var qs = params.toString();
      var url = window.location.pathname + (qs ? "?" + qs : "");
      window.history.replaceState(null, "", url);
    }

    function syncControls() {
      if (searchInput) searchInput.value = state.q;
      if (sortSelect) sortSelect.value = state.sort;
      statusChips.forEach(function (chip) {
        var val = chip.getAttribute("data-status") || "";
        var active = val === "" ? state.status.length === 0 : state.status.indexOf(val) !== -1;
        chip.classList.toggle("is-active", active);
      });
      tagChips.forEach(function (chip) {
        var val = chip.getAttribute("data-tag") || "";
        chip.classList.toggle("is-active", state.tag.indexOf(val) !== -1);
      });
    }

    function applyFilters() {
      var q = state.q.trim().toLowerCase();
      var visibleCount = 0;
      rows.forEach(function (row) {
        var matchesQ = !q || (row.getAttribute("data-search") || "").indexOf(q) !== -1;
        var status = row.getAttribute("data-status") || "";
        var matchesStatus = state.status.length === 0 || state.status.indexOf(status) !== -1;
        var rowTags = (row.getAttribute("data-tags") || "").split(",").filter(Boolean);
        var matchesTag =
          state.tag.length === 0 ||
          state.tag.every(function (t) {
            return rowTags.indexOf(t) !== -1;
          });
        var show = matchesQ && matchesStatus && matchesTag;
        row.hidden = !show;
        if (show) visibleCount++;
      });
      if (emptyMsg) emptyMsg.hidden = visibleCount !== 0;
    }

    function applySort() {
      var sorted = rows.slice().sort(function (a, b) {
        if (state.sort === "updated") {
          return (b.getAttribute("data-updated") || "").localeCompare(
            a.getAttribute("data-updated") || ""
          );
        }
        if (state.sort === "status") {
          var byStatus = (a.getAttribute("data-status") || "").localeCompare(
            b.getAttribute("data-status") || ""
          );
          if (byStatus !== 0) return byStatus;
          return (a.getAttribute("data-name") || "").localeCompare(b.getAttribute("data-name") || "");
        }
        return (a.getAttribute("data-name") || "").localeCompare(b.getAttribute("data-name") || "");
      });
      sorted.forEach(function (row) {
        tableBody.appendChild(row);
      });
    }

    function render() {
      applySort();
      applyFilters();
    }

    function navigateToRow(row, event) {
      if (event && event.target && event.target.closest && event.target.closest("a")) return;
      var href = row.getAttribute("data-href");
      if (href) window.location.href = href;
    }

    parseStateFromUrl();
    syncControls();
    render();

    if (searchInput) {
      searchInput.addEventListener("input", function () {
        state.q = searchInput.value;
        writeStateToUrl();
        applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener("change", function () {
        state.sort = sortSelect.value;
        writeStateToUrl();
        render();
      });
    }

    statusChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var val = chip.getAttribute("data-status") || "";
        if (val === "") {
          state.status = [];
        } else {
          var i = state.status.indexOf(val);
          if (i === -1) {
            state.status.push(val);
          } else {
            state.status.splice(i, 1);
          }
        }
        writeStateToUrl();
        syncControls();
        applyFilters();
      });
    });

    tagChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var val = chip.getAttribute("data-tag") || "";
        var i = state.tag.indexOf(val);
        if (i === -1) {
          state.tag.push(val);
        } else {
          state.tag.splice(i, 1);
        }
        writeStateToUrl();
        syncControls();
        applyFilters();
      });
    });

    rows.forEach(function (row) {
      row.addEventListener("click", function (event) {
        navigateToRow(row, event);
      });
      row.addEventListener("keydown", function (event) {
        if (event.key !== "Enter") return;
        navigateToRow(row, event);
      });
    });
  }

  function initCopyRaw() {
    var btn = document.getElementById("copy-raw-btn");
    if (!btn) return;

    var label = btn.querySelector(".copy-raw-label") || btn;
    var defaultText = label.textContent;
    var resetTimer = null;

    function setLabel(text, ms) {
      label.textContent = text;
      if (resetTimer) clearTimeout(resetTimer);
      if (ms) {
        resetTimer = setTimeout(function () {
          label.textContent = defaultText;
          btn.classList.remove("is-copied");
        }, ms);
      }
    }

    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-raw-url");
      if (!url) return;

      fetch(url)
        .then(function (res) {
          if (!res.ok) throw new Error("fetch failed: " + res.status);
          return res.text();
        })
        .then(function (text) {
          return navigator.clipboard.writeText(text);
        })
        .then(function () {
          btn.classList.add("is-copied");
          setLabel("Copied", 1600);
        })
        .catch(function () {
          setLabel("Copy failed", 1600);
        });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initThemeToggle();
    initRegistry();
    initCopyRaw();
  });
})();
