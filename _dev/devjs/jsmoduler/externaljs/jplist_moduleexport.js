var jQuery = require("jquery");

module.exports = {
    init: function () {
        //alert("INNE");

        /////////////////////////
        /**
* jplist-core
* jPList - jQuery Data Grid Controls 5.2.0.287 - http://jplist.com 
* Copyright 2016 Miriam Zusin
*/
        (function () {
            var d = function (a, e) {
                var b, c; if (a && a.controller && a.controller.collection) {
                    b = a.controller.collection.dataitems.length; jQuery.isNumeric(e.index) && 0 <= e.index && e.index <= a.controller.collection.dataitems.length && (b = Number(e.index)); e.$item && a.controller.collection.addDataItem(e.$item, a.controller.collection.paths, b); if (e.$items) if (c = e.$items, jQuery.isArray(c)) for (var d = c.length - 1; 0 <= d; d--) a.controller.collection.addDataItem(c[d], a.controller.collection.paths, b); else c = c.find(a.options.itemPath).addBack(a.options.itemPath),
                    jQuery(c.get().reverse()).each(function () { a.controller.collection.addDataItem(jQuery(this), a.controller.collection.paths, b) }); a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])
                }
            }, b = function (a, e) {
                var c; a && a.controller && a.controller.collection && (e.$item && (a.controller.collection.delDataitem(e.$item), e.$item.remove()), e.$items && (c = e.$items, jQuery.isArray(e.$items) && (c = jQuery(e.$items).map(function () { return this.toArray() })), a.controller.collection.delDataitems(c), c.remove()), a.observer.trigger(a.observer.events.unknownStatusesChanged,
                [!1]))
            }, c = function (a, e, c) { switch (e) { case "add": d(a, c); break; case "del": b(a, c); break; case "empty": a && a.controller && a.controller.collection && (a.controller.collection.empty(), a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1])); break; case "getDataItems": return e = null, a.controller && a.controller.collection && (e = a.controller.collection.dataitems), e; case "addControl": a && a.panel && a.controller && (a.panel.addControl(c.$control), a.controller.addPaths(a.panel.paths)) } }, a = function (a) {
                a.observer.on(a.observer.events.knownStatusesChanged,
                function (e, c) { var b; if (c && (b = a.panel.mergeStatuses(c)) && 0 < b.length && (a.storage.save(b), a.controller.renderStatuses(b, a.history.getLastStatus()), b = !1, c)) { for (var d = 0; d < c.length; d++) if (c[d].isAnimateToTop) { b = !0; break } b && (b = jQuery(a.options.animateToTop).offset().top, jQuery("html, body").animate({ scrollTop: b }, a.options.animateToTopDuration)) } }); a.observer.on(a.observer.events.unknownStatusesChanged, function (e, c) {
                    var b; b = a.panel.getStatuses(c); 0 < b.length && (a.storage.save(b), a.controller.renderStatuses(b,
                    a.history.getLastStatus()))
                }); a.observer.on(a.observer.events.statusesAppliedToList, function (e, c, b) { a.panel.setStatuses(b); jQuery.fn.jplist.DeepLinksService.updateUrlPerControls(a.options, a.panel.getDeepLinksURLPerControls()) }); a.observer.on(a.observer.events.statusesChangedByDeepLinks, function (e, c, b) { a.panel.statusesChangedByDeepLinks(c, b) }); a.$root.find(a.options.iosBtnPath).on("click", function () { jQuery(this).next(a.options.panelPath).toggleClass("jplist-ios-show") })
            }, e = function (c, e) {
                var b = {
                    observer: null,
                    panel: null, controller: null, storage: null, $root: e
                }; b.options = jQuery.extend(!0, { debug: !1, command: "init", commandData: {}, itemsBox: ".list", itemPath: ".list-item", panelPath: ".panel", noResults: ".jplist-no-results", redrawCallback: "", iosBtnPath: ".jplist-ios-button", animateToTop: "html, body", animateToTopDuration: 0, effect: "", duration: 300, fps: 24, storage: "", storageName: "jplist", cookiesExpiration: -1, deepLinking: !1, hashStart: "#", delimiter0: ":", delimiter1: "|", delimiter2: "~", delimiter3: "!", historyLength: 10 }, c); b.observer =
                new jQuery.fn.jplist.PubSub(b.$root, b.options); b.history = new jQuery.fn.jplist.History(b.$root, b.options, b.observer); b.panel = new jQuery.fn.jplist.PanelController(e, b.options, b.history, b.observer); b.storage = new jQuery.fn.jplist.Storage(b.options.storage, b.options.storageName, b.options.cookiesExpiration); b.itemControls = new jQuery.fn.jplist.ItemControlCollection(b.options, b.observer, b.history, b.$root); b.controller = new jQuery.fn.jplist.DOMController(b.$root, b.options, b.observer, b.panel.paths); a(b); b.options.deepLinking ?
                b.panel.setStatusesByDeepLink() : b.panel.setStatusesFromStorage(); return jQuery.extend(this, b)
            }; jQuery.fn.jplist = function (a) { if (a.command && "init" !== a.command) { var b; if (b = this.data("jplist")) return c(b, a.command, a.commandData) } else return this.each(function () { var b, c = jQuery(this); b = new e(a, c); c.data("jplist", b) }) }; jQuery.jplist = {}; jQuery.fn.jplist.controls = jQuery.fn.jplist.controls || {}; jQuery.fn.jplist.itemControls = jQuery.fn.jplist.itemControls || {}; jQuery.fn.jplist.controlTypes = {}; jQuery.fn.jplist.itemControlTypes =
            {}; jQuery.fn.jplist.settings = {}; jQuery.fn.jplist.FiltersService = jQuery.fn.jplist.FiltersService || {}; jQuery.fn.jplist.SortService = jQuery.fn.jplist.SortService || {}
        })(); (function () {
            var d = function (b) { var c = jQuery.fn.trigger; b.options.debug && (jQuery.fn.trigger = function (a) { for (var e in b.events) if (b.events[e] == a) { console.log(e, arguments); break } return c.apply(this, arguments) }) }; jQuery.fn.jplist.PubSub = function (b, c) {
                var a = { options: c, $root: b, events: { unknownStatusesChanged: "1", knownStatusesChanged: "2", statusesChangedByDeepLinks: "3", listSorted: "4", listFiltered: "5", listPaginated: "6", dataItemAdded: "7", dataItemRemoved: "8", collectionReadyEvent: "9", statusesAppliedToList: "10" } };
                d(a); return jQuery.extend(!0, jQuery({}), this, a)
            }
        })(); (function () {
            jQuery.fn.jplist.History = function (d, b, c) { this.options = b; this.observer = c; this.$root = d; this.statusesQueue = []; this.listStatusesQueue = [] }; jQuery.fn.jplist.History.prototype.addStatuses = function (d) { for (var b = 0; b < d.length; b++) this.statusesQueue.push(d[b]), this.statusesQueue.length > this.options.historyLength && this.statusesQueue.shift() }; jQuery.fn.jplist.History.prototype.getLastStatus = function () { var d = null; 0 < this.statusesQueue.length && (d = this.statusesQueue[this.statusesQueue.length - 1]); return d };
            jQuery.fn.jplist.History.prototype.getLastList = function () { var d = null; 0 < this.listStatusesQueue.length && (d = this.listStatusesQueue[this.listStatusesQueue.length - 1]); return d }; jQuery.fn.jplist.History.prototype.addList = function (d) { this.listStatusesQueue.push(d); this.listStatusesQueue.length > this.options.historyLength && this.listStatusesQueue.shift() }; jQuery.fn.jplist.History.prototype.popList = function () { var d = null; 0 < this.listStatusesQueue.length && (d = this.listStatusesQueue.pop()); return d }
        })(); (function () { jQuery.fn.jplist.StatusDTO = function (d, b, c, a, e, h, g, f) { this.action = b; this.name = d; this.type = c; this.data = a; this.inStorage = e; this.inAnimation = h; this.isAnimateToTop = g; this.inDeepLinking = f } })(); (function () {
            jQuery.fn.jplist.StatusesService = jQuery.fn.jplist.StatusesService || {}; jQuery.fn.jplist.StatusesService.getStatusesByAction = function (b, c) { for (var a = [], e, d = 0; d < c.length; d++) e = c[d], e.action === b && a.push(e); return a }; jQuery.fn.jplist.StatusesService.getSortStatuses = function (b) {
                var c, a = [], e; b = jQuery.fn.jplist.StatusesService.getStatusesByAction("sort", b); if (jQuery.isArray(b)) for (var d = 0; d < b.length; d++) if ((c = b[d]) && c.data && c.data.sortGroup && jQuery.isArray(c.data.sortGroup) && 0 < c.data.sortGroup.length) for (var g =
                0; g < c.data.sortGroup.length; g++) e = new jQuery.fn.jplist.StatusDTO(c.name, c.action, c.type, c.data.sortGroup[g], c.inStorage, c.inAnimation, c.isAnimateToTop, c.inDeepLinking), a.push(e); else a.push(c); return a
            }; jQuery.fn.jplist.StatusesService.getFilterStatuses = function (b) {
                var c, a, e = []; b = jQuery.fn.jplist.StatusesService.getStatusesByAction("filter", b); if (jQuery.isArray(b)) for (var d = 0; d < b.length; d++) (c = b[d]) && c.data && c.data.filterType && (a = jQuery.fn.jplist.DTOMapperService.filters[c.data.filterType], jQuery.isFunction(a) &&
                e.push(c)); return e
            }; var d = function (b, c, a, e) { for (var d = [], g, f = 0; f < b.length; f++) g = b[f], g[c] === a && (e && (g.initialIndex = f), d.push(g)); return d }; jQuery.fn.jplist.StatusesService.add = function (b, c, a) { var e, h, g; if (0 === b.length) b.push(c); else if (e = d(b, "action", c.action, !0), 0 === e.length) b.push(c); else if (h = d(e, "name", c.name, !1), 0 === h.length) b.push(c); else { g = !1; for (var f = 0; f < h.length; f++) e = h[f], e.type === c.type && (g = !0, a && (b[e.initialIndex] = c)); g || b.push(c) } }
        })(); (function () {
            jQuery.fn.jplist.DTOMapperService = jQuery.fn.jplist.DTOMapperService || {}; jQuery.fn.jplist.DTOMapperService.filters = {}; jQuery.fn.jplist.DTOMapperService.filters.TextFilter = function (d, b) { var c = new jQuery.fn.jplist.PathModel(d.data.path, null); return jQuery.fn.jplist.FiltersService.textFilter(d.data.value, c, b, d.data.ignore, d.data.mode, d.data.not, d.data.and, d.data.or) }; jQuery.fn.jplist.DTOMapperService.filters.path = function (d, b) {
                var c = new jQuery.fn.jplist.PathModel(d.data.path, null); return jQuery.fn.jplist.FiltersService.pathFilter(c,
                b)
            }; jQuery.fn.jplist.DTOMapperService.filters.range = function (d, b) { var c = new jQuery.fn.jplist.PathModel(d.data.path, null); return jQuery.fn.jplist.FiltersService.rangeFilter(c, b, d.data.min, d.data.max, d.data.prev, d.data.next) }; jQuery.fn.jplist.DTOMapperService.filters.date = function (d, b) { var c = new jQuery.fn.jplist.PathModel(d.data.path, null); return jQuery.fn.jplist.FiltersService.dateFilter(d.data.year, d.data.month, d.data.day, c, b, d.data.format) }; jQuery.fn.jplist.DTOMapperService.filters.dateRange = function (d,
            b) { var c = new jQuery.fn.jplist.PathModel(d.data.path, null); return jQuery.fn.jplist.FiltersService.dateRangeFilter(c, b, d.data.format, d.data.prev_year, d.data.prev_month, d.data.prev_day, d.data.next_year, d.data.next_month, d.data.next_day) }; jQuery.fn.jplist.DTOMapperService.filters.pathGroup = function (d, b) { return jQuery.fn.jplist.FiltersService.pathGroupFilter(d.data.pathGroup, b) }; jQuery.fn.jplist.DTOMapperService.filters.textGroup = function (d, b) {
                return jQuery.fn.jplist.FiltersService.textGroupFilter(d.data.textGroup,
                d.data.logic, d.data.path, d.data.ignoreRegex, b, d.data.mode)
            }; jQuery.fn.jplist.DTOMapperService.filters.textFilterPathGroup = function (d, b) { return jQuery.fn.jplist.FiltersService.textFilterPathGroup(d.data.textAndPathsGroup, d.data.ignoreRegex, b, d.data.mode) }; jQuery.fn.jplist.DTOMapperService.sort = {}; jQuery.fn.jplist.DTOMapperService.sort.text = function (d, b, c) { var a = new jQuery.fn.jplist.PathModel(d.data.path, d.data.type); return jQuery.fn.jplist.SortService.textHelper(b, c, d.data.order, a, d.data.ignore || "") };
            jQuery.fn.jplist.DTOMapperService.sort.number = function (d, b, c) { var a = new jQuery.fn.jplist.PathModel(d.data.path, d.data.type); return jQuery.fn.jplist.SortService.numbersHelper(b, c, d.data.order, a) }; jQuery.fn.jplist.DTOMapperService.sort.datetime = function (d, b, c) { var a = new jQuery.fn.jplist.PathModel(d.data.path, d.data.type); return jQuery.fn.jplist.SortService.datetimeHelper(b, c, d.data.order, a, d.data.dateTimeFormat || "") }
        })(); (function () { jQuery.fn.jplist.PathModel = function (d, b) { this.jqPath = d; this.dataType = b }; jQuery.fn.jplist.PathModel.prototype.isEqual = function (d, b) { var c = !1; b ? this.jqPath === d.jqPath && (c = !0) : this.jqPath === d.jqPath && this.dataType === d.dataType && (c = !0); return c } })(); (function () { jQuery.fn.jplist.DataItemMemberModel = function (d, b) { this.$element = d; this.path = b; this.text = d.text(); this.html = d.html() } })(); (function () {
            var d = function (b, c) { for (var a, e, d = [], g = 0; g < c.length; g++) a = c[g], e = b.$item.find(a.jqPath).addBack(a.jqPath), 0 < e.length && (a = new jQuery.fn.jplist.DataItemMemberModel(e, a), d.push(a)); a = new jQuery.fn.jplist.PathModel("", null); a = new jQuery.fn.jplist.DataItemMemberModel(b.$item, a); d.push(a); return d }; jQuery.fn.jplist.DataItemModel = function (b, c, a) { this.pathitems = []; this.jqElement = this.$item = b; this.index = a; this.html = jQuery.fn.jplist.HelperService.getOuterHtml(b); this.pathitems = d(this, c) }; jQuery.fn.jplist.DataItemModel.prototype.findPathitem =
            function (b) { for (var c = null, a, e = 0; e < this.pathitems.length; e++) if (a = this.pathitems[e], a.path.isEqual(b, !0)) { c = a; break } return c }; jQuery.fn.jplist.DataItemModel.prototype.addPaths = function (b) { this.pathitems = this.pathitems.concat(d(this, b)) }
        })(); (function () {
            var d = function (a, b) { var c, e, d; c = jQuery.fn.jplist.StatusesService.getFilterStatuses(b); if (0 < c.length) { for (var h = 0; h < c.length; h++) e = c[h], d = jQuery.fn.jplist.DTOMapperService.filters[e.data.filterType], a.dataview = d(e, a.dataview); a.observer.trigger(a.observer.events.listFiltered, [b, a]) } }, b = function (a, b) {
                var c, e = null, d = 0, h = 0; c = jQuery.fn.jplist.StatusesService.getStatusesByAction("paging", b); if (0 < c.length) {
                    for (var g = 0; g < c.length; g++) if (e = c[g], e.data && (jQuery.isNumeric(e.data.currentPage) && (d =
                    e.data.currentPage), jQuery.isNumeric(e.data.number) || "all" === e.data.number)) h = e.data.number; e = new jQuery.fn.jplist.PaginationService(d, h, a.dataview.length); for (d = 0; d < c.length; d++) c[d].data && (c[d].data.paging = e); a.dataview = jQuery.fn.jplist.FiltersService.pagerFilter(e, a.dataview); a.observer.trigger(a.observer.events.listPaginated, [b, a])
                }
            }, c = function (a, b) {
                var c = [], c = jQuery.fn.jplist.StatusesService.getSortStatuses(b); 0 < c.length && (jQuery.fn.jplist.SortService.doubleSort(c, a.dataview), a.observer.trigger(a.observer.events.listSorted,
                [b, a]))
            }, a = function (a) { return jQuery(a.dataview).map(function (a, b) { return b.jqElement.get() }) }, e = function (a) { return jQuery(a.dataitems).map(function (a, b) { return b.jqElement.get() }) }, h = function (a) { a.dataview = jQuery.merge([], a.dataitems) }, g = function (a, b) { for (var c, e = -1, d, h = 0; h < a.dataitems.length; h++) if (c = a.dataitems[h], c = jQuery.fn.jplist.HelperService.getOuterHtml(c.jqElement), d = jQuery.fn.jplist.HelperService.getOuterHtml(b), c === d) { e = h; break } return e }, f = function (a, b) {
                var c; c = g(a, b); -1 !== c && (a.dataitems.splice(c,
                1), a.observer.trigger(a.observer.events.dataItemRemoved, [b, a.dataitems]))
            }, k = function (a, b) { b.each(function () { f(a, jQuery(this)) }) }, l = function (a, b, c, e) { b = new jQuery.fn.jplist.DataItemModel(b, c, e); a.dataitems.splice(e, 0, b); a.observer.trigger(a.observer.events.dataItemAdded, [b, a.dataitems]) }, m = function (a, b, c, e, d) { for (var h; c < b.length; c++) h = b.eq(c), 3 !== h.get(0).nodeType && (l(a, h, e, c), c + 1 < b.length && 0 === c % 50 && window.setTimeout(function () { m(a, b, c, e, d) }, 0)) }; jQuery.fn.jplist.Dataitems = function (a, b, c) {
                this.dataitems =
                []; this.dataview = []; this.paths = c; this.observer = a; 0 < b.length && (m(this, b, 0, c, 0), h(this)); this.observer.trigger(this.observer.events.collectionReadyEvent, [this])
            }; jQuery.fn.jplist.Dataitems.prototype.addPaths = function (a) { for (var b = 0; b < this.dataitems.length; b++) this.dataitems[b].addPaths(a); h(this) }; jQuery.fn.jplist.Dataitems.prototype.applyStatuses = function (e) { h(this); c(this, e); d(this, e); b(this, e); this.observer.trigger(this.observer.events.statusesAppliedToList, [this, e]); return a(this) }; jQuery.fn.jplist.Dataitems.prototype.filter =
            function (a) { d(this, a) }; jQuery.fn.jplist.Dataitems.prototype.sort = function (a) { c(this, a) }; jQuery.fn.jplist.Dataitems.prototype.pagination = function (a) { b(this, a) }; jQuery.fn.jplist.Dataitems.prototype.dataviewToJqueryObject = function () { return a(this) }; jQuery.fn.jplist.Dataitems.prototype.dataitemsToJqueryObject = function () { return e(this) }; jQuery.fn.jplist.Dataitems.prototype.resetDataview = function () { h(this) }; jQuery.fn.jplist.Dataitems.prototype.empty = function () {
                e(this).detach(); this.dataitems = []; this.dataview =
                []
            }; jQuery.fn.jplist.Dataitems.prototype.addDataItem = function (a, b, c) { l(this, a, b, c) }; jQuery.fn.jplist.Dataitems.prototype.addDataItems = function (a, b, c) { m(this, a, 0, b, c); h(this) }; jQuery.fn.jplist.Dataitems.prototype.delDataitem = function (a) { f(this, a) }; jQuery.fn.jplist.Dataitems.prototype.delDataitems = function (a) { k(this, a) }; jQuery.fn.jplist.Dataitems.prototype.indexOf = function (a) { return g(this, a) }; jQuery.fn.jplist.Dataitems.prototype.dataviewToString = function () {
                var a, b = "", c; for (c = 0; c < this.dataview.length; c++) a =
                this.dataview[c], b += a.html; return b
            }
        })(); (function () {
            jQuery.fn.jplist.PaginationService = function (d, b, c) {
                c = Number(c); isNaN(c) && (c = 0); c = this.itemsNumber = c; jQuery.isNumeric(b) ? (b = Number(b), isNaN(b) && (b = c)) : b = c; this.itemsOnPage = b; b = (b = this.itemsOnPage) ? Math.ceil(this.itemsNumber / b) : 0; b = this.pagesNumber = b; d = Number(d); isNaN(d) && (d = 0); d > b - 1 && (d = 0); this.currentPage = d; this.start = this.currentPage * this.itemsOnPage; d = this.itemsNumber; b = this.start + this.itemsOnPage; b > d && (b = d); this.end = b; d = this.currentPage; this.prevPage = 0 >= d ? 0 : d - 1; d = this.currentPage; b =
                this.pagesNumber; this.nextPage = 0 === b ? 0 : d >= b - 1 ? b - 1 : d + 1
            }
        })(); (function () {
            jQuery.fn.jplist.PaginationGoogleService = function (d, b, c) {
                c = Number(c); isNaN(c) && (c = 0); c = this.itemsNumber = c; jQuery.isNumeric(b) ? (b = Number(b), isNaN(b) && (b = c)) : b = c; this.itemsOnPage = b; b = (b = this.itemsOnPage) ? Math.ceil(this.itemsNumber / b) : 0; b = this.pagesNumber = b; d = Number(d); isNaN(d) && (d = 0); d > b - 1 && (d = 0); this.currentPage = d; this.start = this.currentPage * this.itemsOnPage; d = this.itemsNumber; b = this.start + this.itemsOnPage; b > d && (b = d); this.end = b; d = this.currentPage; this.prevPage = 0 >= d ? 0 : d - 1; d = this.currentPage;
                b = this.pagesNumber; this.nextPage = 0 === b ? 0 : d >= b - 1 ? b - 1 : d + 1
            }
        })(); (function () { jQuery.fn.jplist.FiltersService.dateFilter = function (d, b, c, a, e, h) { for (var g, f, k = [], l = 0; l < e.length; l++) if (g = e[l], f = g.findPathitem(a)) jQuery.isNumeric(d) && jQuery.isNumeric(b) && jQuery.isNumeric(c) ? (f = jQuery.fn.jplist.HelperService.formatDateTime(f.text, h)) && jQuery.isFunction(f.getFullYear) && (f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.getFullYear() === d && f.getMonth() === b && f.getDate() === c && k.push(g)) : k.push(g); return k } })(); (function () {
            jQuery.fn.jplist.FiltersService.dateRangeFilter = function (d, b, c, a, e, h, g, f, k) {
                for (var l = [], m, n, p, q, r = 0; r < b.length; r++) if (m = b[r], n = m.findPathitem(d)) p = !jQuery.isNumeric(a) || !jQuery.isNumeric(e) || !jQuery.isNumeric(h), q = !jQuery.isNumeric(g) || !jQuery.isNumeric(f) || !jQuery.isNumeric(k), p || q ? l.push(m) : (q = jQuery.fn.jplist.HelperService.formatDateTime(n.text, c)) && jQuery.isFunction(q.getFullYear) && (n = new Date(a, e, h), p = new Date(g, f, k), q.setHours(0), q.setMinutes(0), q.setSeconds(0), q >= n && q <= p && l.push(m));
                return l
            }
        })(); (function () { jQuery.fn.jplist.FiltersService.pagerFilter = function (d, b) { return b.slice(d.start, d.end) } })(); (function () { jQuery.fn.jplist.FiltersService.pathFilter = function (d, b) { for (var c, a, e = [], h = 0; h < b.length; h++) c = b[h], "default" === d.jqPath ? e.push(c) : (a = c.findPathitem(d)) && e.push(c); return e } })(); (function () { jQuery.fn.jplist.FiltersService.pathGroupFilter = function (d, b) { var c, a = [], e, h = []; if (0 >= d.length) return b; for (e = 0; e < d.length; e++) c = d[e], c = new jQuery.fn.jplist.PathModel(c, null), a.push(c); for (var g = 0; g < b.length; g++) { e = b[g]; for (var f = 0; f < a.length; f++) if (c = a[f], "default" === c.jqPath) { h.push(e); break } else (c = e.findPathitem(c)) && h.push(e) } return h } })(); (function () { jQuery.fn.jplist.FiltersService.rangeFilter = function (d, b, c, a, e, h) { for (var g = [], f, k = [], l, m = 0; m < b.length; m++) k = [], f = b[m], (c = f.findPathitem(d)) && 0 < c.$element.length && (c.$element.each(function () { var a = Number(jQuery(this).text().replace(/[^-0-9\.]+/g, "")); isNaN(a) || k.push(a) }), 0 < k.length && (a = Math.max.apply(Math, k), c = Math.min.apply(Math, k), l = !0, jQuery.isNumeric(e) && e > c && (l = !1), jQuery.isNumeric(h) && a > h && (l = !1), l && g.push(f))); return g } })(); (function () {
            var d = function (b, a, e, h) { var g; if (e < a.length) if (g = a[e], h = b.split(g), 1 < h.length) for (h = { operator: g, nodes: h }, g = 0; g < h.nodes.length; g++) b = h.nodes[g], h.nodes[g] = d(b, a, e + 1); else return d(b, a, e + 1); else return jQuery.trim(jQuery.fn.jplist.HelperService.removeCharacters(b, h)); return h }, b = function (c, a, e, d, g) {
                var f = !0; if (c.nodes) {
                    for (f = 0; f < c.nodes.length; f++) b(c.nodes[f], a, e, d, g); f = c.nodes; c = c.operator; var k, l; k = -1 !== a.indexOf(f[0]); for (var m = 1; m < f.length; m++) l = f[m], "" !== l && (-1 !== e.indexOf(c) && (k =
                    k && -1 === a.indexOf(l)), -1 !== d.indexOf(c) && (k = k && -1 !== a.indexOf(l)), -1 !== g.indexOf(c) && (k = k || -1 !== a.indexOf(l))); f = k
                } else f = -1 !== a.indexOf(c); return f
            }; jQuery.fn.jplist.FiltersService.advancedSearchParse = function (c, a, e, h, g, f) { var k; h && 0 != h.length || (h = ["-"]); g && 0 != g.length || (g = ["&&"]); f && 0 != f.length || (f = [","]); k = f.concat(g).concat(h); a = d(a, k, 0, e); return b(a, c, h, g, f) }
        })(); (function () {
            jQuery.fn.jplist.FiltersService.textGroupFilter = function (d, b, c, a, e, h) {
                var g, f, k; h = []; var l, m; if (0 >= d.length) return e; k = new jQuery.fn.jplist.PathModel(c, null); for (var n = 0; n < e.length; n++) if (c = e[n], f = c.findPathitem(k), "default" === k.jqPath) h.push(c); else if (f) if (f = jQuery.fn.jplist.HelperService.removeCharacters(f.text, a), "or" === b) for (m = 0; m < d.length; m++) { if (g = d[m], g = jQuery.fn.jplist.HelperService.removeCharacters(g, a), jQuery.fn.jplist.FiltersService.advancedSearchParse(f, g)) { h.push(c); break } } else {
                    l =
                    []; for (m = 0; m < d.length; m++) g = d[m], g = jQuery.fn.jplist.HelperService.removeCharacters(g, a), jQuery.fn.jplist.FiltersService.advancedSearchParse(f, g) && l.push(g); l.length === d.length && h.push(c)
                } return h
            }
        })(); (function () {
            jQuery.fn.jplist.FiltersService.textFilter = function (d, b, c, a, e, h, g, f) {
                var k, l, m = [], n; e = e || "contains"; for (var p = 0; p < c.length; p++) if (k = c[p], l = k.findPathitem(b), "default" === b.jqPath) m.push(k); else if (l) switch (l = jQuery.trim(jQuery.fn.jplist.HelperService.removeCharacters(l.text, a)), n = jQuery.trim(jQuery.fn.jplist.HelperService.removeCharacters(d, a)), e) {
                    case "startsWith": l.startsWith(n) && m.push(k); break; case "endsWith": l.endsWith(n) && m.push(k); break; case "advanced": jQuery.fn.jplist.FiltersService.advancedSearchParse(l,
                    n, a, h, g, f) && m.push(k); break; case "equal": l === n && m.push(k); break; default: -1 !== l.indexOf(n) && m.push(k)
                } return m
            }
        })(); (function () {
            jQuery.fn.jplist.FiltersService.textFilterPathGroup = function (d, b, c, a) {
                var e, h; a = []; var g = [], f, k, l; for (l = 0; l < d.length; l++) k = d[l], k.selected && (e = k.path, h = new jQuery.fn.jplist.PathModel(e, null), k.pathObj = h, a.push(k)); if (0 >= a.length) return c; for (e = 0; e < c.length; e++) {
                    d = c[e]; l = !1; for (var m = 0; m < a.length; m++) if (k = a[m], h = k.pathObj) if ("default" === h.jqPath) { l = !0; break } else if (h = d.findPathitem(h)) switch (h = jQuery.trim(jQuery.fn.jplist.HelperService.removeCharacters(h.text, b)), f = jQuery.trim(jQuery.fn.jplist.HelperService.removeCharacters(k.text,
                    b)), k.mode) { case "startsWith": h.startsWith(f) && (l = !0); break; case "endsWith": h.endsWith(f) && (l = !0); break; case "advanced": jQuery.fn.jplist.FiltersService.advancedSearchParse(h, f) && (l = !0); break; case "equal": h === f && (l = !0); break; default: -1 !== h.indexOf(f) && (l = !0) } l && g.push(d)
                } return g
            }
        })(); (function () { jQuery.fn.jplist.SortService.datetimeHelper = function (d, b, c, a, e) { d = d.findPathitem(a); b = b.findPathitem(a); return d && b ? (jQuery.trim(e) ? (a = jQuery.fn.jplist.HelperService.formatDateTime(d.text, e), e = jQuery.fn.jplist.HelperService.formatDateTime(b.text, e)) : (a = new Date(Date.parse(d.text)), e = new Date(Date.parse(b.text))), a == e ? 0 : "asc" == c ? a > e ? 1 : -1 : a < e ? 1 : -1) : 0 }; jQuery.fn.jplist.SortService.datetime = function (d, b, c, a) { c.sort(function (c, h) { return jQuery.fn.jplist.SortService.datetimeHelper(c, h, d, b, a) }) } })(); (function () { jQuery.fn.jplist.SortService.numbersHelper = function (d, b, c, a) { d = d.findPathitem(a); b = b.findPathitem(a); return d && b ? (a = parseFloat(d.text.replace(/[^-0-9\.]+/g, "")), b = parseFloat(b.text.replace(/[^-0-9\.]+/g, "")), c = a == b ? 0 : "asc" == c ? isNaN(a) ? 1 : isNaN(b) ? -1 : a - b : isNaN(a) ? 1 : isNaN(b) ? -1 : b - a) : 0 }; jQuery.fn.jplist.SortService.numbers = function (d, b, c) { c.sort(function (a, c) { return jQuery.fn.jplist.SortService.numbersHelper(a, c, d, b) }) } })(); (function () {
            jQuery.fn.jplist.SortService.textHelper = function (d, b, c, a, e) { d = d.findPathitem(a); b = b.findPathitem(a); return d && b ? (e ? (a = new RegExp(e, "ig"), e = d.text.toString().replace(a, "").toLowerCase(), d = b.text.toString().replace(a, "").toLowerCase()) : (e = d.text.toString().toLowerCase(), d = b.text.toString().toLowerCase()), e === d ? 0 : "".localeCompare ? "asc" === c ? e.localeCompare(d) : d.localeCompare(e) : "asc" === c ? e > d ? 1 : -1 : e < d ? 1 : -1) : 0 }; jQuery.fn.jplist.SortService.text = function (d, b, c, a) {
                c.sort(function (c, h) {
                    return jQuery.fn.jplist.SortService.textHelper(c,
                    h, d, b, a)
                })
            }
        })(); (function () { var d = function (b, c, a, e) { var h = 0, g, f; 0 < a.length && (g = a[e], "default" !== g.data.path ? (f = jQuery.fn.jplist.DTOMapperService.sort[g.data.type], jQuery.isFunction(f) && (h = f(g, b, c))) : (h = b.index, g = c.index, h = h === g ? 0 : isNaN(h) ? 1 : isNaN(g) ? -1 : h - g), 0 === h && e + 1 < a.length && (h = d(b, c, a, e + 1))); return h }; jQuery.fn.jplist.SortService.doubleSort = function (b, c) { var a = !1; 1 === b.length && b[0] && b[0].data && "default" === b[0].data.path && (a = !0); a || c.sort(function (a, c) { return d(a, c, b, 0) }); return c } })(); (function () { jQuery.jplist.sort = function (d, b, c, a, e, h, g) { ("asc" !== b && "desc" !== b || "text" !== c && "number" !== c && "datetime" !== c) && console.log("valdation error"); b = { action: "sort", name: "sort", type: "sort", data: { path: a, type: c, order: b, dateTimeFormat: h, ignore: e }, inStorage: !1, inAnimation: !1, isAnimateToTop: !1, inDeepLinking: !1 }; a = [new jQuery.fn.jplist.PathModel(a, c)]; c = new jQuery.fn.jplist.PubSub(jQuery("<div></div>"), {}); d = new jQuery.fn.jplist.Dataitems(c, d, a); d.sort([b]); return "html" === g ? d.dataviewToString() : d.dataviewToJqueryObject() } })(); (function () {
            var d = function (b, a) {
                var e = null; if ("{month}" == b) {
                    a = a.toLowerCase(); if ("january" === a || "jan" === a || "jan." === a) e = 0; if ("february" === a || "feb" === a || "feb." === a) e = 1; if ("march" === a || "mar" === a || "mar." === a) e = 2; if ("april" == a || "apr" === a || "apr." === a) e = 3; "may" === a && (e = 4); if ("july" == a || "jun" === a || "jun." === a) e = 5; if ("april" === a || "jul" === a || "jul." === a) e = 6; if ("august" === a || "aug" === a || "aug." === a) e = 7; if ("september" === a || "sep" === a || "sep." === a) e = 8; if ("october" === a || "oct" === a || "oct." === a) e = 9; if ("november" === a ||
                    "nov" === a || "nov." === a) e = 10; if ("december" === a || "dec" === a || "dec." === a) e = 11; null === e && (e = parseInt(a, 10), isNaN(e) || e--)
                } else e = parseInt(a, 10); return e
            }, b = function (b, a) { var e, d = null; e = b.replace(/{year}|{month}|{day}|{hour}|{min}|{sec}/g, ".*"); (e = (new RegExp(e, "g")).exec(a)) && 1 < e.length && (d = e[1]); return d }; jQuery.fn.jplist.HelperService = {}; jQuery.fn.jplist.HelperService.getOuterHtml = function (b) {
                var a = "", e, d; if (b && b[0] && b[0].tagName) {
                    e = b[0].attributes; d = b.html(); b = b[0].tagName.toString().toLowerCase(); for (var a =
                    a + ("<" + b), g = 0; g < e.length; g++) e[g].nodeValue && (a += " " + e[g].nodeName + "=", a += '"' + e[g].nodeValue + '"'); a = a + ">" + d; a += "</" + b + ">"
                } return a
            }; jQuery.fn.jplist.HelperService.removeCharacters = function (b, a) { return b ? b.replace(new RegExp(a, "ig"), "").toLowerCase() : "" }; jQuery.fn.jplist.HelperService.formatDateTime = function (c, a) {
                var e, h, g, f, k, l; a = a.replace(/\./g, "\\."); a = a.replace(/\(/g, "\\("); a = a.replace(/\)/g, "\\)"); a = a.replace(/\[/g, "\\["); a = a.replace(/\]/g, "\\]"); e = a.replace("{year}", "(.*)"); (h = b(e, c)) && (h = d("{year}",
                h)); e = a.replace("{day}", "(.*)"); (f = b(e, c)) && (f = d("{day}", f)); e = a.replace("{month}", "(.*)"); (g = b(e, c)) && (g = d("{month}", g)); e = a.replace("{hour}", "(.*)"); (k = b(e, c)) && (k = d("{hour}", k)); e = a.replace("{min}", "(.*)"); (l = b(e, c)) && (l = d("{min}", l)); e = a.replace("{sec}", "(.*)"); (e = b(e, c)) && (e = d("{sec}", e)); if (!h || isNaN(h)) h = 1900; if (!g || isNaN(g)) g = 0; if (!f || isNaN(f)) f = 1; if (!k || isNaN(k)) k = 0; if (!l || isNaN(l)) l = 0; if (!e || isNaN(e)) e = 0; return new Date(h, g, f, k, l, e)
            }
        })(); (function () {
            jQuery.fn.jplist.DeepLinksService = {}; jQuery.fn.jplist.DeepLinksService.getUrlParams = function (d) { var b = [], c, a = [], e, b = window.decodeURIComponent(jQuery.trim(window.location.hash.replace(d.hashStart, ""))); if (d.deepLinking && "" !== jQuery.trim(b)) for (var b = b.split(d.delimiter1), h = 0; h < b.length; h++) c = b[h], e = c.split("="), 2 === e.length && (c = e[0], e = e[1], c = c.split(d.delimiter0), 2 === c.length && (c = { controlName: c[0], propName: c[1], propValue: e }, a.push(c))); return a }; jQuery.fn.jplist.DeepLinksService.updateUrlPerControls =
            function (d, b) { if (d.deepLinking) { var c = jQuery.trim(b.replace(d.hashStart, "")), a, c = "" === c ? d.hashStart : d.hashStart + c; window.location.hash !== c && (a = window.location.href.indexOf(d.hashStart), c = -1 == a ? window.location.href + c : window.location.href.substring(0, a) + c, "replaceState" in window.history ? window.history.replaceState("", "", c) : window.location.replace(c)) } }
        })(); (function () {
            var d = function (b, c, a, e) {
                var d = c.dataitemsToJqueryObject(), g = c.dataviewToJqueryObject(), f = !1, k = jQuery.extend(!0, {}, b.options, { duration: 0 }); 0 >= d.length || 0 >= g.length ? (b.$noResults.removeClass("jplist-hidden"), b.$itemsBox.addClass("jplist-hidden"), jQuery.isFunction(b.redrawCallback) && b.redrawCallback(c, g, a)) : (b.$noResults.addClass("jplist-hidden"), b.$itemsBox.removeClass("jplist-hidden"), b.effect && jQuery.fn.jplist.animation ? (e && !e.inAnimation && (f = !0), e = f ? k : b.options, jQuery.fn.jplist.animation.drawItems(e,
                b.$itemsBox, d, g, b.effect, function () { jQuery.isFunction(b.redrawCallback) && b.redrawCallback(c, g, a) }, b.observer)) : (d.detach(), b.$itemsBox.append(g), jQuery.isFunction(b.redrawCallback) && b.redrawCallback(c, g, a))); return g
            }; jQuery.fn.jplist.DOMView = function (b, c, a, e, d, g, f) { this.options = c; this.$root = b; this.observer = a; this.redrawCallback = g; this.effect = f; this.$itemsBox = b.find(e).eq(0); this.$noResults = b.find(d) }; jQuery.fn.jplist.DOMView.prototype.render = function (b, c, a) { return d(this, b, c, a) }
        })(); (function () {
            jQuery.fn.jplist.DOMController = function (d, b, c, a) { this.observer = c; this.$root = d; this.listView = new jQuery.fn.jplist.DOMView(d, b, c, b.itemsBox, b.noResults, b.redrawCallback, b.effect); d = b.itemPath; b = this.$root.find(b.itemsBox).eq(0).find(d); this.collection = new jQuery.fn.jplist.Dataitems(this.observer, b, a) }; jQuery.fn.jplist.DOMController.prototype.renderStatuses = function (d, b) { var c; this.collection && (this.collection.applyStatuses(d), c = this.listView.render(this.collection, d, b)); return c }; jQuery.fn.jplist.DOMController.prototype.addPaths =
            function (d) { this.collection.addPaths(d) }
        })(); (function () {
            jQuery.fn.jplist.ItemControlFactory = function (d, b, c, a) { this.options = d; this.observer = b; this.history = c; this.$root = a }; jQuery.fn.jplist.ItemControlFactory.prototype.create = function (d) {
                var b = null, c, a, e = null, h = null; c = d.attr("data-control-type"); a = {}; jQuery.fn.jplist.itemControlTypes[c] && (a = jQuery.extend(!0, {}, a, jQuery.fn.jplist.itemControlTypes[c])); this.options.itemControlTypes && this.options.itemControlTypes[c] && (a = jQuery.extend(!0, {}, a, this.options.itemControlTypes[c])); a && (a.className && (e =
                jQuery.fn.jplist.itemControls[a.className]), a.options && (h = a.options)); c = { type: c, itemControlType: a, controlTypeClass: e, controlOptions: h }; c = jQuery.extend(!0, c, { $control: d, history: this.history, observer: this.observer, options: this.options, $root: this.$root }); c.controlTypeClass && jQuery.isFunction(c.controlTypeClass) && (b = new c.controlTypeClass(c)); return b
            }
        })(); (function () { var d = function (b, c) { c && 0 < c.length && c.find("[data-control-type]").each(function () { var a = jQuery(this); (a = b.controlFactory.create(a)) && b.controls.push(a) }) }; jQuery.fn.jplist.ItemControlCollection = function (b, c, a, e) { this.options = b; this.observer = c; this.history = a; this.$root = e; this.controls = []; this.controlFactory = new jQuery.fn.jplist.ItemControlFactory(b, c, a, e); this.options && this.options.itemsBox && d(this, this.$root.find(this.options.itemsBox)) } })(); (function () {
            var d = function (a) { var b = jQuery(window).scrollTop(), c; c = Number(a.data("top")); isNaN(c) || (b > c ? a.addClass("jplist-sticky") : a.removeClass("jplist-sticky")) }, b = function (a, b) { b.each(function () { var a = jQuery(this), b = a.offset().top; a.data("top", b); d(a) }); jQuery(window).scroll(function () { b.each(function () { d(jQuery(this)) }) }) }, c = function (b) {
                var c = []; if ("cookies" === b.options.storage || "localstorage" === b.options.storage && jQuery.fn.jplist.LocalStorageService.supported()) if ("cookies" === b.options.storage &&
                (c = jQuery.fn.jplist.CookiesService.restoreCookies(b.options.storageName)), "localstorage" === b.options.storage && jQuery.fn.jplist.LocalStorageService.supported() && (c = jQuery.fn.jplist.LocalStorageService.restore(b.options.storageName)), 0 < c.length) { for (var d = [], f = 0; f < c.length; f++) c[f].inStorage && d.push(c[f]); 0 < d.length && (b.controls.setStatuses(d, !0), b.observer.trigger(b.observer.events.knownStatusesChanged, [d])) } else a(b, !0); else a(b, !0)
            }, a = function (a, b) {
                var c; c = a.controls.getStatuses(b); 0 < c.length && a.observer.trigger(a.observer.events.knownStatusesChanged,
                [c])
            }; jQuery.fn.jplist.PanelController = function (a, c, d, f) { this.options = c; this.$root = a; this.history = d; this.observer = f; this.controls = this.paths = this.$sticky = null; c = this.$root.find(this.options.panelPath).find("[data-control-type]"); this.controls = new jQuery.fn.jplist.ControlsCollection; this.controls.addList(c, this.history, this.$root, this.options, this.observer); this.paths = this.controls.getPaths(); this.$sticky = a.find('[data-sticky="true"]'); 0 < this.$sticky.length && b(this, this.$sticky) }; jQuery.fn.jplist.PanelController.prototype.addControl =
            function (a) { this.controls.add(a, this.history, this.$root, this.options, this.observer); this.paths = this.controls.getPaths() }; jQuery.fn.jplist.PanelController.prototype.setStatusesByDeepLink = function () { var a; a = jQuery.fn.jplist.DeepLinksService.getUrlParams(this.options); 0 >= a.length ? c(this) : this.controls.setDeepLinks(a, this.observer) }; jQuery.fn.jplist.PanelController.prototype.setStatusesFromStorage = function () { c(this) }; jQuery.fn.jplist.PanelController.prototype.setStatuses = function (a) {
                this.history.addStatuses(a);
                this.controls.setStatuses(a, !1); this.history.addList(a)
            }; jQuery.fn.jplist.PanelController.prototype.getStatuses = function (a) { return this.controls.getStatuses(a) }; jQuery.fn.jplist.PanelController.prototype.mergeStatuses = function (a) { return this.controls.merge(!1, a) }; jQuery.fn.jplist.PanelController.prototype.statusesChangedByDeepLinks = function (a, b) { this.controls && this.controls.statusesChangedByDeepLinks(b) }; jQuery.fn.jplist.PanelController.prototype.getDeepLinksURLPerControls = function () { return this.controls.getDeepLinksUrl(this.options.delimiter1) }
        })(); (function () {
            jQuery.fn.jplist.ControlFactory = function (d, b, c, a) { this.options = d; this.observer = b; this.history = c; this.$root = a }; jQuery.fn.jplist.ControlFactory.prototype.create = function (d, b) {
                var c = null, a, e, h, g, f, k, l, m; a = d.attr("data-control-type"); f = g = h = !0; k = !1; m = l = null; (e = d.attr("data-control-deep-link")) && "false" === e.toString() && (h = !1); (e = d.attr("data-control-storage")) && "false" === e.toString() && (g = !1); (e = d.attr("data-control-animation")) && "false" === e.toString() && (f = !1); (e = d.attr("data-control-animate-to-top")) &&
                "true" === e.toString() && (k = !0); e = {}; jQuery.fn.jplist.controlTypes[a] && (e = jQuery.extend(!0, {}, e, jQuery.fn.jplist.controlTypes[a])); this.options.controlTypes && this.options.controlTypes[a] && (e = jQuery.extend(!0, {}, e, this.options.controlTypes[a])); e && (e.className && (l = jQuery.fn.jplist.controls[e.className]), e.options && (m = e.options)); a = {
                    type: a, action: d.attr("data-control-action"), name: d.attr("data-control-name"), inDeepLinking: h, inStorage: g, inAnimation: f, isAnimateToTop: k, controlType: e, controlTypeClass: l, controlOptions: m,
                    paths: []
                }; a = jQuery.extend(!0, a, { $control: d, history: this.history, observer: this.observer, options: this.options, $root: this.$root, controlsCollection: b }); a.controlTypeClass && jQuery.isFunction(a.controlTypeClass) && (c = new a.controlTypeClass(a)); return c
            }; jQuery.fn.jplist.ControlFactory.prototype.getStatus = function (d) { return null }; jQuery.fn.jplist.ControlFactory.prototype.setStatus = function (d, b) { }; jQuery.fn.jplist.ControlFactory.prototype.getDeepLink = function () { return "" }; jQuery.fn.jplist.ControlFactory.prototype.getStatusByDeepLink =
            function (d, b) { return null }; jQuery.fn.jplist.ControlFactory.prototype.getPaths = function (d) { return [] }; jQuery.fn.jplist.ControlFactory.prototype.setByDeepLink = function (d) { }; jQuery.fn.jplist.ControlFactory.getProp = function (d, b) { var c = [], a = new RegExp("^" + b + "[0-9]*$"); jQuery.each(d.data(), function (b, d) { a.test(b) && c.push(d) }); return 0 == c.length ? "" : 1 == c.length ? c[0] : c }; jQuery.fn.jplist.ControlFactory.getPropPath = function (d, b) {
                var c = ""; if (jQuery.isArray(d)) for (var a = 0; a < d.length; a++) {
                    var e = ""; 0 !== a && (e = "" +
                    a); c += "[data-" + b + e + '="' + d[a] + '"]'
                } else c += "[data-" + b + '="' + d + '"]'; return c
            }
        })(); (function () {
            var d = function (a, b) { for (var c = [], d, f = 0; f < a.controls.length; f++) d = a.controls[f], jQuery.isFunction(d.getStatus) && (d = d.getStatus(b)) && jQuery.fn.jplist.StatusesService.add(c, d, !1); return c }, b = function (a, b, c, d, f, k) { (b = (new jQuery.fn.jplist.ControlFactory(f, k, c, d)).create(b, a)) && a.controls.push(b); return b }, c = function (a, c, d, g, f, k) { c.each(function () { b(a, jQuery(this), d, g, f, k) }) }; jQuery.fn.jplist.ControlsCollection = function () { this.controls = [] }; jQuery.fn.jplist.ControlsCollection.prototype.merge =
            function (a, b) { var c, g; g = []; c = d(this, a); for (var f = 0; f < c.length; f++) jQuery.fn.jplist.StatusesService.add(g, c[f], !1); if (b) for (c = 0; c < b.length; c++) jQuery.fn.jplist.StatusesService.add(g, b[c], !0); return g }; jQuery.fn.jplist.ControlsCollection.prototype.statusesChangedByDeepLinks = function (a) { for (var b, c = 0; c < this.controls.length; c++) b = this.controls[c], jQuery.isFunction(b.setByDeepLink) && b.setByDeepLink(a) }; jQuery.fn.jplist.ControlsCollection.prototype.setDeepLinks = function (a, b) {
                var c, d, f, k = [], l; for (l = 0; l <
                a.length; l++) { c = a[l]; d = c.controlName; var m = []; f = void 0; for (var n = 0; n < this.controls.length; n++) f = this.controls[n], f.name === d && m.push(f); d = m; for (m = 0; m < d.length; m++) f = d[m], jQuery.isFunction(f.getStatusByDeepLink) && (f = f.getStatusByDeepLink(c.propName, c.propValue)) && jQuery.fn.jplist.StatusesService.add(k, f, !1) } b.trigger(b.events.knownStatusesChanged, [k]); b.trigger(b.events.statusesChangedByDeepLinks, [, k, a])
            }; jQuery.fn.jplist.ControlsCollection.prototype.setStatuses = function (a, b) {
                for (var c, d, f = [], k = 0; k <
                a.length; k++) { c = a[k]; d = !1; for (var l = 0; l < f.length; l++) f[l].name === c.name && f[l].action === c.action && (d = !0, f[l].statuses.push(c)); d || f.push({ name: c.name, action: c.action, statuses: [c] }) } for (l = 0; l < f.length; l++) if (c = f[l], c.statuses && 0 < c.statuses.length) {
                    d = c.statuses[0].name; for (var k = c.statuses[0].action, m = [], n = void 0, p = 0; p < this.controls.length; p++) n = this.controls[p], n.name === d && n.action === k && m.push(n); d = m; for (k = 0; k < d.length; k++) jQuery.isFunction(d[k].setStatus) && (1 < c.statuses.length ? d[k].setStatus(c.statuses,
                    b) : d[k].setStatus(c.statuses[0], b))
                }
            }; jQuery.fn.jplist.ControlsCollection.prototype.getDeepLinksUrl = function (a) { var b; b = ""; var c = [], d = "", f; f = this.controls; for (var k = 0; k < f.length; k++) b = f[k], jQuery.isFunction(b.getDeepLink) && (d = jQuery.trim(b.getDeepLink())), "" !== d && -1 === jQuery.inArray(d, c) && c.push(d); return b = c.join(a) }; jQuery.fn.jplist.ControlsCollection.prototype.getStatuses = function (a) { return d(this, a) }; jQuery.fn.jplist.ControlsCollection.prototype.getPaths = function () {
                for (var a, b = [], c = [], d = 0; d < this.controls.length; d++) if (a =
                this.controls[d], jQuery.isFunction(a.getPaths)) for (a.getPaths(b), a = 0; a < b.length; a++) { for (var f = c, k = b[a], l = void 0, m = !1, n = 0; n < f.length; n++) if (l = f[n], l.isEqual(k, !0)) { m = !0; break } m || c.push(b[a]) } return c
            }; jQuery.fn.jplist.ControlsCollection.prototype.add = function (a, c, d, g, f) { b(this, a, c, d, g, f) }; jQuery.fn.jplist.ControlsCollection.prototype.addList = function (a, b, d, g, f) { c(this, a, b, d, g, f) }
        })(); (function () {
            var d = function (a) { var b = []; a = jQuery(); jQuery(document).find("[data-control-type]").each(function () { var a = jQuery(this), c = a.attr("data-control-type"); c && jQuery.fn.jplist.controlTypes[c] && jQuery.fn.jplist.controlTypes[c].dropdown && b.push(a) }); for (var c = 0; c < b.length; c++) a = a.add(b[c]); return a }, b = function (a) {
                var b = d(a); 0 < b.length && (jQuery(document).click(function () { b.find("ul").hide() }), jQuery(document).off(a.DROPDOWN_CLOSE_EVENT).on(a.DROPDOWN_CLOSE_EVENT, function (a, c) {
                    b.each(function () {
                        jQuery(this).is(c) ||
                        jQuery(this).find("ul").hide()
                    })
                })); a.$control.find(".jplist-dd-panel").off().on("click", function (b) { var c; b.stopPropagation(); b = jQuery(this).parents("[data-control-type]"); c = b.find("ul"); jQuery(document).trigger(a.DROPDOWN_CLOSE_EVENT, [b]); c.toggle(0) })
            }, c = function (a, c, d, g) {
                a = { options: a, observer: c, history: d, $control: g, DROPDOWN_CLOSE_EVENT: "dropdown-close-event" }; c = a.$control.find("li:eq(0)"); c.addClass("active"); c = c.find("span"); 0 >= a.$control.find(".jplist-dd-panel").length && a.$control.prepend('<div class="jplist-dd-panel">' +
                c.text() + "</div>"); b(a); return jQuery.extend(this, a)
            }; jQuery.fn.jplist.DropdownControl = function (a, b, d, g) { return new c(a, b, d, g) }
        })(); (function () {
            jQuery.fn.jplist.Storage = function (d, b, c) { this.storageType = d; this.storageName = b; this.cookiesExpiration = c; this.isStorageEnabled = "cookies" === d || "localstorage" === d && jQuery.fn.jplist.LocalStorageService.supported() }; jQuery.fn.jplist.Storage.prototype.save = function (d) {
                var b = [], c; if (d && this.isStorageEnabled) {
                    for (var a = 0; a < d.length; a++) c = d[a], c.inStorage && b.push(c); "cookies" === this.storageType && jQuery.fn.jplist.CookiesService.saveCookies(b, this.storageName, this.cookiesExpiration); "localstorage" ===
                    this.storageType && jQuery.fn.jplist.LocalStorageService.supported() && jQuery.fn.jplist.LocalStorageService.save(b, this.storageName)
                }
            }
        })(); (function () {
            jQuery.fn.jplist.CookiesService = {}; jQuery.fn.jplist.CookiesService.setCookie = function (d, b, c) { b = escape(b); var a = new Date; c = Number(c); -1 == c || isNaN(c) ? document.cookie = d + "=" + b + ";path=/;" : (a.setMinutes(a.getMinutes() + c), document.cookie = d + "=" + b + ";path=/; expires=" + a.toUTCString()) }; jQuery.fn.jplist.CookiesService.getCookie = function (d) {
                var b, c, a, e = null; a = document.cookie.split(";"); for (var h = 0; h < a.length; h++) if (b = a[h].substr(0, a[h].indexOf("=")), c = a[h].substr(a[h].indexOf("=") + 1), b = b.replace(/^\s+|\s+$/g,
                ""), b == d) { e = unescape(c); break } return e
            }; jQuery.fn.jplist.CookiesService.saveCookies = function (d, b, c) { d = JSON.stringify(d); jQuery.fn.jplist.CookiesService.setCookie(b, d, c) }; jQuery.fn.jplist.CookiesService.restoreCookies = function (d) { var b = []; (d = jQuery.fn.jplist.CookiesService.getCookie(d)) && (b = jQuery.parseJSON(d)); b || (b = []); return b }
        })(); (function () { jQuery.fn.jplist.LocalStorageService = {}; jQuery.fn.jplist.LocalStorageService.supported = function () { try { return "localStorage" in window && null !== window.localStorage } catch (d) { return !1 } }; jQuery.fn.jplist.LocalStorageService.save = function (d, b) { var c; c = JSON.stringify(d); window.localStorage[b] = c }; jQuery.fn.jplist.LocalStorageService.restore = function (d) { var b = []; (d = window.localStorage[d]) && (b = jQuery.parseJSON(d)); b || (b = []); return b } })();

        /**
        * jplist sort_bundle
        * jPList - jQuery Data Grid Controls 5.2.0.10 - http://jplist.com 
        * Copyright 2016 Miriam Zusin
        */
        (function () {
            var d = function (g) { return jQuery.extend(this, g) }; d.prototype.getStatus = function (g) { g = new jQuery.fn.jplist.controls.DefaultSortDTO(this.$control.attr("data-path"), this.$control.attr("data-type"), this.$control.attr("data-order"), this.$control.attr("data-datetime-format"), this.$control.attr("data-ignore")); return new jQuery.fn.jplist.StatusDTO(this.name, this.action, this.type, g, this.inStorage, this.inAnimation, this.isAnimateToTop, this.inDeepLinking) }; d.prototype.getPaths = function (g) {
                var d, h;
                d = this.$control.attr("data-path"); h = this.$control.attr("data-type"); d && (d = new jQuery.fn.jplist.PathModel(d, h), g.push(d))
            }; jQuery.fn.jplist.controls.DefaultSort = function (g) { return new d(g) }; jQuery.fn.jplist.controlTypes["default-sort"] = { className: "DefaultSort", options: {} }
        })(); (function () { jQuery.fn.jplist.controls.DefaultSortDTO = function (d, g, k, h, e) { return { path: d, type: g, order: k, dateTimeFormat: h, ignore: e } } })(); (function () {
            var d = function (a, c) {
                var b; b = null; c ? (b = a.$control.find('option[data-default="true"]').eq(0), 0 >= b.length && (b = a.$control.find("option").eq(0))) : b = a.$control.find("option:selected"); b = new jQuery.fn.jplist.controls.DropdownSortDTO(jQuery.fn.jplist.ControlFactory.getProp(b, "path"), jQuery.fn.jplist.ControlFactory.getProp(b, "type"), jQuery.fn.jplist.ControlFactory.getProp(b, "order"), a.params.dateTimeFormat, a.params.ignore); return b = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, b, a.inStorage,
                a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
            }, g = function (a, c) { return (a = jQuery.trim(a)) ? new jQuery.fn.jplist.PathModel(a, c || "text") : null }, k = function (a, c) { a.$control.find("option").each(function () { var a, f; f = jQuery(this); var d; a = jQuery.fn.jplist.ControlFactory.getProp(f, "path"); f = jQuery.fn.jplist.ControlFactory.getProp(f, "type"); if (jQuery.isArray(a)) for (var e = 0; e < a.length; e++) d = e < f.length ? f[e] : "text", (d = g(a[e], d)) && c.push(d); else (d = g(a, f)) && c.push(d) }) }, h = function (a) {
                a.$control.on("change", function () {
                    var c,
                    b; c = d(a, !1); b = jQuery(this).find("option:selected"); 0 < b.length && (c.data.path = jQuery.fn.jplist.ControlFactory.getProp(b, "path"), c.data.type = jQuery.fn.jplist.ControlFactory.getProp(b, "type"), c.data.order = jQuery.fn.jplist.ControlFactory.getProp(b, "order")); a.observer.trigger(a.observer.events.knownStatusesChanged, [[c]])
                })
            }, e = function (a) { a.params = { dateTimeFormat: a.$control.attr("data-datetime-format") || "", ignore: a.$control.attr("data-ignore") || "" }; h(a); return jQuery.extend(this, a) }; e.prototype.getStatus =
            function (a) { return d(this, a) }; e.prototype.getDeepLink = function () { var a = "", c; this.inDeepLinking && (c = d(this, !1), c.data && c.data.path && c.data.type && c.data.order && (a = this.name + this.options.delimiter0 + "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order=" + c.data.path + this.options.delimiter2 + c.data.type + this.options.delimiter2 + c.data.order)); return a }; e.prototype.getStatusByDeepLink = function (a, c) {
                var b = null, f; this.inDeepLinking && (b = d(this, !0), b.data && a === "path" + this.options.delimiter2 + "type" +
                this.options.delimiter2 + "order" && (f = c.split(this.options.delimiter2), 3 === f.length && (b.data.path = f[0], b.data.type = f[1], b.data.order = f[2]))); return b
            }; e.prototype.getPaths = function (a) { k(this, a) }; e.prototype.setStatus = function (a, c) {
                var b; if ("default" == a.data.path) b = this.$control.find('option[data-path="default"]'); else {
                    b = jQuery.fn.jplist.ControlFactory.getPropPath(a.data.path, "path"); var f = jQuery.fn.jplist.ControlFactory.getPropPath(a.data.type, "type"), d = jQuery.fn.jplist.ControlFactory.getPropPath(a.data.order,
                    "order"); b = this.$control.find("option" + b + f + d)
                } 0 < b.length && (b.get(0).selected = !0)
            }; jQuery.fn.jplist.controls.SortSelect = function (a) { return new e(a) }; jQuery.fn.jplist.controlTypes["sort-select"] = { className: "SortSelect", options: {} }
        })(); (function () {
            var d = function (a, c) {
                var b = null; c ? (b = a.$control.find('li:has(span[data-default="true"])').eq(0), 0 >= b.length && (b = a.$control.find("li:eq(0)"))) : b = a.$control.find(".active"); b = b.find("span"); b = new jQuery.fn.jplist.controls.DropdownSortDTO(jQuery.fn.jplist.ControlFactory.getProp(b, "path"), jQuery.fn.jplist.ControlFactory.getProp(b, "type"), jQuery.fn.jplist.ControlFactory.getProp(b, "order"), a.params.dateTimeFormat, a.params.ignore); return b = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type,
                b, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
            }, g = function (a, c) { return (a = jQuery.trim(a)) ? new jQuery.fn.jplist.PathModel(a, c || "text") : null }, k = function (a, c) { a.$control.find("span").each(function () { var a, f; f = jQuery(this); var d; a = jQuery.fn.jplist.ControlFactory.getProp(f, "path"); f = jQuery.fn.jplist.ControlFactory.getProp(f, "type"); if (jQuery.isArray(a)) for (var e = 0; e < a.length; e++) d = e < f.length ? f[e] : "text", (d = g(a[e], d)) && c.push(d); else (d = g(a, f)) && c.push(d) }) }, h = function (a) {
                a.$control.find("li").off("click").on("click",
                function () { var c, b; c = d(a, !1); b = jQuery(this).find("span"); 0 < b.length && (c.data.path = jQuery.fn.jplist.ControlFactory.getProp(b, "path"), c.data.type = jQuery.fn.jplist.ControlFactory.getProp(b, "type"), c.data.order = jQuery.fn.jplist.ControlFactory.getProp(b, "order")); a.observer.trigger(a.observer.events.knownStatusesChanged, [[c]]) })
            }, e = function (a) {
                a.params = { dateTimeFormat: a.$control.attr("data-datetime-format") || "", ignore: a.$control.attr("data-ignore") || "" }; new jQuery.fn.jplist.DropdownControl(a.options, a.observer,
                a.history, a.$control); h(a); return jQuery.extend(this, a)
            }; e.prototype.getStatus = function (a) { return d(this, a) }; e.prototype.getDeepLink = function () { var a = "", c; this.inDeepLinking && (c = d(this, !1), c.data && c.data.path && c.data.type && c.data.order && (a = this.name + this.options.delimiter0 + "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order=" + c.data.path + this.options.delimiter2 + c.data.type + this.options.delimiter2 + c.data.order)); return a }; e.prototype.getStatusByDeepLink = function (a, c) {
                var b; a: {
                    b = null;
                    var f; if (this.inDeepLinking) { if ("number" !== a && a !== "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order" && "path" !== a) { b = null; break a } b = d(this, !0); b.data && a === "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order" && (f = c.split(this.options.delimiter2), 3 === f.length && (b.data.path = f[0], b.data.type = f[1], b.data.order = f[2])) }
                } return b
            }; e.prototype.getPaths = function (a) { k(this, a) }; e.prototype.setStatus = function (a, c) {
                var b, d; d = this.$control.find("li"); d.removeClass("active"); if ("default" ===
                a.data.path) b = this.$control.find('li:has([data-path="default"])'); else { b = jQuery.fn.jplist.ControlFactory.getPropPath(a.data.path, "path"); var e = jQuery.fn.jplist.ControlFactory.getPropPath(a.data.type, "type"), g = jQuery.fn.jplist.ControlFactory.getPropPath(a.data.order, "order"); b = this.$control.find("li:has(" + b + e + g + ")") } 0 >= b.length && (b = d.eq(0)); b.addClass("active"); this.$control.find(".jplist-dd-panel").text(b.eq(0).text())
            }; jQuery.fn.jplist.controls.SortDropdown = function (a) { return new e(a) }; jQuery.fn.jplist.controlTypes["sort-drop-down"] =
            { className: "SortDropdown", options: {}, dropdown: !0 }
        })(); (function () { jQuery.fn.jplist.controls.DropdownSortDTO = function (d, g, k, h, e) { return { path: d, type: g, order: k, dateTimeFormat: h, ignore: e } } })();

        /**
        * jPList - Pagination bundle
        * jPList - jQuery Data Grid Controls 5.2.0.29 - http://jplist.com 
        * Copyright 2016 Miriam Zusin
        */
        (function () {
            var e = function (e) { return jQuery.extend(this, e) }; e.prototype.setStatus = function (e, d) {
                var b, a; if (jQuery.isArray(e)) for (a = 0; a < e.length; a++) e[a].data && e[a].data.paging && (b = e[a].data.paging); else e.data && (b = e.data.paging); !b || 0 >= b.pagesNumber ? (this.$control.html(""), this.$control.addClass("jplist-empty")) : (this.$control.removeClass("jplist-empty"), a = this.$control.attr("data-type"), a = a.replace("{current}", b.currentPage + 1), a = a.replace("{pages}", b.pagesNumber), a = a.replace("{start}", b.start + 1),
                a = a.replace("{end}", b.end), a = a.replace("{all}", b.itemsNumber), this.$control.html(a))
            }; jQuery.fn.jplist.controls.PaginationInfo = function (g) { return new e(g) }; jQuery.fn.jplist.controlTypes["pagination-info"] = { className: "PaginationInfo", options: {} }
        })(); (function () {
            var e = function (b, a) {
                var f; f = null; var c; c = !1; f = b.$control.find("button[data-active]").eq(0); 0 >= f.length && (f = b.$control.find("button").eq(0)); f = a ? 0 : Number(f.attr("data-number")) || 0; (c = "true" === b.$control.attr("data-jump-to-start") || b.controlOptions.jumpToStart) && (c = b.history.getLastStatus()) && "pagination" !== c.type && "views" !== c.type && (f = 0); c = Number(b.$control.attr("data-items-per-page")) || 0; f = new jQuery.fn.jplist.controls.PaginationDTO(f, c); return f = new jQuery.fn.jplist.StatusDTO(b.name,
                b.action, b.type, f, b.inStorage, b.inAnimation, b.isAnimateToTop, b.inDeepLinking)
            }, g = function (b) { b.$control.on("click", "button", function () { var a, f = null; a = jQuery(this); var c; a = Number(a.attr("data-number")) || 0; f = e(b, !1); f.data.currentPage = a; c = b.$root.find('[data-control-type="pagination"]'); c.find("button").removeAttr("data-active"); c.find('button[data-number="' + a + '"]').each(function () { jQuery(this).attr("data-active", !0) }); b.observer.trigger(b.observer.events.knownStatusesChanged, [[f]]) }) }, d = function (b) {
                b.params =
                { view: new jQuery.fn.jplist.controls.PaginationView(b.$control, b.controlOptions) }; g(b); return jQuery.extend(this, b)
            }; d.prototype.getStatus = function (b) { return e(this, b) }; d.prototype.getDeepLink = function () {
                var b = "", a; if (this.inDeepLinking && (a = e(this, !1), a.data)) if (jQuery.isNumeric(a.data.currentPage) && (b = this.name + this.options.delimiter0 + "currentPage=" + a.data.currentPage), this.$control.attr("data-items-per-page")) b && (b += this.options.delimiter1), b += this.name + this.options.delimiter0 + "number=" + a.data.number;
                else if (jQuery.isNumeric(a.data.number) || "all" === a.data.number) b = this.name + this.options.delimiter0 + "number=" + a.data.number; return b
            }; d.prototype.getStatusByDeepLink = function (b, a) { var f; a: if (f = null, this.inDeepLinking) { if ("currentPage" !== b) { f = null; break a } f = e(this, !0); f.data && "currentPage" === b && (f.data.currentPage = a) } return f }; d.prototype.setStatus = function (b, a) {
                var f; if (jQuery.isArray(b)) for (var c = 0; c < b.length; c++) b[c].data && b[c].data.paging && (f = b[c].data.paging); else b.data && (f = b.data.paging); f &&
                this.params.view.build(f)
            }; jQuery.fn.jplist.controls.Pagination = function (b) { return new d(b) }; jQuery.fn.jplist.controlTypes.pagination = { className: "Pagination", options: {} }
        })(); (function () {
            var e = function (d, b, a, f) { var c = ""; d = d.$control.attr("data-number-title") || d.options.numberArrowTitle; for (var c = c + '<div class="jplist-pagesbox" data-type="pagesbox">', h = b; h < a; h++) c += '<button type="button" data-type="page" ', h === f && (c += ' class="jplist-current" data-active="true" '), b = h + 1, c += ' data-number="' + h + '" ', c += ' title="' + d.replace("{number}", b) + '" ', c += ">" + b + "</button> "; return c + "</div>" }, g = function (d, b) {
                var a = {
                    $control: d, options: b, $pagingprev: null, $pagingmid: null, $pagingnext: null,
                    $jplistFirst: null, $jplistPrev: null, $jplistNext: null, $jplistLast: null, mode: d.attr("data-mode")
                }, f, c, h, e, g, k, l, m; f = a.$control.attr("data-prev") || a.options.prevArrow; c = a.$control.attr("data-prev-title") || a.options.prevArrowTitle; h = a.$control.attr("data-next") || a.options.nextArrow; e = a.$control.attr("data-next-title") || a.options.nextArrowTitle; g = a.$control.attr("data-first") || a.options.firstArrow; k = a.$control.attr("data-first-title") || a.options.firstArrowTitle; l = a.$control.attr("data-last") || a.options.lastArrow;
                m = a.$control.attr("data-last-title") || a.options.lastArrowTitle; a.$control.html('<div class="jplist-pagingprev" data-type="pagingprev"></div><div class="jplist-pagingmid" data-type="pagingmid"></div><div class="jplist-pagingnext" data-type="pagingnext"></div>'); a.$pagingprev = a.$control.find('[data-type="pagingprev"]'); a.$pagingmid = a.$control.find('[data-type="pagingmid"]'); a.$pagingnext = a.$control.find('[data-type="pagingnext"]'); a.$pagingprev.html('<button type="button" class="jplist-first" data-number="0" data-type="first" title="' +
                k + '">' + g + '</button><button type="button" class="jplist-prev" data-type="prev" title="' + c + '">' + f + "</button>"); a.$pagingnext.html('<button type="button" class="jplist-next" data-type="next" title="' + e + '">' + h + '</button><button type="button" class="jplist-last" data-type="last" title="' + m + '">' + l + "</button>"); a.$jplistFirst = a.$pagingprev.find('[data-type="first"]'); a.$jplistPrev = a.$pagingprev.find('[data-type="prev"]'); a.$jplistNext = a.$pagingnext.find('[data-type="next"]'); a.$jplistLast = a.$pagingnext.find('[data-type="last"]');
                return jQuery.extend(this, a)
            }; g.prototype.build = function (d) {
                if (0 <= d.currentPage && d.currentPage < d.pagesNumber) {
                    this.$control.removeClass("jplist-hidden"); switch (this.mode) {
                        case "google-like": var b = "", a; a = Number(this.$control.attr("data-range")) || this.options.range; b = d.currentPage - Math.floor((a - 1) / 2); 0 > b && (b = 0); a = b + a; a > d.pagesNumber && (a = d.pagesNumber); b = e(this, b, a, d.currentPage); this.$pagingmid.html(b); break; default: var f; f = Number(this.$control.attr("data-range")) || this.options.range; a = Math.floor(d.currentPage /
                        f); b = f * (a + 1); b > d.pagesNumber && (b = d.pagesNumber); b = e(this, f * a, b, d.currentPage); this.$pagingmid.html(b)
                    } this.$jplistPrev.attr("data-number", d.prevPage).removeClass("jplist-current"); this.$jplistNext.attr("data-number", d.nextPage).removeClass("jplist-current"); this.$jplistLast.attr("data-number", d.pagesNumber - 1).removeClass("jplist-current"); 1 >= d.pagesNumber ? this.$control.addClass("jplist-one-page") : this.$control.removeClass("jplist-one-page")
                } else this.$control.addClass("jplist-hidden"); 0 === d.currentPage ?
                this.$pagingprev.addClass("jplist-hidden") : this.$pagingprev.removeClass("jplist-hidden"); d.currentPage == d.pagesNumber - 1 ? this.$pagingnext.addClass("jplist-hidden") : this.$pagingnext.removeClass("jplist-hidden")
            }; jQuery.fn.jplist.controls.PaginationView = function (d, b) { return new g(d, b) }; jQuery.fn.jplist.controlTypes.pagination = {
                className: "Pagination", options: {
                    range: 7, jumpToStart: !1, prevArrow: "&lsaquo;", nextArrow: "&rsaquo;", firstArrow: "&laquo;", lastArrow: "&raquo;", prevArrowTitle: "", nextArrowTitle: "", firstArrowTitle: "",
                    lastArrowTitle: "", numberArrowTitle: ""
                }
            }
        })(); (function () { jQuery.fn.jplist.controls.PaginationDTO = function (e, g) { var d = { currentPage: e, paging: null }; g && (d.number = g); return d } })(); (function () {
            var e = function (a, b) { var c = null; b ? (c = a.$control.find('li:has(span[data-default="true"])').eq(0), 0 >= c.length && (c = a.$control.find("li:eq(0)"))) : c = a.$control.find(".active"); c = c.find("span"); c = new jQuery.fn.jplist.controls.DropdownPaginationDTO(c.attr("data-number")); return c = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking) }, g = function (a, b) {
                var c, d, e; a.$control.find("span").each(function () {
                    c = jQuery(this).attr("data-path");
                    d = jQuery(this).attr("data-type"); c && "" !== jQuery.trim(c) && (e = new jQuery.fn.jplist.PathModel(c, d), b.push(e))
                })
            }, d = function (a) { a.$control.find("li").off().on("click", function () { var b, c, d, g; b = e(a, !1); g = jQuery(this).find("span"); c = g.attr("data-path"); d = g.attr("data-number"); c ? (b.data.path = c, b.data.type = g.attr("data-type"), b.data.order = g.attr("data-order")) : d && (b.data.number = d); a.observer.trigger(a.observer.events.knownStatusesChanged, [[b]]) }) }, b = function (a) {
                new jQuery.fn.jplist.DropdownControl(a.options,
                a.observer, a.history, a.$control); d(a); return jQuery.extend(this, a)
            }; b.prototype.getStatus = function (a) { return e(this, a) }; b.prototype.getDeepLink = function () { var a = "", b; this.inDeepLinking && (b = e(this, !1), b.data && (jQuery.isNumeric(b.data.number) || "all" === b.data.number) && (a = this.name + this.options.delimiter0 + "number=" + b.data.number)); return a }; b.prototype.getStatusByDeepLink = function (a, b) {
                var c; a: if (c = null, this.inDeepLinking) {
                    if ("number" !== a && a !== "path" + this.options.delimiter2 + "type" + this.options.delimiter2 +
                    "order" && "path" !== a) { c = null; break a } c = e(this, !0); c.data && "number" === a && jQuery.isNumeric(c.data.number) && (c.data.number = b)
                } return c
            }; b.prototype.getPaths = function (a) { g(this, a) }; b.prototype.setStatus = function (a, b) {
                var c, d; if (jQuery.isArray(a)) for (d = 0; d < a.length; d++) a[d].data && a[d].data.number && (c = a[d].data.number); else a.data && (c = a.data.number); if (jQuery.isNumeric(c) || "all" === c) d = this.$control.find("li"), d.removeClass("active"), c = this.$control.find('li:has([data-number="' + c + '"])'), 0 === c.length && (c =
                this.$control.find('li:has([data-number="all"])')), 0 >= c.length && (c = d.eq(0)), c.addClass("active"), this.$control.find(".jplist-dd-panel").text(c.eq(0).text())
            }; jQuery.fn.jplist.controls.ItemsPerPageDropdown = function (a) { return new b(a) }; jQuery.fn.jplist.controlTypes["items-per-page-drop-down"] = { className: "ItemsPerPageDropdown", options: {}, dropdown: !0 }
        })(); (function () {
            var e = function (a, b) { var c; c = null; b ? (c = a.$control.find('option[data-default="true"]').eq(0), 0 >= c.length && (c = a.$control.find("option").eq(0))) : c = a.$control.find("option:selected"); c = new jQuery.fn.jplist.controls.DropdownPaginationDTO(c.attr("data-number")); return c = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking) }, g = function (a, b) {
                var c, d, e; a.$control.find("option").each(function () {
                    c = jQuery(this).attr("data-path"); d = jQuery(this).attr("data-type");
                    c && (e = new jQuery.fn.jplist.PathModel(c, d), b.push(e))
                })
            }, d = function (a) { a.$control.change(function () { var b, c, d; b = e(a, !1); c = jQuery(this).find("option:selected"); d = c.attr("data-path"); c = c.attr("data-number"); d ? (b.data.path = d, b.data.type = jQuery(this).attr("data-type"), b.data.order = jQuery(this).attr("data-order")) : c && (b.data.number = c); a.observer.trigger(a.observer.events.knownStatusesChanged, [[b]]) }) }, b = function (a) { d(a); return jQuery.extend(this, a) }; b.prototype.getStatus = function (a) { return e(this, a) }; b.prototype.getDeepLink =
            function () { var a = "", b; this.inDeepLinking && (b = e(this, !1), b.data && (jQuery.isNumeric(b.data.number) || "all" === b.data.number) && (a = this.name + this.options.delimiter0 + "number=" + b.data.number)); return a }; b.prototype.getStatusByDeepLink = function (a, b) { var c = null; this.inDeepLinking && (c = e(this, !0), c.data && "number" === a && jQuery.isNumeric(c.data.number) && (c.data.number = b)); return c }; b.prototype.getPaths = function (a) { g(this, a) }; b.prototype.setStatus = function (a, b) {
                var c; if (jQuery.isArray(a)) for (var d = 0; d < a.length; d++) a[d].data &&
                a[d].data.number && (c = a[d].data.number); else a.data && (c = a.data.number); if (jQuery.isNumeric(c) || "all" === c) c = this.$control.find('option[data-number="' + c + '"]'), 0 === c.length && (c = this.$control.find('option[data-number="all"]')), c.get(0).selected = !0
            }; jQuery.fn.jplist.controls.ItemsPerPageSelect = function (a) { return new b(a) }; jQuery.fn.jplist.controlTypes["items-per-page-select"] = { className: "ItemsPerPageSelect", options: {} }
        })(); (function () { jQuery.fn.jplist.controls.DropdownPaginationDTO = function (e) { return { number: e } } })();

        /**
        * jPList - Filter drop-down bundle
        * jPList - jQuery Data Grid Controls 5.2.0.7 - http://jplist.com 
        * Copyright 2016 Miriam Zusin
        */
        (function () {
            var e = function (a, b) { var d = null; b ? (d = a.$control.find('li:has(span[data-default="true"])').eq(0), 0 >= d.length && (d = a.$control.find("li:eq(0)"))) : d = a.$control.find(".active"); d = d.find("span"); d = new jQuery.fn.jplist.controls.DropdownFilterDTO(d.attr("data-path"), d.attr("data-type")); return d = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, d, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking) }, g = function (a, b) {
                var d, c, e; a.$control.find("span").each(function () {
                    d = jQuery(this).attr("data-path");
                    c = jQuery(this).attr("data-type"); d && "" !== jQuery.trim(d) && (e = new jQuery.fn.jplist.PathModel(d, c), b.push(e))
                })
            }, h = function (a, b) { var d; d = a.$control.find("li"); d.removeClass("active"); if (!b || 0 >= b.length) b = d.eq(0); 0 < b.length && (b.addClass("active"), a.$control.find(".jplist-dd-panel").text(b.eq(0).text())) }, f = function (a) { a.$control.find("li").off("click").on("click", function () { var b; b = jQuery(this); h(a, b); b = e(a, !1); a.observer.trigger(a.observer.events.knownStatusesChanged, [[b]]) }) }, c = function (a) {
                new jQuery.fn.jplist.DropdownControl(a.options,
                a.observer, a.history, a.$control); f(a); return jQuery.extend(this, a)
            }; c.prototype.getStatus = function (a) { return e(this, a) }; c.prototype.getDeepLink = function () { var a = "", b; this.inDeepLinking && (b = e(this, !1), b.data && b.data.path && (a = this.name + this.options.delimiter0 + "path=" + b.data.path)); return a }; c.prototype.getStatusByDeepLink = function (a, b) {
                var d; a: if (d = null, this.inDeepLinking) {
                    if ("number" !== a && a !== "path" + this.options.delimiter2 + "type" + this.options.delimiter2 + "order" && "path" !== a) { d = null; break a } d = e(this,
                    !0); d.data && "path" === a && d.data.path && (d.data.path = b)
                } return d
            }; c.prototype.getPaths = function (a) { g(this, a) }; c.prototype.setStatus = function (a, b) { var d; a && a.data && (d = this.$control.find('[data-path="' + a.data.path + '"]')) && 0 < d.length && h(this, d.parent("li")) }; c.prototype.setByDeepLink = function (a) { var b; if (a) for (var d = 0; d < a.length; d++) b = a[d], b.controlName === this.name && "path" === b.propName && b.propValue && this.$control.find('[data-path="' + b.propValue + '"]').trigger("click") }; jQuery.fn.jplist.controls.FilterDropdown =
            function (a) { return new c(a) }; jQuery.fn.jplist.controlTypes["filter-drop-down"] = { className: "FilterDropdown", options: {}, dropdown: !0 }
        })(); (function () {
            var e = function (c, a) { var b; b = null; a ? (b = c.$control.find('option[data-default="true"]').eq(0), 0 >= b.length && (b = c.$control.find("option").eq(0))) : b = c.$control.find("option:selected"); b = new jQuery.fn.jplist.controls.DropdownFilterDTO(b.attr("data-path"), b.attr("data-type")); return b = new jQuery.fn.jplist.StatusDTO(c.name, c.action, c.type, b, c.inStorage, c.inAnimation, c.isAnimateToTop, c.inDeepLinking) }, g = function (c, a) {
                var b, d, e; c.$control.find("option").each(function () {
                    b = jQuery(this).attr("data-path");
                    d = jQuery(this).attr("data-type"); b && (e = new jQuery.fn.jplist.PathModel(b, d), a.push(e))
                })
            }, h = function (c) { c.$control.change(function () { var a, b, d; a = e(c, !1); b = jQuery(this).find("option:selected"); d = b.attr("data-path"); b = b.attr("data-number"); d ? (a.data.path = d, a.data.type = jQuery(this).attr("data-type"), a.data.order = jQuery(this).attr("data-order")) : b && (a.data.number = b); c.observer.trigger(c.observer.events.knownStatusesChanged, [[a]]) }) }, f = function (c) { h(c); return jQuery.extend(this, c) }; f.prototype.getStatus =
            function (c) { return e(this, c) }; f.prototype.getDeepLink = function () { var c = "", a; this.inDeepLinking && (a = e(this, !1), a.data && a.data.path && (c = this.name + this.options.delimiter0 + "path=" + a.data.path)); return c }; f.prototype.getStatusByDeepLink = function (c, a) { var b = null; this.inDeepLinking && (b = e(this, !0), b.data && "path" === c && b.data.path && (b.data.path = a)); return b }; f.prototype.getPaths = function (c) { g(this, c) }; f.prototype.setStatus = function (c, a) {
                var b; (b = this.$control.find('option[data-path="' + c.data.path + '"]')) && 0 <
                b.length && (b.get(0).selected = !0)
            }; jQuery.fn.jplist.controls.FilterSelect = function (c) { return new f(c) }; jQuery.fn.jplist.controlTypes["filter-select"] = { className: "FilterSelect", options: {} }
        })(); (function () {
            var e = function (a, b) { var d; d = b.find("option[checked]"); 0 >= d.length && (d = b.find("option").eq(0)); return d }, g = function (a) { a.params.$dropdowns.each(function () { var b = jQuery(this), b = e(a, b); 0 <= b.length && b.prop("selected", !0) }) }, h = function (a, b) {
                var d = [], c; c = null; a.params.$dropdowns.each(function () { var c = jQuery(this), f = ""; b ? (c = e(a, c), 0 < c.length && (f = c.attr("value"))) : f = c.val(); f && d.push(f) }); c = new jQuery.fn.jplist.controls.TextFilterDropdownGroupDTO(d, a.params.mode, a.params.dataPath, a.params.ignoreRegex);
                return c = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, c, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
            }, f = function (a) { a.params.$dropdowns.on("change", function () { a.observer.trigger(a.observer.events.unknownStatusesChanged, [!1]) }) }, c = function (a) { a.params = { $dropdowns: a.$control.find("select"), mode: a.$control.attr("data-mode") || "and", dataPath: a.$control.attr("data-path") || "", ignoreRegex: a.$control.attr("data-ignore-regex") || "" }; g(a); f(a); return jQuery.extend(this, a) }; c.prototype.getPaths =
            function (a) { var b; this.params.dataPath && (b = new jQuery.fn.jplist.PathModel(this.params.dataPath, "text"), a.push(b)) }; c.prototype.getStatus = function (a) { return h(this, a) }; c.prototype.setStatus = function (a, b) { var d; g(this); if (a.data && a.data.textGroup && jQuery.isArray(a.data.textGroup) && 0 < a.data.textGroup.length) for (var c = 0; c < a.data.textGroup.length; c++) d = a.data.textGroup[c], d = this.params.$dropdowns.find('option[value="' + d + '"]'), 0 < d.length && d.prop("selected", !0) }; c.prototype.getDeepLink = function () {
                var a =
                "", b, d = ""; if (this.inDeepLinking && (b = h(this, !1), b.data && jQuery.isArray(b.data.textGroup) && 0 < b.data.textGroup.length)) { for (a = 0; a < b.data.textGroup.length; a++) "" !== d && (d += this.options.delimiter2), d += b.data.textGroup[a]; a = this.name + this.options.delimiter0 + "textGroup=" + d } return a
            }; c.prototype.getStatusByDeepLink = function (a, b) { var d = null, c; this.inDeepLinking && (d = h(this, !0), d.data && "textGroup" === a && (c = b.split(this.options.delimiter2), 0 < c.length && (d.data.textGroup = c))); return d }; jQuery.fn.jplist.controls.FilterDropdownGroupSelectText =
            function (a) { return new c(a) }; jQuery.fn.jplist.controlTypes["dropdown-select-group-text-fitler"] = { className: "FilterDropdownGroupSelectText", options: {}, dropdown: !0 }
        })(); (function () { jQuery.fn.jplist.controls.DropdownFilterDTO = function (e, g) { return { path: e, type: g, filterType: "path" } } })(); (function () { jQuery.fn.jplist.controls.TextFilterDropdownGroupDTO = function (e, g, h, f) { return { textGroup: e, logic: g, path: h, ignoreRegex: f, filterType: "textGroup" } } })();

        /**
        jPList - jquery UI bundle
        * jPList - jQuery Data Grid Controls 5.2.0.11 - http://jplist.com 
        * Copyright 2016 Miriam Zusin
        */
        (function () { jQuery.fn.jplist.controls.DatePickerRangeFilterDTO = function (e, g, h, f) { e = { path: e, format: g, filterType: "dateRange", prev_year: "", prev_month: "", prev_day: "", next_year: "", next_month: "", next_day: "" }; h && (e.prev_year = h.getFullYear(), e.prev_month = h.getMonth(), e.prev_day = h.getDate()); f && (e.next_year = f.getFullYear(), e.next_month = f.getMonth(), e.next_day = f.getDate()); return e } })(); (function () {
            var e = function (c) {
                var a = {}; c.params.$prev.off("change").change(function () { var a; "" === jQuery.trim(jQuery(this).val()) && (a = g(c, !1), c.observer.trigger(c.observer.events.knownStatusesChanged, [[a]])) }); c.params.$next.off("change").change(function () { var a; "" === jQuery.trim(jQuery(this).val()) && (a = g(c, !1), c.observer.trigger(c.observer.events.knownStatusesChanged, [[a]])) }); a.onSelect = function (a, b) { var d = g(c, !1); c.observer.trigger(c.observer.events.knownStatusesChanged, [[d]]) }; c.params.datepickerFunc(c.params.$prev,
                a); c.params.datepickerFunc(c.params.$next, a); (a = c.params.$prev.attr("value")) && c.params.$prev.datepicker("setDate", a); (a = c.params.$next.attr("value")) && c.params.$next.datepicker("setDate", a)
            }, g = function (c, a) {
                var b = null, d = b = b = null, e; e = c.$control.attr("data-path").toString(); a ? (b = c.params.defaultPrev, d = c.params.defaultNext) : (b = c.params.$prev.datepicker("getDate"), d = c.params.$next.datepicker("getDate")); b = new jQuery.fn.jplist.controls.DatePickerRangeFilterDTO(e, c.params.dateTimeFormat, b, d); return b =
                new jQuery.fn.jplist.StatusDTO(c.name, c.action, c.type, b, c.inStorage, c.inAnimation, c.isAnimateToTop, c.inDeepLinking)
            }, h = function (c, a, b) { c = b.split(c.options.delimiter2); 3 === c.length && (a.data.prev_year = c[0], a.data.prev_month = c[1], a.data.prev_day = c[2]) }, f = function (a, b, d) { a = d.split(a.options.delimiter2); 3 === a.length && (b.data.next_year = a[0], b.data.next_month = a[1], b.data.next_day = a[2]) }, a = function (a) {
                var b = a.$control.attr("data-datepicker-func"); jQuery.isFunction(jQuery.fn.jplist.settings[b]) && (a.params.datepickerFunc =
                jQuery.fn.jplist.settings[b])
            }, d = function (a, b) { var d = null; b && (d = "today" === b ? new Date : jQuery.fn.jplist.HelperService.formatDateTime(b, a.params.dateTimeFormat)); return d }, b = function (c) {
                c.params = { datepickerFunc: function () { }, $prev: c.$control.find('[data-type="prev"]'), $next: c.$control.find('[data-type="next"]'), dateTimeFormat: c.$control.attr("data-datetime-format").toString() }; c.params.defaultPrev = c.params.$prev.datepicker("getDate"); c.params.defaultPrev || (c.params.defaultPrev = d(c, c.params.$prev.attr("value")));
                c.params.defaultNext = c.params.$next.datepicker("getDate"); c.params.defaultNext || (c.params.defaultNext = d(c, c.params.$next.attr("value"))); a(c); e(c); return jQuery.extend(this, c)
            }; b.prototype.getStatus = function (a) { return g(this, a) }; b.prototype.getDeepLink = function () {
                var a = "", b, d, e; this.inDeepLinking && (b = g(this, !1), b.data && (d = jQuery.isNumeric(b.data.prev_year) && jQuery.isNumeric(b.data.prev_month) && jQuery.isNumeric(b.data.prev_day), e = jQuery.isNumeric(b.data.next_year) && jQuery.isNumeric(b.data.next_month) &&
                jQuery.isNumeric(b.data.next_day), d || e)) && (a += this.name + this.options.delimiter0, d && (a += "prev"), e && (d && (a += this.options.delimiter2), a += "next"), a += "=", d && (a += b.data.prev_year + this.options.delimiter2 + b.data.prev_month + this.options.delimiter2 + b.data.prev_day), e && (d && (a += this.options.delimiter3), a += b.data.next_year + this.options.delimiter2 + b.data.next_month + this.options.delimiter2 + b.data.next_day)); return a
            }; b.prototype.getStatusByDeepLink = function (a, b) {
                var d = null, e; if (this.inDeepLinking && (d = g(this, !0),
                delete d.data.next_year, delete d.data.next_month, delete d.data.next_day, delete d.data.prev_year, delete d.data.prev_month, delete d.data.prev_day, d.data)) switch (a) { case "prev": h(this, d, b); break; case "next": f(this, d, b); break; case "prev~next": e = b.split(this.options.delimiter3), 2 === e.length && (h(this, d, e[0]), f(this, d, e[1])) } return d
            }; b.prototype.getPaths = function (a) { var b; if (b = this.$control.attr("data-path").toString()) b = new jQuery.fn.jplist.PathModel(b, "datetime"), a.push(b) }; b.prototype.setStatus = function (a,
            b) { var d; jQuery.isNumeric(a.data.prev_year) && jQuery.isNumeric(a.data.prev_month) && jQuery.isNumeric(a.data.prev_day) ? (d = new Date(a.data.prev_year, a.data.prev_month, a.data.prev_day), this.params.$prev.datepicker("setDate", d)) : this.params.$prev.val(""); jQuery.isNumeric(a.data.next_year) && jQuery.isNumeric(a.data.next_month) && jQuery.isNumeric(a.data.next_day) ? (d = new Date(a.data.next_year, a.data.next_month, a.data.next_day), this.params.$next.datepicker("setDate", d)) : this.params.$next.val("") }; jQuery.fn.jplist.controls.DatePickerRangeFilter =
            function (a) { return new b(a) }; jQuery.fn.jplist.controlTypes["date-picker-range-filter"] = { className: "DatePickerRangeFilter", options: {} }
        })(); (function () { jQuery.fn.jplist.controls.DatePickerFilterDTO = function (e, g, h) { e = { path: e, format: g, filterType: "date", year: "", month: "", day: "" }; h && (e.year = h.getFullYear(), e.month = h.getMonth(), e.day = h.getDate()); return e } })(); (function () {
            var e = function (a) { var d = {}; a.$control.off("change").on("change", function () { var b; "" === jQuery.trim(jQuery(this).val()) && (b = g(a, !1), a.observer.trigger(a.observer.events.knownStatusesChanged, [[b]])) }); d.onSelect = function (b, c) { a.observer.trigger(a.observer.events.knownStatusesChanged, [[g(a, !1)]]) }; a.params.datepickerFunc(a.$control, d) }, g = function (a, d) {
                var b = null, b = b = null; d || (b = a.$control.datepicker("getDate")); b = new jQuery.fn.jplist.controls.DatePickerFilterDTO(a.params.dataPath, a.params.dateTimeFormat,
                b); return b = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, b, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking)
            }, h = function (a) { var d = a.$control.attr("data-datepicker-func"); jQuery.isFunction(jQuery.fn.jplist.settings[d]) && (a.params.datepickerFunc = jQuery.fn.jplist.settings[d]) }, f = function (a) { a.params = { datepickerFunc: function () { }, dataPath: a.$control.attr("data-path"), dateTimeFormat: a.$control.attr("data-datetime-format") }; h(a); e(a); return jQuery.extend(this, a) }; f.prototype.getStatus =
            function (a) { return g(this, a) }; f.prototype.getDeepLink = function () { var a = "", d; this.inDeepLinking && (d = g(this, !1), d.data && jQuery.isNumeric(d.data.year) && jQuery.isNumeric(d.data.month) && jQuery.isNumeric(d.data.day) && (a += this.name + this.options.delimiter0 + "date=" + d.data.year + this.options.delimiter2 + d.data.month + this.options.delimiter2 + d.data.day)); return a }; f.prototype.getStatusByDeepLink = function (a, d) {
                var b = null, c; this.inDeepLinking && (b = g(this, !0), b.data && "date" === a && (c = d.split(this.options.delimiter2),
                3 === c.length && (b.data.year = c[0], b.data.month = c[1], b.data.day = c[2]))); return b
            }; f.prototype.getPaths = function (a) { var d; this.params.dataPath && (d = new jQuery.fn.jplist.PathModel(this.params.dataPath, "datetime"), a.push(d)) }; f.prototype.setStatus = function (a, d) { var b; jQuery.isNumeric(a.data.year) && jQuery.isNumeric(a.data.month) && jQuery.isNumeric(a.data.day) ? (b = new Date(a.data.year, a.data.month, a.data.day), this.$control.datepicker("setDate", b)) : this.$control.val("") }; jQuery.fn.jplist.controls.DatePickerFilter =
            function (a) { return new f(a) }; jQuery.fn.jplist.controlTypes["date-picker-filter"] = { className: "DatePickerFilter", options: {} }
        })(); (function () { jQuery.fn.jplist.controls.RangeSliderDTO = function (e, g, h, f, a) { return { path: e, type: "number", filterType: "range", min: g, max: h, prev: f, next: a } } })(); (function () {
            var e = function (a, d) { var b = null, c, e, f, b = a.params.$uiSlider.slider("option", "min"); c = a.params.$uiSlider.slider("option", "max"); d ? (e = a.params.defaultPrev, f = a.params.defaultNext) : (e = a.params.$uiSlider.slider("values", 0), f = a.params.$uiSlider.slider("values", 1)); b = new jQuery.fn.jplist.controls.RangeSliderDTO(a.params.dataPath, b, c, e, f); return b = new jQuery.fn.jplist.StatusDTO(a.name, a.action, a.type, b, a.inStorage, a.inAnimation, a.isAnimateToTop, a.inDeepLinking) }, g = function (a) {
                a.params.$uiSlider.on("slidechange",
                function (d, b) { var c = e(a, !1); a.observer.trigger(a.observer.events.knownStatusesChanged, [[c]]) })
            }, h = function (a) { var d = a.$control.attr("data-slider-func"), b = a.$control.attr("data-setvalues-func"); jQuery.isFunction(jQuery.fn.jplist.settings[d]) && (a.params.uiSliderFunc = jQuery.fn.jplist.settings[d]); jQuery.isFunction(jQuery.fn.jplist.settings[b]) && (a.params.uiSetValuesFunc = jQuery.fn.jplist.settings[b]) }, f = function (a) {
                a.params = {
                    $uiSlider: a.$control.find('[data-type="ui-slider"]'), $prev: a.$control.find('[data-type="prev-value"]'),
                    $next: a.$control.find('[data-type="next-value"]'), uiSliderFunc: function (a, b, c) { }, uiSetValuesFunc: function (a, b, c) { }, controlOptions: a.controlOptions, dataPath: a.$control.attr("data-path")
                }; h(a); a.params.uiSliderFunc(a.params.$uiSlider, a.params.$prev, a.params.$next); a.params.uiSetValuesFunc(a.params.$uiSlider, a.params.$prev, a.params.$next); a.params.defaultPrev = a.params.$uiSlider.slider("values", 0); a.params.defaultNext = a.params.$uiSlider.slider("values", 1); g(a); return jQuery.extend(this, a)
            }; f.prototype.getStatus =
            function (a) { return e(this, a) }; f.prototype.getDeepLink = function () { var a = "", d; this.inDeepLinking && (d = e(this, !1), d.data && jQuery.isNumeric(d.data.prev) && jQuery.isNumeric(d.data.next) && (a = this.name + this.options.delimiter0 + "prev" + this.options.delimiter2 + "next=" + d.data.prev + this.options.delimiter2 + d.data.next)); return a }; f.prototype.getStatusByDeepLink = function (a, d) {
                var b = null, c; this.inDeepLinking && (b = e(this, !0), b.data && a === "prev" + this.options.delimiter2 + "next" && (c = d.split(this.options.delimiter2), 2 === c.length &&
                (b.data.prev = c[0], b.data.next = c[1]))); return b
            }; f.prototype.getPaths = function (a) { var d; this.params.dataPath && (d = new jQuery.fn.jplist.PathModel(this.params.dataPath, "number"), a.push(d)) }; f.prototype.setStatus = function (a, d) {
                var b, c; jQuery.isNumeric(a.data.prev) && jQuery.isNumeric(a.data.next) && (b = Number(a.data.prev), c = Number(a.data.next), isNaN(b) || isNaN(c) || (this.params.$uiSlider.slider("values", 0) != b && this.params.$uiSlider.slider("values", 0, b), this.params.$uiSlider.slider("values", 1) != c && this.params.$uiSlider.slider("values",
                1, c))); this.params.controlOptions && this.params.uiSetValuesFunc(this.params.$uiSlider, this.params.$prev, this.params.$next)
            }; jQuery.fn.jplist.controls.RangeSlider = function (a) { return new f(a) }; jQuery.fn.jplist.controlTypes["range-slider"] = { className: "RangeSlider", options: {} }
        })();

        /**
        * JPList history-bundle
        * jPList - jQuery Data Grid Controls 5.2.0.6 - http://jplist.com 
        * Copyright 2016 Miriam Zusin
        */
        (function () {
            var c = function (a) { !a.history.statusesQueue || 0 >= a.history.statusesQueue.length ? a.$control.addClass("jplist-disabled") : a.$control.removeClass("jplist-disabled") }, d = function (a) {
                a.observer.on(a.observer.events.unknownStatusesChanged, function () { c(a) }); a.observer.on(a.observer.events.knownStatusesChanged, function () { c(a) }); a.$control.on("click", function () {
                    var b; a.history.popList(); b = a.history.getLastList() || []; a.observer.one(a.observer.events.statusesAppliedToList, function () { a.history.popList() });
                    b ? a.observer.trigger(a.observer.events.knownStatusesChanged, [b]) : a.observer.trigger(a.observer.events.unknownStatusesChanged, [!0]); c(a)
                })
            }, b = function (a) { c(a); d(a); return jQuery.extend(this, a) }; jQuery.fn.jplist.controls.BackButton = function (a) { return new b(a) }; jQuery.fn.jplist.controlTypes["back-button"] = { className: "BackButton", options: {} }
        })(); (function () { var c = function (b) { b.$control.on("click", function () { b.observer.trigger(b.observer.events.unknownStatusesChanged, [!0]) }) }, d = function (b) { c(b); return jQuery.extend(this, b) }; jQuery.fn.jplist.controls.Reset = function (b) { return new d(b) }; jQuery.fn.jplist.controlTypes.reset = { className: "Reset", options: {} } })();


        /////////////////////
        jQuery.fn.jplist.settings = {
           
            /**
            * LIKES: jquery ui range slider
            */
            likesSlider: function ($slider, $prev, $next) {
                $slider.slider({
                    min: 0
                   , max: 360
                   , range: true
                   , values: [0, 360]
                   , slide: function (event, ui) {
                       $prev.text(ui.values[0] + ' min');
                       $next.text(ui.values[1] + ' min');                      
                   }
                });
            }

            /**
            * LIKES: jquery ui set values
            */
          , likesValues: function ($slider, $prev, $next) {
              $prev.text($slider.slider('values', 0) + ' min');
              $next.text($slider.slider('values', 1) + ' min');              
          },
            /**
            * Kostnad: jquery ui range slider
            */
          kostnadSlider: function ($slider, $prev, $next) {
              $slider.slider({
                  min: 0
                 , max: 50000
                 , range: true
                 , values: [0, 50000]
                 , slide: function (event, ui) {
                     $prev.text(ui.values[0] + ' kr');
                     $next.text(ui.values[1] + ' kr');                     
                 }
              });
          }

            /**
            * LIKES: jquery ui set values
            */
          , kostnadValues: function ($slider, $prev, $next) {
              $prev.text($slider.slider('values', 0) + ' kr');
              $next.text($slider.slider('values', 1) + ' kr');             
          }
        };
       
    } //module.export.init STOPP
}

