/*!
 * @license
 * TradingView Lightweight Charts™ v5.0.7
 * Copyright (c) 2025 TradingView, Inc.
 * Licensed under Apache License 2.0 https://www.apache.org/licenses/LICENSE-2.0
 */
! function() {
    "use strict";
    const t = {
        title: "",
        visible: !0,
        lastValueVisible: !0,
        priceLineVisible: !0,
        priceLineSource: 0,
        priceLineWidth: 1,
        priceLineColor: "",
        priceLineStyle: 2,
        baseLineVisible: !0,
        baseLineWidth: 1,
        baseLineColor: "#B2B5BE",
        baseLineStyle: 0,
        priceFormat: {
            type: "price",
            precision: 2,
            minMove: .01
        }
    };
    var i, s;

    function n(t, i) {
        const s = {
            0: [],
            1: [t.lineWidth, t.lineWidth],
            2: [2 * t.lineWidth, 2 * t.lineWidth],
            3: [6 * t.lineWidth, 6 * t.lineWidth],
            4: [t.lineWidth, 4 * t.lineWidth]
        } [i];
        t.setLineDash(s)
    }

    function e(t, i, s, n) {
        t.beginPath();
        const e = t.lineWidth % 2 ? .5 : 0;
        t.moveTo(s, i + e), t.lineTo(n, i + e), t.stroke()
    }

    function r(t, i) {
        if (!t) throw new Error("Assertion failed" + (i ? ": " + i : ""))
    }

    function h(t) {
        if (void 0 === t) throw new Error("Value is undefined");
        return t
    }

    function a(t) {
        if (null === t) throw new Error("Value is null");
        return t
    }

    function l(t) {
        return a(h(t))
    }! function(t) {
        t[t.Simple = 0] = "Simple", t[t.WithSteps = 1] = "WithSteps", t[t.Curved = 2] = "Curved"
    }(i || (i = {})),
    function(t) {
        t[t.Solid = 0] = "Solid", t[t.Dotted = 1] = "Dotted", t[t.Dashed = 2] = "Dashed", t[t.LargeDashed = 3] = "LargeDashed", t[t.SparseDotted = 4] = "SparseDotted"
    }(s || (s = {}));
    class o {
        constructor() {
            this.t = []
        }
        i(t, i, s) {
            const n = {
                h: t,
                l: i,
                o: !0 === s
            };
            this.t.push(n)
        }
        _(t) {
            const i = this.t.findIndex((i => t === i.h));
            i > -1 && this.t.splice(i, 1)
        }
        u(t) {
            this.t = this.t.filter((i => i.l !== t))
        }
        p(t, i, s) {
            const n = [...this.t];
            this.t = this.t.filter((t => !t.o)), n.forEach((n => n.h(t, i, s)))
        }
        v() {
            return this.t.length > 0
        }
        m() {
            this.t = []
        }
    }

    function _(t, ...i) {
        for (const s of i)
            for (const i in s) void 0 !== s[i] && Object.prototype.hasOwnProperty.call(s, i) && !["__proto__", "constructor", "prototype"].includes(i) && ("object" != typeof s[i] || void 0 === t[i] || Array.isArray(s[i]) ? t[i] = s[i] : _(t[i], s[i]));
        return t
    }

    function u(t) {
        return "number" == typeof t && isFinite(t)
    }

    function c(t) {
        return "number" == typeof t && t % 1 == 0
    }

    function d(t) {
        return "string" == typeof t
    }

    function f(t) {
        return "boolean" == typeof t
    }

    function p(t) {
        const i = t;
        if (!i || "object" != typeof i) return i;
        let s, n, e;
        for (n in s = Array.isArray(i) ? [] : {}, i) i.hasOwnProperty(n) && (e = i[n], s[n] = e && "object" == typeof e ? p(e) : e);
        return s
    }

    function v(t) {
        return null !== t
    }

    function m(t) {
        return null === t ? void 0 : t
    }
    const w = "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif";

    function g(t, i, s) {
        return void 0 === i && (i = w), `${s = void 0 !== s ? `${s} ` : ""}${t}px ${i}`
    }
    class M {
        constructor(t) {
            this.M = {
                S: 1,
                C: 5,
                P: NaN,
                k: "",
                T: "",
                R: "",
                D: "",
                V: 0,
                B: 0,
                I: 0,
                A: 0,
                O: 0
            }, this.L = t
        }
        N() {
            const t = this.M,
                i = this.W(),
                s = this.F();
            return t.P === i && t.T === s || (t.P = i, t.T = s, t.k = g(i, s), t.A = 2.5 / 12 * i, t.V = t.A, t.B = i / 12 * t.C, t.I = i / 12 * t.C, t.O = 0), t.R = this.H(), t.D = this.U(), this.M
        }
        H() {
            return this.L.N().layout.textColor
        }
        U() {
            return this.L.$()
        }
        W() {
            return this.L.N().layout.fontSize
        }
        F() {
            return this.L.N().layout.fontFamily
        }
    }

    function b(t) {
        return t < 0 ? 0 : t > 255 ? 255 : Math.round(t) || 0
    }

    function x(t) {
        return .199 * t[0] + .687 * t[1] + .114 * t[2]
    }
    class S {
        constructor(t, i) {
            this.j = new Map, this.q = t, i && (this.j = i)
        }
        Y(t, i) {
            if ("transparent" === t) return t;
            const s = this.K(t),
                n = s[3];
            return `rgba(${s[0]}, ${s[1]}, ${s[2]}, ${i * n})`
        }
        X(t) {
            const i = this.K(t);
            return {
                Z: `rgb(${i[0]}, ${i[1]}, ${i[2]})`,
                G: x(i) > 160 ? "black" : "white"
            }
        }
        J(t) {
            return x(this.K(t))
        }
        tt(t, i, s) {
            const [n, e, r, h] = this.K(t), [a, l, o, _] = this.K(i), u = [b(n + s * (a - n)), b(e + s * (l - e)), b(r + s * (o - r)), (c = h + s * (_ - h), c <= 0 || c > 1 ? Math.min(Math.max(c, 0), 1) : Math.round(1e4 * c) / 1e4)];
            var c;
            return `rgba(${u[0]}, ${u[1]}, ${u[2]}, ${u[3]})`
        }
        K(t) {
            const i = this.j.get(t);
            if (i) return i;
            const s = function(t) {
                    const i = document.createElement("div");
                    i.style.display = "none", document.body.appendChild(i), i.style.color = t;
                    const s = window.getComputedStyle(i).color;
                    return document.body.removeChild(i), s
                }(t),
                n = s.match(/^rgba?\s*\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)$/);
            if (!n) {
                if (this.q.length)
                    for (const i of this.q) {
                        const s = i(t);
                        if (s) return this.j.set(t, s), s
                    }
                throw new Error(`Failed to parse color: ${t}`)
            }
            const e = [parseInt(n[1], 10), parseInt(n[2], 10), parseInt(n[3], 10), n[4] ? parseFloat(n[4]) : 1];
            return this.j.set(t, e), e
        }
    }
    class C {
        constructor() {
            this.it = []
        }
        st(t) {
            this.it = t
        }
        nt(t, i, s) {
            this.it.forEach((n => {
                n.nt(t, i, s)
            }))
        }
    }
    class y {
        nt(t, i, s) {
            t.useBitmapCoordinateSpace((t => this.et(t, i, s)))
        }
    }
    class P extends y {
        constructor() {
            super(...arguments), this.rt = null
        }
        ht(t) {
            this.rt = t
        }
        et({
            context: t,
            horizontalPixelRatio: i,
            verticalPixelRatio: s
        }) {
            if (null === this.rt || null === this.rt.lt) return;
            const n = this.rt.lt,
                e = this.rt,
                r = Math.max(1, Math.floor(i)) % 2 / 2,
                h = h => {
                    t.beginPath();
                    for (let a = n.to - 1; a >= n.from; --a) {
                        const n = e.ot[a],
                            l = Math.round(n._t * i) + r,
                            o = n.ut * s,
                            _ = h * s + r;
                        t.moveTo(l, o), t.arc(l, o, _, 0, 2 * Math.PI)
                    }
                    t.fill()
                };
            e.ct > 0 && (t.fillStyle = e.dt, h(e.ft + e.ct)), t.fillStyle = e.vt, h(e.ft)
        }
    }

    function k() {
        return {
            ot: [{
                _t: 0,
                ut: 0,
                wt: 0,
                gt: 0
            }],
            vt: "",
            dt: "",
            ft: 0,
            ct: 0,
            lt: null
        }
    }
    const T = {
        from: 0,
        to: 1
    };
    class R {
        constructor(t, i, s) {
            this.Mt = new C, this.bt = [], this.xt = [], this.St = !0, this.L = t, this.Ct = i, this.yt = s, this.Mt.st(this.bt)
        }
        Pt(t) {
            this.kt(), this.St = !0
        }
        Tt() {
            return this.St && (this.Rt(), this.St = !1), this.Mt
        }
        kt() {
            const t = this.yt.Dt();
            t.length !== this.bt.length && (this.xt = t.map(k), this.bt = this.xt.map((t => {
                const i = new P;
                return i.ht(t), i
            })), this.Mt.st(this.bt))
        }
        Rt() {
            const t = 2 === this.Ct.N().mode || !this.Ct.Et(),
                i = this.yt.Vt(),
                s = this.Ct.Bt(),
                n = this.L.It();
            this.kt(), i.forEach(((i, e) => {
                const r = this.xt[e],
                    h = i.At(s),
                    a = i.zt();
                !t && null !== h && i.Et() && null !== a ? (r.vt = h.Ot, r.ft = h.ft, r.ct = h.Lt, r.ot[0].gt = h.gt, r.ot[0].ut = i.Wt().Nt(h.gt, a.Ft), r.dt = h.Ht ?? this.L.Ut(r.ot[0].ut / i.Wt().$t()), r.ot[0].wt = s, r.ot[0]._t = n.jt(s), r.lt = T) : r.lt = null
            }))
        }
    }
    class D extends y {
        constructor(t) {
            super(), this.qt = t
        }
        et({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: r
        }) {
            if (null === this.qt) return;
            const h = this.qt.Yt.Et,
                a = this.qt.Kt.Et;
            if (!h && !a) return;
            const l = Math.round(this.qt._t * s),
                o = Math.round(this.qt.ut * r);
            t.lineCap = "butt", h && l >= 0 && (t.lineWidth = Math.floor(this.qt.Yt.ct * s), t.strokeStyle = this.qt.Yt.R, t.fillStyle = this.qt.Yt.R, n(t, this.qt.Yt.Xt), function(t, i, s, n) {
                t.beginPath();
                const e = t.lineWidth % 2 ? .5 : 0;
                t.moveTo(i + e, s), t.lineTo(i + e, n), t.stroke()
            }(t, l, 0, i.height)), a && o >= 0 && (t.lineWidth = Math.floor(this.qt.Kt.ct * r), t.strokeStyle = this.qt.Kt.R, t.fillStyle = this.qt.Kt.R, n(t, this.qt.Kt.Xt), e(t, o, 0, i.width))
        }
    }
    class E {
        constructor(t, i) {
            this.St = !0, this.Zt = {
                Yt: {
                    ct: 1,
                    Xt: 0,
                    R: "",
                    Et: !1
                },
                Kt: {
                    ct: 1,
                    Xt: 0,
                    R: "",
                    Et: !1
                },
                _t: 0,
                ut: 0
            }, this.Gt = new D(this.Zt), this.Jt = t, this.yt = i
        }
        Pt() {
            this.St = !0
        }
        Tt(t) {
            return this.St && (this.Rt(), this.St = !1), this.Gt
        }
        Rt() {
            const t = this.Jt.Et(),
                i = this.yt.Qt().N().crosshair,
                s = this.Zt;
            if (2 === i.mode) return s.Kt.Et = !1, void(s.Yt.Et = !1);
            s.Kt.Et = t && this.Jt.ti(this.yt), s.Yt.Et = t && this.Jt.ii(), s.Kt.ct = i.horzLine.width, s.Kt.Xt = i.horzLine.style, s.Kt.R = i.horzLine.color, s.Yt.ct = i.vertLine.width, s.Yt.Xt = i.vertLine.style, s.Yt.R = i.vertLine.color, s._t = this.Jt.si(), s.ut = this.Jt.ni()
        }
    }

    function V(t, i, s, n, e, r) {
        t.fillRect(i + r, s, n - 2 * r, r), t.fillRect(i + r, s + e - r, n - 2 * r, r), t.fillRect(i, s, r, e), t.fillRect(i + n - r, s, r, e)
    }

    function B(t, i, s, n, e, r) {
        t.save(), t.globalCompositeOperation = "copy", t.fillStyle = r, t.fillRect(i, s, n, e), t.restore()
    }

    function I(t, i, s, n, e, r) {
        t.beginPath(), t.roundRect ? t.roundRect(i, s, n, e, r) : (t.lineTo(i + n - r[1], s), 0 !== r[1] && t.arcTo(i + n, s, i + n, s + r[1], r[1]), t.lineTo(i + n, s + e - r[2]), 0 !== r[2] && t.arcTo(i + n, s + e, i + n - r[2], s + e, r[2]), t.lineTo(i + r[3], s + e), 0 !== r[3] && t.arcTo(i, s + e, i, s + e - r[3], r[3]), t.lineTo(i, s + r[0]), 0 !== r[0] && t.arcTo(i, s, i + r[0], s, r[0]))
    }

    function A(t, i, s, n, e, r, h = 0, a = [0, 0, 0, 0], l = "") {
        if (t.save(), !h || !l || l === r) return I(t, i, s, n, e, a), t.fillStyle = r, t.fill(), void t.restore();
        const o = h / 2;
        var _;
        I(t, i + o, s + o, n - h, e - h, (_ = -o, a.map((t => 0 === t ? t : t + _)))), "transparent" !== r && (t.fillStyle = r, t.fill()), "transparent" !== l && (t.lineWidth = h, t.strokeStyle = l, t.closePath(), t.stroke()), t.restore()
    }

    function z(t, i, s, n, e, r, h) {
        t.save(), t.globalCompositeOperation = "copy";
        const a = t.createLinearGradient(0, 0, 0, e);
        a.addColorStop(0, r), a.addColorStop(1, h), t.fillStyle = a, t.fillRect(i, s, n, e), t.restore()
    }
    class O {
        constructor(t, i) {
            this.ht(t, i)
        }
        ht(t, i) {
            this.qt = t, this.ei = i
        }
        $t(t, i) {
            return this.qt.Et ? t.P + t.A + t.V : 0
        }
        nt(t, i, s, n) {
            if (!this.qt.Et || 0 === this.qt.ri.length) return;
            const e = this.qt.R,
                r = this.ei.Z,
                h = t.useBitmapCoordinateSpace((t => {
                    const h = t.context;
                    h.font = i.k;
                    const a = this.hi(t, i, s, n),
                        l = a.ai;
                    return a.li ? A(h, l.oi, l._i, l.ui, l.ci, r, l.di, [l.ft, 0, 0, l.ft], r) : A(h, l.fi, l._i, l.ui, l.ci, r, l.di, [0, l.ft, l.ft, 0], r), this.qt.pi && (h.fillStyle = e, h.fillRect(l.fi, l.mi, l.wi - l.fi, l.gi)), this.qt.Mi && (h.fillStyle = i.D, h.fillRect(a.li ? l.bi - l.di : 0, l._i, l.di, l.xi - l._i)), a
                }));
            t.useMediaCoordinateSpace((({
                context: t
            }) => {
                const s = h.Si;
                t.font = i.k, t.textAlign = h.li ? "right" : "left", t.textBaseline = "middle", t.fillStyle = e, t.fillText(this.qt.ri, s.Ci, (s._i + s.xi) / 2 + s.yi)
            }))
        }
        hi(t, i, s, n) {
            const {
                context: e,
                bitmapSize: r,
                mediaSize: h,
                horizontalPixelRatio: a,
                verticalPixelRatio: l
            } = t, o = this.qt.pi || !this.qt.Pi ? i.C : 0, _ = this.qt.ki ? i.S : 0, u = i.A + this.ei.Ti, c = i.V + this.ei.Ri, d = i.B, f = i.I, p = this.qt.ri, v = i.P, m = s.Di(e, p), w = Math.ceil(s.Ei(e, p)), g = v + u + c, M = i.S + d + f + w + o, b = Math.max(1, Math.floor(l));
            let x = Math.round(g * l);
            x % 2 != b % 2 && (x += 1);
            const S = _ > 0 ? Math.max(1, Math.floor(_ * a)) : 0,
                C = Math.round(M * a),
                y = Math.round(o * a),
                P = this.ei.Vi ?? this.ei.Bi,
                k = Math.round(P * l) - Math.floor(.5 * l),
                T = Math.floor(k + b / 2 - x / 2),
                R = T + x,
                D = "right" === n,
                E = D ? h.width - _ : _,
                V = D ? r.width - S : S;
            let B, I, A;
            return D ? (B = V - C, I = V - y, A = E - o - d - _) : (B = V + C, I = V + y, A = E + o + d), {
                li: D,
                ai: {
                    _i: T,
                    mi: k,
                    xi: R,
                    ui: C,
                    ci: x,
                    ft: 2 * a,
                    di: S,
                    oi: B,
                    fi: V,
                    wi: I,
                    gi: b,
                    bi: r.width
                },
                Si: {
                    _i: T / l,
                    xi: R / l,
                    Ci: A,
                    yi: m
                }
            }
        }
    }
    class L {
        constructor(t) {
            this.Ii = {
                Bi: 0,
                Z: "#000",
                Ri: 0,
                Ti: 0
            }, this.Ai = {
                ri: "",
                Et: !1,
                pi: !0,
                Pi: !1,
                Ht: "",
                R: "#FFF",
                Mi: !1,
                ki: !1
            }, this.zi = {
                ri: "",
                Et: !1,
                pi: !1,
                Pi: !0,
                Ht: "",
                R: "#FFF",
                Mi: !0,
                ki: !0
            }, this.St = !0, this.Oi = new(t || O)(this.Ai, this.Ii), this.Li = new(t || O)(this.zi, this.Ii)
        }
        ri() {
            return this.Ni(), this.Ai.ri
        }
        Bi() {
            return this.Ni(), this.Ii.Bi
        }
        Pt() {
            this.St = !0
        }
        $t(t, i = !1) {
            return Math.max(this.Oi.$t(t, i), this.Li.$t(t, i))
        }
        Wi() {
            return this.Ii.Vi || 0
        }
        Fi(t) {
            this.Ii.Vi = t
        }
        Hi() {
            return this.Ni(), this.Ai.Et || this.zi.Et
        }
        Ui() {
            return this.Ni(), this.Ai.Et
        }
        Tt(t) {
            return this.Ni(), this.Ai.pi = this.Ai.pi && t.N().ticksVisible, this.zi.pi = this.zi.pi && t.N().ticksVisible, this.Oi.ht(this.Ai, this.Ii), this.Li.ht(this.zi, this.Ii), this.Oi
        }
        $i() {
            return this.Ni(), this.Oi.ht(this.Ai, this.Ii), this.Li.ht(this.zi, this.Ii), this.Li
        }
        Ni() {
            this.St && (this.Ai.pi = !0, this.zi.pi = !1, this.ji(this.Ai, this.zi, this.Ii))
        }
    }
    class N extends L {
        constructor(t, i, s) {
            super(), this.Jt = t, this.qi = i, this.Yi = s
        }
        ji(t, i, s) {
            if (t.Et = !1, 2 === this.Jt.N().mode) return;
            const n = this.Jt.N().horzLine;
            if (!n.labelVisible) return;
            const e = this.qi.zt();
            if (!this.Jt.Et() || this.qi.Ki() || null === e) return;
            const r = this.qi.Xi().X(n.labelBackgroundColor);
            s.Z = r.Z, t.R = r.G;
            const h = 2 / 12 * this.qi.P();
            s.Ti = h, s.Ri = h;
            const a = this.Yi(this.qi);
            s.Bi = a.Bi, t.ri = this.qi.Zi(a.gt, e), t.Et = !0
        }
    }
    const W = /[1-9]/g;
    class F {
        constructor() {
            this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        nt(t, i) {
            if (null === this.qt || !1 === this.qt.Et || 0 === this.qt.ri.length) return;
            const s = t.useMediaCoordinateSpace((({
                context: t
            }) => (t.font = i.k, Math.round(i.Gi.Ei(t, a(this.qt).ri, W)))));
            if (s <= 0) return;
            const n = i.Ji,
                e = s + 2 * n,
                r = e / 2,
                h = this.qt.Qi;
            let l = this.qt.Bi,
                o = Math.floor(l - r) + .5;
            o < 0 ? (l += Math.abs(0 - o), o = Math.floor(l - r) + .5) : o + e > h && (l -= Math.abs(h - (o + e)), o = Math.floor(l - r) + .5);
            const _ = o + e,
                u = Math.ceil(0 + i.S + i.C + i.A + i.P + i.V);
            t.useBitmapCoordinateSpace((({
                context: t,
                horizontalPixelRatio: s,
                verticalPixelRatio: n
            }) => {
                const e = a(this.qt);
                t.fillStyle = e.Z;
                const r = Math.round(o * s),
                    h = Math.round(0 * n),
                    l = Math.round(_ * s),
                    c = Math.round(u * n),
                    d = Math.round(2 * s);
                if (t.beginPath(), t.moveTo(r, h), t.lineTo(r, c - d), t.arcTo(r, c, r + d, c, d), t.lineTo(l - d, c), t.arcTo(l, c, l, c - d, d), t.lineTo(l, h), t.fill(), e.pi) {
                    const r = Math.round(e.Bi * s),
                        a = h,
                        l = Math.round((a + i.C) * n);
                    t.fillStyle = e.R;
                    const o = Math.max(1, Math.floor(s)),
                        _ = Math.floor(.5 * s);
                    t.fillRect(r - _, a, o, l - a)
                }
            })), t.useMediaCoordinateSpace((({
                context: t
            }) => {
                const s = a(this.qt),
                    e = 0 + i.S + i.C + i.A + i.P / 2;
                t.font = i.k, t.textAlign = "left", t.textBaseline = "middle", t.fillStyle = s.R;
                const r = i.Gi.Di(t, "Apr0");
                t.translate(o + n, e + r), t.fillText(s.ri, 0, 0)
            }))
        }
    }
    class H {
        constructor(t, i, s) {
            this.St = !0, this.Gt = new F, this.Zt = {
                Et: !1,
                Z: "#4c525e",
                R: "white",
                ri: "",
                Qi: 0,
                Bi: NaN,
                pi: !0
            }, this.Ct = t, this.ts = i, this.Yi = s
        }
        Pt() {
            this.St = !0
        }
        Tt() {
            return this.St && (this.Rt(), this.St = !1), this.Gt.ht(this.Zt), this.Gt
        }
        Rt() {
            const t = this.Zt;
            if (t.Et = !1, 2 === this.Ct.N().mode) return;
            const i = this.Ct.N().vertLine;
            if (!i.labelVisible) return;
            const s = this.ts.It();
            if (s.Ki()) return;
            t.Qi = s.Qi();
            const n = this.Yi();
            if (null === n) return;
            t.Bi = n.Bi;
            const e = s.ss(this.Ct.Bt());
            t.ri = s.ns(a(e)), t.Et = !0;
            const r = this.ts.Xi().X(i.labelBackgroundColor);
            t.Z = r.Z, t.R = r.G, t.pi = s.N().ticksVisible
        }
    }
    class U {
        constructor() {
            this.es = null, this.rs = 0
        }
        hs() {
            return this.rs
        }
        ls(t) {
            this.rs = t
        }
        Wt() {
            return this.es
        }
        _s(t) {
            this.es = t
        }
        us(t) {
            return []
        }
        cs() {
            return []
        }
        Et() {
            return !0
        }
    }
    var $;
    ! function(t) {
        t[t.Normal = 0] = "Normal", t[t.Magnet = 1] = "Magnet", t[t.Hidden = 2] = "Hidden", t[t.MagnetOHLC = 3] = "MagnetOHLC"
    }($ || ($ = {}));
    class j extends U {
        constructor(t, i) {
            super(), this.yt = null, this.ds = NaN, this.fs = 0, this.ps = !1, this.vs = new Map, this.ws = !1, this.gs = new WeakMap, this.Ms = new WeakMap, this.bs = NaN, this.xs = NaN, this.Ss = NaN, this.Cs = NaN, this.ts = t, this.ys = i;
            this.Ps = ((t, i) => s => {
                const n = i(),
                    e = t();
                if (s === a(this.yt).ks()) return {
                    gt: e,
                    Bi: n
                };
                {
                    const t = a(s.zt());
                    return {
                        gt: s.Ts(n, t),
                        Bi: n
                    }
                }
            })((() => this.ds), (() => this.xs));
            const s = ((t, i) => () => {
                const s = this.ts.It().Rs(t()),
                    n = i();
                return s && Number.isFinite(n) ? {
                    wt: s,
                    Bi: n
                } : null
            })((() => this.fs), (() => this.si()));
            this.Ds = new H(this, t, s)
        }
        N() {
            return this.ys
        }
        Es(t, i) {
            this.Ss = t, this.Cs = i
        }
        Vs() {
            this.Ss = NaN, this.Cs = NaN
        }
        Bs() {
            return this.Ss
        }
        Is() {
            return this.Cs
        }
        As(t, i, s) {
            this.ws || (this.ws = !0), this.ps = !0, this.zs(t, i, s)
        }
        Bt() {
            return this.fs
        }
        si() {
            return this.bs
        }
        ni() {
            return this.xs
        }
        Et() {
            return this.ps
        }
        Os() {
            this.ps = !1, this.Ls(), this.ds = NaN, this.bs = NaN, this.xs = NaN, this.yt = null, this.Vs(), this.Ns()
        }
        Ws(t) {
            let i = this.gs.get(t);
            i || (i = new E(this, t), this.gs.set(t, i));
            let s = this.Ms.get(t);
            return s || (s = new R(this.ts, this, t), this.Ms.set(t, s)), [i, s]
        }
        ti(t) {
            return t === this.yt && this.ys.horzLine.visible
        }
        ii() {
            return this.ys.vertLine.visible
        }
        Fs(t, i) {
            this.ps && this.yt === t || this.vs.clear();
            const s = [];
            return this.yt === t && s.push(this.Hs(this.vs, i, this.Ps)), s
        }
        cs() {
            return this.ps ? [this.Ds] : []
        }
        Us() {
            return this.yt
        }
        Ns() {
            this.ts.$s().forEach((t => {
                this.gs.get(t)?.Pt(), this.Ms.get(t)?.Pt()
            })), this.vs.forEach((t => t.Pt())), this.Ds.Pt()
        }
        js(t) {
            return t && !t.ks().Ki() ? t.ks() : null
        }
        zs(t, i, s) {
            this.qs(t, i, s) && this.Ns()
        }
        qs(t, i, s) {
            const n = this.bs,
                e = this.xs,
                r = this.ds,
                h = this.fs,
                a = this.yt,
                l = this.js(s);
            this.fs = t, this.bs = isNaN(t) ? NaN : this.ts.It().jt(t), this.yt = s;
            const o = null !== l ? l.zt() : null;
            return null !== l && null !== o ? (this.ds = i, this.xs = l.Nt(i, o)) : (this.ds = NaN, this.xs = NaN), n !== this.bs || e !== this.xs || h !== this.fs || r !== this.ds || a !== this.yt
        }
        Ls() {
            const t = this.ts.Ys().map((t => t.Xs().Ks())).filter(v),
                i = 0 === t.length ? null : Math.max(...t);
            this.fs = null !== i ? i : NaN
        }
        Hs(t, i, s) {
            let n = t.get(i);
            return void 0 === n && (n = new N(this, i, s), t.set(i, n)), n
        }
    }

    function q(t) {
        return "left" === t || "right" === t
    }
    class Y {
        constructor(t) {
            this.Zs = new Map, this.Gs = [], this.Js = t
        }
        Qs(t, i) {
            const s = function(t, i) {
                return void 0 === t ? i : {
                    tn: Math.max(t.tn, i.tn),
                    sn: t.sn || i.sn
                }
            }(this.Zs.get(t), i);
            this.Zs.set(t, s)
        }
        nn() {
            return this.Js
        }
        en(t) {
            const i = this.Zs.get(t);
            return void 0 === i ? {
                tn: this.Js
            } : {
                tn: Math.max(this.Js, i.tn),
                sn: i.sn
            }
        }
        rn() {
            this.hn(), this.Gs = [{
                an: 0
            }]
        }
        ln(t) {
            this.hn(), this.Gs = [{
                an: 1,
                Ft: t
            }]
        }
        _n(t) {
            this.un(), this.Gs.push({
                an: 5,
                Ft: t
            })
        }
        hn() {
            this.un(), this.Gs.push({
                an: 6
            })
        }
        cn() {
            this.hn(), this.Gs = [{
                an: 4
            }]
        }
        dn(t) {
            this.hn(), this.Gs.push({
                an: 2,
                Ft: t
            })
        }
        fn(t) {
            this.hn(), this.Gs.push({
                an: 3,
                Ft: t
            })
        }
        pn() {
            return this.Gs
        }
        vn(t) {
            for (const i of t.Gs) this.mn(i);
            this.Js = Math.max(this.Js, t.Js), t.Zs.forEach(((t, i) => {
                this.Qs(i, t)
            }))
        }
        static wn() {
            return new Y(2)
        }
        static gn() {
            return new Y(3)
        }
        mn(t) {
            switch (t.an) {
                case 0:
                    this.rn();
                    break;
                case 1:
                    this.ln(t.Ft);
                    break;
                case 2:
                    this.dn(t.Ft);
                    break;
                case 3:
                    this.fn(t.Ft);
                    break;
                case 4:
                    this.cn();
                    break;
                case 5:
                    this._n(t.Ft);
                    break;
                case 6:
                    this.un()
            }
        }
        un() {
            const t = this.Gs.findIndex((t => 5 === t.an)); - 1 !== t && this.Gs.splice(t, 1)
        }
    }
    const K = ".";

    function X(t, i) {
        if (!u(t)) return "n/a";
        if (!c(i)) throw new TypeError("invalid length");
        if (i < 0 || i > 16) throw new TypeError("invalid length");
        if (0 === i) return t.toString();
        return ("0000000000000000" + t.toString()).slice(-i)
    }
    class Z {
        constructor(t, i) {
            if (i || (i = 1), u(t) && c(t) || (t = 100), t < 0) throw new TypeError("invalid base");
            this.qi = t, this.Mn = i, this.bn()
        }
        format(t) {
            const i = t < 0 ? "−" : "";
            return t = Math.abs(t), i + this.xn(t)
        }
        bn() {
            if (this.Sn = 0, this.qi > 0 && this.Mn > 0) {
                let t = this.qi;
                for (; t > 1;) t /= 10, this.Sn++
            }
        }
        xn(t) {
            const i = this.qi / this.Mn;
            let s = Math.floor(t),
                n = "";
            const e = void 0 !== this.Sn ? this.Sn : NaN;
            if (i > 1) {
                let r = +(Math.round(t * i) - s * i).toFixed(this.Sn);
                r >= i && (r -= i, s += 1), n = K + X(+r.toFixed(this.Sn) * this.Mn, e)
            } else s = Math.round(s * i) / i, e > 0 && (n = K + X(0, e));
            return s.toFixed(0) + n
        }
    }
    class G extends Z {
        constructor(t = 100) {
            super(t)
        }
        format(t) {
            return `${super.format(t)}%`
        }
    }
    class J {
        constructor(t) {
            this.Cn = t
        }
        format(t) {
            let i = "";
            return t < 0 && (i = "-", t = -t), t < 995 ? i + this.yn(t) : t < 999995 ? i + this.yn(t / 1e3) + "K" : t < 999999995 ? (t = 1e3 * Math.round(t / 1e3), i + this.yn(t / 1e6) + "M") : (t = 1e6 * Math.round(t / 1e6), i + this.yn(t / 1e9) + "B")
        }
        yn(t) {
            let i;
            const s = Math.pow(10, this.Cn);
            return i = (t = Math.round(t * s) / s) >= 1e-15 && t < 1 ? t.toFixed(this.Cn).replace(/\.?0+$/, "") : String(t), i.replace(/(\.[1-9]*)0+$/, ((t, i) => i))
        }
    }
    const Q = /[2-9]/g;
    class tt {
        constructor(t = 50) {
            this.Pn = 0, this.kn = 1, this.Tn = 1, this.Rn = {}, this.Dn = new Map, this.En = t
        }
        Vn() {
            this.Pn = 0, this.Dn.clear(), this.kn = 1, this.Tn = 1, this.Rn = {}
        }
        Ei(t, i, s) {
            return this.Bn(t, i, s).width
        }
        Di(t, i, s) {
            const n = this.Bn(t, i, s);
            return ((n.actualBoundingBoxAscent || 0) - (n.actualBoundingBoxDescent || 0)) / 2
        }
        Bn(t, i, s) {
            const n = s || Q,
                e = String(i).replace(n, "0");
            if (this.Dn.has(e)) return h(this.Dn.get(e)).In;
            if (this.Pn === this.En) {
                const t = this.Rn[this.Tn];
                delete this.Rn[this.Tn], this.Dn.delete(t), this.Tn++, this.Pn--
            }
            t.save(), t.textBaseline = "middle";
            const r = t.measureText(e);
            return t.restore(), 0 === r.width && i.length || (this.Dn.set(e, {
                In: r,
                An: this.kn
            }), this.Rn[this.kn] = e, this.Pn++, this.kn++), r
        }
    }
    class it {
        constructor(t) {
            this.zn = null, this.M = null, this.On = "right", this.Ln = t
        }
        Nn(t, i, s) {
            this.zn = t, this.M = i, this.On = s
        }
        nt(t) {
            null !== this.M && null !== this.zn && this.zn.nt(t, this.M, this.Ln, this.On)
        }
    }
    class st {
        constructor(t, i, s) {
            this.Wn = t, this.Ln = new tt(50), this.Fn = i, this.L = s, this.W = -1, this.Gt = new it(this.Ln)
        }
        Tt() {
            const t = this.L.Hn(this.Fn);
            if (null === t) return null;
            const i = t.Un(this.Fn) ? t.$n() : this.Fn.Wt();
            if (null === i) return null;
            const s = t.jn(i);
            if ("overlay" === s) return null;
            const n = this.L.qn();
            return n.P !== this.W && (this.W = n.P, this.Ln.Vn()), this.Gt.Nn(this.Wn.$i(), n, s), this.Gt
        }
    }
    class nt extends y {
        constructor() {
            super(...arguments), this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        Yn(t, i) {
            if (!this.qt?.Et) return null;
            const {
                ut: s,
                ct: n,
                Kn: e
            } = this.qt;
            return i >= s - n - 7 && i <= s + n + 7 ? {
                Xn: this.qt,
                Kn: e
            } : null
        }
        et({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: r
        }) {
            if (null === this.qt) return;
            if (!1 === this.qt.Et) return;
            const h = Math.round(this.qt.ut * r);
            h < 0 || h > i.height || (t.lineCap = "butt", t.strokeStyle = this.qt.R, t.lineWidth = Math.floor(this.qt.ct * s), n(t, this.qt.Xt), e(t, h, 0, i.width))
        }
    }
    class et {
        constructor(t) {
            this.Zn = {
                ut: 0,
                R: "rgba(0, 0, 0, 0)",
                ct: 1,
                Xt: 0,
                Et: !1
            }, this.Gn = new nt, this.St = !0, this.Jn = t, this.Qn = t.Qt(), this.Gn.ht(this.Zn)
        }
        Pt() {
            this.St = !0
        }
        Tt() {
            return this.Jn.Et() ? (this.St && (this.te(), this.St = !1), this.Gn) : null
        }
    }
    class rt extends et {
        constructor(t) {
            super(t)
        }
        te() {
            this.Zn.Et = !1;
            const t = this.Jn.Wt(),
                i = t.ie().ie;
            if (2 !== i && 3 !== i) return;
            const s = this.Jn.N();
            if (!s.baseLineVisible || !this.Jn.Et()) return;
            const n = this.Jn.zt();
            null !== n && (this.Zn.Et = !0, this.Zn.ut = t.Nt(n.Ft, n.Ft), this.Zn.R = s.baseLineColor, this.Zn.ct = s.baseLineWidth, this.Zn.Xt = s.baseLineStyle)
        }
    }
    class ht extends y {
        constructor() {
            super(...arguments), this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        se() {
            return this.qt
        }
        et({
            context: t,
            horizontalPixelRatio: i,
            verticalPixelRatio: s
        }) {
            const n = this.qt;
            if (null === n) return;
            const e = Math.max(1, Math.floor(i)),
                r = e % 2 / 2,
                h = Math.round(n.ne.x * i) + r,
                a = n.ne.y * s;
            t.fillStyle = n.ee, t.beginPath();
            const l = Math.max(2, 1.5 * n.re) * i;
            t.arc(h, a, l, 0, 2 * Math.PI, !1), t.fill(), t.fillStyle = n.he, t.beginPath(), t.arc(h, a, n.ft * i, 0, 2 * Math.PI, !1), t.fill(), t.lineWidth = e, t.strokeStyle = n.ae, t.beginPath(), t.arc(h, a, n.ft * i + e / 2, 0, 2 * Math.PI, !1), t.stroke()
        }
    }
    const at = [{
        le: 0,
        oe: .25,
        _e: 4,
        ue: 10,
        ce: .25,
        de: 0,
        fe: .4,
        pe: .8
    }, {
        le: .25,
        oe: .525,
        _e: 10,
        ue: 14,
        ce: 0,
        de: 0,
        fe: .8,
        pe: 0
    }, {
        le: .525,
        oe: 1,
        _e: 14,
        ue: 14,
        ce: 0,
        de: 0,
        fe: 0,
        pe: 0
    }];
    class lt {
        constructor(t) {
            this.Gt = new ht, this.St = !0, this.ve = !0, this.me = performance.now(), this.we = this.me - 1, this.ge = t
        }
        Me() {
            this.we = this.me - 1, this.Pt()
        }
        be() {
            if (this.Pt(), 2 === this.ge.N().lastPriceAnimation) {
                const t = performance.now(),
                    i = this.we - t;
                if (i > 0) return void(i < 650 && (this.we += 2600));
                this.me = t, this.we = t + 2600
            }
        }
        Pt() {
            this.St = !0
        }
        xe() {
            this.ve = !0
        }
        Et() {
            return 0 !== this.ge.N().lastPriceAnimation
        }
        Se() {
            switch (this.ge.N().lastPriceAnimation) {
                case 0:
                    return !1;
                case 1:
                    return !0;
                case 2:
                    return performance.now() <= this.we
            }
        }
        Tt() {
            return this.St ? (this.Rt(), this.St = !1, this.ve = !1) : this.ve && (this.Ce(), this.ve = !1), this.Gt
        }
        Rt() {
            this.Gt.ht(null);
            const t = this.ge.Qt().It(),
                i = t.ye(),
                s = this.ge.zt();
            if (null === i || null === s) return;
            const n = this.ge.Pe(!0);
            if (n.ke || !i.Te(n.Re)) return;
            const e = {
                    x: t.jt(n.Re),
                    y: this.ge.Wt().Nt(n.gt, s.Ft)
                },
                r = n.R,
                h = this.ge.N().lineWidth,
                a = this.De(this.Ee(), r);
            this.Gt.ht({
                ee: r,
                re: h,
                he: a.he,
                ae: a.ae,
                ft: a.ft,
                ne: e
            })
        }
        Ce() {
            const t = this.Gt.se();
            if (null !== t) {
                const i = this.De(this.Ee(), t.ee);
                t.he = i.he, t.ae = i.ae, t.ft = i.ft
            }
        }
        Ee() {
            return this.Se() ? performance.now() - this.me : 2599
        }
        Ve(t, i, s, n) {
            const e = s + (n - s) * i;
            return this.ge.Qt().Xi().Y(t, e)
        }
        De(t, i) {
            const s = t % 2600 / 2600;
            let n;
            for (const t of at)
                if (s >= t.le && s <= t.oe) {
                    n = t;
                    break
                } r(void 0 !== n, "Last price animation internal logic error");
            const e = (s - n.le) / (n.oe - n.le);
            return {
                he: this.Ve(i, e, n.ce, n.de),
                ae: this.Ve(i, e, n.fe, n.pe),
                ft: (h = e, a = n._e, l = n.ue, a + (l - a) * h)
            };
            var h, a, l
        }
    }
    class ot extends et {
        constructor(t) {
            super(t)
        }
        te() {
            const t = this.Zn;
            t.Et = !1;
            const i = this.Jn.N();
            if (!i.priceLineVisible || !this.Jn.Et()) return;
            const s = this.Jn.Pe(0 === i.priceLineSource);
            s.ke || (t.Et = !0, t.ut = s.Bi, t.R = this.Jn.Be(s.R), t.ct = i.priceLineWidth, t.Xt = i.priceLineStyle)
        }
    }
    class _t extends L {
        constructor(t) {
            super(), this.Jt = t
        }
        ji(t, i, s) {
            t.Et = !1, i.Et = !1;
            const n = this.Jt;
            if (!n.Et()) return;
            const e = n.N(),
                r = e.lastValueVisible,
                h = "" !== n.Ie(),
                a = 0 === e.seriesLastValueMode,
                l = n.Pe(!1);
            if (l.ke) return;
            r && (t.ri = this.Ae(l, r, a), t.Et = 0 !== t.ri.length), (h || a) && (i.ri = this.ze(l, r, h, a), i.Et = i.ri.length > 0);
            const o = n.Be(l.R),
                _ = this.Jt.Qt().Xi().X(o);
            s.Z = _.Z, s.Bi = l.Bi, i.Ht = n.Qt().Ut(l.Bi / n.Wt().$t()), t.Ht = o, t.R = _.G, i.R = _.G
        }
        ze(t, i, s, n) {
            let e = "";
            const r = this.Jt.Ie();
            return s && 0 !== r.length && (e += `${r} `), i && n && (e += this.Jt.Wt().Oe() ? t.Le : t.Ne), e.trim()
        }
        Ae(t, i, s) {
            return i ? s ? this.Jt.Wt().Oe() ? t.Ne : t.Le : t.ri : ""
        }
    }

    function ut(t, i, s, n) {
        const e = Number.isFinite(i),
            r = Number.isFinite(s);
        return e && r ? t(i, s) : e || r ? e ? i : s : n
    }
    class ct {
        constructor(t, i) {
            this.We = t, this.Fe = i
        }
        He(t) {
            return null !== t && (this.We === t.We && this.Fe === t.Fe)
        }
        Ue() {
            return new ct(this.We, this.Fe)
        }
        $e() {
            return this.We
        }
        je() {
            return this.Fe
        }
        qe() {
            return this.Fe - this.We
        }
        Ki() {
            return this.Fe === this.We || Number.isNaN(this.Fe) || Number.isNaN(this.We)
        }
        vn(t) {
            return null === t ? this : new ct(ut(Math.min, this.$e(), t.$e(), -1 / 0), ut(Math.max, this.je(), t.je(), 1 / 0))
        }
        Ye(t) {
            if (!u(t)) return;
            if (0 === this.Fe - this.We) return;
            const i = .5 * (this.Fe + this.We);
            let s = this.Fe - i,
                n = this.We - i;
            s *= t, n *= t, this.Fe = i + s, this.We = i + n
        }
        Ke(t) {
            u(t) && (this.Fe += t, this.We += t)
        }
        Xe() {
            return {
                minValue: this.We,
                maxValue: this.Fe
            }
        }
        static Ze(t) {
            return null === t ? null : new ct(t.minValue, t.maxValue)
        }
    }
    class dt {
        constructor(t, i) {
            this.Ge = t, this.Je = i || null
        }
        Qe() {
            return this.Ge
        }
        tr() {
            return this.Je
        }
        Xe() {
            return {
                priceRange: null === this.Ge ? null : this.Ge.Xe(),
                margins: this.Je || void 0
            }
        }
        static Ze(t) {
            return null === t ? null : new dt(ct.Ze(t.priceRange), t.margins)
        }
    }
    class ft extends et {
        constructor(t, i) {
            super(t), this.ir = i
        }
        te() {
            const t = this.Zn;
            t.Et = !1;
            const i = this.ir.N();
            if (!this.Jn.Et() || !i.lineVisible) return;
            const s = this.ir.sr();
            null !== s && (t.Et = !0, t.ut = s, t.R = i.color, t.ct = i.lineWidth, t.Xt = i.lineStyle, t.Kn = this.ir.N().id)
        }
    }
    class pt extends L {
        constructor(t, i) {
            super(), this.ge = t, this.ir = i
        }
        ji(t, i, s) {
            t.Et = !1, i.Et = !1;
            const n = this.ir.N(),
                e = n.axisLabelVisible,
                r = "" !== n.title,
                h = this.ge;
            if (!e || !h.Et()) return;
            const a = this.ir.sr();
            if (null === a) return;
            r && (i.ri = n.title, i.Et = !0), i.Ht = h.Qt().Ut(a / h.Wt().$t()), t.ri = this.nr(n.price), t.Et = !0;
            const l = this.ge.Qt().Xi().X(n.axisLabelColor || n.color);
            s.Z = l.Z;
            const o = n.axisLabelTextColor || l.G;
            t.R = o, i.R = o, s.Bi = a
        }
        nr(t) {
            const i = this.ge.zt();
            return null === i ? "" : this.ge.Wt().Zi(t, i.Ft)
        }
    }
    class vt {
        constructor(t, i) {
            this.ge = t, this.ys = i, this.er = new ft(t, this), this.Wn = new pt(t, this), this.rr = new st(this.Wn, t, t.Qt())
        }
        hr(t) {
            _(this.ys, t), this.Pt(), this.ge.Qt().ar()
        }
        N() {
            return this.ys
        }
        lr() {
            return this.er
        }
        _r() {
            return this.rr
        }
        ur() {
            return this.Wn
        }
        Pt() {
            this.er.Pt(), this.Wn.Pt()
        }
        sr() {
            const t = this.ge,
                i = t.Wt();
            if (t.Qt().It().Ki() || i.Ki()) return null;
            const s = t.zt();
            return null === s ? null : i.Nt(this.ys.price, s.Ft)
        }
    }
    class mt extends U {
        constructor(t) {
            super(), this.ts = t
        }
        Qt() {
            return this.ts
        }
    }
    const wt = {
        Bar: (t, i, s, n) => {
            const e = i.upColor,
                r = i.downColor,
                h = a(t(s, n)),
                o = l(h.Ft[0]) <= l(h.Ft[3]);
            return {
                cr: h.R ?? (o ? e : r)
            }
        },
        Candlestick: (t, i, s, n) => {
            const e = i.upColor,
                r = i.downColor,
                h = i.borderUpColor,
                o = i.borderDownColor,
                _ = i.wickUpColor,
                u = i.wickDownColor,
                c = a(t(s, n)),
                d = l(c.Ft[0]) <= l(c.Ft[3]);
            return {
                cr: c.R ?? (d ? e : r),
                dr: c.Ht ?? (d ? h : o),
                pr: c.vr ?? (d ? _ : u)
            }
        },
        Custom: (t, i, s, n) => ({
            cr: a(t(s, n)).R ?? i.color
        }),
        Area: (t, i, s, n) => {
            const e = a(t(s, n));
            return {
                cr: e.vt ?? i.lineColor,
                vt: e.vt ?? i.lineColor,
                mr: e.mr ?? i.topColor,
                wr: e.wr ?? i.bottomColor
            }
        },
        Baseline: (t, i, s, n) => {
            const e = a(t(s, n));
            return {
                cr: e.Ft[3] >= i.baseValue.price ? i.topLineColor : i.bottomLineColor,
                gr: e.gr ?? i.topLineColor,
                Mr: e.Mr ?? i.bottomLineColor,
                br: e.br ?? i.topFillColor1,
                Sr: e.Sr ?? i.topFillColor2,
                Cr: e.Cr ?? i.bottomFillColor1,
                yr: e.yr ?? i.bottomFillColor2
            }
        },
        Line: (t, i, s, n) => {
            const e = a(t(s, n));
            return {
                cr: e.R ?? i.color,
                vt: e.R ?? i.color
            }
        },
        Histogram: (t, i, s, n) => ({
            cr: a(t(s, n)).R ?? i.color
        })
    };
    class gt {
        constructor(t) {
            this.Pr = (t, i) => void 0 !== i ? i.Ft : this.ge.Xs().kr(t), this.ge = t, this.Tr = wt[t.Rr()]
        }
        Dr(t, i) {
            return this.Tr(this.Pr, this.ge.N(), t, i)
        }
    }

    function Mt(t, i, s, n, e = 0, r = i.length) {
        let h = r - e;
        for (; 0 < h;) {
            const r = h >> 1,
                a = e + r;
            n(i[a], s) === t ? (e = a + 1, h -= r + 1) : h = r
        }
        return e
    }
    const bt = Mt.bind(null, !0),
        xt = Mt.bind(null, !1);
    var St;
    ! function(t) {
        t[t.NearestLeft = -1] = "NearestLeft", t[t.None = 0] = "None", t[t.NearestRight = 1] = "NearestRight"
    }(St || (St = {}));
    const Ct = 30;
    class yt {
        constructor() {
            this.Er = [], this.Vr = new Map, this.Br = new Map, this.Ir = []
        }
        Ar() {
            return this.zr() > 0 ? this.Er[this.Er.length - 1] : null
        }
        Or() {
            return this.zr() > 0 ? this.Lr(0) : null
        }
        Ks() {
            return this.zr() > 0 ? this.Lr(this.Er.length - 1) : null
        }
        zr() {
            return this.Er.length
        }
        Ki() {
            return 0 === this.zr()
        }
        Te(t) {
            return null !== this.Nr(t, 0)
        }
        kr(t) {
            return this.Wr(t)
        }
        Wr(t, i = 0) {
            const s = this.Nr(t, i);
            return null === s ? null : {
                ...this.Fr(s),
                Re: this.Lr(s)
            }
        }
        Hr() {
            return this.Er
        }
        Ur(t, i, s) {
            if (this.Ki()) return null;
            let n = null;
            for (const e of s) {
                n = Pt(n, this.$r(t, i, e))
            }
            return n
        }
        ht(t) {
            this.Br.clear(), this.Vr.clear(), this.Er = t, this.Ir = t.map((t => t.Re))
        }
        jr() {
            return this.Ir
        }
        Lr(t) {
            return this.Er[t].Re
        }
        Fr(t) {
            return this.Er[t]
        }
        Nr(t, i) {
            const s = this.qr(t);
            if (null === s && 0 !== i) switch (i) {
                case -1:
                    return this.Yr(t);
                case 1:
                    return this.Kr(t);
                default:
                    throw new TypeError("Unknown search mode")
            }
            return s
        }
        Yr(t) {
            let i = this.Xr(t);
            return i > 0 && (i -= 1), i !== this.Er.length && this.Lr(i) < t ? i : null
        }
        Kr(t) {
            const i = this.Zr(t);
            return i !== this.Er.length && t < this.Lr(i) ? i : null
        }
        qr(t) {
            const i = this.Xr(t);
            return i === this.Er.length || t < this.Er[i].Re ? null : i
        }
        Xr(t) {
            return bt(this.Er, t, ((t, i) => t.Re < i))
        }
        Zr(t) {
            return xt(this.Er, t, ((t, i) => t.Re > i))
        }
        Gr(t, i, s) {
            let n = null;
            for (let e = t; e < i; e++) {
                const t = this.Er[e].Ft[s];
                Number.isNaN(t) || (null === n ? n = {
                    Jr: t,
                    Qr: t
                } : (t < n.Jr && (n.Jr = t), t > n.Qr && (n.Qr = t)))
            }
            return n
        }
        $r(t, i, s) {
            if (this.Ki()) return null;
            let n = null;
            const e = a(this.Or()),
                r = a(this.Ks()),
                h = Math.max(t, e),
                l = Math.min(i, r),
                o = Math.ceil(h / Ct) * Ct,
                _ = Math.max(o, Math.floor(l / Ct) * Ct);
            {
                const t = this.Xr(h),
                    e = this.Zr(Math.min(l, o, i));
                n = Pt(n, this.Gr(t, e, s))
            }
            let u = this.Vr.get(s);
            void 0 === u && (u = new Map, this.Vr.set(s, u));
            for (let t = Math.max(o + 1, h); t < _; t += Ct) {
                const i = Math.floor(t / Ct);
                let e = u.get(i);
                if (void 0 === e) {
                    const t = this.Xr(i * Ct),
                        n = this.Zr((i + 1) * Ct - 1);
                    e = this.Gr(t, n, s), u.set(i, e)
                }
                n = Pt(n, e)
            } {
                const t = this.Xr(_),
                    i = this.Zr(l);
                n = Pt(n, this.Gr(t, i, s))
            }
            return n
        }
    }

    function Pt(t, i) {
        if (null === t) return i;
        if (null === i) return t;
        return {
            Jr: Math.min(t.Jr, i.Jr),
            Qr: Math.max(t.Qr, i.Qr)
        }
    }
    class kt {
        constructor(t) {
            this.th = t
        }
        nt(t, i, s) {
            this.th.draw(t)
        }
        ih(t, i, s) {
            this.th.drawBackground?.(t)
        }
    }
    class Tt {
        constructor(t) {
            this.Dn = null, this.sh = t
        }
        Tt() {
            const t = this.sh.renderer();
            if (null === t) return null;
            if (this.Dn?.nh === t) return this.Dn.eh;
            const i = new kt(t);
            return this.Dn = {
                nh: t,
                eh: i
            }, i
        }
        rh() {
            return this.sh.zOrder?.() ?? "normal"
        }
    }
    class Rt {
        constructor(t) {
            this.hh = null, this.ah = t
        }
        oh() {
            return this.ah
        }
        Ns() {
            this.ah.updateAllViews?.()
        }
        Ws() {
            const t = this.ah.paneViews?.() ?? [];
            if (this.hh?.nh === t) return this.hh.eh;
            const i = t.map((t => new Tt(t)));
            return this.hh = {
                nh: t,
                eh: i
            }, i
        }
        Yn(t, i) {
            return this.ah.hitTest?.(t, i) ?? null
        }
    }
    let Dt = class extends Rt {
        us() {
            return []
        }
    };
    class Et {
        constructor(t) {
            this.th = t
        }
        nt(t, i, s) {
            this.th.draw(t)
        }
        ih(t, i, s) {
            this.th.drawBackground?.(t)
        }
    }
    class Vt {
        constructor(t) {
            this.Dn = null, this.sh = t
        }
        Tt() {
            const t = this.sh.renderer();
            if (null === t) return null;
            if (this.Dn?.nh === t) return this.Dn.eh;
            const i = new Et(t);
            return this.Dn = {
                nh: t,
                eh: i
            }, i
        }
        rh() {
            return this.sh.zOrder?.() ?? "normal"
        }
    }

    function Bt(t) {
        return {
            ri: t.text(),
            Bi: t.coordinate(),
            Vi: t.fixedCoordinate?.(),
            R: t.textColor(),
            Z: t.backColor(),
            Et: t.visible?.() ?? !0,
            pi: t.tickVisible?.() ?? !0
        }
    }
    class It {
        constructor(t, i) {
            this.Gt = new F, this._h = t, this.uh = i
        }
        Tt() {
            return this.Gt.ht({
                Qi: this.uh.Qi(),
                ...Bt(this._h)
            }), this.Gt
        }
    }
    class At extends L {
        constructor(t, i) {
            super(), this._h = t, this.qi = i
        }
        ji(t, i, s) {
            const n = Bt(this._h);
            s.Z = n.Z, t.R = n.R;
            const e = 2 / 12 * this.qi.P();
            s.Ti = e, s.Ri = e, s.Bi = n.Bi, s.Vi = n.Vi, t.ri = n.ri, t.Et = n.Et, t.pi = n.pi
        }
    }
    class zt extends Rt {
        constructor(t, i) {
            super(t), this.dh = null, this.fh = null, this.ph = null, this.mh = null, this.ge = i
        }
        cs() {
            const t = this.ah.timeAxisViews?.() ?? [];
            if (this.dh?.nh === t) return this.dh.eh;
            const i = this.ge.Qt().It(),
                s = t.map((t => new It(t, i)));
            return this.dh = {
                nh: t,
                eh: s
            }, s
        }
        Fs() {
            const t = this.ah.priceAxisViews?.() ?? [];
            if (this.fh?.nh === t) return this.fh.eh;
            const i = this.ge.Wt(),
                s = t.map((t => new At(t, i)));
            return this.fh = {
                nh: t,
                eh: s
            }, s
        }
        wh() {
            const t = this.ah.priceAxisPaneViews?.() ?? [];
            if (this.ph?.nh === t) return this.ph.eh;
            const i = t.map((t => new Vt(t)));
            return this.ph = {
                nh: t,
                eh: i
            }, i
        }
        gh() {
            const t = this.ah.timeAxisPaneViews?.() ?? [];
            if (this.mh?.nh === t) return this.mh.eh;
            const i = t.map((t => new Vt(t)));
            return this.mh = {
                nh: t,
                eh: i
            }, i
        }
        Mh(t, i) {
            return this.ah.autoscaleInfo?.(t, i) ?? null
        }
    }

    function Ot(t, i, s, n) {
        t.forEach((t => {
            i(t).forEach((t => {
                t.rh() === s && n.push(t)
            }))
        }))
    }

    function Lt(t) {
        return t.Ws()
    }

    function Nt(t) {
        return t.wh()
    }

    function Wt(t) {
        return t.gh()
    }
    const Ft = ["Area", "Line", "Baseline"];
    class Ht extends mt {
        constructor(t, i, s, n, e) {
            super(t), this.qt = new yt, this.er = new ot(this), this.bh = [], this.xh = new rt(this), this.Sh = null, this.Ch = null, this.yh = null, this.Ph = [], this.ys = s, this.kh = i;
            const r = new _t(this);
            this.vs = [r], this.rr = new st(r, this, t), Ft.includes(this.kh) && (this.Sh = new lt(this)), this.Th(), this.sh = n(this, this.Qt(), e)
        }
        m() {
            null !== this.yh && clearTimeout(this.yh)
        }
        Be(t) {
            return this.ys.priceLineColor || t
        }
        Pe(t) {
            const i = {
                    ke: !0
                },
                s = this.Wt();
            if (this.Qt().It().Ki() || s.Ki() || this.qt.Ki()) return i;
            const n = this.Qt().It().ye(),
                e = this.zt();
            if (null === n || null === e) return i;
            let r, h;
            if (t) {
                const t = this.qt.Ar();
                if (null === t) return i;
                r = t, h = t.Re
            } else {
                const t = this.qt.Wr(n.bi(), -1);
                if (null === t) return i;
                if (r = this.qt.kr(t.Re), null === r) return i;
                h = t.Re
            }
            const a = r.Ft[3],
                l = this.Rh().Dr(h, {
                    Ft: r
                }),
                o = s.Nt(a, e.Ft);
            return {
                ke: !1,
                gt: a,
                ri: s.Zi(a, e.Ft),
                Le: s.Dh(a),
                Ne: s.Eh(a, e.Ft),
                R: l.cr,
                Bi: o,
                Re: h
            }
        }
        Rh() {
            return null !== this.Ch || (this.Ch = new gt(this)), this.Ch
        }
        N() {
            return this.ys
        }
        hr(t) {
            const i = t.priceScaleId;
            void 0 !== i && i !== this.ys.priceScaleId && this.Qt().Vh(this, i), _(this.ys, t), void 0 !== t.priceFormat && (this.Th(), this.Qt().Bh()), this.Qt().Ih(this), this.Qt().Ah(), this.sh.Pt("options")
        }
        ht(t, i) {
            this.qt.ht(t), this.sh.Pt("data"), null !== this.Sh && (i && i.zh ? this.Sh.be() : 0 === t.length && this.Sh.Me());
            const s = this.Qt().Hn(this);
            this.Qt().Oh(s), this.Qt().Ih(this), this.Qt().Ah(), this.Qt().ar()
        }
        Lh(t) {
            const i = new vt(this, t);
            return this.bh.push(i), this.Qt().Ih(this), i
        }
        Nh(t) {
            const i = this.bh.indexOf(t); - 1 !== i && this.bh.splice(i, 1), this.Qt().Ih(this)
        }
        Wh() {
            return this.bh
        }
        Rr() {
            return this.kh
        }
        zt() {
            const t = this.Fh();
            return null === t ? null : {
                Ft: t.Ft[3],
                Hh: t.wt
            }
        }
        Fh() {
            const t = this.Qt().It().ye();
            if (null === t) return null;
            const i = t.Uh();
            return this.qt.Wr(i, 1)
        }
        Xs() {
            return this.qt
        }
        $h(t) {
            const i = this.qt.kr(t);
            return null === i ? null : "Bar" === this.kh || "Candlestick" === this.kh || "Custom" === this.kh ? {
                jh: i.Ft[0],
                qh: i.Ft[1],
                Yh: i.Ft[2],
                Kh: i.Ft[3]
            } : i.Ft[3]
        }
        Xh(t) {
            const i = [];
            Ot(this.Ph, Lt, "top", i);
            const s = this.Sh;
            return null !== s && s.Et() ? (null === this.yh && s.Se() && (this.yh = setTimeout((() => {
                this.yh = null, this.Qt().Zh()
            }), 0)), s.xe(), i.unshift(s), i) : i
        }
        Ws() {
            const t = [];
            this.Gh() || t.push(this.xh), t.push(this.sh, this.er);
            const i = this.bh.map((t => t.lr()));
            return t.push(...i), Ot(this.Ph, Lt, "normal", t), t
        }
        Jh() {
            return this.Qh(Lt, "bottom")
        }
        ta(t) {
            return this.Qh(Nt, t)
        }
        ia(t) {
            return this.Qh(Wt, t)
        }
        sa(t, i) {
            return this.Ph.map((s => s.Yn(t, i))).filter((t => null !== t))
        }
        us() {
            return [this.rr, ...this.bh.map((t => t._r()))]
        }
        Fs(t, i) {
            if (i !== this.es && !this.Gh()) return [];
            const s = [...this.vs];
            for (const t of this.bh) s.push(t.ur());
            return this.Ph.forEach((t => {
                s.push(...t.Fs())
            })), s
        }
        cs() {
            const t = [];
            return this.Ph.forEach((i => {
                t.push(...i.cs())
            })), t
        }
        Mh(t, i) {
            if (void 0 !== this.ys.autoscaleInfoProvider) {
                const s = this.ys.autoscaleInfoProvider((() => {
                    const s = this.na(t, i);
                    return null === s ? null : s.Xe()
                }));
                return dt.Ze(s)
            }
            return this.na(t, i)
        }
        ea() {
            return this.ys.priceFormat.minMove
        }
        ra() {
            return this.ha
        }
        Ns() {
            this.sh.Pt();
            for (const t of this.vs) t.Pt();
            for (const t of this.bh) t.Pt();
            this.er.Pt(), this.xh.Pt(), this.Sh?.Pt(), this.Ph.forEach((t => t.Ns()))
        }
        Wt() {
            return a(super.Wt())
        }
        At(t) {
            if (!(("Line" === this.kh || "Area" === this.kh || "Baseline" === this.kh) && this.ys.crosshairMarkerVisible)) return null;
            const i = this.qt.kr(t);
            if (null === i) return null;
            return {
                gt: i.Ft[3],
                ft: this.aa(),
                Ht: this.la(),
                Lt: this.oa(),
                Ot: this._a(t)
            }
        }
        Ie() {
            return this.ys.title
        }
        Et() {
            return this.ys.visible
        }
        ua(t) {
            this.Ph.push(new zt(t, this))
        }
        ca(t) {
            this.Ph = this.Ph.filter((i => i.oh() !== t))
        }
        da() {
            if ("Custom" === this.kh) return t => this.sh.fa(t)
        }
        pa() {
            if ("Custom" === this.kh) return t => this.sh.va(t)
        }
        ma() {
            return this.qt.jr()
        }
        Gh() {
            return !q(this.Wt().wa())
        }
        na(t, i) {
            if (!c(t) || !c(i) || this.qt.Ki()) return null;
            const s = "Line" === this.kh || "Area" === this.kh || "Baseline" === this.kh || "Histogram" === this.kh ? [3] : [2, 1],
                n = this.qt.Ur(t, i, s);
            let e = null !== n ? new ct(n.Jr, n.Qr) : null,
                r = null;
            if ("Histogram" === this.Rr()) {
                const t = this.ys.base,
                    i = new ct(t, t);
                e = null !== e ? e.vn(i) : i
            }
            return this.Ph.forEach((s => {
                const n = s.Mh(t, i);
                if (n?.priceRange) {
                    const t = new ct(n.priceRange.minValue, n.priceRange.maxValue);
                    e = null !== e ? e.vn(t) : t
                }
                n?.margins && (r = n.margins)
            })), new dt(e, r)
        }
        aa() {
            switch (this.kh) {
                case "Line":
                case "Area":
                case "Baseline":
                    return this.ys.crosshairMarkerRadius
            }
            return 0
        }
        la() {
            switch (this.kh) {
                case "Line":
                case "Area":
                case "Baseline": {
                    const t = this.ys.crosshairMarkerBorderColor;
                    if (0 !== t.length) return t
                }
            }
            return null
        }
        oa() {
            switch (this.kh) {
                case "Line":
                case "Area":
                case "Baseline":
                    return this.ys.crosshairMarkerBorderWidth
            }
            return 0
        }
        _a(t) {
            switch (this.kh) {
                case "Line":
                case "Area":
                case "Baseline": {
                    const t = this.ys.crosshairMarkerBackgroundColor;
                    if (0 !== t.length) return t
                }
            }
            return this.Rh().Dr(t).cr
        }
        Th() {
            switch (this.ys.priceFormat.type) {
                case "custom":
                    this.ha = {
                        format: this.ys.priceFormat.formatter
                    };
                    break;
                case "volume":
                    this.ha = new J(this.ys.priceFormat.precision);
                    break;
                case "percent":
                    this.ha = new G(this.ys.priceFormat.precision);
                    break;
                default: {
                    const t = Math.pow(10, this.ys.priceFormat.precision);
                    this.ha = new Z(t, this.ys.priceFormat.minMove * t)
                }
            }
            null !== this.es && this.es.ga()
        }
        Qh(t, i) {
            const s = [];
            return Ot(this.Ph, t, i, s), s
        }
    }
    const Ut = [3],
        $t = [0, 1, 2, 3];
    class jt {
        constructor(t) {
            this.ys = t
        }
        Ma(t, i, s) {
            let n = t;
            if (0 === this.ys.mode) return n;
            const e = s.ks(),
                r = e.zt();
            if (null === r) return n;
            const h = e.Nt(t, r),
                a = s.ba().filter((t => t instanceof Ht)).reduce(((t, n) => {
                    if (s.Un(n) || !n.Et()) return t;
                    const e = n.Wt(),
                        r = n.Xs();
                    if (e.Ki() || !r.Te(i)) return t;
                    const h = r.kr(i);
                    if (null === h) return t;
                    const a = l(n.zt()),
                        o = 3 === this.ys.mode ? $t : Ut;
                    return t.concat(o.map((t => e.Nt(h.Ft[t], a.Ft))))
                }), []);
            if (0 === a.length) return n;
            a.sort(((t, i) => Math.abs(t - h) - Math.abs(i - h)));
            const o = a[0];
            return n = e.Ts(o, r), n
        }
    }

    function qt(t, i, s) {
        return Math.min(Math.max(t, i), s)
    }

    function Yt(t, i, s) {
        return i - t <= s
    }

    function Kt(t) {
        const i = Math.ceil(t);
        return i % 2 == 0 ? i - 1 : i
    }
    class Xt extends y {
        constructor() {
            super(...arguments), this.qt = null
        }
        ht(t) {
            this.qt = t
        }
        et({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: e
        }) {
            if (null === this.qt) return;
            const r = Math.max(1, Math.floor(s));
            t.lineWidth = r,
                function(t, i) {
                    t.save(), t.lineWidth % 2 && t.translate(.5, .5), i(), t.restore()
                }(t, (() => {
                    const h = a(this.qt);
                    if (h.xa) {
                        t.strokeStyle = h.Sa, n(t, h.Ca), t.beginPath();
                        for (const n of h.ya) {
                            const e = Math.round(n.Pa * s);
                            t.moveTo(e, -r), t.lineTo(e, i.height + r)
                        }
                        t.stroke()
                    }
                    if (h.ka) {
                        t.strokeStyle = h.Ta, n(t, h.Ra), t.beginPath();
                        for (const s of h.Da) {
                            const n = Math.round(s.Pa * e);
                            t.moveTo(-r, n), t.lineTo(i.width + r, n)
                        }
                        t.stroke()
                    }
                }))
        }
    }
    class Zt {
        constructor(t) {
            this.Gt = new Xt, this.St = !0, this.yt = t
        }
        Pt() {
            this.St = !0
        }
        Tt() {
            if (this.St) {
                const t = this.yt.Qt().N().grid,
                    i = {
                        ka: t.horzLines.visible,
                        xa: t.vertLines.visible,
                        Ta: t.horzLines.color,
                        Sa: t.vertLines.color,
                        Ra: t.horzLines.style,
                        Ca: t.vertLines.style,
                        Da: this.yt.ks().Ea(),
                        ya: (this.yt.Qt().It().Ea() || []).map((t => ({
                            Pa: t.coord
                        })))
                    };
                this.Gt.ht(i), this.St = !1
            }
            return this.Gt
        }
    }
    class Gt {
        constructor(t) {
            this.sh = new Zt(t)
        }
        lr() {
            return this.sh
        }
    }
    const Jt = {
        Va: 4,
        Ba: 1e-4
    };

    function Qt(t, i) {
        const s = 100 * (t - i) / i;
        return i < 0 ? -s : s
    }

    function ti(t, i) {
        const s = Qt(t.$e(), i),
            n = Qt(t.je(), i);
        return new ct(s, n)
    }

    function ii(t, i) {
        const s = 100 * (t - i) / i + 100;
        return i < 0 ? -s : s
    }

    function si(t, i) {
        const s = ii(t.$e(), i),
            n = ii(t.je(), i);
        return new ct(s, n)
    }

    function ni(t, i) {
        const s = Math.abs(t);
        if (s < 1e-15) return 0;
        const n = Math.log10(s + i.Ba) + i.Va;
        return t < 0 ? -n : n
    }

    function ei(t, i) {
        const s = Math.abs(t);
        if (s < 1e-15) return 0;
        const n = Math.pow(10, s - i.Va) - i.Ba;
        return t < 0 ? -n : n
    }

    function ri(t, i) {
        if (null === t) return null;
        const s = ni(t.$e(), i),
            n = ni(t.je(), i);
        return new ct(s, n)
    }

    function hi(t, i) {
        if (null === t) return null;
        const s = ei(t.$e(), i),
            n = ei(t.je(), i);
        return new ct(s, n)
    }

    function ai(t) {
        if (null === t) return Jt;
        const i = Math.abs(t.je() - t.$e());
        if (i >= 1 || i < 1e-15) return Jt;
        const s = Math.ceil(Math.abs(Math.log10(i))),
            n = Jt.Va + s;
        return {
            Va: n,
            Ba: 1 / Math.pow(10, n)
        }
    }
    class li {
        constructor(t, i) {
            if (this.Ia = t, this.Aa = i, function(t) {
                    if (t < 0) return !1;
                    for (let i = t; i > 1; i /= 10)
                        if (i % 10 != 0) return !1;
                    return !0
                }(this.Ia)) this.za = [2, 2.5, 2];
            else {
                this.za = [];
                for (let t = this.Ia; 1 !== t;) {
                    if (t % 2 == 0) this.za.push(2), t /= 2;
                    else {
                        if (t % 5 != 0) throw new Error("unexpected base");
                        this.za.push(2, 2.5), t /= 5
                    }
                    if (this.za.length > 100) throw new Error("something wrong with base")
                }
            }
        }
        Oa(t, i, s) {
            const n = 0 === this.Ia ? 0 : 1 / this.Ia;
            let e = Math.pow(10, Math.max(0, Math.ceil(Math.log10(t - i)))),
                r = 0,
                h = this.Aa[0];
            for (;;) {
                const t = Yt(e, n, 1e-14) && e > n + 1e-14,
                    i = Yt(e, s * h, 1e-14),
                    a = Yt(e, 1, 1e-14);
                if (!(t && i && a)) break;
                e /= h, h = this.Aa[++r % this.Aa.length]
            }
            if (e <= n + 1e-14 && (e = n), e = Math.max(1, e), this.za.length > 0 && (a = e, l = 1, o = 1e-14, Math.abs(a - l) < o))
                for (r = 0, h = this.za[0]; Yt(e, s * h, 1e-14) && e > n + 1e-14;) e /= h, h = this.za[++r % this.za.length];
            var a, l, o;
            return e
        }
    }
    class oi {
        constructor(t, i, s, n) {
            this.La = [], this.qi = t, this.Ia = i, this.Na = s, this.Wa = n
        }
        Oa(t, i) {
            if (t < i) throw new Error("high < low");
            const s = this.qi.$t(),
                n = (t - i) * this.Fa() / s,
                e = new li(this.Ia, [2, 2.5, 2]),
                r = new li(this.Ia, [2, 2, 2.5]),
                h = new li(this.Ia, [2.5, 2, 2]),
                a = [];
            return a.push(e.Oa(t, i, n), r.Oa(t, i, n), h.Oa(t, i, n)),
                function(t) {
                    if (t.length < 1) throw Error("array is empty");
                    let i = t[0];
                    for (let s = 1; s < t.length; ++s) t[s] < i && (i = t[s]);
                    return i
                }(a)
        }
        Ha() {
            const t = this.qi,
                i = t.zt();
            if (null === i) return void(this.La = []);
            const s = t.$t(),
                n = this.Na(s - 1, i),
                e = this.Na(0, i),
                r = this.qi.N().entireTextOnly ? this.Ua() / 2 : 0,
                h = r,
                a = s - 1 - r,
                l = Math.max(n, e),
                o = Math.min(n, e);
            if (l === o) return void(this.La = []);
            const _ = this.Oa(l, o);
            if (this.$a(i, _, l, o, h, a), t.ja() && this.qa(_, o, l)) {
                const t = this.qi.Ya();
                this.Ka(i, _, h, a, t, 2 * t)
            }
        }
        Ea() {
            return this.La
        }
        Ua() {
            return this.qi.P()
        }
        Fa() {
            return Math.ceil(2.5 * this.Ua())
        }
        $a(t, i, s, n, e, r) {
            const h = this.La,
                a = this.qi;
            let l = s % i;
            l += l < 0 ? i : 0;
            const o = s >= n ? 1 : -1;
            let _ = null,
                u = 0;
            for (let c = s - l; c > n; c -= i) {
                const s = this.Wa(c, t, !0);
                null !== _ && Math.abs(s - _) < this.Fa() || (s < e || s > r || (u < h.length ? (h[u].Pa = s, h[u].Xa = a.Za(c)) : h.push({
                    Pa: s,
                    Xa: a.Za(c)
                }), u++, _ = s, a.Ga() && (i = this.Oa(c * o, n))))
            }
            h.length = u
        }
        Ka(t, i, s, n, e, r) {
            const h = this.La,
                a = this.Ja(t, s, e, r),
                l = this.Ja(t, n, -r, -e),
                o = this.Wa(0, t, !0) - this.Wa(i, t, !0);
            h.length > 0 && h[0].Pa - a.Pa < o / 2 && h.shift(), h.length > 0 && l.Pa - h[h.length - 1].Pa < o / 2 && h.pop(), h.unshift(a), h.push(l)
        }
        Ja(t, i, s, n) {
            const e = (s + n) / 2,
                r = this.Na(i + s, t),
                h = this.Na(i + n, t),
                a = Math.min(r, h),
                l = Math.max(r, h),
                o = Math.max(.1, this.Oa(l, a)),
                _ = this.Na(i + e, t),
                u = _ - _ % o,
                c = this.Wa(u, t, !0);
            return {
                Xa: this.qi.Za(u),
                Pa: c
            }
        }
        qa(t, i, s) {
            let n = l(this.qi.Qe());
            return this.qi.Ga() && (n = hi(n, this.qi.Qa())), n.$e() - i < t && s - n.je() < t
        }
    }

    function _i(t) {
        return t.slice().sort(((t, i) => a(t.hs()) - a(i.hs())))
    }
    var ui;
    ! function(t) {
        t[t.Normal = 0] = "Normal", t[t.Logarithmic = 1] = "Logarithmic", t[t.Percentage = 2] = "Percentage", t[t.IndexedTo100 = 3] = "IndexedTo100"
    }(ui || (ui = {}));
    const ci = new G,
        di = new Z(100, 1);
    class fi {
        constructor(t, i, s, n, e) {
            this.tl = 0, this.il = null, this.Ge = null, this.sl = null, this.nl = {
                el: !1,
                rl: null
            }, this.hl = !1, this.al = 0, this.ll = 0, this.ol = new o, this._l = new o, this.ul = [], this.cl = null, this.dl = null, this.fl = null, this.pl = null, this.vl = null, this.ha = di, this.ml = ai(null), this.wl = t, this.ys = i, this.gl = s, this.Ml = n, this.bl = e, this.xl = new oi(this, 100, this.Sl.bind(this), this.Cl.bind(this))
        }
        wa() {
            return this.wl
        }
        N() {
            return this.ys
        }
        hr(t) {
            if (_(this.ys, t), this.ga(), void 0 !== t.mode && this.yl({
                    ie: t.mode
                }), void 0 !== t.scaleMargins) {
                const i = h(t.scaleMargins.top),
                    s = h(t.scaleMargins.bottom);
                if (i < 0 || i > 1) throw new Error(`Invalid top margin - expect value between 0 and 1, given=${i}`);
                if (s < 0 || s > 1) throw new Error(`Invalid bottom margin - expect value between 0 and 1, given=${s}`);
                if (i + s > 1) throw new Error(`Invalid margins - sum of margins must be less than 1, given=${i + s}`);
                this.Pl(), this.fl = null
            }
        }
        kl() {
            return this.ys.autoScale
        }
        Tl() {
            return this.hl
        }
        Ga() {
            return 1 === this.ys.mode
        }
        Oe() {
            return 2 === this.ys.mode
        }
        Rl() {
            return 3 === this.ys.mode
        }
        Qa() {
            return this.ml
        }
        ie() {
            return {
                sn: this.ys.autoScale,
                Dl: this.ys.invertScale,
                ie: this.ys.mode
            }
        }
        yl(t) {
            const i = this.ie();
            let s = null;
            void 0 !== t.sn && (this.ys.autoScale = t.sn), void 0 !== t.ie && (this.ys.mode = t.ie, 2 !== t.ie && 3 !== t.ie || (this.ys.autoScale = !0), this.nl.el = !1), 1 === i.ie && t.ie !== i.ie && (! function(t, i) {
                if (null === t) return !1;
                const s = ei(t.$e(), i),
                    n = ei(t.je(), i);
                return isFinite(s) && isFinite(n)
            }(this.Ge, this.ml) ? this.ys.autoScale = !0 : (s = hi(this.Ge, this.ml), null !== s && this.El(s))), 1 === t.ie && t.ie !== i.ie && (s = ri(this.Ge, this.ml), null !== s && this.El(s));
            const n = i.ie !== this.ys.mode;
            n && (2 === i.ie || this.Oe()) && this.ga(), n && (3 === i.ie || this.Rl()) && this.ga(), void 0 !== t.Dl && i.Dl !== t.Dl && (this.ys.invertScale = t.Dl, this.Vl()), this._l.p(i, this.ie())
        }
        Bl() {
            return this._l
        }
        P() {
            return this.gl.fontSize
        }
        $t() {
            return this.tl
        }
        Il(t) {
            this.tl !== t && (this.tl = t, this.Pl(), this.fl = null)
        }
        Al() {
            if (this.il) return this.il;
            const t = this.$t() - this.zl() - this.Ol();
            return this.il = t, t
        }
        Qe() {
            return this.Ll(), this.Ge
        }
        El(t, i) {
            const s = this.Ge;
            (i || null === s && null !== t || null !== s && !s.He(t)) && (this.fl = null, this.Ge = t)
        }
        Nl(t) {
            this.El(t), this.Wl(null !== t)
        }
        Ki() {
            return this.Ll(), 0 === this.tl || !this.Ge || this.Ge.Ki()
        }
        Fl(t) {
            return this.Dl() ? t : this.$t() - 1 - t
        }
        Nt(t, i) {
            return this.Oe() ? t = Qt(t, i) : this.Rl() && (t = ii(t, i)), this.Cl(t, i)
        }
        Hl(t, i, s) {
            this.Ll();
            const n = this.Ol(),
                e = a(this.Qe()),
                r = e.$e(),
                h = e.je(),
                l = this.Al() - 1,
                o = this.Dl(),
                _ = l / (h - r),
                u = void 0 === s ? 0 : s.from,
                c = void 0 === s ? t.length : s.to,
                d = this.Ul();
            for (let s = u; s < c; s++) {
                const e = t[s],
                    h = e.gt;
                if (isNaN(h)) continue;
                let a = h;
                null !== d && (a = d(e.gt, i));
                const l = n + _ * (a - r),
                    u = o ? l : this.tl - 1 - l;
                e.ut = u
            }
        }
        $l(t, i, s) {
            this.Ll();
            const n = this.Ol(),
                e = a(this.Qe()),
                r = e.$e(),
                h = e.je(),
                l = this.Al() - 1,
                o = this.Dl(),
                _ = l / (h - r),
                u = void 0 === s ? 0 : s.from,
                c = void 0 === s ? t.length : s.to,
                d = this.Ul();
            for (let s = u; s < c; s++) {
                const e = t[s];
                let h = e.jh,
                    a = e.qh,
                    l = e.Yh,
                    u = e.Kh;
                null !== d && (h = d(e.jh, i), a = d(e.qh, i), l = d(e.Yh, i), u = d(e.Kh, i));
                let c = n + _ * (h - r),
                    f = o ? c : this.tl - 1 - c;
                e.jl = f, c = n + _ * (a - r), f = o ? c : this.tl - 1 - c, e.ql = f, c = n + _ * (l - r), f = o ? c : this.tl - 1 - c, e.Yl = f, c = n + _ * (u - r), f = o ? c : this.tl - 1 - c, e.Kl = f
            }
        }
        Ts(t, i) {
            const s = this.Sl(t, i);
            return this.Xl(s, i)
        }
        Xl(t, i) {
            let s = t;
            return this.Oe() ? s = function(t, i) {
                return i < 0 && (t = -t), t / 100 * i + i
            }(s, i) : this.Rl() && (s = function(t, i) {
                return t -= 100, i < 0 && (t = -t), t / 100 * i + i
            }(s, i)), s
        }
        ba() {
            return this.ul
        }
        Dt() {
            return this.dl || (this.dl = _i(this.ul)), this.dl
        }
        Zl(t) {
            -1 === this.ul.indexOf(t) && (this.ul.push(t), this.ga(), this.Gl())
        }
        Jl(t) {
            const i = this.ul.indexOf(t);
            if (-1 === i) throw new Error("source is not attached to scale");
            this.ul.splice(i, 1), 0 === this.ul.length && (this.yl({
                sn: !0
            }), this.El(null)), this.ga(), this.Gl()
        }
        zt() {
            let t = null;
            for (const i of this.ul) {
                const s = i.zt();
                null !== s && ((null === t || s.Hh < t.Hh) && (t = s))
            }
            return null === t ? null : t.Ft
        }
        Dl() {
            return this.ys.invertScale
        }
        Ea() {
            const t = null === this.zt();
            if (null !== this.fl && (t || this.fl.Ql === t)) return this.fl.Ea;
            this.xl.Ha();
            const i = this.xl.Ea();
            return this.fl = {
                Ea: i,
                Ql: t
            }, this.ol.p(), i
        }
        io() {
            return this.ol
        }
        so(t) {
            this.Oe() || this.Rl() || null === this.pl && null === this.sl && (this.Ki() || (this.pl = this.tl - t, this.sl = a(this.Qe()).Ue()))
        }
        no(t) {
            if (this.Oe() || this.Rl()) return;
            if (null === this.pl) return;
            this.yl({
                sn: !1
            }), (t = this.tl - t) < 0 && (t = 0);
            let i = (this.pl + .2 * (this.tl - 1)) / (t + .2 * (this.tl - 1));
            const s = a(this.sl).Ue();
            i = Math.max(i, .1), s.Ye(i), this.El(s)
        }
        eo() {
            this.Oe() || this.Rl() || (this.pl = null, this.sl = null)
        }
        ro(t) {
            this.kl() || null === this.vl && null === this.sl && (this.Ki() || (this.vl = t, this.sl = a(this.Qe()).Ue()))
        }
        ho(t) {
            if (this.kl()) return;
            if (null === this.vl) return;
            const i = a(this.Qe()).qe() / (this.Al() - 1);
            let s = t - this.vl;
            this.Dl() && (s *= -1);
            const n = s * i,
                e = a(this.sl).Ue();
            e.Ke(n), this.El(e, !0), this.fl = null
        }
        ao() {
            this.kl() || null !== this.vl && (this.vl = null, this.sl = null)
        }
        ra() {
            return this.ha || this.ga(), this.ha
        }
        Zi(t, i) {
            switch (this.ys.mode) {
                case 2:
                    return this.lo(Qt(t, i));
                case 3:
                    return this.ra().format(ii(t, i));
                default:
                    return this.nr(t)
            }
        }
        Za(t) {
            switch (this.ys.mode) {
                case 2:
                    return this.lo(t);
                case 3:
                    return this.ra().format(t);
                default:
                    return this.nr(t)
            }
        }
        Dh(t) {
            return this.nr(t, a(this.cl).ra())
        }
        Eh(t, i) {
            return t = Qt(t, i), this.lo(t, ci)
        }
        oo() {
            return this.ul
        }
        _o(t) {
            this.nl = {
                rl: t,
                el: !1
            }
        }
        Ns() {
            this.ul.forEach((t => t.Ns()))
        }
        ja() {
            return this.ys.ensureEdgeTickMarksVisible && this.kl()
        }
        Ya() {
            return this.P() / 2
        }
        ga() {
            this.fl = null;
            let t = 1 / 0;
            this.cl = null;
            for (const i of this.ul) i.hs() < t && (t = i.hs(), this.cl = i);
            let i = 100;
            null !== this.cl && (i = Math.round(1 / this.cl.ea())), this.ha = di, this.Oe() ? (this.ha = ci, i = 100) : this.Rl() ? (this.ha = new Z(100, 1), i = 100) : null !== this.cl && (this.ha = this.cl.ra()), this.xl = new oi(this, i, this.Sl.bind(this), this.Cl.bind(this)), this.xl.Ha()
        }
        Gl() {
            this.dl = null
        }
        Xi() {
            return this.bl
        }
        Wl(t) {
            this.hl = t
        }
        zl() {
            return this.Dl() ? this.ys.scaleMargins.bottom * this.$t() + this.ll : this.ys.scaleMargins.top * this.$t() + this.al
        }
        Ol() {
            return this.Dl() ? this.ys.scaleMargins.top * this.$t() + this.al : this.ys.scaleMargins.bottom * this.$t() + this.ll
        }
        Ll() {
            this.nl.el || (this.nl.el = !0, this.uo())
        }
        Pl() {
            this.il = null
        }
        Cl(t, i) {
            if (this.Ll(), this.Ki()) return 0;
            t = this.Ga() && t ? ni(t, this.ml) : t;
            const s = a(this.Qe()),
                n = this.Ol() + (this.Al() - 1) * (t - s.$e()) / s.qe();
            return this.Fl(n)
        }
        Sl(t, i) {
            if (this.Ll(), this.Ki()) return 0;
            const s = this.Fl(t),
                n = a(this.Qe()),
                e = n.$e() + n.qe() * ((s - this.Ol()) / (this.Al() - 1));
            return this.Ga() ? ei(e, this.ml) : e
        }
        Vl() {
            this.fl = null, this.xl.Ha()
        }
        uo() {
            if (this.Tl() && !this.kl()) return;
            const t = this.nl.rl;
            if (null === t) return;
            let i = null;
            const s = this.oo();
            let n = 0,
                e = 0;
            for (const r of s) {
                if (!r.Et()) continue;
                const s = r.zt();
                if (null === s) continue;
                const h = r.Mh(t.Uh(), t.bi());
                let l = h && h.Qe();
                if (null !== l) {
                    switch (this.ys.mode) {
                        case 1:
                            l = ri(l, this.ml);
                            break;
                        case 2:
                            l = ti(l, s.Ft);
                            break;
                        case 3:
                            l = si(l, s.Ft)
                    }
                    if (i = null === i ? l : i.vn(a(l)), null !== h) {
                        const t = h.tr();
                        null !== t && (n = Math.max(n, t.above), e = Math.max(e, t.below))
                    }
                }
            }
            if (this.ja() && (n = Math.max(n, this.Ya()), e = Math.max(e, this.Ya())), n === this.al && e === this.ll || (this.al = n, this.ll = e, this.fl = null, this.Pl()), null !== i) {
                if (i.$e() === i.je()) {
                    const t = this.cl,
                        s = 5 * (null === t || this.Oe() || this.Rl() ? 1 : t.ea());
                    this.Ga() && (i = hi(i, this.ml)), i = new ct(i.$e() - s, i.je() + s), this.Ga() && (i = ri(i, this.ml))
                }
                if (this.Ga()) {
                    const t = hi(i, this.ml),
                        s = ai(t);
                    if (r = s, h = this.ml, r.Va !== h.Va || r.Ba !== h.Ba) {
                        const n = null !== this.sl ? hi(this.sl, this.ml) : null;
                        this.ml = s, i = ri(t, s), null !== n && (this.sl = ri(n, s))
                    }
                }
                this.El(i)
            } else null === this.Ge && (this.El(new ct(-.5, .5)), this.ml = ai(null));
            var r, h
        }
        Ul() {
            return this.Oe() ? Qt : this.Rl() ? ii : this.Ga() ? t => ni(t, this.ml) : null
        }
        co(t, i, s) {
            return void 0 === i ? (void 0 === s && (s = this.ra()), s.format(t)) : i(t)
        }
        nr(t, i) {
            return this.co(t, this.Ml.priceFormatter, i)
        }
        lo(t, i) {
            return this.co(t, this.Ml.percentageFormatter, i)
        }
    }

    function pi(t) {
        return t instanceof Ht
    }
    class vi {
        constructor(t, i) {
            this.ul = [], this.do = new Map, this.tl = 0, this.fo = 0, this.po = 1e3, this.dl = null, this.vo = new o, this.Ph = [], this.uh = t, this.ts = i, this.mo = new Gt(this);
            const s = i.N();
            this.wo = this.Mo("left", s.leftPriceScale), this.bo = this.Mo("right", s.rightPriceScale), this.wo.Bl().i(this.xo.bind(this, this.wo), this), this.bo.Bl().i(this.xo.bind(this, this.bo), this), this.So(s)
        }
        So(t) {
            if (t.leftPriceScale && this.wo.hr(t.leftPriceScale), t.rightPriceScale && this.bo.hr(t.rightPriceScale), t.localization && (this.wo.ga(), this.bo.ga()), t.overlayPriceScales) {
                const i = Array.from(this.do.values());
                for (const s of i) {
                    const i = a(s[0].Wt());
                    i.hr(t.overlayPriceScales), t.localization && i.ga()
                }
            }
        }
        Co(t) {
            switch (t) {
                case "left":
                    return this.wo;
                case "right":
                    return this.bo
            }
            return this.do.has(t) ? h(this.do.get(t))[0].Wt() : null
        }
        m() {
            this.Qt().yo().u(this), this.wo.Bl().u(this), this.bo.Bl().u(this), this.ul.forEach((t => {
                t.m && t.m()
            })), this.Ph = this.Ph.filter((t => {
                const i = t.oh();
                return i.detached && i.detached(), !1
            })), this.vo.p()
        }
        Po() {
            return this.po
        }
        ko(t) {
            this.po = t
        }
        Qt() {
            return this.ts
        }
        Qi() {
            return this.fo
        }
        $t() {
            return this.tl
        }
        To(t) {
            this.fo = t, this.Ro()
        }
        Il(t) {
            this.tl = t, this.wo.Il(t), this.bo.Il(t), this.ul.forEach((i => {
                if (this.Un(i)) {
                    const s = i.Wt();
                    null !== s && s.Il(t)
                }
            })), this.Ro()
        }
        Do() {
            return this.ul.filter(pi)
        }
        ba() {
            return this.ul
        }
        Un(t) {
            const i = t.Wt();
            return null === i || this.wo !== i && this.bo !== i
        }
        Zl(t, i, s) {
            this.Eo(t, i, s ? t.hs() : this.ul.length)
        }
        Jl(t, i) {
            const s = this.ul.indexOf(t);
            r(-1 !== s, "removeDataSource: invalid data source"), this.ul.splice(s, 1), i || this.ul.forEach(((t, i) => t.ls(i)));
            const n = a(t.Wt()).wa();
            if (this.do.has(n)) {
                const i = h(this.do.get(n)),
                    s = i.indexOf(t); - 1 !== s && (i.splice(s, 1), 0 === i.length && this.do.delete(n))
            }
            const e = t.Wt();
            e && e.ba().indexOf(t) >= 0 && (e.Jl(t), this.Vo(e)), this.dl = null
        }
        jn(t) {
            return t === this.wo ? "left" : t === this.bo ? "right" : "overlay"
        }
        Bo() {
            return this.wo
        }
        Io() {
            return this.bo
        }
        Ao(t, i) {
            t.so(i)
        }
        zo(t, i) {
            t.no(i), this.Ro()
        }
        Oo(t) {
            t.eo()
        }
        Lo(t, i) {
            t.ro(i)
        }
        No(t, i) {
            t.ho(i), this.Ro()
        }
        Wo(t) {
            t.ao()
        }
        Ro() {
            this.ul.forEach((t => {
                t.Ns()
            }))
        }
        ks() {
            let t = null;
            return this.ts.N().rightPriceScale.visible && 0 !== this.bo.ba().length ? t = this.bo : this.ts.N().leftPriceScale.visible && 0 !== this.wo.ba().length ? t = this.wo : 0 !== this.ul.length && (t = this.ul[0].Wt()), null === t && (t = this.bo), t
        }
        $n() {
            let t = null;
            return this.ts.N().rightPriceScale.visible ? t = this.bo : this.ts.N().leftPriceScale.visible && (t = this.wo), t
        }
        Vo(t) {
            null !== t && t.kl() && this.Fo(t)
        }
        Ho(t) {
            const i = this.uh.ye();
            t.yl({
                sn: !0
            }), null !== i && t._o(i), this.Ro()
        }
        Uo() {
            this.Fo(this.wo), this.Fo(this.bo)
        }
        $o() {
            this.Vo(this.wo), this.Vo(this.bo), this.ul.forEach((t => {
                this.Un(t) && this.Vo(t.Wt())
            })), this.Ro(), this.ts.ar()
        }
        Dt() {
            return null === this.dl && (this.dl = _i(this.ul)), this.dl
        }
        jo(t, i) {
            i = qt(i, 0, this.ul.length - 1);
            const s = this.ul.indexOf(t);
            r(-1 !== s, "setSeriesOrder: invalid data source"), this.ul.splice(s, 1), this.ul.splice(i, 0, t), this.ul.forEach(((t, i) => t.ls(i))), this.dl = null;
            for (const t of [this.wo, this.bo]) t.Gl(), t.ga();
            this.ts.ar()
        }
        Vt() {
            return this.Dt().filter(pi)
        }
        qo() {
            return this.vo
        }
        Yo() {
            return this.mo
        }
        ua(t) {
            this.Ph.push(new Dt(t))
        }
        ca(t) {
            this.Ph = this.Ph.filter((i => i.oh() !== t)), t.detached && t.detached(), this.ts.ar()
        }
        Ko() {
            return this.Ph
        }
        sa(t, i) {
            return this.Ph.map((s => s.Yn(t, i))).filter((t => null !== t))
        }
        Fo(t) {
            const i = t.oo();
            if (i && i.length > 0 && !this.uh.Ki()) {
                const i = this.uh.ye();
                null !== i && t._o(i)
            }
            t.Ns()
        }
        Eo(t, i, s) {
            let n = this.Co(i);
            if (null === n && (n = this.Mo(i, this.ts.N().overlayPriceScales)), this.ul.splice(s, 0, t), !q(i)) {
                const s = this.do.get(i) || [];
                s.push(t), this.do.set(i, s)
            }
            t.ls(s), n.Zl(t), t._s(n), this.Vo(n), this.dl = null
        }
        xo(t, i, s) {
            i.ie !== s.ie && this.Fo(t)
        }
        Mo(t, i) {
            const s = {
                    visible: !0,
                    autoScale: !0,
                    ...p(i)
                },
                n = new fi(t, s, this.ts.N().layout, this.ts.N().localization, this.ts.Xi());
            return n.Il(this.$t()), n
        }
    }

    function mi(t) {
        return {
            Xo: t.Xo,
            Zo: {
                Kn: t.Go.externalId
            },
            Jo: t.Go.cursorStyle
        }
    }

    function wi(t, i, s, n) {
        for (const e of t) {
            const t = e.Tt(n);
            if (null !== t && t.Yn) {
                const n = t.Yn(i, s);
                if (null !== n) return {
                    Qo: e,
                    Zo: n
                }
            }
        }
        return null
    }

    function gi(t) {
        return void 0 !== t.Ws
    }

    function Mi(t, i, s) {
        const n = [t, ...t.Dt()],
            e = function(t, i, s) {
                let n, e;
                for (const a of t) {
                    const t = a.sa?.(i, s) ?? [];
                    for (const i of t) r = i.zOrder, h = n?.zOrder, (!h || "top" === r && "top" !== h || "normal" === r && "bottom" === h) && (n = i, e = a)
                }
                var r, h;
                return n && e ? {
                    Go: n,
                    Xo: e
                } : null
            }(n, i, s);
        if ("top" === e?.Go.zOrder) return mi(e);
        for (const r of n) {
            if (e && e.Xo === r && "bottom" !== e.Go.zOrder && !e.Go.isBackground) return mi(e);
            if (gi(r)) {
                const n = wi(r.Ws(t), i, s, t);
                if (null !== n) return {
                    Xo: r,
                    Qo: n.Qo,
                    Zo: n.Zo
                }
            }
            if (e && e.Xo === r && "bottom" !== e.Go.zOrder && e.Go.isBackground) return mi(e)
        }
        return e?.Go ? mi(e) : null
    }
    class bi {
        constructor(t, i, s = 50) {
            this.Pn = 0, this.kn = 1, this.Tn = 1, this.Dn = new Map, this.Rn = new Map, this.t_ = t, this.i_ = i, this.En = s
        }
        s_(t) {
            const i = t.time,
                s = this.i_.cacheKey(i),
                n = this.Dn.get(s);
            if (void 0 !== n) return n.n_;
            if (this.Pn === this.En) {
                const t = this.Rn.get(this.Tn);
                this.Rn.delete(this.Tn), this.Dn.delete(h(t)), this.Tn++, this.Pn--
            }
            const e = this.t_(t);
            return this.Dn.set(s, {
                n_: e,
                An: this.kn
            }), this.Rn.set(this.kn, s), this.Pn++, this.kn++, e
        }
    }
    class xi {
        constructor(t, i) {
            r(t <= i, "right should be >= left"), this.e_ = t, this.r_ = i
        }
        Uh() {
            return this.e_
        }
        bi() {
            return this.r_
        }
        h_() {
            return this.r_ - this.e_ + 1
        }
        Te(t) {
            return this.e_ <= t && t <= this.r_
        }
        He(t) {
            return this.e_ === t.Uh() && this.r_ === t.bi()
        }
    }

    function Si(t, i) {
        return null === t || null === i ? t === i : t.He(i)
    }
    class Ci {
        constructor() {
            this.a_ = new Map, this.Dn = null, this.l_ = !1
        }
        o_(t) {
            this.l_ = t, this.Dn = null
        }
        __(t, i) {
            this.u_(i), this.Dn = null;
            for (let s = i; s < t.length; ++s) {
                const i = t[s];
                let n = this.a_.get(i.timeWeight);
                void 0 === n && (n = [], this.a_.set(i.timeWeight, n)), n.push({
                    index: s,
                    time: i.time,
                    weight: i.timeWeight,
                    originalTime: i.originalTime
                })
            }
        }
        c_(t, i, s, n, e) {
            const r = Math.ceil(i / t);
            return null !== this.Dn && this.Dn.d_ === r && e === this.Dn.f_ && s === this.Dn.p_ || (this.Dn = {
                f_: e,
                p_: s,
                Ea: this.v_(r, s, n),
                d_: r
            }), this.Dn.Ea
        }
        u_(t) {
            if (0 === t) return void this.a_.clear();
            const i = [];
            this.a_.forEach(((s, n) => {
                t <= s[0].index ? i.push(n) : s.splice(bt(s, t, (i => i.index < t)), 1 / 0)
            }));
            for (const t of i) this.a_.delete(t)
        }
        v_(t, i, s) {
            let n = [];
            const e = t => !i || s.has(t.index);
            for (const i of Array.from(this.a_.keys()).sort(((t, i) => i - t))) {
                if (!this.a_.get(i)) continue;
                const s = n;
                n = [];
                const r = s.length;
                let a = 0;
                const l = h(this.a_.get(i)),
                    o = l.length;
                let _ = 1 / 0,
                    u = -1 / 0;
                for (let i = 0; i < o; i++) {
                    const h = l[i],
                        o = h.index;
                    for (; a < r;) {
                        const t = s[a],
                            i = t.index;
                        if (!(i < o && e(t))) {
                            _ = i;
                            break
                        }
                        a++, n.push(t), u = i, _ = 1 / 0
                    }
                    if (_ - o >= t && o - u >= t && e(h)) n.push(h), u = o;
                    else if (this.l_) return s
                }
                for (; a < r; a++) e(s[a]) && n.push(s[a])
            }
            return n
        }
    }
    class yi {
        constructor(t) {
            this.m_ = t
        }
        w_() {
            return null === this.m_ ? null : new xi(Math.floor(this.m_.Uh()), Math.ceil(this.m_.bi()))
        }
        g_() {
            return this.m_
        }
        static M_() {
            return new yi(null)
        }
    }

    function Pi(t, i) {
        return t.weight > i.weight ? t : i
    }
    class ki {
        constructor(t, i, s, n) {
            this.fo = 0, this.b_ = null, this.x_ = [], this.vl = null, this.pl = null, this.S_ = new Ci, this.C_ = new Map, this.y_ = yi.M_(), this.P_ = !0, this.k_ = new o, this.T_ = new o, this.R_ = new o, this.D_ = null, this.E_ = null, this.V_ = new Map, this.B_ = -1, this.I_ = [], this.ys = i, this.Ml = s, this.A_ = i.rightOffset, this.z_ = i.barSpacing, this.ts = t, this.i_ = n, this.O_(), this.S_.o_(i.uniformDistribution), this.L_()
        }
        N() {
            return this.ys
        }
        N_(t) {
            _(this.Ml, t), this.W_(), this.O_()
        }
        hr(t, i) {
            _(this.ys, t), this.ys.fixLeftEdge && this.F_(), this.ys.fixRightEdge && this.H_(), void 0 !== t.barSpacing && this.ts.dn(t.barSpacing), void 0 !== t.rightOffset && this.ts.fn(t.rightOffset), void 0 === t.minBarSpacing && void 0 === t.maxBarSpacing || this.ts.dn(t.barSpacing ?? this.z_), void 0 !== t.ignoreWhitespaceIndices && t.ignoreWhitespaceIndices !== this.ys.ignoreWhitespaceIndices && this.L_(), this.W_(), this.O_(), this.R_.p()
        }
        Rs(t) {
            return this.x_[t]?.time ?? null
        }
        ss(t) {
            return this.x_[t] ?? null
        }
        U_(t, i) {
            if (this.x_.length < 1) return null;
            if (this.i_.key(t) > this.i_.key(this.x_[this.x_.length - 1].time)) return i ? this.x_.length - 1 : null;
            const s = bt(this.x_, this.i_.key(t), ((t, i) => this.i_.key(t.time) < i));
            return this.i_.key(t) < this.i_.key(this.x_[s].time) ? i ? s : null : s
        }
        Ki() {
            return 0 === this.fo || 0 === this.x_.length || null === this.b_
        }
        j_() {
            return this.x_.length > 0
        }
        ye() {
            return this.q_(), this.y_.w_()
        }
        Y_() {
            return this.q_(), this.y_.g_()
        }
        K_() {
            const t = this.ye();
            if (null === t) return null;
            const i = {
                from: t.Uh(),
                to: t.bi()
            };
            return this.X_(i)
        }
        X_(t) {
            const i = Math.round(t.from),
                s = Math.round(t.to),
                n = a(this.Z_()),
                e = a(this.G_());
            return {
                from: a(this.ss(Math.max(n, i))),
                to: a(this.ss(Math.min(e, s)))
            }
        }
        J_(t) {
            return {
                from: a(this.U_(t.from, !0)),
                to: a(this.U_(t.to, !0))
            }
        }
        Qi() {
            return this.fo
        }
        To(t) {
            if (!isFinite(t) || t <= 0) return;
            if (this.fo === t) return;
            const i = this.Y_(),
                s = this.fo;
            if (this.fo = t, this.P_ = !0, this.ys.lockVisibleTimeRangeOnResize && 0 !== s) {
                const i = this.z_ * t / s;
                this.z_ = i
            }
            if (this.ys.fixLeftEdge && null !== i && i.Uh() <= 0) {
                const i = s - t;
                this.A_ -= Math.round(i / this.z_) + 1, this.P_ = !0
            }
            this.Q_(), this.tu()
        }
        jt(t) {
            if (this.Ki() || !c(t)) return 0;
            const i = this.iu() + this.A_ - t;
            return this.fo - (i + .5) * this.z_ - 1
        }
        su(t, i) {
            const s = this.iu(),
                n = void 0 === i ? 0 : i.from,
                e = void 0 === i ? t.length : i.to;
            for (let i = n; i < e; i++) {
                const n = t[i].wt,
                    e = s + this.A_ - n,
                    r = this.fo - (e + .5) * this.z_ - 1;
                t[i]._t = r
            }
        }
        nu(t, i) {
            const s = Math.ceil(this.eu(t));
            return i && this.ys.ignoreWhitespaceIndices && !this.ru(s) ? this.hu(s) : s
        }
        fn(t) {
            this.P_ = !0, this.A_ = t, this.tu(), this.ts.au(), this.ts.ar()
        }
        lu() {
            return this.z_
        }
        dn(t) {
            this.ou(t), this.tu(), this.ts.au(), this.ts.ar()
        }
        _u() {
            return this.A_
        }
        Ea() {
            if (this.Ki()) return null;
            if (null !== this.E_) return this.E_;
            const t = this.z_,
                i = 5 * (this.ts.N().layout.fontSize + 4) / 8 * (this.ys.tickMarkMaxCharacterLength || 8),
                s = Math.round(i / t),
                n = a(this.ye()),
                e = Math.max(n.Uh(), n.Uh() - s),
                r = Math.max(n.bi(), n.bi() - s),
                h = this.S_.c_(t, i, this.ys.ignoreWhitespaceIndices, this.V_, this.B_),
                l = this.Z_() + s,
                o = this.G_() - s,
                _ = this.uu(),
                u = this.ys.fixLeftEdge || _,
                c = this.ys.fixRightEdge || _;
            let d = 0;
            for (const t of h) {
                if (!(e <= t.index && t.index <= r)) continue;
                let s;
                d < this.I_.length ? (s = this.I_[d], s.coord = this.jt(t.index), s.label = this.cu(t), s.weight = t.weight) : (s = {
                    needAlignCoordinate: !1,
                    coord: this.jt(t.index),
                    label: this.cu(t),
                    weight: t.weight
                }, this.I_.push(s)), this.z_ > i / 2 && !_ ? s.needAlignCoordinate = !1 : s.needAlignCoordinate = u && t.index <= l || c && t.index >= o, d++
            }
            return this.I_.length = d, this.E_ = this.I_, this.I_
        }
        du() {
            this.P_ = !0, this.dn(this.ys.barSpacing), this.fn(this.ys.rightOffset)
        }
        fu(t) {
            this.P_ = !0, this.b_ = t, this.tu(), this.F_()
        }
        pu(t, i) {
            const s = this.eu(t),
                n = this.lu(),
                e = n + i * (n / 10);
            this.dn(e), this.ys.rightBarStaysOnScroll || this.fn(this._u() + (s - this.eu(t)))
        }
        so(t) {
            this.vl && this.ao(), null === this.pl && null === this.D_ && (this.Ki() || (this.pl = t, this.vu()))
        }
        no(t) {
            if (null === this.D_) return;
            const i = qt(this.fo - t, 0, this.fo),
                s = qt(this.fo - a(this.pl), 0, this.fo);
            0 !== i && 0 !== s && this.dn(this.D_.lu * i / s)
        }
        eo() {
            null !== this.pl && (this.pl = null, this.mu())
        }
        ro(t) {
            null === this.vl && null === this.D_ && (this.Ki() || (this.vl = t, this.vu()))
        }
        ho(t) {
            if (null === this.vl) return;
            const i = (this.vl - t) / this.lu();
            this.A_ = a(this.D_)._u + i, this.P_ = !0, this.tu()
        }
        ao() {
            null !== this.vl && (this.vl = null, this.mu())
        }
        wu() {
            this.gu(this.ys.rightOffset)
        }
        gu(t, i = 400) {
            if (!isFinite(t)) throw new RangeError("offset is required and must be finite number");
            if (!isFinite(i) || i <= 0) throw new RangeError("animationDuration (optional) must be finite positive number");
            const s = this.A_,
                n = performance.now();
            this.ts._n({
                Mu: t => (t - n) / i >= 1,
                bu: e => {
                    const r = (e - n) / i;
                    return r >= 1 ? t : s + (t - s) * r
                }
            })
        }
        Pt(t, i) {
            this.P_ = !0, this.x_ = t, this.S_.__(t, i), this.tu()
        }
        xu() {
            return this.k_
        }
        Su() {
            return this.T_
        }
        Cu() {
            return this.R_
        }
        iu() {
            return this.b_ || 0
        }
        yu(t) {
            const i = t.h_();
            this.ou(this.fo / i), this.A_ = t.bi() - this.iu(), this.tu(), this.P_ = !0, this.ts.au(), this.ts.ar()
        }
        Pu() {
            const t = this.Z_(),
                i = this.G_();
            null !== t && null !== i && this.yu(new xi(t, i + this.ys.rightOffset))
        }
        ku(t) {
            const i = new xi(t.from, t.to);
            this.yu(i)
        }
        ns(t) {
            return void 0 !== this.Ml.timeFormatter ? this.Ml.timeFormatter(t.originalTime) : this.i_.formatHorzItem(t.time)
        }
        L_() {
            if (!this.ys.ignoreWhitespaceIndices) return;
            this.V_.clear();
            const t = this.ts.Ys();
            for (const i of t)
                for (const t of i.ma()) this.V_.set(t, !0);
            this.B_++
        }
        uu() {
            const t = this.ts.N().handleScroll,
                i = this.ts.N().handleScale;
            return !(t.horzTouchDrag || t.mouseWheel || t.pressedMouseMove || t.vertTouchDrag || i.axisDoubleClickReset.time || i.axisPressedMouseMove.time || i.mouseWheel || i.pinch)
        }
        Z_() {
            return 0 === this.x_.length ? null : 0
        }
        G_() {
            return 0 === this.x_.length ? null : this.x_.length - 1
        }
        Tu(t) {
            return (this.fo - 1 - t) / this.z_
        }
        eu(t) {
            const i = this.Tu(t),
                s = this.iu() + this.A_ - i;
            return Math.round(1e6 * s) / 1e6
        }
        ou(t) {
            const i = this.z_;
            this.z_ = t, this.Q_(), i !== this.z_ && (this.P_ = !0, this.Ru())
        }
        q_() {
            if (!this.P_) return;
            if (this.P_ = !1, this.Ki()) return void this.Du(yi.M_());
            const t = this.iu(),
                i = this.fo / this.z_,
                s = this.A_ + t,
                n = new xi(s - i + 1, s);
            this.Du(new yi(n))
        }
        Q_() {
            const t = qt(this.z_, this.Eu(), this.Vu());
            this.z_ !== t && (this.z_ = t, this.P_ = !0)
        }
        Vu() {
            return this.ys.maxBarSpacing > 0 ? this.ys.maxBarSpacing : .5 * this.fo
        }
        Eu() {
            return this.ys.fixLeftEdge && this.ys.fixRightEdge && 0 !== this.x_.length ? this.fo / this.x_.length : this.ys.minBarSpacing
        }
        tu() {
            const t = this.Bu();
            null !== t && this.A_ < t && (this.A_ = t, this.P_ = !0);
            const i = this.Iu();
            this.A_ > i && (this.A_ = i, this.P_ = !0)
        }
        Bu() {
            const t = this.Z_(),
                i = this.b_;
            if (null === t || null === i) return null;
            return t - i - 1 + (this.ys.fixLeftEdge ? this.fo / this.z_ : Math.min(2, this.x_.length))
        }
        Iu() {
            return this.ys.fixRightEdge ? 0 : this.fo / this.z_ - Math.min(2, this.x_.length)
        }
        vu() {
            this.D_ = {
                lu: this.lu(),
                _u: this._u()
            }
        }
        mu() {
            this.D_ = null
        }
        cu(t) {
            let i = this.C_.get(t.weight);
            return void 0 === i && (i = new bi((t => this.Au(t)), this.i_), this.C_.set(t.weight, i)), i.s_(t)
        }
        Au(t) {
            return this.i_.formatTickmark(t, this.Ml)
        }
        Du(t) {
            const i = this.y_;
            this.y_ = t, Si(i.w_(), this.y_.w_()) || this.k_.p(), Si(i.g_(), this.y_.g_()) || this.T_.p(), this.Ru()
        }
        Ru() {
            this.E_ = null
        }
        W_() {
            this.Ru(), this.C_.clear()
        }
        O_() {
            this.i_.updateFormatter(this.Ml)
        }
        F_() {
            if (!this.ys.fixLeftEdge) return;
            const t = this.Z_();
            if (null === t) return;
            const i = this.ye();
            if (null === i) return;
            const s = i.Uh() - t;
            if (s < 0) {
                const t = this.A_ - s - 1;
                this.fn(t)
            }
            this.Q_()
        }
        H_() {
            this.tu(), this.Q_()
        }
        ru(t) {
            return !this.ys.ignoreWhitespaceIndices || (this.V_.get(t) || !1)
        }
        hu(t) {
            const i = function*(t) {
                    const i = Math.round(t),
                        s = i < t;
                    let n = 1;
                    for (;;) s ? (yield i + n, yield i - n) : (yield i - n, yield i + n), n++
                }(t),
                s = this.G_();
            for (; s;) {
                const t = i.next().value;
                if (this.V_.get(t)) return t;
                if (t < 0 || t > s) break
            }
            return t
        }
    }
    var Ti, Ri, Di, Ei, Vi;
    ! function(t) {
        t[t.OnTouchEnd = 0] = "OnTouchEnd", t[t.OnNextTap = 1] = "OnNextTap"
    }(Ti || (Ti = {}));
    class Bi {
        constructor(t, i, s) {
            this.zu = [], this.Ou = [], this.fo = 0, this.Lu = null, this.Nu = new o, this.Wu = new o, this.Fu = null, this.Hu = t, this.ys = i, this.i_ = s, this.bl = new S(this.ys.layout.colorParsers), this.Uu = new M(this), this.uh = new ki(this, i.timeScale, this.ys.localization, s), this.Ct = new j(this, i.crosshair), this.$u = new jt(i.crosshair), this.ju(0), this.zu[0].ko(2e3), this.qu = this.Yu(0), this.Ku = this.Yu(1)
        }
        Bh() {
            this.Xu(Y.gn())
        }
        ar() {
            this.Xu(Y.wn())
        }
        Zh() {
            this.Xu(new Y(1))
        }
        Ih(t) {
            const i = this.Zu(t);
            this.Xu(i)
        }
        Gu() {
            return this.Lu
        }
        Ju(t) {
            if (this.Lu?.Xo === t?.Xo && this.Lu?.Zo?.Kn === t?.Zo?.Kn) return;
            const i = this.Lu;
            this.Lu = t, null !== i && this.Ih(i.Xo), null !== t && t.Xo !== i?.Xo && this.Ih(t.Xo)
        }
        N() {
            return this.ys
        }
        hr(t) {
            _(this.ys, t), this.zu.forEach((i => i.So(t))), void 0 !== t.timeScale && this.uh.hr(t.timeScale), void 0 !== t.localization && this.uh.N_(t.localization), (t.leftPriceScale || t.rightPriceScale) && this.Nu.p(), this.qu = this.Yu(0), this.Ku = this.Yu(1), this.Bh()
        }
        Qu(t, i, s = 0) {
            const n = this.zu[s];
            if (void 0 === n) return;
            if ("left" === t) return _(this.ys, {
                leftPriceScale: i
            }), n.So({
                leftPriceScale: i
            }), this.Nu.p(), void this.Bh();
            if ("right" === t) return _(this.ys, {
                rightPriceScale: i
            }), n.So({
                rightPriceScale: i
            }), this.Nu.p(), void this.Bh();
            const e = this.tc(t, s);
            null !== e && (e.Wt.hr(i), this.Nu.p())
        }
        tc(t, i) {
            const s = this.zu[i];
            if (void 0 === s) return null;
            const n = s.Co(t);
            return null !== n ? {
                Us: s,
                Wt: n
            } : null
        }
        It() {
            return this.uh
        }
        $s() {
            return this.zu
        }
        sc() {
            return this.Ct
        }
        nc() {
            return this.Wu
        }
        ec(t, i) {
            t.Il(i), this.au()
        }
        To(t) {
            this.fo = t, this.uh.To(this.fo), this.zu.forEach((i => i.To(t))), this.au()
        }
        rc(t) {
            1 !== this.zu.length && (r(t >= 0 && t < this.zu.length, "Invalid pane index"), this.zu.splice(t, 1), this.Bh())
        }
        hc(t, i) {
            if (this.zu.length < 2) return;
            r(t >= 0 && t < this.zu.length, "Invalid pane index");
            const s = this.zu[t],
                n = this.zu.reduce(((t, i) => t + i.Po()), 0),
                e = this.zu.reduce(((t, i) => t + i.$t()), 0),
                h = e - 30 * (this.zu.length - 1);
            i = Math.min(h, Math.max(30, i));
            const a = n / e,
                l = s.$t();
            s.ko(i * a);
            let o = i - l,
                _ = this.zu.length - 1;
            for (const t of this.zu)
                if (t !== s) {
                    const i = Math.min(h, Math.max(30, t.$t() - o / _));
                    o -= t.$t() - i, _ -= 1;
                    const s = i * a;
                    t.ko(s)
                } this.Bh()
        }
        ac(t, i) {
            r(t >= 0 && t < this.zu.length && i >= 0 && i < this.zu.length, "Invalid pane index");
            const s = this.zu[t],
                n = this.zu[i];
            this.zu[t] = n, this.zu[i] = s, this.Bh()
        }
        Ao(t, i, s) {
            t.Ao(i, s)
        }
        zo(t, i, s) {
            t.zo(i, s), this.Ah(), this.Xu(this.lc(t, 2))
        }
        Oo(t, i) {
            t.Oo(i), this.Xu(this.lc(t, 2))
        }
        Lo(t, i, s) {
            i.kl() || t.Lo(i, s)
        }
        No(t, i, s) {
            i.kl() || (t.No(i, s), this.Ah(), this.Xu(this.lc(t, 2)))
        }
        Wo(t, i) {
            i.kl() || (t.Wo(i), this.Xu(this.lc(t, 2)))
        }
        Ho(t, i) {
            t.Ho(i), this.Xu(this.lc(t, 2))
        }
        oc(t) {
            this.uh.so(t)
        }
        _c(t, i) {
            const s = this.It();
            if (s.Ki() || 0 === i) return;
            const n = s.Qi();
            t = Math.max(1, Math.min(t, n)), s.pu(t, i), this.au()
        }
        uc(t) {
            this.cc(0), this.dc(t), this.fc()
        }
        vc(t) {
            this.uh.no(t), this.au()
        }
        mc() {
            this.uh.eo(), this.ar()
        }
        cc(t) {
            this.uh.ro(t)
        }
        dc(t) {
            this.uh.ho(t), this.au()
        }
        fc() {
            this.uh.ao(), this.ar()
        }
        Ys() {
            return this.Ou
        }
        wc(t, i, s, n, e) {
            this.Ct.Es(t, i);
            let r = NaN,
                h = this.uh.nu(t, !0);
            const a = this.uh.ye();
            null !== a && (h = Math.min(Math.max(a.Uh(), h), a.bi()));
            const l = n.ks(),
                o = l.zt();
            if (null !== o && (r = l.Ts(i, o)), r = this.$u.Ma(r, h, n), this.Ct.As(h, r, n), this.Zh(), !e) {
                const e = Mi(n, t, i);
                this.Ju(e && {
                    Xo: e.Xo,
                    Zo: e.Zo,
                    Jo: e.Jo || null
                }), this.Wu.p(this.Ct.Bt(), {
                    x: t,
                    y: i
                }, s)
            }
        }
        gc(t, i, s) {
            const n = s.ks(),
                e = n.zt(),
                r = n.Nt(t, a(e)),
                h = this.uh.U_(i, !0),
                l = this.uh.jt(a(h));
            this.wc(l, r, null, s, !0)
        }
        Mc(t) {
            this.sc().Os(), this.Zh(), t || this.Wu.p(null, null, null)
        }
        Ah() {
            const t = this.Ct.Us();
            if (null !== t) {
                const i = this.Ct.Bs(),
                    s = this.Ct.Is();
                this.wc(i, s, null, t)
            }
            this.Ct.Ns()
        }
        bc(t, i, s) {
            const n = this.uh.Rs(0);
            void 0 !== i && void 0 !== s && this.uh.Pt(i, s);
            const e = this.uh.Rs(0),
                r = this.uh.iu(),
                h = this.uh.ye();
            if (null !== h && null !== n && null !== e) {
                const i = h.Te(r),
                    a = this.i_.key(n) > this.i_.key(e),
                    l = null !== t && t > r && !a,
                    o = this.uh.N().allowShiftVisibleRangeOnWhitespaceReplacement,
                    _ = i && (!(void 0 === s) || o) && this.uh.N().shiftVisibleRangeOnNewBar;
                if (l && !_) {
                    const i = t - r;
                    this.uh.fn(this.uh._u() - i)
                }
            }
            this.uh.fu(t)
        }
        Oh(t) {
            null !== t && t.$o()
        }
        Hn(t) {
            if (function(t) {
                    return t instanceof vi
                }(t)) return t;
            const i = this.zu.find((i => i.Dt().includes(t)));
            return void 0 === i ? null : i
        }
        au() {
            this.zu.forEach((t => t.$o())), this.Ah()
        }
        m() {
            this.zu.forEach((t => t.m())), this.zu.length = 0, this.ys.localization.priceFormatter = void 0, this.ys.localization.percentageFormatter = void 0, this.ys.localization.timeFormatter = void 0
        }
        xc() {
            return this.Uu
        }
        qn() {
            return this.Uu.N()
        }
        yo() {
            return this.Nu
        }
        Sc(t, i) {
            const s = this.ju(i);
            this.Cc(t, s), this.Ou.push(t), 1 === this.Ou.length ? this.Bh() : this.ar()
        }
        yc(t) {
            const i = this.Hn(t),
                s = this.Ou.indexOf(t);
            r(-1 !== s, "Series not found");
            const n = a(i);
            this.Ou.splice(s, 1), n.Jl(t), t.m && t.m(), this.uh.L_(), this.Pc(n)
        }
        Vh(t, i) {
            const s = a(this.Hn(t));
            s.Jl(t, !0), s.Zl(t, i, !0)
        }
        Pu() {
            const t = Y.wn();
            t.rn(), this.Xu(t)
        }
        kc(t) {
            const i = Y.wn();
            i.ln(t), this.Xu(i)
        }
        cn() {
            const t = Y.wn();
            t.cn(), this.Xu(t)
        }
        dn(t) {
            const i = Y.wn();
            i.dn(t), this.Xu(i)
        }
        fn(t) {
            const i = Y.wn();
            i.fn(t), this.Xu(i)
        }
        _n(t) {
            const i = Y.wn();
            i._n(t), this.Xu(i)
        }
        hn() {
            const t = Y.wn();
            t.hn(), this.Xu(t)
        }
        Tc() {
            return this.ys.rightPriceScale.visible ? "right" : "left"
        }
        Rc(t, i) {
            r(i >= 0, "Index should be greater or equal to 0");
            if (i === this.Dc(t)) return;
            const s = a(this.Hn(t));
            s.Jl(t);
            const n = this.ju(i);
            this.Cc(t, n), 0 === s.ba().length && this.Pc(s)
        }
        Ec() {
            return this.Ku
        }
        $() {
            return this.qu
        }
        Ut(t) {
            const i = this.Ku,
                s = this.qu;
            if (i === s) return i;
            if (t = Math.max(0, Math.min(100, Math.round(100 * t))), null === this.Fu || this.Fu.mr !== s || this.Fu.wr !== i) this.Fu = {
                mr: s,
                wr: i,
                Vc: new Map
            };
            else {
                const i = this.Fu.Vc.get(t);
                if (void 0 !== i) return i
            }
            const n = this.bl.tt(s, i, t / 100);
            return this.Fu.Vc.set(t, n), n
        }
        Bc(t) {
            return this.zu.indexOf(t)
        }
        Xi() {
            return this.bl
        }
        ju(t) {
            if (r(t >= 0, "Index should be greater or equal to 0"), (t = Math.min(this.zu.length, t)) < this.zu.length) return this.zu[t];
            const i = new vi(this.uh, this);
            this.zu.push(i);
            const s = Y.gn();
            return s.Qs(t, {
                tn: 0,
                sn: !0
            }), this.Xu(s), i
        }
        Dc(t) {
            return this.zu.findIndex((i => i.Do().includes(t)))
        }
        lc(t, i) {
            const s = new Y(i);
            if (null !== t) {
                const n = this.zu.indexOf(t);
                s.Qs(n, {
                    tn: i
                })
            }
            return s
        }
        Zu(t, i) {
            return void 0 === i && (i = 2), this.lc(this.Hn(t), i)
        }
        Xu(t) {
            this.Hu && this.Hu(t), this.zu.forEach((t => t.Yo().lr().Pt()))
        }
        Cc(t, i) {
            const s = t.N().priceScaleId,
                n = void 0 !== s ? s : this.Tc();
            i.Zl(t, n), q(n) || t.hr(t.N())
        }
        Yu(t) {
            const i = this.ys.layout;
            return "gradient" === i.background.type ? 0 === t ? i.background.topColor : i.background.bottomColor : i.background.color
        }
        Pc(t) {
            0 === t.ba().length && this.zu.length > 1 && (this.zu.splice(this.Bc(t), 1), this.Bh())
        }
    }

    function Ii(t) {
        return !u(t) && !d(t)
    }

    function Ai(t) {
        return u(t)
    }! function(t) {
        t[t.Disabled = 0] = "Disabled", t[t.Continuous = 1] = "Continuous", t[t.OnDataUpdate = 2] = "OnDataUpdate"
    }(Ri || (Ri = {})),
    function(t) {
        t[t.LastBar = 0] = "LastBar", t[t.LastVisible = 1] = "LastVisible"
    }(Di || (Di = {})),
    function(t) {
        t.Solid = "solid", t.VerticalGradient = "gradient"
    }(Ei || (Ei = {})),
    function(t) {
        t[t.Year = 0] = "Year", t[t.Month = 1] = "Month", t[t.DayOfMonth = 2] = "DayOfMonth", t[t.Time = 3] = "Time", t[t.TimeWithSeconds = 4] = "TimeWithSeconds"
    }(Vi || (Vi = {}));
    const zi = t => t.getUTCFullYear();

    function Oi(t, i, s) {
        return i.replace(/yyyy/g, (t => X(zi(t), 4))(t)).replace(/yy/g, (t => X(zi(t) % 100, 2))(t)).replace(/MMMM/g, ((t, i) => new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(i, {
            month: "long"
        }))(t, s)).replace(/MMM/g, ((t, i) => new Date(t.getUTCFullYear(), t.getUTCMonth(), 1).toLocaleString(i, {
            month: "short"
        }))(t, s)).replace(/MM/g, (t => X((t => t.getUTCMonth() + 1)(t), 2))(t)).replace(/dd/g, (t => X((t => t.getUTCDate())(t), 2))(t))
    }
    class Li {
        constructor(t = "yyyy-MM-dd", i = "default") {
            this.Ic = t, this.Ac = i
        }
        s_(t) {
            return Oi(t, this.Ic, this.Ac)
        }
    }
    class Ni {
        constructor(t) {
            this.zc = t || "%h:%m:%s"
        }
        s_(t) {
            return this.zc.replace("%h", X(t.getUTCHours(), 2)).replace("%m", X(t.getUTCMinutes(), 2)).replace("%s", X(t.getUTCSeconds(), 2))
        }
    }
    const Wi = {
        Oc: "yyyy-MM-dd",
        Lc: "%h:%m:%s",
        Nc: " ",
        Wc: "default"
    };
    class Fi {
        constructor(t = {}) {
            const i = {
                ...Wi,
                ...t
            };
            this.Fc = new Li(i.Oc, i.Wc), this.Hc = new Ni(i.Lc), this.Uc = i.Nc
        }
        s_(t) {
            return `${this.Fc.s_(t)}${this.Uc}${this.Hc.s_(t)}`
        }
    }

    function Hi(t) {
        return 60 * t * 60 * 1e3
    }

    function Ui(t) {
        return 60 * t * 1e3
    }
    const $i = [{
        $c: (ji = 1, 1e3 * ji),
        jc: 10
    }, {
        $c: Ui(1),
        jc: 20
    }, {
        $c: Ui(5),
        jc: 21
    }, {
        $c: Ui(30),
        jc: 22
    }, {
        $c: Hi(1),
        jc: 30
    }, {
        $c: Hi(3),
        jc: 31
    }, {
        $c: Hi(6),
        jc: 32
    }, {
        $c: Hi(12),
        jc: 33
    }];
    var ji;

    function qi(t, i) {
        if (t.getUTCFullYear() !== i.getUTCFullYear()) return 70;
        if (t.getUTCMonth() !== i.getUTCMonth()) return 60;
        if (t.getUTCDate() !== i.getUTCDate()) return 50;
        for (let s = $i.length - 1; s >= 0; --s)
            if (Math.floor(i.getTime() / $i[s].$c) !== Math.floor(t.getTime() / $i[s].$c)) return $i[s].jc;
        return 0
    }

    function Yi(t) {
        let i = t;
        if (d(t) && (i = Xi(t)), !Ii(i)) throw new Error("time must be of type BusinessDay");
        const s = new Date(Date.UTC(i.year, i.month - 1, i.day, 0, 0, 0, 0));
        return {
            qc: Math.round(s.getTime() / 1e3),
            Yc: i
        }
    }

    function Ki(t) {
        if (!Ai(t)) throw new Error("time must be of type isUTCTimestamp");
        return {
            qc: t
        }
    }

    function Xi(t) {
        const i = new Date(t);
        if (isNaN(i.getTime())) throw new Error(`Invalid date string=${t}, expected format=yyyy-mm-dd`);
        return {
            day: i.getUTCDate(),
            month: i.getUTCMonth() + 1,
            year: i.getUTCFullYear()
        }
    }

    function Zi(t) {
        d(t.time) && (t.time = Xi(t.time))
    }
    class Gi {
        options() {
            return this.ys
        }
        setOptions(t) {
            this.ys = t, this.updateFormatter(t.localization)
        }
        preprocessData(t) {
            Array.isArray(t) ? function(t) {
                t.forEach(Zi)
            }(t) : Zi(t)
        }
        createConverterToInternalObj(t) {
            return a(function(t) {
                return 0 === t.length ? null : Ii(t[0].time) || d(t[0].time) ? Yi : Ki
            }(t))
        }
        key(t) {
            return "object" == typeof t && "qc" in t ? t.qc : this.key(this.convertHorzItemToInternal(t))
        }
        cacheKey(t) {
            const i = t;
            return void 0 === i.Yc ? new Date(1e3 * i.qc).getTime() : new Date(Date.UTC(i.Yc.year, i.Yc.month - 1, i.Yc.day)).getTime()
        }
        convertHorzItemToInternal(t) {
            return Ai(i = t) ? Ki(i) : Ii(i) ? Yi(i) : Yi(Xi(i));
            var i
        }
        updateFormatter(t) {
            if (!this.ys) return;
            const i = t.dateFormat;
            this.ys.timeScale.timeVisible ? this.Kc = new Fi({
                Oc: i,
                Lc: this.ys.timeScale.secondsVisible ? "%h:%m:%s" : "%h:%m",
                Nc: "   ",
                Wc: t.locale
            }) : this.Kc = new Li(i, t.locale)
        }
        formatHorzItem(t) {
            const i = t;
            return this.Kc.s_(new Date(1e3 * i.qc))
        }
        formatTickmark(t, i) {
            const s = function(t, i, s) {
                    switch (t) {
                        case 0:
                        case 10:
                            return i ? s ? 4 : 3 : 2;
                        case 20:
                        case 21:
                        case 22:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                            return i ? 3 : 2;
                        case 50:
                            return 2;
                        case 60:
                            return 1;
                        case 70:
                            return 0
                    }
                }(t.weight, this.ys.timeScale.timeVisible, this.ys.timeScale.secondsVisible),
                n = this.ys.timeScale;
            if (void 0 !== n.tickMarkFormatter) {
                const e = n.tickMarkFormatter(t.originalTime, s, i.locale);
                if (null !== e) return e
            }
            return function(t, i, s) {
                const n = {};
                switch (i) {
                    case 0:
                        n.year = "numeric";
                        break;
                    case 1:
                        n.month = "short";
                        break;
                    case 2:
                        n.day = "numeric";
                        break;
                    case 3:
                        n.hour12 = !1, n.hour = "2-digit", n.minute = "2-digit";
                        break;
                    case 4:
                        n.hour12 = !1, n.hour = "2-digit", n.minute = "2-digit", n.second = "2-digit"
                }
                const e = void 0 === t.Yc ? new Date(1e3 * t.qc) : new Date(Date.UTC(t.Yc.year, t.Yc.month - 1, t.Yc.day));
                return new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()).toLocaleString(s, n)
            }(t.time, s, i.locale)
        }
        maxTickMarkWeight(t) {
            let i = t.reduce(Pi, t[0]).weight;
            return i > 30 && i < 50 && (i = 30), i
        }
        fillWeightsForPoints(t, i) {
            ! function(t, i = 0) {
                if (0 === t.length) return;
                let s = 0 === i ? null : t[i - 1].time.qc,
                    n = null !== s ? new Date(1e3 * s) : null,
                    e = 0;
                for (let r = i; r < t.length; ++r) {
                    const i = t[r],
                        h = new Date(1e3 * i.time.qc);
                    null !== n && (i.timeWeight = qi(h, n)), e += i.time.qc - (s || i.time.qc), s = i.time.qc, n = h
                }
                if (0 === i && t.length > 1) {
                    const i = Math.ceil(e / (t.length - 1)),
                        s = new Date(1e3 * (t[0].time.qc - i));
                    t[0].timeWeight = qi(new Date(1e3 * t[0].time.qc), s)
                }
            }(t, i)
        }
        static Xc(t) {
            return _({
                localization: {
                    dateFormat: "dd MMM 'yy"
                }
            }, t ?? {})
        }
    }

    function Ji(t) {
        var i = t.width,
            s = t.height;
        if (i < 0) throw new Error("Negative width is not allowed for Size");
        if (s < 0) throw new Error("Negative height is not allowed for Size");
        return {
            width: i,
            height: s
        }
    }

    function Qi(t, i) {
        return t.width === i.width && t.height === i.height
    }
    var ts = function() {
        function t(t) {
            var i = this;
            this._resolutionListener = function() {
                return i._onResolutionChanged()
            }, this._resolutionMediaQueryList = null, this._observers = [], this._window = t, this._installResolutionListener()
        }
        return t.prototype.dispose = function() {
            this._uninstallResolutionListener(), this._window = null
        }, Object.defineProperty(t.prototype, "value", {
            get: function() {
                return this._window.devicePixelRatio
            },
            enumerable: !1,
            configurable: !0
        }), t.prototype.subscribe = function(t) {
            var i = this,
                s = {
                    next: t
                };
            return this._observers.push(s), {
                unsubscribe: function() {
                    i._observers = i._observers.filter((function(t) {
                        return t !== s
                    }))
                }
            }
        }, t.prototype._installResolutionListener = function() {
            if (null !== this._resolutionMediaQueryList) throw new Error("Resolution listener is already installed");
            var t = this._window.devicePixelRatio;
            this._resolutionMediaQueryList = this._window.matchMedia("all and (resolution: ".concat(t, "dppx)")), this._resolutionMediaQueryList.addListener(this._resolutionListener)
        }, t.prototype._uninstallResolutionListener = function() {
            null !== this._resolutionMediaQueryList && (this._resolutionMediaQueryList.removeListener(this._resolutionListener), this._resolutionMediaQueryList = null)
        }, t.prototype._reinstallResolutionListener = function() {
            this._uninstallResolutionListener(), this._installResolutionListener()
        }, t.prototype._onResolutionChanged = function() {
            var t = this;
            this._observers.forEach((function(i) {
                return i.next(t._window.devicePixelRatio)
            })), this._reinstallResolutionListener()
        }, t
    }();
    var is = function() {
        function t(t, i, s) {
            var n;
            this._canvasElement = null, this._bitmapSizeChangedListeners = [], this._suggestedBitmapSize = null, this._suggestedBitmapSizeChangedListeners = [], this._devicePixelRatioObservable = null, this._canvasElementResizeObserver = null, this._canvasElement = t, this._canvasElementClientSize = Ji({
                width: this._canvasElement.clientWidth,
                height: this._canvasElement.clientHeight
            }), this._transformBitmapSize = null != i ? i : function(t) {
                return t
            }, this._allowResizeObserver = null === (n = null == s ? void 0 : s.allowResizeObserver) || void 0 === n || n, this._chooseAndInitObserver()
        }
        return t.prototype.dispose = function() {
            var t, i;
            if (null === this._canvasElement) throw new Error("Object is disposed");
            null === (t = this._canvasElementResizeObserver) || void 0 === t || t.disconnect(), this._canvasElementResizeObserver = null, null === (i = this._devicePixelRatioObservable) || void 0 === i || i.dispose(), this._devicePixelRatioObservable = null, this._suggestedBitmapSizeChangedListeners.length = 0, this._bitmapSizeChangedListeners.length = 0, this._canvasElement = null
        }, Object.defineProperty(t.prototype, "canvasElement", {
            get: function() {
                if (null === this._canvasElement) throw new Error("Object is disposed");
                return this._canvasElement
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(t.prototype, "canvasElementClientSize", {
            get: function() {
                return this._canvasElementClientSize
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(t.prototype, "bitmapSize", {
            get: function() {
                return Ji({
                    width: this.canvasElement.width,
                    height: this.canvasElement.height
                })
            },
            enumerable: !1,
            configurable: !0
        }), t.prototype.resizeCanvasElement = function(t) {
            this._canvasElementClientSize = Ji(t), this.canvasElement.style.width = "".concat(this._canvasElementClientSize.width, "px"), this.canvasElement.style.height = "".concat(this._canvasElementClientSize.height, "px"), this._invalidateBitmapSize()
        }, t.prototype.subscribeBitmapSizeChanged = function(t) {
            this._bitmapSizeChangedListeners.push(t)
        }, t.prototype.unsubscribeBitmapSizeChanged = function(t) {
            this._bitmapSizeChangedListeners = this._bitmapSizeChangedListeners.filter((function(i) {
                return i !== t
            }))
        }, Object.defineProperty(t.prototype, "suggestedBitmapSize", {
            get: function() {
                return this._suggestedBitmapSize
            },
            enumerable: !1,
            configurable: !0
        }), t.prototype.subscribeSuggestedBitmapSizeChanged = function(t) {
            this._suggestedBitmapSizeChangedListeners.push(t)
        }, t.prototype.unsubscribeSuggestedBitmapSizeChanged = function(t) {
            this._suggestedBitmapSizeChangedListeners = this._suggestedBitmapSizeChangedListeners.filter((function(i) {
                return i !== t
            }))
        }, t.prototype.applySuggestedBitmapSize = function() {
            if (null !== this._suggestedBitmapSize) {
                var t = this._suggestedBitmapSize;
                this._suggestedBitmapSize = null, this._resizeBitmap(t), this._emitSuggestedBitmapSizeChanged(t, this._suggestedBitmapSize)
            }
        }, t.prototype._resizeBitmap = function(t) {
            var i = this.bitmapSize;
            Qi(i, t) || (this.canvasElement.width = t.width, this.canvasElement.height = t.height, this._emitBitmapSizeChanged(i, t))
        }, t.prototype._emitBitmapSizeChanged = function(t, i) {
            var s = this;
            this._bitmapSizeChangedListeners.forEach((function(n) {
                return n.call(s, t, i)
            }))
        }, t.prototype._suggestNewBitmapSize = function(t) {
            var i = this._suggestedBitmapSize,
                s = Ji(this._transformBitmapSize(t, this._canvasElementClientSize)),
                n = Qi(this.bitmapSize, s) ? null : s;
            null === i && null === n || null !== i && null !== n && Qi(i, n) || (this._suggestedBitmapSize = n, this._emitSuggestedBitmapSizeChanged(i, n))
        }, t.prototype._emitSuggestedBitmapSizeChanged = function(t, i) {
            var s = this;
            this._suggestedBitmapSizeChangedListeners.forEach((function(n) {
                return n.call(s, t, i)
            }))
        }, t.prototype._chooseAndInitObserver = function() {
            var t = this;
            this._allowResizeObserver ? new Promise((function(t) {
                var i = new ResizeObserver((function(s) {
                    t(s.every((function(t) {
                        return "devicePixelContentBoxSize" in t
                    }))), i.disconnect()
                }));
                i.observe(document.body, {
                    box: "device-pixel-content-box"
                })
            })).catch((function() {
                return !1
            })).then((function(i) {
                return i ? t._initResizeObserver() : t._initDevicePixelRatioObservable()
            })) : this._initDevicePixelRatioObservable()
        }, t.prototype._initDevicePixelRatioObservable = function() {
            var t = this;
            if (null !== this._canvasElement) {
                var i = ss(this._canvasElement);
                if (null === i) throw new Error("No window is associated with the canvas");
                this._devicePixelRatioObservable = function(t) {
                    return new ts(t)
                }(i), this._devicePixelRatioObservable.subscribe((function() {
                    return t._invalidateBitmapSize()
                })), this._invalidateBitmapSize()
            }
        }, t.prototype._invalidateBitmapSize = function() {
            var t, i;
            if (null !== this._canvasElement) {
                var s = ss(this._canvasElement);
                if (null !== s) {
                    var n = null !== (i = null === (t = this._devicePixelRatioObservable) || void 0 === t ? void 0 : t.value) && void 0 !== i ? i : s.devicePixelRatio,
                        e = this._canvasElement.getClientRects(),
                        r = void 0 !== e[0] ? function(t, i) {
                            return Ji({
                                width: Math.round(t.left * i + t.width * i) - Math.round(t.left * i),
                                height: Math.round(t.top * i + t.height * i) - Math.round(t.top * i)
                            })
                        }(e[0], n) : Ji({
                            width: this._canvasElementClientSize.width * n,
                            height: this._canvasElementClientSize.height * n
                        });
                    this._suggestNewBitmapSize(r)
                }
            }
        }, t.prototype._initResizeObserver = function() {
            var t = this;
            null !== this._canvasElement && (this._canvasElementResizeObserver = new ResizeObserver((function(i) {
                var s = i.find((function(i) {
                    return i.target === t._canvasElement
                }));
                if (s && s.devicePixelContentBoxSize && s.devicePixelContentBoxSize[0]) {
                    var n = s.devicePixelContentBoxSize[0],
                        e = Ji({
                            width: n.inlineSize,
                            height: n.blockSize
                        });
                    t._suggestNewBitmapSize(e)
                }
            })), this._canvasElementResizeObserver.observe(this._canvasElement, {
                box: "device-pixel-content-box"
            }))
        }, t
    }();

    function ss(t) {
        return t.ownerDocument.defaultView
    }
    var ns = function() {
        function t(t, i, s) {
            if (0 === i.width || 0 === i.height) throw new TypeError("Rendering target could only be created on a media with positive width and height");
            if (this._mediaSize = i, 0 === s.width || 0 === s.height) throw new TypeError("Rendering target could only be created using a bitmap with positive integer width and height");
            this._bitmapSize = s, this._context = t
        }
        return t.prototype.useMediaCoordinateSpace = function(t) {
            try {
                return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), this._context.scale(this._horizontalPixelRatio, this._verticalPixelRatio), t({
                    context: this._context,
                    mediaSize: this._mediaSize
                })
            } finally {
                this._context.restore()
            }
        }, t.prototype.useBitmapCoordinateSpace = function(t) {
            try {
                return this._context.save(), this._context.setTransform(1, 0, 0, 1, 0, 0), t({
                    context: this._context,
                    mediaSize: this._mediaSize,
                    bitmapSize: this._bitmapSize,
                    horizontalPixelRatio: this._horizontalPixelRatio,
                    verticalPixelRatio: this._verticalPixelRatio
                })
            } finally {
                this._context.restore()
            }
        }, Object.defineProperty(t.prototype, "_horizontalPixelRatio", {
            get: function() {
                return this._bitmapSize.width / this._mediaSize.width
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(t.prototype, "_verticalPixelRatio", {
            get: function() {
                return this._bitmapSize.height / this._mediaSize.height
            },
            enumerable: !1,
            configurable: !0
        }), t
    }();

    function es(t, i) {
        var s = t.canvasElementClientSize;
        if (0 === s.width || 0 === s.height) return null;
        var n = t.bitmapSize;
        if (0 === n.width || 0 === n.height) return null;
        var e = t.canvasElement.getContext("2d", i);
        return null === e ? null : new ns(e, s, n)
    }
    const rs = "undefined" != typeof window;

    function hs() {
        return !!rs && window.navigator.userAgent.toLowerCase().indexOf("firefox") > -1
    }

    function as() {
        return !!rs && /iPhone|iPad|iPod/.test(window.navigator.platform)
    }

    function ls(t) {
        return t + t % 2
    }

    function os(t) {
        rs && void 0 !== window.chrome && t.addEventListener("mousedown", (t => {
            if (1 === t.button) return t.preventDefault(), !1
        }))
    }
    class _s {
        constructor(t, i, s) {
            this.Zc = 0, this.Gc = null, this.Jc = {
                _t: Number.NEGATIVE_INFINITY,
                ut: Number.POSITIVE_INFINITY
            }, this.Qc = 0, this.td = null, this.sd = {
                _t: Number.NEGATIVE_INFINITY,
                ut: Number.POSITIVE_INFINITY
            }, this.nd = null, this.ed = !1, this.rd = null, this.hd = null, this.ad = !1, this.ld = !1, this.od = !1, this._d = null, this.ud = null, this.dd = null, this.fd = null, this.pd = null, this.vd = null, this.md = null, this.wd = 0, this.gd = !1, this.Md = !1, this.bd = !1, this.xd = 0, this.Sd = null, this.Cd = !as(), this.yd = t => {
                this.Pd(t)
            }, this.kd = t => {
                if (this.Td(t)) {
                    const i = this.Rd(t);
                    if (++this.Qc, this.td && this.Qc > 1) {
                        const {
                            Dd: s
                        } = this.Ed(ds(t), this.sd);
                        s < 30 && !this.od && this.Vd(i, this.Id.Bd), this.Ad()
                    }
                } else {
                    const i = this.Rd(t);
                    if (++this.Zc, this.Gc && this.Zc > 1) {
                        const {
                            Dd: s
                        } = this.Ed(ds(t), this.Jc);
                        s < 5 && !this.ld && this.zd(i, this.Id.Od), this.Ld()
                    }
                }
            }, this.Nd = t, this.Id = i, this.ys = s, this.Wd()
        }
        m() {
            null !== this._d && (this._d(), this._d = null), null !== this.ud && (this.ud(), this.ud = null), null !== this.fd && (this.fd(), this.fd = null), null !== this.pd && (this.pd(), this.pd = null), null !== this.vd && (this.vd(), this.vd = null), null !== this.dd && (this.dd(), this.dd = null), this.Fd(), this.Ld()
        }
        Hd(t) {
            this.fd && this.fd();
            const i = this.Ud.bind(this);
            if (this.fd = () => {
                    this.Nd.removeEventListener("mousemove", i)
                }, this.Nd.addEventListener("mousemove", i), this.Td(t)) return;
            const s = this.Rd(t);
            this.zd(s, this.Id.$d), this.Cd = !0
        }
        Ld() {
            null !== this.Gc && clearTimeout(this.Gc), this.Zc = 0, this.Gc = null, this.Jc = {
                _t: Number.NEGATIVE_INFINITY,
                ut: Number.POSITIVE_INFINITY
            }
        }
        Ad() {
            null !== this.td && clearTimeout(this.td), this.Qc = 0, this.td = null, this.sd = {
                _t: Number.NEGATIVE_INFINITY,
                ut: Number.POSITIVE_INFINITY
            }
        }
        Ud(t) {
            if (this.bd || null !== this.hd) return;
            if (this.Td(t)) return;
            const i = this.Rd(t);
            this.zd(i, this.Id.jd), this.Cd = !0
        }
        qd(t) {
            const i = ps(t.changedTouches, a(this.Sd));
            if (null === i) return;
            if (this.xd = fs(t), null !== this.md) return;
            if (this.Md) return;
            this.gd = !0;
            const s = this.Ed(ds(i), a(this.hd)),
                {
                    Yd: n,
                    Kd: e,
                    Dd: r
                } = s;
            if (this.ad || !(r < 5)) {
                if (!this.ad) {
                    const t = .5 * n,
                        i = e >= t && !this.ys.Xd(),
                        s = t > e && !this.ys.Zd();
                    i || s || (this.Md = !0), this.ad = !0, this.od = !0, this.Fd(), this.Ad()
                }
                if (!this.Md) {
                    const s = this.Rd(t, i);
                    this.Vd(s, this.Id.Gd), cs(t)
                }
            }
        }
        Jd(t) {
            if (0 !== t.button) return;
            const i = this.Ed(ds(t), a(this.rd)),
                {
                    Dd: s
                } = i;
            if (s >= 5 && (this.ld = !0, this.Ld()), this.ld) {
                const i = this.Rd(t);
                this.zd(i, this.Id.Qd)
            }
        }
        Ed(t, i) {
            const s = Math.abs(i._t - t._t),
                n = Math.abs(i.ut - t.ut);
            return {
                Yd: s,
                Kd: n,
                Dd: s + n
            }
        }
        tf(t) {
            let i = ps(t.changedTouches, a(this.Sd));
            if (null === i && 0 === t.touches.length && (i = t.changedTouches[0]), null === i) return;
            this.Sd = null, this.xd = fs(t), this.Fd(), this.hd = null, this.vd && (this.vd(), this.vd = null);
            const s = this.Rd(t, i);
            if (this.Vd(s, this.Id.if), ++this.Qc, this.td && this.Qc > 1) {
                const {
                    Dd: t
                } = this.Ed(ds(i), this.sd);
                t < 30 && !this.od && this.Vd(s, this.Id.Bd), this.Ad()
            } else this.od || (this.Vd(s, this.Id.sf), this.Id.sf && cs(t));
            0 === this.Qc && cs(t), 0 === t.touches.length && this.ed && (this.ed = !1, cs(t))
        }
        Pd(t) {
            if (0 !== t.button) return;
            const i = this.Rd(t);
            if (this.rd = null, this.bd = !1, this.pd && (this.pd(), this.pd = null), hs()) {
                this.Nd.ownerDocument.documentElement.removeEventListener("mouseleave", this.yd)
            }
            if (!this.Td(t))
                if (this.zd(i, this.Id.nf), ++this.Zc, this.Gc && this.Zc > 1) {
                    const {
                        Dd: s
                    } = this.Ed(ds(t), this.Jc);
                    s < 5 && !this.ld && this.zd(i, this.Id.Od), this.Ld()
                } else this.ld || this.zd(i, this.Id.ef)
        }
        Fd() {
            null !== this.nd && (clearTimeout(this.nd), this.nd = null)
        }
        rf(t) {
            if (null !== this.Sd) return;
            const i = t.changedTouches[0];
            this.Sd = i.identifier, this.xd = fs(t);
            const s = this.Nd.ownerDocument.documentElement;
            this.od = !1, this.ad = !1, this.Md = !1, this.hd = ds(i), this.vd && (this.vd(), this.vd = null);
            {
                const i = this.qd.bind(this),
                    n = this.tf.bind(this);
                this.vd = () => {
                    s.removeEventListener("touchmove", i), s.removeEventListener("touchend", n)
                }, s.addEventListener("touchmove", i, {
                    passive: !1
                }), s.addEventListener("touchend", n, {
                    passive: !1
                }), this.Fd(), this.nd = setTimeout(this.hf.bind(this, t), 240)
            }
            const n = this.Rd(t, i);
            this.Vd(n, this.Id.af), this.td || (this.Qc = 0, this.td = setTimeout(this.Ad.bind(this), 500), this.sd = ds(i))
        }
        lf(t) {
            if (0 !== t.button) return;
            const i = this.Nd.ownerDocument.documentElement;
            hs() && i.addEventListener("mouseleave", this.yd), this.ld = !1, this.rd = ds(t), this.pd && (this.pd(), this.pd = null);
            {
                const t = this.Jd.bind(this),
                    s = this.Pd.bind(this);
                this.pd = () => {
                    i.removeEventListener("mousemove", t), i.removeEventListener("mouseup", s)
                }, i.addEventListener("mousemove", t), i.addEventListener("mouseup", s)
            }
            if (this.bd = !0, this.Td(t)) return;
            const s = this.Rd(t);
            this.zd(s, this.Id._f), this.Gc || (this.Zc = 0, this.Gc = setTimeout(this.Ld.bind(this), 500), this.Jc = ds(t))
        }
        Wd() {
            this.Nd.addEventListener("mouseenter", this.Hd.bind(this)), this.Nd.addEventListener("touchcancel", this.Fd.bind(this));
            {
                const t = this.Nd.ownerDocument,
                    i = t => {
                        this.Id.uf && (t.composed && this.Nd.contains(t.composedPath()[0]) || t.target && this.Nd.contains(t.target) || this.Id.uf())
                    };
                this.ud = () => {
                    t.removeEventListener("touchstart", i)
                }, this._d = () => {
                    t.removeEventListener("mousedown", i)
                }, t.addEventListener("mousedown", i), t.addEventListener("touchstart", i, {
                    passive: !0
                })
            }
            as() && (this.dd = () => {
                this.Nd.removeEventListener("dblclick", this.kd)
            }, this.Nd.addEventListener("dblclick", this.kd)), this.Nd.addEventListener("mouseleave", this.cf.bind(this)), this.Nd.addEventListener("touchstart", this.rf.bind(this), {
                passive: !0
            }), os(this.Nd), this.Nd.addEventListener("mousedown", this.lf.bind(this)), this.df(), this.Nd.addEventListener("touchmove", (() => {}), {
                passive: !1
            })
        }
        df() {
            void 0 === this.Id.ff && void 0 === this.Id.pf && void 0 === this.Id.vf || (this.Nd.addEventListener("touchstart", (t => this.mf(t.touches)), {
                passive: !0
            }), this.Nd.addEventListener("touchmove", (t => {
                if (2 === t.touches.length && null !== this.md && void 0 !== this.Id.pf) {
                    const i = us(t.touches[0], t.touches[1]) / this.wd;
                    this.Id.pf(this.md, i), cs(t)
                }
            }), {
                passive: !1
            }), this.Nd.addEventListener("touchend", (t => {
                this.mf(t.touches)
            })))
        }
        mf(t) {
            1 === t.length && (this.gd = !1), 2 !== t.length || this.gd || this.ed ? this.wf() : this.gf(t)
        }
        gf(t) {
            const i = this.Nd.getBoundingClientRect() || {
                left: 0,
                top: 0
            };
            this.md = {
                _t: (t[0].clientX - i.left + (t[1].clientX - i.left)) / 2,
                ut: (t[0].clientY - i.top + (t[1].clientY - i.top)) / 2
            }, this.wd = us(t[0], t[1]), void 0 !== this.Id.ff && this.Id.ff(), this.Fd()
        }
        wf() {
            null !== this.md && (this.md = null, void 0 !== this.Id.vf && this.Id.vf())
        }
        cf(t) {
            if (this.fd && this.fd(), this.Td(t)) return;
            if (!this.Cd) return;
            const i = this.Rd(t);
            this.zd(i, this.Id.Mf), this.Cd = !as()
        }
        hf(t) {
            const i = ps(t.touches, a(this.Sd));
            if (null === i) return;
            const s = this.Rd(t, i);
            this.Vd(s, this.Id.bf), this.od = !0, this.ed = !0
        }
        Td(t) {
            return t.sourceCapabilities && void 0 !== t.sourceCapabilities.firesTouchEvents ? t.sourceCapabilities.firesTouchEvents : fs(t) < this.xd + 500
        }
        Vd(t, i) {
            i && i.call(this.Id, t)
        }
        zd(t, i) {
            i && i.call(this.Id, t)
        }
        Rd(t, i) {
            const s = i || t,
                n = this.Nd.getBoundingClientRect() || {
                    left: 0,
                    top: 0
                };
            return {
                clientX: s.clientX,
                clientY: s.clientY,
                pageX: s.pageX,
                pageY: s.pageY,
                screenX: s.screenX,
                screenY: s.screenY,
                localX: s.clientX - n.left,
                localY: s.clientY - n.top,
                ctrlKey: t.ctrlKey,
                altKey: t.altKey,
                shiftKey: t.shiftKey,
                metaKey: t.metaKey,
                xf: !t.type.startsWith("mouse") && "contextmenu" !== t.type && "click" !== t.type,
                Sf: t.type,
                Cf: s.target,
                Qo: t.view,
                yf: () => {
                    "touchstart" !== t.type && cs(t)
                }
            }
        }
    }

    function us(t, i) {
        const s = t.clientX - i.clientX,
            n = t.clientY - i.clientY;
        return Math.sqrt(s * s + n * n)
    }

    function cs(t) {
        t.cancelable && t.preventDefault()
    }

    function ds(t) {
        return {
            _t: t.pageX,
            ut: t.pageY
        }
    }

    function fs(t) {
        return t.timeStamp || performance.now()
    }

    function ps(t, i) {
        for (let s = 0; s < t.length; ++s)
            if (t[s].identifier === i) return t[s];
        return null
    }
    class vs {
        constructor(t, i, s) {
            this.Pf = null, this.kf = null, this.Tf = !0, this.Rf = null, this.Df = t, this.Ef = t.Vf()[i], this.Bf = t.Vf()[s], this.If = document.createElement("tr"), this.If.style.height = "1px", this.Af = document.createElement("td"), this.Af.style.position = "relative", this.Af.style.padding = "0", this.Af.style.margin = "0", this.Af.setAttribute("colspan", "3"), this.zf(), this.If.appendChild(this.Af), this.Tf = this.Df.N().layout.panes.enableResize, this.Tf ? this.Of() : (this.Pf = null, this.kf = null)
        }
        m() {
            null !== this.kf && this.kf.m()
        }
        Lf() {
            return this.If
        }
        Nf() {
            return Ji({
                width: this.Ef.Nf().width,
                height: 1
            })
        }
        Wf() {
            return Ji({
                width: this.Ef.Wf().width,
                height: 1 * window.devicePixelRatio
            })
        }
        Ff(t, i, s) {
            const n = this.Wf();
            t.fillStyle = this.Df.N().layout.panes.separatorColor, t.fillRect(i, s, n.width, n.height)
        }
        Pt() {
            this.zf(), this.Df.N().layout.panes.enableResize !== this.Tf && (this.Tf = this.Df.N().layout.panes.enableResize, this.Tf ? this.Of() : (null !== this.Pf && (this.Af.removeChild(this.Pf.Hf), this.Af.removeChild(this.Pf.Uf), this.Pf = null), null !== this.kf && (this.kf.m(), this.kf = null)))
        }
        Of() {
            const t = document.createElement("div"),
                i = t.style;
            i.position = "fixed", i.display = "none", i.zIndex = "49", i.top = "0", i.left = "0", i.width = "100%", i.height = "100%", i.cursor = "row-resize", this.Af.appendChild(t);
            const s = document.createElement("div"),
                n = s.style;
            n.position = "absolute", n.zIndex = "50", n.top = "-4px", n.height = "9px", n.width = "100%", n.backgroundColor = "", n.cursor = "row-resize", this.Af.appendChild(s);
            const e = {
                $d: this.$f.bind(this),
                Mf: this.jf.bind(this),
                _f: this.qf.bind(this),
                af: this.qf.bind(this),
                Qd: this.Yf.bind(this),
                Gd: this.Yf.bind(this),
                nf: this.Kf.bind(this),
                if: this.Kf.bind(this)
            };
            this.kf = new _s(s, e, {
                Xd: () => !1,
                Zd: () => !0
            }), this.Pf = {
                Uf: s,
                Hf: t
            }
        }
        zf() {
            this.Af.style.background = this.Df.N().layout.panes.separatorColor
        }
        $f(t) {
            null !== this.Pf && (this.Pf.Uf.style.backgroundColor = this.Df.N().layout.panes.separatorHoverColor)
        }
        jf(t) {
            null !== this.Pf && null === this.Rf && (this.Pf.Uf.style.backgroundColor = "")
        }
        qf(t) {
            if (null === this.Pf) return;
            const i = this.Ef.Xf().Po() + this.Bf.Xf().Po(),
                s = i / (this.Ef.Nf().height + this.Bf.Nf().height),
                n = 30 * s;
            i <= 2 * n || (this.Rf = {
                Zf: t.pageY,
                Gf: this.Ef.Xf().Po(),
                Jf: i - n,
                Qf: i,
                tp: s,
                ip: n
            }, this.Pf.Hf.style.display = "block")
        }
        Yf(t) {
            const i = this.Rf;
            if (null === i) return;
            const s = (t.pageY - i.Zf) * i.tp,
                n = qt(i.Gf + s, i.ip, i.Jf);
            this.Ef.Xf().ko(n), this.Bf.Xf().ko(i.Qf - n), this.Df.Qt().Bh()
        }
        Kf(t) {
            null !== this.Rf && null !== this.Pf && (this.Rf = null, this.Pf.Hf.style.display = "none")
        }
    }

    function ms(t, i) {
        return t.sp - i.sp
    }

    function ws(t, i, s) {
        const n = (t.sp - i.sp) / (t.wt - i.wt);
        return Math.sign(n) * Math.min(Math.abs(n), s)
    }
    class gs {
        constructor(t, i, s, n) {
            this.np = null, this.ep = null, this.rp = null, this.hp = null, this.ap = null, this.lp = 0, this.op = 0, this._p = t, this.up = i, this.cp = s, this.Mn = n
        }
        dp(t, i) {
            if (null !== this.np) {
                if (this.np.wt === i) return void(this.np.sp = t);
                if (Math.abs(this.np.sp - t) < this.Mn) return
            }
            this.hp = this.rp, this.rp = this.ep, this.ep = this.np, this.np = {
                wt: i,
                sp: t
            }
        }
        le(t, i) {
            if (null === this.np || null === this.ep) return;
            if (i - this.np.wt > 50) return;
            let s = 0;
            const n = ws(this.np, this.ep, this.up),
                e = ms(this.np, this.ep),
                r = [n],
                h = [e];
            if (s += e, null !== this.rp) {
                const t = ws(this.ep, this.rp, this.up);
                if (Math.sign(t) === Math.sign(n)) {
                    const i = ms(this.ep, this.rp);
                    if (r.push(t), h.push(i), s += i, null !== this.hp) {
                        const t = ws(this.rp, this.hp, this.up);
                        if (Math.sign(t) === Math.sign(n)) {
                            const i = ms(this.rp, this.hp);
                            r.push(t), h.push(i), s += i
                        }
                    }
                }
            }
            let a = 0;
            for (let t = 0; t < r.length; ++t) a += h[t] / s * r[t];
            Math.abs(a) < this._p || (this.ap = {
                sp: t,
                wt: i
            }, this.op = a, this.lp = function(t, i) {
                const s = Math.log(i);
                return Math.log(1 * s / -t) / s
            }(Math.abs(a), this.cp))
        }
        bu(t) {
            const i = a(this.ap),
                s = t - i.wt;
            return i.sp + this.op * (Math.pow(this.cp, s) - 1) / Math.log(this.cp)
        }
        Mu(t) {
            return null === this.ap || this.fp(t) === this.lp
        }
        fp(t) {
            const i = t - a(this.ap).wt;
            return Math.min(i, this.lp)
        }
    }
    class Ms {
        constructor(t, i) {
            this.pp = void 0, this.vp = void 0, this.mp = void 0, this.ps = !1, this.wp = t, this.gp = i, this.Mp()
        }
        Pt() {
            this.Mp()
        }
        bp() {
            this.pp && this.wp.removeChild(this.pp), this.vp && this.wp.removeChild(this.vp), this.pp = void 0, this.vp = void 0
        }
        xp() {
            return this.ps !== this.Sp() || this.mp !== this.Cp()
        }
        Cp() {
            return this.gp.Qt().Xi().J(this.gp.N().layout.textColor) > 160 ? "dark" : "light"
        }
        Sp() {
            return this.gp.N().layout.attributionLogo
        }
        yp() {
            const t = new URL(location.href);
            return t.hostname ? "&utm_source=" + t.hostname + t.pathname : ""
        }
        Mp() {
            this.xp() && (this.bp(), this.ps = this.Sp(), this.ps && (this.mp = this.Cp(), 
            this.vp = document.createElement("style"), 
            this.vp.innerText = "a#tv-attr-logo{--fill:#131722;--stroke:#fff;position:absolute;left:10px;bottom:10px;height:19px;width:35px;margin:0;padding:0;border:0;z-index:3;}a#tv-attr-logo[data-dark]{--fill:#D1D4DC;--stroke:#131722;}", 
            this.pp = document.createElement("a"), 
            // this.pp.href = `https://www.tradingview.com/?utm_medium=lwc-link&utm_campaign=lwc-chart${this.yp()}`, 
            this.pp.title = "Charting by TradingView", 
            // this.pp.id = "tv-attr-logo", 
            this.pp.target = "_blank", 
            this.pp.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="35" height="19" fill="none"><g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd"><path fill="var(--stroke)" d="M2 0H0v10h6v9h21.4l.5-1.3 6-15 1-2.7H23.7l-.5 1.3-.2.6a5 5 0 0 0-7-.9V0H2Zm20 17h4l5.2-13 .8-2h-7l-1 2.5-.2.5-1.5 3.8-.3.7V17Zm-.8-10a3 3 0 0 0 .7-2.7A3 3 0 1 0 16.8 7h4.4ZM14 7V2H2v6h6v9h4V7h2Z"/><path fill="var(--fill)" d="M14 2H2v6h6v9h6V2Zm12 15h-7l6-15h7l-6 15Zm-7-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></g><defs><clipPath id="a"><path fill="var(--stroke)" d="M0 0h35v19H0z"/></clipPath></defs></svg>', this.pp.toggleAttribute("data-dark", "dark" === this.mp), this.wp.appendChild(this.vp), this.wp.appendChild(this.pp)))
        }
    }

    function bs(t, i) {
        const s = a(t.ownerDocument).createElement("canvas");
        t.appendChild(s);
        const n = new is(s, (e = {
            options: {
                allowResizeObserver: !0
            },
            transform: (t, i) => ({
                width: Math.max(t.width, i.width),
                height: Math.max(t.height, i.height)
            })
        }).transform, e.options);
        var e;
        return n.resizeCanvasElement(i), n
    }

    function xs(t) {
        t.width = 1, t.height = 1, t.getContext("2d")?.clearRect(0, 0, 1, 1)
    }

    function Ss(t, i, s, n) {
        t.ih && t.ih(i, s, n)
    }

    function Cs(t, i, s, n) {
        t.nt(i, s, n)
    }

    function ys(t, i, s, n) {
        const e = t(s, n);
        for (const t of e) {
            const s = t.Tt(n);
            null !== s && i(s)
        }
    }

    function Ps(t, i) {
        return s => {
            if (! function(t) {
                    return void 0 !== t.Wt
                }(s)) return [];
            return (s.Wt()?.wa() ?? "") !== i ? [] : s.ta?.(t) ?? []
        }
    }

    function ks(t, i, s, n) {
        if (!t.length) return;
        let e = 0;
        const r = t[0].$t(n, !0);
        let h = 1 === i ? s / 2 - (t[0].Wi() - r / 2) : t[0].Wi() - r / 2 - s / 2;
        h = Math.max(0, h);
        for (let r = 1; r < t.length; r++) {
            const a = t[r],
                l = t[r - 1],
                o = l.$t(n, !1),
                _ = a.Wi(),
                u = l.Wi();
            if (1 === i ? _ > u - o : _ < u + o) {
                const n = u - o * i;
                a.Fi(n);
                const r = n - i * o / 2;
                if ((1 === i ? r < 0 : r > s) && h > 0) {
                    const n = 1 === i ? -1 - r : r - s,
                        a = Math.min(n, h);
                    for (let s = e; s < t.length; s++) t[s].Fi(t[s].Wi() + i * a);
                    h -= a
                }
            } else e = r, h = 1 === i ? u - o - _ : _ - (u + o)
        }
    }
    class Ts {
        constructor(t, i, s, n) {
            this.qi = null, this.Pp = null, this.kp = !1, this.Tp = new tt(200), this.Rp = null, this.Dp = 0, this.Ep = !1, this.Vp = () => {
                this.Ep || this.yt.Bp().Qt().ar()
            }, this.Ip = () => {
                this.Ep || this.yt.Bp().Qt().ar()
            }, this.yt = t, this.ys = i, this.gl = i.layout, this.Uu = s, this.Ap = "left" === n, this.zp = Ps("normal", n), this.Op = Ps("top", n), this.Lp = Ps("bottom", n), this.Af = document.createElement("div"), this.Af.style.height = "100%", this.Af.style.overflow = "hidden", this.Af.style.width = "25px", this.Af.style.left = "0", this.Af.style.position = "relative", this.Np = bs(this.Af, Ji({
                width: 16,
                height: 16
            })), this.Np.subscribeSuggestedBitmapSizeChanged(this.Vp);
            const e = this.Np.canvasElement;
            e.style.position = "absolute", e.style.zIndex = "1", e.style.left = "0", e.style.top = "0", this.Wp = bs(this.Af, Ji({
                width: 16,
                height: 16
            })), this.Wp.subscribeSuggestedBitmapSizeChanged(this.Ip);
            const r = this.Wp.canvasElement;
            r.style.position = "absolute", r.style.zIndex = "2", r.style.left = "0", r.style.top = "0";
            const h = {
                _f: this.qf.bind(this),
                af: this.qf.bind(this),
                Qd: this.Yf.bind(this),
                Gd: this.Yf.bind(this),
                uf: this.Fp.bind(this),
                nf: this.Kf.bind(this),
                if: this.Kf.bind(this),
                Od: this.Hp.bind(this),
                Bd: this.Hp.bind(this),
                $d: this.Up.bind(this),
                Mf: this.jf.bind(this)
            };
            this.kf = new _s(this.Wp.canvasElement, h, {
                Xd: () => !this.ys.handleScroll.vertTouchDrag,
                Zd: () => !0
            })
        }
        m() {
            this.kf.m(), this.Wp.unsubscribeSuggestedBitmapSizeChanged(this.Ip), xs(this.Wp.canvasElement), this.Wp.dispose(), this.Np.unsubscribeSuggestedBitmapSizeChanged(this.Vp), xs(this.Np.canvasElement), this.Np.dispose(), null !== this.qi && this.qi.io().u(this), this.qi = null
        }
        Lf() {
            return this.Af
        }
        P() {
            return this.gl.fontSize
        }
        $p() {
            const t = this.Uu.N();
            return this.Rp !== t.k && (this.Tp.Vn(), this.Rp = t.k), t
        }
        jp() {
            if (null === this.qi) return 0;
            let t = 0;
            const i = this.$p(),
                s = a(this.Np.canvasElement.getContext("2d", {
                    colorSpace: this.yt.Bp().N().layout.colorSpace
                }));
            s.save();
            const n = this.qi.Ea();
            s.font = this.qp(), n.length > 0 && (t = Math.max(this.Tp.Ei(s, n[0].Xa), this.Tp.Ei(s, n[n.length - 1].Xa)));
            const e = this.Yp();
            for (let i = e.length; i--;) {
                const n = this.Tp.Ei(s, e[i].ri());
                n > t && (t = n)
            }
            const r = this.qi.zt();
            if (null !== r && null !== this.Pp && (2 !== (h = this.ys.crosshair).mode && h.horzLine.visible && h.horzLine.labelVisible)) {
                const i = this.qi.Ts(1, r),
                    n = this.qi.Ts(this.Pp.height - 2, r);
                t = Math.max(t, this.Tp.Ei(s, this.qi.Zi(Math.floor(Math.min(i, n)) + .11111111111111, r)), this.Tp.Ei(s, this.qi.Zi(Math.ceil(Math.max(i, n)) - .11111111111111, r)))
            }
            var h;
            s.restore();
            const l = t || 34;
            return ls(Math.ceil(i.S + i.C + i.B + i.I + 5 + l))
        }
        Kp(t) {
            null !== this.Pp && Qi(this.Pp, t) || (this.Pp = t, this.Ep = !0, this.Np.resizeCanvasElement(t), this.Wp.resizeCanvasElement(t), this.Ep = !1, this.Af.style.width = `${t.width}px`, this.Af.style.height = `${t.height}px`)
        }
        Xp() {
            return a(this.Pp).width
        }
        _s(t) {
            this.qi !== t && (null !== this.qi && this.qi.io().u(this), this.qi = t, t.io().i(this.ol.bind(this), this))
        }
        Wt() {
            return this.qi
        }
        Vn() {
            const t = this.yt.Xf();
            this.yt.Bp().Qt().Ho(t, a(this.Wt()))
        }
        Zp(t) {
            if (null === this.Pp) return;
            const i = {
                colorSpace: this.yt.Bp().N().layout.colorSpace
            };
            if (1 !== t) {
                this.Gp(), this.Np.applySuggestedBitmapSize();
                const t = es(this.Np, i);
                null !== t && (t.useBitmapCoordinateSpace((t => {
                    this.Jp(t), this.Qp(t)
                })), this.yt.tv(t, this.Lp), this.iv(t), this.yt.tv(t, this.zp), this.sv(t))
            }
            this.Wp.applySuggestedBitmapSize();
            const s = es(this.Wp, i);
            null !== s && (s.useBitmapCoordinateSpace((({
                context: t,
                bitmapSize: i
            }) => {
                t.clearRect(0, 0, i.width, i.height)
            })), this.nv(s), this.yt.tv(s, this.Op))
        }
        Wf() {
            return this.Np.bitmapSize
        }
        Ff(t, i, s) {
            const n = this.Wf();
            n.width > 0 && n.height > 0 && t.drawImage(this.Np.canvasElement, i, s)
        }
        Pt() {
            this.qi?.Ea()
        }
        qf(t) {
            if (null === this.qi || this.qi.Ki() || !this.ys.handleScale.axisPressedMouseMove.price) return;
            const i = this.yt.Bp().Qt(),
                s = this.yt.Xf();
            this.kp = !0, i.Ao(s, this.qi, t.localY)
        }
        Yf(t) {
            if (null === this.qi || !this.ys.handleScale.axisPressedMouseMove.price) return;
            const i = this.yt.Bp().Qt(),
                s = this.yt.Xf(),
                n = this.qi;
            i.zo(s, n, t.localY)
        }
        Fp() {
            if (null === this.qi || !this.ys.handleScale.axisPressedMouseMove.price) return;
            const t = this.yt.Bp().Qt(),
                i = this.yt.Xf(),
                s = this.qi;
            this.kp && (this.kp = !1, t.Oo(i, s))
        }
        Kf(t) {
            if (null === this.qi || !this.ys.handleScale.axisPressedMouseMove.price) return;
            const i = this.yt.Bp().Qt(),
                s = this.yt.Xf();
            this.kp = !1, i.Oo(s, this.qi)
        }
        Hp(t) {
            this.ys.handleScale.axisDoubleClickReset.price && this.Vn()
        }
        Up(t) {
            if (null === this.qi) return;
            !this.yt.Bp().Qt().N().handleScale.axisPressedMouseMove.price || this.qi.Oe() || this.qi.Rl() || this.ev(1)
        }
        jf(t) {
            this.ev(0)
        }
        Yp() {
            const t = [],
                i = null === this.qi ? void 0 : this.qi;
            return (s => {
                for (let n = 0; n < s.length; ++n) {
                    const e = s[n].Fs(this.yt.Xf(), i);
                    for (let i = 0; i < e.length; i++) t.push(e[i])
                }
            })(this.yt.Xf().Dt()), t
        }
        Jp({
            context: t,
            bitmapSize: i
        }) {
            const {
                width: s,
                height: n
            } = i, e = this.yt.Xf().Qt(), r = e.$(), h = e.Ec();
            r === h ? B(t, 0, 0, s, n, r) : z(t, 0, 0, s, n, r, h)
        }
        Qp({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s
        }) {
            if (null === this.Pp || null === this.qi || !this.qi.N().borderVisible) return;
            t.fillStyle = this.qi.N().borderColor;
            const n = Math.max(1, Math.floor(this.$p().S * s));
            let e;
            e = this.Ap ? i.width - n : 0, t.fillRect(e, 0, n, i.height)
        }
        iv(t) {
            if (null === this.Pp || null === this.qi) return;
            const i = this.qi.Ea(),
                s = this.qi.N(),
                n = this.$p(),
                e = this.Ap ? this.Pp.width - n.C : 0;
            s.borderVisible && s.ticksVisible && t.useBitmapCoordinateSpace((({
                context: t,
                horizontalPixelRatio: r,
                verticalPixelRatio: h
            }) => {
                t.fillStyle = s.borderColor;
                const a = Math.max(1, Math.floor(h)),
                    l = Math.floor(.5 * h),
                    o = Math.round(n.C * r);
                t.beginPath();
                for (const s of i) t.rect(Math.floor(e * r), Math.round(s.Pa * h) - l, o, a);
                t.fill()
            })), t.useMediaCoordinateSpace((({
                context: t
            }) => {
                t.font = this.qp(), t.fillStyle = s.textColor ?? this.gl.textColor, t.textAlign = this.Ap ? "right" : "left", t.textBaseline = "middle";
                const r = this.Ap ? Math.round(e - n.B) : Math.round(e + n.C + n.B),
                    h = i.map((i => this.Tp.Di(t, i.Xa)));
                for (let s = i.length; s--;) {
                    const n = i[s];
                    t.fillText(n.Xa, r, n.Pa + h[s])
                }
            }))
        }
        Gp() {
            if (null === this.Pp || null === this.qi) return;
            let t = this.Pp.height / 2;
            const i = [],
                s = this.qi.Dt().slice(),
                n = this.yt.Xf(),
                e = this.$p();
            this.qi === n.$n() && this.yt.Xf().Dt().forEach((t => {
                n.Un(t) && s.push(t)
            }));
            const r = this.qi.ba()[0],
                h = this.qi;
            s.forEach((s => {
                const e = s.Fs(n, h);
                e.forEach((t => {
                    t.Fi(null), t.Hi() && i.push(t)
                })), r === s && e.length > 0 && (t = e[0].Bi())
            })), i.forEach((t => t.Fi(t.Bi())));
            this.qi.N().alignLabels && this.rv(i, e, t)
        }
        rv(t, i, s) {
            if (null === this.Pp) return;
            const n = t.filter((t => t.Bi() <= s)),
                e = t.filter((t => t.Bi() > s));
            n.sort(((t, i) => i.Bi() - t.Bi())), n.length && e.length && e.push(n[0]), e.sort(((t, i) => t.Bi() - i.Bi()));
            for (const s of t) {
                const t = Math.floor(s.$t(i) / 2),
                    n = s.Bi();
                n > -t && n < t && s.Fi(t), n > this.Pp.height - t && n < this.Pp.height + t && s.Fi(this.Pp.height - t)
            }
            ks(n, 1, this.Pp.height, i), ks(e, -1, this.Pp.height, i)
        }
        sv(t) {
            if (null === this.Pp) return;
            const i = this.Yp(),
                s = this.$p(),
                n = this.Ap ? "right" : "left";
            i.forEach((i => {
                if (i.Ui()) {
                    i.Tt(a(this.qi)).nt(t, s, this.Tp, n)
                }
            }))
        }
        nv(t) {
            if (null === this.Pp || null === this.qi) return;
            const i = this.yt.Bp().Qt(),
                s = [],
                n = this.yt.Xf(),
                e = i.sc().Fs(n, this.qi);
            e.length && s.push(e);
            const r = this.$p(),
                h = this.Ap ? "right" : "left";
            s.forEach((i => {
                i.forEach((i => {
                    i.Tt(a(this.qi)).nt(t, r, this.Tp, h)
                }))
            }))
        }
        ev(t) {
            this.Af.style.cursor = 1 === t ? "ns-resize" : "default"
        }
        ol() {
            const t = this.jp();
            this.Dp < t && this.yt.Bp().Qt().Bh(), this.Dp = t
        }
        qp() {
            return g(this.gl.fontSize, this.gl.fontFamily)
        }
    }

    function Rs(t, i) {
        return t.Jh?.(i) ?? []
    }

    function Ds(t, i) {
        return t.Ws?.(i) ?? []
    }

    function Es(t, i) {
        return t.us?.(i) ?? []
    }

    function Vs(t, i) {
        return t.Xh?.(i) ?? []
    }
    class Bs {
        constructor(t, i) {
            this.Pp = Ji({
                width: 0,
                height: 0
            }), this.hv = null, this.av = null, this.lv = null, this.ov = null, this._v = !1, this.uv = new o, this.cv = new o, this.dv = 0, this.fv = !1, this.pv = null, this.vv = !1, this.mv = null, this.wv = null, this.Ep = !1, this.Vp = () => {
                this.Ep || null === this.gv || this.ts().ar()
            }, this.Ip = () => {
                this.Ep || null === this.gv || this.ts().ar()
            }, this.gp = t, this.gv = i, this.gv.qo().i(this.Mv.bind(this), this, !0), this.bv = document.createElement("td"), this.bv.style.padding = "0", this.bv.style.position = "relative";
            const s = document.createElement("div");
            s.style.width = "100%", s.style.height = "100%", s.style.position = "relative", s.style.overflow = "hidden", this.xv = document.createElement("td"), this.xv.style.padding = "0", this.Sv = document.createElement("td"), this.Sv.style.padding = "0", this.bv.appendChild(s), this.Np = bs(s, Ji({
                width: 16,
                height: 16
            })), this.Np.subscribeSuggestedBitmapSizeChanged(this.Vp);
            const n = this.Np.canvasElement;
            n.style.position = "absolute", n.style.zIndex = "1", n.style.left = "0", n.style.top = "0", this.Wp = bs(s, Ji({
                width: 16,
                height: 16
            })), this.Wp.subscribeSuggestedBitmapSizeChanged(this.Ip);
            const e = this.Wp.canvasElement;
            e.style.position = "absolute", e.style.zIndex = "2", e.style.left = "0", e.style.top = "0", this.If = document.createElement("tr"), this.If.appendChild(this.xv), this.If.appendChild(this.bv), this.If.appendChild(this.Sv), this.Cv(), this.kf = new _s(this.Wp.canvasElement, this, {
                Xd: () => null === this.pv && !this.gp.N().handleScroll.vertTouchDrag,
                Zd: () => null === this.pv && !this.gp.N().handleScroll.horzTouchDrag
            })
        }
        m() {
            null !== this.hv && this.hv.m(), null !== this.av && this.av.m(), this.lv = null, this.Wp.unsubscribeSuggestedBitmapSizeChanged(this.Ip), xs(this.Wp.canvasElement), this.Wp.dispose(), this.Np.unsubscribeSuggestedBitmapSizeChanged(this.Vp), xs(this.Np.canvasElement), this.Np.dispose(), null !== this.gv && (this.gv.qo().u(this), this.gv.m()), this.kf.m()
        }
        Xf() {
            return a(this.gv)
        }
        yv(t) {
            null !== this.gv && this.gv.qo().u(this), this.gv = t, null !== this.gv && this.gv.qo().i(Bs.prototype.Mv.bind(this), this, !0), this.Cv(), this.gp.Vf().indexOf(this) === this.gp.Vf().length - 1 ? (this.lv = this.lv ?? new Ms(this.bv, this.gp), this.lv.Pt()) : (this.lv?.bp(), this.lv = null)
        }
        Bp() {
            return this.gp
        }
        Lf() {
            return this.If
        }
        Cv() {
            if (null !== this.gv && (this.Pv(), 0 !== this.ts().Ys().length)) {
                if (null !== this.hv) {
                    const t = this.gv.Bo();
                    this.hv._s(a(t))
                }
                if (null !== this.av) {
                    const t = this.gv.Io();
                    this.av._s(a(t))
                }
            }
        }
        kv() {
            null !== this.hv && this.hv.Pt(), null !== this.av && this.av.Pt()
        }
        Po() {
            return null !== this.gv ? this.gv.Po() : 0
        }
        ko(t) {
            this.gv && this.gv.ko(t)
        }
        $d(t) {
            if (!this.gv) return;
            this.Tv();
            const i = t.localX,
                s = t.localY;
            this.Rv(i, s, t)
        }
        _f(t) {
            this.Tv(), this.Dv(), this.Rv(t.localX, t.localY, t)
        }
        jd(t) {
            if (!this.gv) return;
            this.Tv();
            const i = t.localX,
                s = t.localY;
            this.Rv(i, s, t)
        }
        ef(t) {
            null !== this.gv && (this.Tv(), this.Ev(t))
        }
        Od(t) {
            null !== this.gv && this.Vv(this.cv, t)
        }
        Bd(t) {
            this.Od(t)
        }
        Qd(t) {
            this.Tv(), this.Bv(t), this.Rv(t.localX, t.localY, t)
        }
        nf(t) {
            null !== this.gv && (this.Tv(), this.fv = !1, this.Iv(t))
        }
        sf(t) {
            null !== this.gv && this.Ev(t)
        }
        bf(t) {
            if (this.fv = !0, null === this.pv) {
                const i = {
                    x: t.localX,
                    y: t.localY
                };
                this.Av(i, i, t)
            }
        }
        Mf(t) {
            null !== this.gv && (this.Tv(), this.gv.Qt().Ju(null), this.zv())
        }
        Ov() {
            return this.uv
        }
        Lv() {
            return this.cv
        }
        ff() {
            this.dv = 1, this.ts().hn()
        }
        pf(t, i) {
            if (!this.gp.N().handleScale.pinch) return;
            const s = 5 * (i - this.dv);
            this.dv = i, this.ts()._c(t._t, s)
        }
        af(t) {
            this.fv = !1, this.vv = null !== this.pv, this.Dv();
            const i = this.ts().sc();
            null !== this.pv && i.Et() && (this.mv = {
                x: i.si(),
                y: i.ni()
            }, this.pv = {
                x: t.localX,
                y: t.localY
            })
        }
        Gd(t) {
            if (null === this.gv) return;
            const i = t.localX,
                s = t.localY;
            if (null === this.pv) this.Bv(t);
            else {
                this.vv = !1;
                const n = a(this.mv),
                    e = n.x + (i - this.pv.x),
                    r = n.y + (s - this.pv.y);
                this.Rv(e, r, t)
            }
        }
        if (t) {
            0 === this.Bp().N().trackingMode.exitMode && (this.vv = !0), this.Nv(), this.Iv(t)
        }
        Yn(t, i) {
            const s = this.gv;
            return null === s ? null : Mi(s, t, i)
        }
        Wv(t, i) {
            a("left" === i ? this.hv : this.av).Kp(Ji({
                width: t,
                height: this.Pp.height
            }))
        }
        Nf() {
            return this.Pp
        }
        Kp(t) {
            Qi(this.Pp, t) || (this.Pp = t, this.Ep = !0, this.Np.resizeCanvasElement(t), this.Wp.resizeCanvasElement(t), this.Ep = !1, this.bv.style.width = t.width + "px", this.bv.style.height = t.height + "px")
        }
        Fv() {
            const t = a(this.gv);
            t.Vo(t.Bo()), t.Vo(t.Io());
            for (const i of t.ba())
                if (t.Un(i)) {
                    const s = i.Wt();
                    null !== s && t.Vo(s), i.Ns()
                } for (const i of t.Ko()) i.Ns()
        }
        Wf() {
            return this.Np.bitmapSize
        }
        Ff(t, i, s) {
            const n = this.Wf();
            n.width > 0 && n.height > 0 && t.drawImage(this.Np.canvasElement, i, s)
        }
        Zp(t) {
            if (0 === t) return;
            if (null === this.gv) return;
            t > 1 && this.Fv(), null !== this.hv && this.hv.Zp(t), null !== this.av && this.av.Zp(t);
            const i = {
                colorSpace: this.gp.N().layout.colorSpace
            };
            if (1 !== t) {
                this.Np.applySuggestedBitmapSize();
                const t = es(this.Np, i);
                null !== t && (t.useBitmapCoordinateSpace((t => {
                    this.Jp(t)
                })), this.gv && (this.Hv(t, Rs), this.Uv(t), this.Hv(t, Ds), this.Hv(t, Es)))
            }
            this.Wp.applySuggestedBitmapSize();
            const s = es(this.Wp, i);
            null !== s && (s.useBitmapCoordinateSpace((({
                context: t,
                bitmapSize: i
            }) => {
                t.clearRect(0, 0, i.width, i.height)
            })), this.$v(s), this.Hv(s, Vs), this.Hv(s, Es))
        }
        jv() {
            return this.hv
        }
        qv() {
            return this.av
        }
        tv(t, i) {
            this.Hv(t, i)
        }
        Mv() {
            null !== this.gv && this.gv.qo().u(this), this.gv = null
        }
        Ev(t) {
            this.Vv(this.uv, t)
        }
        Vv(t, i) {
            const s = i.localX,
                n = i.localY;
            t.v() && t.p(this.ts().It().nu(s), {
                x: s,
                y: n
            }, i)
        }
        Jp({
            context: t,
            bitmapSize: i
        }) {
            const {
                width: s,
                height: n
            } = i, e = this.ts(), r = e.$(), h = e.Ec();
            r === h ? B(t, 0, 0, s, n, h) : z(t, 0, 0, s, n, r, h)
        }
        Uv(t) {
            const i = a(this.gv),
                s = i.Yo().lr().Tt(i);
            null !== s && s.nt(t, !1)
        }
        $v(t) {
            this.Yv(t, Ds, Cs, this.ts().sc())
        }
        Hv(t, i) {
            const s = a(this.gv),
                n = s.Dt(),
                e = s.Ko();
            for (const s of e) this.Yv(t, i, Ss, s);
            for (const s of n) this.Yv(t, i, Ss, s);
            for (const s of e) this.Yv(t, i, Cs, s);
            for (const s of n) this.Yv(t, i, Cs, s)
        }
        Yv(t, i, s, n) {
            const e = a(this.gv),
                r = e.Qt().Gu(),
                h = null !== r && r.Xo === n,
                l = null !== r && h && void 0 !== r.Zo ? r.Zo.Xn : void 0;
            ys(i, (i => s(i, t, h, l)), n, e)
        }
        Pv() {
            if (null === this.gv) return;
            const t = this.gp,
                i = this.gv.Bo().N().visible,
                s = this.gv.Io().N().visible;
            i || null === this.hv || (this.xv.removeChild(this.hv.Lf()), this.hv.m(), this.hv = null), s || null === this.av || (this.Sv.removeChild(this.av.Lf()), this.av.m(), this.av = null);
            const n = t.Qt().xc();
            i && null === this.hv && (this.hv = new Ts(this, t.N(), n, "left"), this.xv.appendChild(this.hv.Lf())), s && null === this.av && (this.av = new Ts(this, t.N(), n, "right"), this.Sv.appendChild(this.av.Lf()))
        }
        Kv(t) {
            return t.xf && this.fv || null !== this.pv
        }
        Xv(t) {
            return Math.max(0, Math.min(t, this.Pp.width - 1))
        }
        Zv(t) {
            return Math.max(0, Math.min(t, this.Pp.height - 1))
        }
        Rv(t, i, s) {
            this.ts().wc(this.Xv(t), this.Zv(i), s, a(this.gv))
        }
        zv() {
            this.ts().Mc()
        }
        Nv() {
            this.vv && (this.pv = null, this.zv())
        }
        Av(t, i, s) {
            this.pv = t, this.vv = !1, this.Rv(i.x, i.y, s);
            const n = this.ts().sc();
            this.mv = {
                x: n.si(),
                y: n.ni()
            }
        }
        ts() {
            return this.gp.Qt()
        }
        Iv(t) {
            if (!this._v) return;
            const i = this.ts(),
                s = this.Xf();
            if (i.Wo(s, s.ks()), this.ov = null, this._v = !1, i.fc(), null !== this.wv) {
                const t = performance.now(),
                    s = i.It();
                this.wv.le(s._u(), t), this.wv.Mu(t) || i._n(this.wv)
            }
        }
        Tv() {
            this.pv = null
        }
        Dv() {
            if (!this.gv) return;
            if (this.ts().hn(), document.activeElement !== document.body && document.activeElement !== document.documentElement) a(document.activeElement).blur();
            else {
                const t = document.getSelection();
                null !== t && t.removeAllRanges()
            }!this.gv.ks().Ki() && this.ts().It().Ki()
        }
        Bv(t) {
            if (null === this.gv) return;
            const i = this.ts(),
                s = i.It();
            if (s.Ki()) return;
            const n = this.gp.N(),
                e = n.handleScroll,
                r = n.kineticScroll;
            if ((!e.pressedMouseMove || t.xf) && (!e.horzTouchDrag && !e.vertTouchDrag || !t.xf)) return;
            const h = this.gv.ks(),
                a = performance.now();
            if (null !== this.ov || this.Kv(t) || (this.ov = {
                    x: t.clientX,
                    y: t.clientY,
                    qc: a,
                    Gv: t.localX,
                    Jv: t.localY
                }), null !== this.ov && !this._v && (this.ov.x !== t.clientX || this.ov.y !== t.clientY)) {
                if (t.xf && r.touch || !t.xf && r.mouse) {
                    const t = s.lu();
                    this.wv = new gs(.2 / t, 7 / t, .997, 15 / t), this.wv.dp(s._u(), this.ov.qc)
                } else this.wv = null;
                h.Ki() || i.Lo(this.gv, h, t.localY), i.cc(t.localX), this._v = !0
            }
            this._v && (h.Ki() || i.No(this.gv, h, t.localY), i.dc(t.localX), null !== this.wv && this.wv.dp(s._u(), a))
        }
    }
    class Is {
        constructor(t, i, s, n, e) {
            this.St = !0, this.Pp = Ji({
                width: 0,
                height: 0
            }), this.Vp = () => this.Zp(3), this.Ap = "left" === t, this.Uu = s.xc, this.ys = i, this.Qv = n, this.tm = e, this.Af = document.createElement("div"), this.Af.style.width = "25px", this.Af.style.height = "100%", this.Af.style.overflow = "hidden", this.Np = bs(this.Af, Ji({
                width: 16,
                height: 16
            })), this.Np.subscribeSuggestedBitmapSizeChanged(this.Vp)
        }
        m() {
            this.Np.unsubscribeSuggestedBitmapSizeChanged(this.Vp), xs(this.Np.canvasElement), this.Np.dispose()
        }
        Lf() {
            return this.Af
        }
        Nf() {
            return this.Pp
        }
        Kp(t) {
            Qi(this.Pp, t) || (this.Pp = t, this.Np.resizeCanvasElement(t), this.Af.style.width = `${t.width}px`, this.Af.style.height = `${t.height}px`, this.St = !0)
        }
        Zp(t) {
            if (t < 3 && !this.St) return;
            if (0 === this.Pp.width || 0 === this.Pp.height) return;
            this.St = !1, this.Np.applySuggestedBitmapSize();
            const i = es(this.Np, {
                colorSpace: this.ys.layout.colorSpace
            });
            null !== i && i.useBitmapCoordinateSpace((t => {
                this.Jp(t), this.Qp(t)
            }))
        }
        Wf() {
            return this.Np.bitmapSize
        }
        Ff(t, i, s) {
            const n = this.Wf();
            n.width > 0 && n.height > 0 && t.drawImage(this.Np.canvasElement, i, s)
        }
        Qp({
            context: t,
            bitmapSize: i,
            horizontalPixelRatio: s,
            verticalPixelRatio: n
        }) {
            if (!this.Qv()) return;
            t.fillStyle = this.ys.timeScale.borderColor;
            const e = Math.floor(this.Uu.N().S * s),
                r = Math.floor(this.Uu.N().S * n),
                h = this.Ap ? i.width - e : 0;
            t.fillRect(h, 0, e, r)
        }
        Jp({
            context: t,
            bitmapSize: i
        }) {
            B(t, 0, 0, i.width, i.height, this.tm())
        }
    }

    function As(t) {
        return i => i.ia?.(t) ?? []
    }
    const zs = As("normal"),
        Os = As("top"),
        Ls = As("bottom");
    class Ns {
        constructor(t, i) {
            this.im = null, this.sm = null, this.M = null, this.nm = !1, this.Pp = Ji({
                width: 0,
                height: 0
            }), this.rm = new o, this.Tp = new tt(5), this.Ep = !1, this.Vp = () => {
                this.Ep || this.gp.Qt().ar()
            }, this.Ip = () => {
                this.Ep || this.gp.Qt().ar()
            }, this.gp = t, this.i_ = i, this.ys = t.N().layout, this.pp = document.createElement("tr"), this.hm = document.createElement("td"), this.hm.style.padding = "0", this.am = document.createElement("td"), this.am.style.padding = "0", this.Af = document.createElement("td"), this.Af.style.height = "25px", this.Af.style.padding = "0", this.lm = document.createElement("div"), this.lm.style.width = "100%", this.lm.style.height = "100%", this.lm.style.position = "relative", this.lm.style.overflow = "hidden", this.Af.appendChild(this.lm), this.Np = bs(this.lm, Ji({
                width: 16,
                height: 16
            })), this.Np.subscribeSuggestedBitmapSizeChanged(this.Vp);
            const s = this.Np.canvasElement;
            s.style.position = "absolute", s.style.zIndex = "1", s.style.left = "0", s.style.top = "0", this.Wp = bs(this.lm, Ji({
                width: 16,
                height: 16
            })), this.Wp.subscribeSuggestedBitmapSizeChanged(this.Ip);
            const n = this.Wp.canvasElement;
            n.style.position = "absolute", n.style.zIndex = "2", n.style.left = "0", n.style.top = "0", this.pp.appendChild(this.hm), this.pp.appendChild(this.Af), this.pp.appendChild(this.am), this.om(), this.gp.Qt().yo().i(this.om.bind(this), this), this.kf = new _s(this.Wp.canvasElement, this, {
                Xd: () => !0,
                Zd: () => !this.gp.N().handleScroll.horzTouchDrag
            })
        }
        m() {
            this.kf.m(), null !== this.im && this.im.m(), null !== this.sm && this.sm.m(), this.Wp.unsubscribeSuggestedBitmapSizeChanged(this.Ip), xs(this.Wp.canvasElement), this.Wp.dispose(), this.Np.unsubscribeSuggestedBitmapSizeChanged(this.Vp), xs(this.Np.canvasElement), this.Np.dispose()
        }
        Lf() {
            return this.pp
        }
        _m() {
            return this.im
        }
        um() {
            return this.sm
        }
        _f(t) {
            if (this.nm) return;
            this.nm = !0;
            const i = this.gp.Qt();
            !i.It().Ki() && this.gp.N().handleScale.axisPressedMouseMove.time && i.oc(t.localX)
        }
        af(t) {
            this._f(t)
        }
        uf() {
            const t = this.gp.Qt();
            !t.It().Ki() && this.nm && (this.nm = !1, this.gp.N().handleScale.axisPressedMouseMove.time && t.mc())
        }
        Qd(t) {
            const i = this.gp.Qt();
            !i.It().Ki() && this.gp.N().handleScale.axisPressedMouseMove.time && i.vc(t.localX)
        }
        Gd(t) {
            this.Qd(t)
        }
        nf() {
            this.nm = !1;
            const t = this.gp.Qt();
            t.It().Ki() && !this.gp.N().handleScale.axisPressedMouseMove.time || t.mc()
        }
        if () {
            this.nf()
        }
        Od() {
            this.gp.N().handleScale.axisDoubleClickReset.time && this.gp.Qt().cn()
        }
        Bd() {
            this.Od()
        }
        $d() {
            this.gp.Qt().N().handleScale.axisPressedMouseMove.time && this.ev(1)
        }
        Mf() {
            this.ev(0)
        }
        Nf() {
            return this.Pp
        }
        dm() {
            return this.rm
        }
        fm(t, i, s) {
            Qi(this.Pp, t) || (this.Pp = t, this.Ep = !0, this.Np.resizeCanvasElement(t), this.Wp.resizeCanvasElement(t), this.Ep = !1, this.Af.style.width = `${t.width}px`, this.Af.style.height = `${t.height}px`, this.rm.p(t)), null !== this.im && this.im.Kp(Ji({
                width: i,
                height: t.height
            })), null !== this.sm && this.sm.Kp(Ji({
                width: s,
                height: t.height
            }))
        }
        pm() {
            const t = this.vm();
            return Math.ceil(t.S + t.C + t.P + t.A + t.V + t.wm)
        }
        Pt() {
            this.gp.Qt().It().Ea()
        }
        Wf() {
            return this.Np.bitmapSize
        }
        Ff(t, i, s) {
            const n = this.Wf();
            n.width > 0 && n.height > 0 && t.drawImage(this.Np.canvasElement, i, s)
        }
        Zp(t) {
            if (0 === t) return;
            const i = {
                colorSpace: this.ys.colorSpace
            };
            if (1 !== t) {
                this.Np.applySuggestedBitmapSize();
                const s = es(this.Np, i);
                null !== s && (s.useBitmapCoordinateSpace((t => {
                    this.Jp(t), this.Qp(t), this.gm(s, Ls)
                })), this.iv(s), this.gm(s, zs)), null !== this.im && this.im.Zp(t), null !== this.sm && this.sm.Zp(t)
            }
            this.Wp.applySuggestedBitmapSize();
            const s = es(this.Wp, i);
            null !== s && (s.useBitmapCoordinateSpace((({
                context: t,
                bitmapSize: i
            }) => {
                t.clearRect(0, 0, i.width, i.height)
            })), this.Mm([...this.gp.Qt().Ys(), this.gp.Qt().sc()], s), this.gm(s, Os))
        }
        gm(t, i) {
            const s = this.gp.Qt().Ys();
            for (const n of s) ys(i, (i => Ss(i, t, !1, void 0)), n, void 0);
            for (const n of s) ys(i, (i => Cs(i, t, !1, void 0)), n, void 0)
        }
        Jp({
            context: t,
            bitmapSize: i
        }) {
            B(t, 0, 0, i.width, i.height, this.gp.Qt().Ec())
        }
        Qp({
            context: t,
            bitmapSize: i,
            verticalPixelRatio: s
        }) {
            if (this.gp.N().timeScale.borderVisible) {
                t.fillStyle = this.bm();
                const n = Math.max(1, Math.floor(this.vm().S * s));
                t.fillRect(0, 0, i.width, n)
            }
        }
        iv(t) {
            const i = this.gp.Qt().It(),
                s = i.Ea();
            if (!s || 0 === s.length) return;
            const n = this.i_.maxTickMarkWeight(s),
                e = this.vm(),
                r = i.N();
            r.borderVisible && r.ticksVisible && t.useBitmapCoordinateSpace((({
                context: t,
                horizontalPixelRatio: i,
                verticalPixelRatio: n
            }) => {
                t.strokeStyle = this.bm(), t.fillStyle = this.bm();
                const r = Math.max(1, Math.floor(i)),
                    h = Math.floor(.5 * i);
                t.beginPath();
                const a = Math.round(e.C * n);
                for (let n = s.length; n--;) {
                    const e = Math.round(s[n].coord * i);
                    t.rect(e - h, 0, r, a)
                }
                t.fill()
            })), t.useMediaCoordinateSpace((({
                context: t
            }) => {
                const i = e.S + e.C + e.A + e.P / 2;
                t.textAlign = "center", t.textBaseline = "middle", t.fillStyle = this.H(), t.font = this.qp();
                for (const e of s)
                    if (e.weight < n) {
                        const s = e.needAlignCoordinate ? this.xm(t, e.coord, e.label) : e.coord;
                        t.fillText(e.label, s, i)
                    } this.gp.N().timeScale.allowBoldLabels && (t.font = this.Sm());
                for (const e of s)
                    if (e.weight >= n) {
                        const s = e.needAlignCoordinate ? this.xm(t, e.coord, e.label) : e.coord;
                        t.fillText(e.label, s, i)
                    }
            }))
        }
        xm(t, i, s) {
            const n = this.Tp.Ei(t, s),
                e = n / 2,
                r = Math.floor(i - e) + .5;
            return r < 0 ? i += Math.abs(0 - r) : r + n > this.Pp.width && (i -= Math.abs(this.Pp.width - (r + n))), i
        }
        Mm(t, i) {
            const s = this.vm();
            for (const n of t)
                for (const t of n.cs()) t.Tt().nt(i, s)
        }
        bm() {
            return this.gp.N().timeScale.borderColor
        }
        H() {
            return this.ys.textColor
        }
        W() {
            return this.ys.fontSize
        }
        qp() {
            return g(this.W(), this.ys.fontFamily)
        }
        Sm() {
            return g(this.W(), this.ys.fontFamily, "bold")
        }
        vm() {
            null === this.M && (this.M = {
                S: 1,
                O: NaN,
                A: NaN,
                V: NaN,
                Ji: NaN,
                C: 5,
                P: NaN,
                k: "",
                Gi: new tt,
                wm: 0
            });
            const t = this.M,
                i = this.qp();
            if (t.k !== i) {
                const s = this.W();
                t.P = s, t.k = i, t.A = 3 * s / 12, t.V = 3 * s / 12, t.Ji = 9 * s / 12, t.O = 0, t.wm = 4 * s / 12, t.Gi.Vn()
            }
            return this.M
        }
        ev(t) {
            this.Af.style.cursor = 1 === t ? "ew-resize" : "default"
        }
        om() {
            const t = this.gp.Qt(),
                i = t.N();
            i.leftPriceScale.visible || null === this.im || (this.hm.removeChild(this.im.Lf()), this.im.m(), this.im = null), i.rightPriceScale.visible || null === this.sm || (this.am.removeChild(this.sm.Lf()), this.sm.m(), this.sm = null);
            const s = {
                    xc: this.gp.Qt().xc()
                },
                n = () => i.leftPriceScale.borderVisible && t.It().N().borderVisible,
                e = () => t.Ec();
            i.leftPriceScale.visible && null === this.im && (this.im = new Is("left", i, s, n, e), this.hm.appendChild(this.im.Lf())), i.rightPriceScale.visible && null === this.sm && (this.sm = new Is("right", i, s, n, e), this.am.appendChild(this.sm.Lf()))
        }
    }
    const Ws = !!rs && !!navigator.userAgentData && navigator.userAgentData.brands.some((t => t.brand.includes("Chromium"))) && !!rs && (navigator?.userAgentData?.platform ? "Windows" === navigator.userAgentData.platform : navigator.userAgent.toLowerCase().indexOf("win") >= 0);
    class Fs {
        constructor(t, i, s) {
            var n;
            this.Cm = [], this.ym = [], this.Pm = 0, this.tl = 0, this.fo = 0, this.km = 0, this.Tm = 0, this.Rm = null, this.Dm = !1, this.uv = new o, this.cv = new o, this.Wu = new o, this.Em = null, this.Vm = null, this.wp = t, this.ys = i, this.i_ = s, this.pp = document.createElement("div"), this.pp.classList.add("tv-lightweight-charts"), this.pp.style.overflow = "hidden", this.pp.style.direction = "ltr", this.pp.style.width = "100%", this.pp.style.height = "100%", (n = this.pp).style.userSelect = "none", n.style.webkitUserSelect = "none", n.style.msUserSelect = "none", n.style.MozUserSelect = "none", n.style.webkitTapHighlightColor = "transparent", this.Bm = document.createElement("table"), this.Bm.setAttribute("cellspacing", "0"), this.pp.appendChild(this.Bm), this.Im = this.Am.bind(this), Hs(this.ys) && this.zm(!0), this.ts = new Bi(this.Hu.bind(this), this.ys, s), this.Qt().nc().i(this.Om.bind(this), this), this.Lm = new Ns(this, this.i_), this.Bm.appendChild(this.Lm.Lf());
            const e = i.autoSize && this.Nm();
            let r = this.ys.width,
                h = this.ys.height;
            if (e || 0 === r || 0 === h) {
                const i = t.getBoundingClientRect();
                r = r || i.width, h = h || i.height
            }
            this.Wm(r, h), this.Fm(), t.appendChild(this.pp), this.Hm(), this.ts.It().Cu().i(this.ts.Bh.bind(this.ts), this), this.ts.yo().i(this.ts.Bh.bind(this.ts), this)
        }
        Qt() {
            return this.ts
        }
        N() {
            return this.ys
        }
        Vf() {
            return this.Cm
        }
        Um() {
            return this.Lm
        }
        m() {
            this.zm(!1), 0 !== this.Pm && window.cancelAnimationFrame(this.Pm), this.ts.nc().u(this), this.ts.It().Cu().u(this), this.ts.yo().u(this), this.ts.m();
            for (const t of this.Cm) this.Bm.removeChild(t.Lf()), t.Ov().u(this), t.Lv().u(this), t.m();
            this.Cm = [];
            for (const t of this.ym) this.$m(t);
            this.ym = [], a(this.Lm).m(), null !== this.pp.parentElement && this.pp.parentElement.removeChild(this.pp), this.Wu.m(), this.uv.m(), this.cv.m(), this.jm()
        }
        Wm(t, i, s = !1) {
            if (this.tl === i && this.fo === t) return;
            const n = function(t) {
                const i = Math.floor(t.width),
                    s = Math.floor(t.height);
                return Ji({
                    width: i - i % 2,
                    height: s - s % 2
                })
            }(Ji({
                width: t,
                height: i
            }));
            this.tl = n.height, this.fo = n.width;
            const e = this.tl + "px",
                r = this.fo + "px";
            a(this.pp).style.height = e, a(this.pp).style.width = r, this.Bm.style.height = e, this.Bm.style.width = r, s ? this.qm(Y.gn(), performance.now()) : this.ts.Bh()
        }
        Zp(t) {
            void 0 === t && (t = Y.gn());
            for (let i = 0; i < this.Cm.length; i++) this.Cm[i].Zp(t.en(i).tn);
            this.ys.timeScale.visible && this.Lm.Zp(t.nn())
        }
        hr(t) {
            const i = Hs(this.ys);
            this.ts.hr(t);
            const s = Hs(this.ys);
            s !== i && this.zm(s), t.layout?.panes && this.Ym(), this.Hm(), this.Km(t)
        }
        Ov() {
            return this.uv
        }
        Lv() {
            return this.cv
        }
        nc() {
            return this.Wu
        }
        Xm() {
            null !== this.Rm && (this.qm(this.Rm, performance.now()), this.Rm = null);
            const t = this.Zm(null),
                i = document.createElement("canvas");
            i.width = t.width, i.height = t.height;
            const s = a(i.getContext("2d"));
            return this.Zm(s), i
        }
        Gm(t) {
            if ("left" === t && !this.Jm()) return 0;
            if ("right" === t && !this.Qm()) return 0;
            if (0 === this.Cm.length) return 0;
            return a("left" === t ? this.Cm[0].jv() : this.Cm[0].qv()).Xp()
        }
        tw() {
            return this.ys.autoSize && null !== this.Em
        }
        Uf() {
            return this.pp
        }
        iw(t) {
            this.Vm = t, this.Vm ? this.Uf().style.setProperty("cursor", t) : this.Uf().style.removeProperty("cursor")
        }
        sw() {
            return this.Vm
        }
        nw(t) {
            return h(this.Cm[t]).Nf()
        }
        Ym() {
            this.ym.forEach((t => {
                t.Pt()
            }))
        }
        Km(t) {
            (void 0 !== t.autoSize || !this.Em || void 0 === t.width && void 0 === t.height) && (t.autoSize && !this.Em && this.Nm(), !1 === t.autoSize && null !== this.Em && this.jm(), t.autoSize || void 0 === t.width && void 0 === t.height || this.Wm(t.width || this.fo, t.height || this.tl))
        }
        Zm(t) {
            let i = 0,
                s = 0;
            const n = this.Cm[0],
                e = (i, s) => {
                    let n = 0;
                    for (let e = 0; e < this.Cm.length; e++) {
                        const r = this.Cm[e],
                            h = a("left" === i ? r.jv() : r.qv()),
                            l = h.Wf();
                        if (null !== t && h.Ff(t, s, n), n += l.height, e < this.Cm.length - 1) {
                            const i = this.ym[e],
                                r = i.Wf();
                            null !== t && i.Ff(t, s, n), n += r.height
                        }
                    }
                };
            if (this.Jm()) {
                e("left", 0);
                i += a(n.jv()).Wf().width
            }
            for (let n = 0; n < this.Cm.length; n++) {
                const e = this.Cm[n],
                    r = e.Wf();
                if (null !== t && e.Ff(t, i, s), s += r.height, n < this.Cm.length - 1) {
                    const e = this.ym[n],
                        r = e.Wf();
                    null !== t && e.Ff(t, i, s), s += r.height
                }
            }
            if (i += n.Wf().width, this.Qm()) {
                e("right", i);
                i += a(n.qv()).Wf().width
            }
            const r = (i, s, n) => {
                a("left" === i ? this.Lm._m() : this.Lm.um()).Ff(a(t), s, n)
            };
            if (this.ys.timeScale.visible) {
                const i = this.Lm.Wf();
                if (null !== t) {
                    let e = 0;
                    this.Jm() && (r("left", e, s), e = a(n.jv()).Wf().width), this.Lm.Ff(t, e, s), e += i.width, this.Qm() && r("right", e, s)
                }
                s += i.height
            }
            return Ji({
                width: i,
                height: s
            })
        }
        ew() {
            let t = 0,
                i = 0,
                s = 0;
            for (const n of this.Cm) this.Jm() && (i = Math.max(i, a(n.jv()).jp(), this.ys.leftPriceScale.minimumWidth)), this.Qm() && (s = Math.max(s, a(n.qv()).jp(), this.ys.rightPriceScale.minimumWidth)), t += n.Po();
            i = ls(i), s = ls(s);
            const n = this.fo,
                e = this.tl,
                r = Math.max(n - i - s, 0),
                h = 1 * this.ym.length,
                l = this.ys.timeScale.visible;
            let o = l ? Math.max(this.Lm.pm(), this.ys.timeScale.minimumHeight) : 0;
            var _;
            o = (_ = o) + _ % 2;
            const u = h + o,
                c = e < u ? 0 : e - u,
                d = c / t;
            let f = 0;
            const p = window.devicePixelRatio || 1;
            for (let t = 0; t < this.Cm.length; ++t) {
                const n = this.Cm[t];
                n.yv(this.ts.$s()[t]);
                let e = 0,
                    h = 0;
                h = t === this.Cm.length - 1 ? Math.ceil((c - f) * p) / p : Math.round(n.Po() * d * p) / p, e = Math.max(h, 2), f += e, n.Kp(Ji({
                    width: r,
                    height: e
                })), this.Jm() && n.Wv(i, "left"), this.Qm() && n.Wv(s, "right"), n.Xf() && this.ts.ec(n.Xf(), e)
            }
            this.Lm.fm(Ji({
                width: l ? r : 0,
                height: o
            }), l ? i : 0, l ? s : 0), this.ts.To(r), this.km !== i && (this.km = i), this.Tm !== s && (this.Tm = s)
        }
        zm(t) {
            t ? this.pp.addEventListener("wheel", this.Im, {
                passive: !1
            }) : this.pp.removeEventListener("wheel", this.Im)
        }
        rw(t) {
            switch (t.deltaMode) {
                case t.DOM_DELTA_PAGE:
                    return 120;
                case t.DOM_DELTA_LINE:
                    return 32
            }
            return Ws ? 1 / window.devicePixelRatio : 1
        }
        Am(t) {
            if (!(0 !== t.deltaX && this.ys.handleScroll.mouseWheel || 0 !== t.deltaY && this.ys.handleScale.mouseWheel)) return;
            const i = this.rw(t),
                s = i * t.deltaX / 100,
                n = -i * t.deltaY / 100;
            if (t.cancelable && t.preventDefault(), 0 !== n && this.ys.handleScale.mouseWheel) {
                const i = Math.sign(n) * Math.min(1, Math.abs(n)),
                    s = t.clientX - this.pp.getBoundingClientRect().left;
                this.Qt()._c(s, i)
            }
            0 !== s && this.ys.handleScroll.mouseWheel && this.Qt().uc(-80 * s)
        }
        qm(t, i) {
            const s = t.nn();
            3 === s && this.hw(), 3 !== s && 2 !== s || (this.aw(t), this.lw(t, i), this.Lm.Pt(), this.Cm.forEach((t => {
                t.kv()
            })), 3 === this.Rm?.nn() && (this.Rm.vn(t), this.hw(), this.aw(this.Rm), this.lw(this.Rm, i), t = this.Rm, this.Rm = null)), this.Zp(t)
        }
        lw(t, i) {
            for (const s of t.pn()) this.mn(s, i)
        }
        aw(t) {
            const i = this.ts.$s();
            for (let s = 0; s < i.length; s++) t.en(s).sn && i[s].Uo()
        }
        mn(t, i) {
            const s = this.ts.It();
            switch (t.an) {
                case 0:
                    s.Pu();
                    break;
                case 1:
                    s.ku(t.Ft);
                    break;
                case 2:
                    s.dn(t.Ft);
                    break;
                case 3:
                    s.fn(t.Ft);
                    break;
                case 4:
                    s.du();
                    break;
                case 5:
                    t.Ft.Mu(i) || s.fn(t.Ft.bu(i))
            }
        }
        Hu(t) {
            null !== this.Rm ? this.Rm.vn(t) : this.Rm = t, this.Dm || (this.Dm = !0, this.Pm = window.requestAnimationFrame((t => {
                if (this.Dm = !1, this.Pm = 0, null !== this.Rm) {
                    const i = this.Rm;
                    this.Rm = null, this.qm(i, t);
                    for (const s of i.pn())
                        if (5 === s.an && !s.Ft.Mu(t)) {
                            this.Qt()._n(s.Ft);
                            break
                        }
                }
            })))
        }
        hw() {
            this.Fm()
        }
        $m(t) {
            this.Bm.removeChild(t.Lf()), t.m()
        }
        Fm() {
            const t = this.ts.$s(),
                i = t.length,
                s = this.Cm.length;
            for (let t = i; t < s; t++) {
                const t = h(this.Cm.pop());
                this.Bm.removeChild(t.Lf()), t.Ov().u(this), t.Lv().u(this), t.m();
                const i = this.ym.pop();
                void 0 !== i && this.$m(i)
            }
            for (let n = s; n < i; n++) {
                const i = new Bs(this, t[n]);
                if (i.Ov().i(this.ow.bind(this, i), this), i.Lv().i(this._w.bind(this, i), this), this.Cm.push(i), n > 0) {
                    const t = new vs(this, n - 1, n);
                    this.ym.push(t), this.Bm.insertBefore(t.Lf(), this.Lm.Lf())
                }
                this.Bm.insertBefore(i.Lf(), this.Lm.Lf())
            }
            for (let s = 0; s < i; s++) {
                const i = t[s],
                    n = this.Cm[s];
                n.Xf() !== i ? n.yv(i) : n.Cv()
            }
            this.Hm(), this.ew()
        }
        uw(t, i, s, n) {
            const e = new Map;
            if (null !== t) {
                this.ts.Ys().forEach((i => {
                    const s = i.Xs().Wr(t);
                    null !== s && e.set(i, s)
                }))
            }
            let r;
            if (null !== t) {
                const i = this.ts.It().ss(t)?.originalTime;
                void 0 !== i && (r = i)
            }
            const h = this.Qt().Gu(),
                a = null !== h && h.Xo instanceof Ht ? h.Xo : void 0,
                l = null !== h && void 0 !== h.Zo ? h.Zo.Kn : void 0,
                o = this.cw(n);
            return {
                dw: r,
                Re: t ?? void 0,
                fw: i ?? void 0,
                pw: -1 !== o ? o : void 0,
                mw: a,
                ww: e,
                gw: l,
                Mw: s ?? void 0
            }
        }
        cw(t) {
            let i = -1;
            if (t) i = this.Cm.indexOf(t);
            else {
                const t = this.Qt().sc().Us();
                null !== t && (i = this.Qt().$s().indexOf(t))
            }
            return i
        }
        ow(t, i, s, n) {
            this.uv.p((() => this.uw(i, s, n, t)))
        }
        _w(t, i, s, n) {
            this.cv.p((() => this.uw(i, s, n, t)))
        }
        Om(t, i, s) {
            this.iw(this.Qt().Gu()?.Jo ?? null), this.Wu.p((() => this.uw(t, i, s)))
        }
        Hm() {
            const t = this.ys.timeScale.visible ? "" : "none";
            this.Lm.Lf().style.display = t
        }
        Jm() {
            return this.Cm[0].Xf().Bo().N().visible
        }
        Qm() {
            return this.Cm[0].Xf().Io().N().visible
        }
        Nm() {
            return "ResizeObserver" in window && (this.Em = new ResizeObserver((t => {
                const i = t[t.length - 1];
                i && this.Wm(i.contentRect.width, i.contentRect.height)
            })), this.Em.observe(this.wp, {
                box: "border-box"
            }), !0)
        }
        jm() {
            null !== this.Em && this.Em.disconnect(), this.Em = null
        }
    }

    function Hs(t) {
        return Boolean(t.handleScroll.mouseWheel || t.handleScale.mouseWheel)
    }

    function Us(t) {
        return void 0 === t.open && void 0 === t.value
    }

    function $s(t) {
        return function(t) {
            return void 0 !== t.open
        }(t) || function(t) {
            return void 0 !== t.value
        }(t)
    }

    function js(t, i, s, n) {
        const e = s.value,
            r = {
                Re: i,
                wt: t,
                Ft: [e, e, e, e],
                dw: n
            };
        return void 0 !== s.color && (r.R = s.color), r
    }

    function qs(t, i, s, n) {
        const e = s.value,
            r = {
                Re: i,
                wt: t,
                Ft: [e, e, e, e],
                dw: n
            };
        return void 0 !== s.lineColor && (r.vt = s.lineColor), void 0 !== s.topColor && (r.mr = s.topColor), void 0 !== s.bottomColor && (r.wr = s.bottomColor), r
    }

    function Ys(t, i, s, n) {
        const e = s.value,
            r = {
                Re: i,
                wt: t,
                Ft: [e, e, e, e],
                dw: n
            };
        return void 0 !== s.topLineColor && (r.gr = s.topLineColor), void 0 !== s.bottomLineColor && (r.Mr = s.bottomLineColor), void 0 !== s.topFillColor1 && (r.br = s.topFillColor1), void 0 !== s.topFillColor2 && (r.Sr = s.topFillColor2), void 0 !== s.bottomFillColor1 && (r.Cr = s.bottomFillColor1), void 0 !== s.bottomFillColor2 && (r.yr = s.bottomFillColor2), r
    }

    function Ks(t, i, s, n) {
        const e = {
            Re: i,
            wt: t,
            Ft: [s.open, s.high, s.low, s.close],
            dw: n
        };
        return void 0 !== s.color && (e.R = s.color), e
    }

    function Xs(t, i, s, n) {
        const e = {
            Re: i,
            wt: t,
            Ft: [s.open, s.high, s.low, s.close],
            dw: n
        };
        return void 0 !== s.color && (e.R = s.color), void 0 !== s.borderColor && (e.Ht = s.borderColor), void 0 !== s.wickColor && (e.vr = s.wickColor), e
    }

    function Zs(t, i, s, n, e) {
        const r = h(e)(s),
            a = Math.max(...r),
            l = Math.min(...r),
            o = r[r.length - 1],
            _ = [o, a, l, o],
            {
                time: u,
                color: c,
                ...d
            } = s;
        return {
            Re: i,
            wt: t,
            Ft: _,
            dw: n,
            se: d,
            R: c
        }
    }

    function Gs(t) {
        return void 0 !== t.Ft
    }

    function Js(t, i) {
        return void 0 !== i.customValues && (t.bw = i.customValues), t
    }

    function Qs(t) {
        return (i, s, n, e, r, h) => function(t, i) {
            return i ? i(t) : Us(t)
        }(n, h) ? Js({
            wt: i,
            Re: s,
            dw: e
        }, n) : Js(t(i, s, n, e, r), n)
    }

    function tn(t) {
        return {
            Candlestick: Qs(Xs),
            Bar: Qs(Ks),
            Area: Qs(qs),
            Baseline: Qs(Ys),
            Histogram: Qs(js),
            Line: Qs(js),
            Custom: Qs(Zs)
        } [t]
    }

    function sn(t) {
        return {
            Re: 0,
            xw: new Map,
            Hh: t
        }
    }

    function nn(t, i) {
        if (void 0 !== t && 0 !== t.length) return {
            Sw: i.key(t[0].wt),
            Cw: i.key(t[t.length - 1].wt)
        }
    }

    function en(t) {
        let i;
        return t.forEach((t => {
            void 0 === i && (i = t.dw)
        })), h(i)
    }
    class rn {
        constructor(t) {
            this.yw = new Map, this.Pw = new Map, this.kw = new Map, this.Tw = [], this.i_ = t
        }
        m() {
            this.yw.clear(), this.Pw.clear(), this.kw.clear(), this.Tw = []
        }
        Rw(t, i) {
            let s = 0 !== this.yw.size,
                n = !1;
            const e = this.Pw.get(t);
            if (void 0 !== e)
                if (1 === this.Pw.size) s = !1, n = !0, this.yw.clear();
                else
                    for (const i of this.Tw) i.pointData.xw.delete(t) && (n = !0);
            let r = [];
            if (0 !== i.length) {
                const s = i.map((t => t.time)),
                    e = this.i_.createConverterToInternalObj(i),
                    h = tn(t.Rr()),
                    a = t.da(),
                    l = t.pa();
                r = i.map(((i, r) => {
                    const o = e(i.time),
                        _ = this.i_.key(o);
                    let u = this.yw.get(_);
                    void 0 === u && (u = sn(o), this.yw.set(_, u), n = !0);
                    const c = h(o, u.Re, i, s[r], a, l);
                    return u.xw.set(t, c), c
                }))
            }
            s && this.Dw(), this.Ew(t, r);
            let h = -1;
            if (n) {
                const t = [];
                this.yw.forEach((i => {
                    t.push({
                        timeWeight: 0,
                        time: i.Hh,
                        pointData: i,
                        originalTime: en(i.xw)
                    })
                })), t.sort(((t, i) => this.i_.key(t.time) - this.i_.key(i.time))), h = this.Vw(t)
            }
            return this.Bw(t, h, function(t, i, s) {
                const n = nn(t, s),
                    e = nn(i, s);
                if (void 0 !== n && void 0 !== e) return {
                    Iw: !1,
                    zh: n.Cw >= e.Cw && n.Sw >= e.Sw
                }
            }(this.Pw.get(t), e, this.i_))
        }
        yc(t) {
            return this.Rw(t, [])
        }
        Aw(t, i, s) {
            const n = i;
            ! function(t) {
                void 0 === t.dw && (t.dw = t.time)
            }(n), this.i_.preprocessData(i);
            const e = this.i_.createConverterToInternalObj([i])(i.time),
                r = this.kw.get(t);
            if (!s && void 0 !== r && this.i_.key(e) < this.i_.key(r)) throw new Error(`Cannot update oldest data, last time=${r}, new time=${e}`);
            let h = this.yw.get(this.i_.key(e));
            if (s && void 0 === h) throw new Error("Cannot update non-existing data point when historicalUpdate is true");
            const a = void 0 === h;
            void 0 === h && (h = sn(e), this.yw.set(this.i_.key(e), h));
            const l = tn(t.Rr()),
                o = t.da(),
                _ = t.pa(),
                u = l(e, h.Re, i, n.dw, o, _);
            h.xw.set(t, u), s ? this.zw(t, u, h.Re) : this.Ow(t, u);
            const c = {
                zh: Gs(u),
                Iw: s
            };
            if (!a) return this.Bw(t, -1, c);
            const d = {
                    timeWeight: 0,
                    time: h.Hh,
                    pointData: h,
                    originalTime: en(h.xw)
                },
                f = bt(this.Tw, this.i_.key(d.time), ((t, i) => this.i_.key(t.time) < i));
            this.Tw.splice(f, 0, d);
            for (let t = f; t < this.Tw.length; ++t) hn(this.Tw[t].pointData, t);
            return this.i_.fillWeightsForPoints(this.Tw, f), this.Bw(t, f, c)
        }
        Ow(t, i) {
            let s = this.Pw.get(t);
            void 0 === s && (s = [], this.Pw.set(t, s));
            const n = 0 !== s.length ? s[s.length - 1] : null;
            null === n || this.i_.key(i.wt) > this.i_.key(n.wt) ? Gs(i) && s.push(i) : Gs(i) ? s[s.length - 1] = i : s.splice(-1, 1), this.kw.set(t, i.wt)
        }
        zw(t, i, s) {
            const n = this.Pw.get(t);
            if (void 0 === n) return;
            const e = bt(n, s, ((t, i) => t.Re < i));
            Gs(i) ? n[e] = i : n.splice(e, 1)
        }
        Ew(t, i) {
            0 !== i.length ? (this.Pw.set(t, i.filter(Gs)), this.kw.set(t, i[i.length - 1].wt)) : (this.Pw.delete(t), this.kw.delete(t))
        }
        Dw() {
            for (const t of this.Tw) 0 === t.pointData.xw.size && this.yw.delete(this.i_.key(t.time))
        }
        Vw(t) {
            let i = -1;
            for (let s = 0; s < this.Tw.length && s < t.length; ++s) {
                const n = this.Tw[s],
                    e = t[s];
                if (this.i_.key(n.time) !== this.i_.key(e.time)) {
                    i = s;
                    break
                }
                e.timeWeight = n.timeWeight, hn(e.pointData, s)
            }
            if (-1 === i && this.Tw.length !== t.length && (i = Math.min(this.Tw.length, t.length)), -1 === i) return -1;
            for (let s = i; s < t.length; ++s) hn(t[s].pointData, s);
            return this.i_.fillWeightsForPoints(t, i), this.Tw = t, i
        }
        Lw() {
            if (0 === this.Pw.size) return null;
            let t = 0;
            return this.Pw.forEach((i => {
                0 !== i.length && (t = Math.max(t, i[i.length - 1].Re))
            })), t
        }
        Bw(t, i, s) {
            const n = {
                Do: new Map,
                It: {
                    iu: this.Lw()
                }
            };
            if (-1 !== i) this.Pw.forEach(((i, e) => {
                n.Do.set(e, {
                    se: i,
                    Nw: e === t ? s : void 0
                })
            })), this.Pw.has(t) || n.Do.set(t, {
                se: [],
                Nw: s
            }), n.It.Ww = this.Tw, n.It.Fw = i;
            else {
                const i = this.Pw.get(t);
                n.Do.set(t, {
                    se: i || [],
                    Nw: s
                })
            }
            return n
        }
    }

    function hn(t, i) {
        t.Re = i, t.xw.forEach((t => {
            t.Re = i
        }))
    }

    function an(t, i) {
        return t.wt < i
    }

    function ln(t, i) {
        return i < t.wt
    }

    function on(t, i, s) {
        const n = i.Uh(),
            e = i.bi(),
            r = bt(t, n, an),
            h = xt(t, e, ln);
        if (!s) return {
            from: r,
            to: h
        };
        let a = r,
            l = h;
        return r > 0 && r < t.length && t[r].wt >= n && (a = r - 1), h > 0 && h < t.length && t[h - 1].wt <= e && (l = h + 1), {
            from: a,
            to: l
        }
    }
    class _n {
        constructor(t, i, s) {
            this.Hw = !0, this.Uw = !0, this.$w = !0, this.jw = [], this.qw = null, this.Jn = t, this.Qn = i, this.Yw = s
        }
        Pt(t) {
            this.Hw = !0, "data" === t && (this.Uw = !0), "options" === t && (this.$w = !0)
        }
        Tt() {
            return this.Jn.Et() ? (this.Kw(), null === this.qw ? null : this.Xw) : null
        }
        Zw() {
            this.jw = this.jw.map((t => ({
                ...t,
                ...this.Jn.Rh().Dr(t.wt)
            })))
        }
        Gw() {
            this.qw = null
        }
        Kw() {
            this.Uw && (this.Jw(), this.Uw = !1), this.$w && (this.Zw(), this.$w = !1), this.Hw && (this.Qw(), this.Hw = !1)
        }
        Qw() {
            const t = this.Jn.Wt(),
                i = this.Qn.It();
            if (this.Gw(), i.Ki() || t.Ki()) return;
            const s = i.ye();
            if (null === s) return;
            if (0 === this.Jn.Xs().zr()) return;
            const n = this.Jn.zt();
            null !== n && (this.qw = on(this.jw, s, this.Yw), this.tg(t, i, n.Ft), this.ig())
        }
    }
    class un {
        constructor(t, i) {
            this.sg = t, this.qi = i
        }
        nt(t, i, s) {
            this.sg.draw(t, this.qi, i, s)
        }
    }
    class cn extends _n {
        constructor(t, i, s) {
            super(t, i, !1), this.sh = s, this.Xw = new un(this.sh.renderer(), (i => {
                const s = t.zt();
                return null === s ? null : t.Wt().Nt(i, s.Ft)
            }))
        }
        fa(t) {
            return this.sh.priceValueBuilder(t)
        }
        va(t) {
            return this.sh.isWhitespace(t)
        }
        Jw() {
            const t = this.Jn.Rh();
            this.jw = this.Jn.Xs().Hr().map((i => ({
                wt: i.Re,
                _t: NaN,
                ...t.Dr(i.Re),
                ng: i.se
            })))
        }
        tg(t, i) {
            i.su(this.jw, m(this.qw))
        }
        ig() {
            this.sh.update({
                bars: this.jw.map(dn),
                barSpacing: this.Qn.It().lu(),
                visibleRange: this.qw
            }, this.Jn.N())
        }
    }

    function dn(t) {
        return {
            x: t._t,
            time: t.wt,
            originalData: t.ng,
            barColor: t.cr
        }
    }
    const fn = {
            color: "#2196f3"
        },
        pn = (t, i, s) => {
            const n = l(s);
            return new cn(t, i, n)
        };

    function vn(t) {
        const i = {
            value: t.Ft[3],
            time: t.dw
        };
        return void 0 !== t.bw && (i.customValues = t.bw), i
    }

    function mn(t) {
        const i = vn(t);
        return void 0 !== t.R && (i.color = t.R), i
    }

    function wn(t) {
        const i = vn(t);
        return void 0 !== t.vt && (i.lineColor = t.vt), void 0 !== t.mr && (i.topColor = t.mr), void 0 !== t.wr && (i.bottomColor = t.wr), i
    }

    function gn(t) {
        const i = vn(t);
        return void 0 !== t.gr && (i.topLineColor = t.gr), void 0 !== t.Mr && (i.bottomLineColor = t.Mr), void 0 !== t.br && (i.topFillColor1 = t.br), void 0 !== t.Sr && (i.topFillColor2 = t.Sr), void 0 !== t.Cr && (i.bottomFillColor1 = t.Cr), void 0 !== t.yr && (i.bottomFillColor2 = t.yr), i
    }

    function Mn(t) {
        const i = {
            open: t.Ft[0],
            high: t.Ft[1],
            low: t.Ft[2],
            close: t.Ft[3],
            time: t.dw
        };
        return void 0 !== t.bw && (i.customValues = t.bw), i
    }

    function bn(t) {
        const i = Mn(t);
        return void 0 !== t.R && (i.color = t.R), i
    }

    function xn(t) {
        const i = Mn(t),
            {
                R: s,
                Ht: n,
                vr: e
            } = t;
        return void 0 !== s && (i.color = s), void 0 !== n && (i.borderColor = n), void 0 !== e && (i.wickColor = e), i
    }

    function Sn(t) {
        return {
            Area: wn,
            Line: mn,
            Baseline: gn,
            Histogram: mn,
            Bar: bn,
            Candlestick: xn,
            Custom: Cn
        } [t]
    }

    function Cn(t) {
        const i = t.dw;
        return {
            ...t.se,
            time: i
        }
    }
    const yn = {
            vertLine: {
                color: "#9598A1",
                width: 1,
                style: 3,
                visible: !0,
                labelVisible: !0,
                labelBackgroundColor: "#131722"
            },
            horzLine: {
                color: "#9598A1",
                width: 1,
                style: 3,
                visible: !0,
                labelVisible: !0,
                labelBackgroundColor: "#131722"
            },
            mode: 1
        },
        Pn = {
            vertLines: {
                color: "#D6DCDE",
                style: 0,
                visible: !0
            },
            horzLines: {
                color: "#D6DCDE",
                style: 0,
                visible: !0
            }
        },
        kn = {
            background: {
                type: "solid",
                color: "#FFFFFF"
            },
            textColor: "#191919",
            fontSize: 12,
            fontFamily: w,
            panes: {
                enableResize: !0,
                separatorColor: "#E0E3EB",
                separatorHoverColor: "rgba(178, 181, 189, 0.2)"
            },
            attributionLogo: !0,
            colorSpace: "srgb",
            colorParsers: []
        },
        Tn = {
            autoScale: !0,
            mode: 0,
            invertScale: !1,
            alignLabels: !0,
            borderVisible: !0,
            borderColor: "#2B2B43",
            entireTextOnly: !1,
            visible: !1,
            ticksVisible: !1,
            scaleMargins: {
                bottom: .1,
                top: .2
            },
            minimumWidth: 0,
            ensureEdgeTickMarksVisible: !1
        },
        Rn = {
            rightOffset: 0,
            barSpacing: 6,
            minBarSpacing: .5,
            maxBarSpacing: 0,
            fixLeftEdge: !1,
            fixRightEdge: !1,
            lockVisibleTimeRangeOnResize: !1,
            rightBarStaysOnScroll: !1,
            borderVisible: !0,
            borderColor: "#2B2B43",
            visible: !0,
            timeVisible: !1,
            secondsVisible: !0,
            shiftVisibleRangeOnNewBar: !0,
            allowShiftVisibleRangeOnWhitespaceReplacement: !1,
            ticksVisible: !1,
            uniformDistribution: !1,
            minimumHeight: 0,
            allowBoldLabels: !0,
            ignoreWhitespaceIndices: !1
        };

    function Dn() {
        return {
            width: 0,
            height: 0,
            autoSize: !1,
            layout: kn,
            crosshair: yn,
            grid: Pn,
            overlayPriceScales: {
                ...Tn
            },
            leftPriceScale: {
                ...Tn,
                visible: !1
            },
            rightPriceScale: {
                ...Tn,
                visible: !0
            },
            timeScale: Rn,
            localization: {
                locale: rs ? navigator.language : "",
                dateFormat: "dd MMM 'yy"
            },
            handleScroll: {
                mouseWheel: !0,
                pressedMouseMove: !0,
                horzTouchDrag: !0,
                vertTouchDrag: !0
            },
            handleScale: {
                axisPressedMouseMove: {
                    time: !0,
                    price: !0
                },
                axisDoubleClickReset: {
                    time: !0,
                    price: !0
                },
                mouseWheel: !0,
                pinch: !0
            },
            kineticScroll: {
                mouse: !1,
                touch: !0
            },
            trackingMode: {
                exitMode: 1
            }
        }
    }
    class En {
        constructor(t, i, s) {
            this.Df = t, this.eg = i, this.rg = s ?? 0
        }
        applyOptions(t) {
            this.Df.Qt().Qu(this.eg, t, this.rg)
        }
        options() {
            return this.qi().N()
        }
        width() {
            return q(this.eg) ? this.Df.Gm(this.eg) : 0
        }
        setVisibleRange(t) {
            this.setAutoScale(!1), this.qi().Nl(new ct(t.from, t.to))
        }
        getVisibleRange() {
            const t = this.qi().Qe();
            return null === t ? null : {
                from: t.$e(),
                to: t.je()
            }
        }
        setAutoScale(t) {
            this.applyOptions({
                autoScale: t
            })
        }
        qi() {
            return a(this.Df.Qt().tc(this.eg, this.rg)).Wt
        }
    }
    class Vn {
        constructor(t, i, s, n) {
            this.Df = t, this.yt = s, this.hg = i, this.ag = n
        }
        getHeight() {
            return this.yt.$t()
        }
        setHeight(t) {
            const i = this.Df.Qt(),
                s = i.Bc(this.yt);
            i.hc(s, t)
        }
        paneIndex() {
            return this.Df.Qt().Bc(this.yt)
        }
        moveTo(t) {
            const i = this.paneIndex();
            i !== t && (r(t >= 0 && t < this.Df.Vf().length, "Invalid pane index"), this.Df.Qt().ac(i, t))
        }
        getSeries() {
            return this.yt.Do().map((t => this.hg(t))) ?? []
        }
        getHTMLElement() {
            return this.Df.Vf()[this.paneIndex()].Lf()
        }
        attachPrimitive(t) {
            this.yt.ua(t), t.attached && t.attached({
                chart: this.ag,
                requestUpdate: () => this.yt.Qt().Bh()
            })
        }
        detachPrimitive(t) {
            this.yt.ca(t)
        }
        priceScale(t) {
            if (null === this.yt.Co(t)) throw new Error(`Cannot find price scale with id: ${t}`);
            return new En(this.Df, t, this.paneIndex())
        }
    }
    const Bn = {
        color: "#FF0000",
        price: 0,
        lineStyle: 2,
        lineWidth: 1,
        lineVisible: !0,
        axisLabelVisible: !0,
        title: "",
        axisLabelColor: "",
        axisLabelTextColor: ""
    };
    class In {
        constructor(t) {
            this.ir = t
        }
        applyOptions(t) {
            this.ir.hr(t)
        }
        options() {
            return this.ir.N()
        }
        lg() {
            return this.ir
        }
    }
    class An {
        constructor(t, i, s, n, e, r) {
            this.og = new o, this.Jn = t, this._g = i, this.ug = s, this.i_ = e, this.ag = n, this.cg = r
        }
        m() {
            this.og.m()
        }
        priceFormatter() {
            return this.Jn.ra()
        }
        priceToCoordinate(t) {
            const i = this.Jn.zt();
            return null === i ? null : this.Jn.Wt().Nt(t, i.Ft)
        }
        coordinateToPrice(t) {
            const i = this.Jn.zt();
            return null === i ? null : this.Jn.Wt().Ts(t, i.Ft)
        }
        barsInLogicalRange(t) {
            if (null === t) return null;
            const i = new yi(new xi(t.from, t.to)).w_(),
                s = this.Jn.Xs();
            if (s.Ki()) return null;
            const n = s.Wr(i.Uh(), 1),
                e = s.Wr(i.bi(), -1),
                r = a(s.Or()),
                h = a(s.Ks());
            if (null !== n && null !== e && n.Re > e.Re) return {
                barsBefore: t.from - r,
                barsAfter: h - t.to
            };
            const l = {
                barsBefore: null === n || n.Re === r ? t.from - r : n.Re - r,
                barsAfter: null === e || e.Re === h ? h - t.to : h - e.Re
            };
            return null !== n && null !== e && (l.from = n.dw, l.to = e.dw), l
        }
        setData(t) {
            this.i_, this.Jn.Rr(), this._g.dg(this.Jn, t), this.fg("full")
        }
        update(t, i = !1) {
            this.Jn.Rr(), this._g.pg(this.Jn, t, i), this.fg("update")
        }
        dataByIndex(t, i) {
            const s = this.Jn.Xs().Wr(t, i);
            if (null === s) return null;
            return Sn(this.seriesType())(s)
        }
        data() {
            const t = Sn(this.seriesType());
            return this.Jn.Xs().Hr().map((i => t(i)))
        }
        subscribeDataChanged(t) {
            this.og.i(t)
        }
        unsubscribeDataChanged(t) {
            this.og._(t)
        }
        applyOptions(t) {
            this.Jn.hr(t)
        }
        options() {
            return p(this.Jn.N())
        }
        priceScale() {
            return this.ug.priceScale(this.Jn.Wt().wa(), this.getPane().paneIndex())
        }
        createPriceLine(t) {
            const i = _(p(Bn), t),
                s = this.Jn.Lh(i);
            return new In(s)
        }
        removePriceLine(t) {
            this.Jn.Nh(t.lg())
        }
        priceLines() {
            return this.Jn.Wh().map((t => new In(t)))
        }
        seriesType() {
            return this.Jn.Rr()
        }
        attachPrimitive(t) {
            this.Jn.ua(t), t.attached && t.attached({
                chart: this.ag,
                series: this,
                requestUpdate: () => this.Jn.Qt().Bh(),
                horzScaleBehavior: this.i_
            })
        }
        detachPrimitive(t) {
            this.Jn.ca(t), t.detached && t.detached(), this.Jn.Qt().Bh()
        }
        getPane() {
            const t = this.Jn,
                i = a(this.Jn.Qt().Hn(t));
            return this.cg(i)
        }
        moveToPane(t) {
            this.Jn.Qt().Rc(this.Jn, t)
        }
        seriesOrder() {
            const t = this.Jn.Qt().Hn(this.Jn);
            return null === t ? -1 : t.Do().indexOf(this.Jn)
        }
        setSeriesOrder(t) {
            const i = this.Jn.Qt().Hn(this.Jn);
            null !== i && i.jo(this.Jn, t)
        }
        fg(t) {
            this.og.v() && this.og.p(t)
        }
    }
    class zn {
        constructor(t, i, s) {
            this.vg = new o, this.T_ = new o, this.rm = new o, this.ts = t, this.uh = t.It(), this.Lm = i, this.uh.xu().i(this.mg.bind(this)), this.uh.Su().i(this.wg.bind(this)), this.Lm.dm().i(this.gg.bind(this)), this.i_ = s
        }
        m() {
            this.uh.xu().u(this), this.uh.Su().u(this), this.Lm.dm().u(this), this.vg.m(), this.T_.m(), this.rm.m()
        }
        scrollPosition() {
            return this.uh._u()
        }
        scrollToPosition(t, i) {
            i ? this.uh.gu(t, 1e3) : this.ts.fn(t)
        }
        scrollToRealTime() {
            this.uh.wu()
        }
        getVisibleRange() {
            const t = this.uh.K_();
            return null === t ? null : {
                from: t.from.originalTime,
                to: t.to.originalTime
            }
        }
        setVisibleRange(t) {
            const i = {
                    from: this.i_.convertHorzItemToInternal(t.from),
                    to: this.i_.convertHorzItemToInternal(t.to)
                },
                s = this.uh.J_(i);
            this.ts.kc(s)
        }
        getVisibleLogicalRange() {
            const t = this.uh.Y_();
            return null === t ? null : {
                from: t.Uh(),
                to: t.bi()
            }
        }
        setVisibleLogicalRange(t) {
            r(t.from <= t.to, "The from index cannot be after the to index."), this.ts.kc(t)
        }
        resetTimeScale() {
            this.ts.cn()
        }
        fitContent() {
            this.ts.Pu()
        }
        logicalToCoordinate(t) {
            const i = this.ts.It();
            return i.Ki() ? null : i.jt(t)
        }
        coordinateToLogical(t) {
            return this.uh.Ki() ? null : this.uh.nu(t)
        }
        timeToIndex(t, i) {
            const s = this.i_.convertHorzItemToInternal(t);
            return this.uh.U_(s, i)
        }
        timeToCoordinate(t) {
            const i = this.timeToIndex(t, !1);
            return null === i ? null : this.uh.jt(i)
        }
        coordinateToTime(t) {
            const i = this.ts.It(),
                s = i.nu(t),
                n = i.ss(s);
            return null === n ? null : n.originalTime
        }
        width() {
            return this.Lm.Nf().width
        }
        height() {
            return this.Lm.Nf().height
        }
        subscribeVisibleTimeRangeChange(t) {
            this.vg.i(t)
        }
        unsubscribeVisibleTimeRangeChange(t) {
            this.vg._(t)
        }
        subscribeVisibleLogicalRangeChange(t) {
            this.T_.i(t)
        }
        unsubscribeVisibleLogicalRangeChange(t) {
            this.T_._(t)
        }
        subscribeSizeChange(t) {
            this.rm.i(t)
        }
        unsubscribeSizeChange(t) {
            this.rm._(t)
        }
        applyOptions(t) {
            this.uh.hr(t)
        }
        options() {
            return {
                ...p(this.uh.N()),
                barSpacing: this.uh.lu()
            }
        }
        mg() {
            this.vg.v() && this.vg.p(this.getVisibleRange())
        }
        wg() {
            this.T_.v() && this.T_.p(this.getVisibleLogicalRange())
        }
        gg(t) {
            this.rm.p(t.width, t.height)
        }
    }

    function On(t) {
        if (void 0 === t || "custom" === t.type) return;
        const i = t;
        void 0 !== i.minMove && void 0 === i.precision && (i.precision = function(t) {
            if (t >= 1) return 0;
            let i = 0;
            for (; i < 8; i++) {
                const s = Math.round(t);
                if (Math.abs(s - t) < 1e-8) return i;
                t *= 10
            }
            return i
        }(i.minMove))
    }

    function Ln(t) {
        return function(t) {
            if (f(t.handleScale)) {
                const i = t.handleScale;
                t.handleScale = {
                    axisDoubleClickReset: {
                        time: i,
                        price: i
                    },
                    axisPressedMouseMove: {
                        time: i,
                        price: i
                    },
                    mouseWheel: i,
                    pinch: i
                }
            } else if (void 0 !== t.handleScale) {
                const {
                    axisPressedMouseMove: i,
                    axisDoubleClickReset: s
                } = t.handleScale;
                f(i) && (t.handleScale.axisPressedMouseMove = {
                    time: i,
                    price: i
                }), f(s) && (t.handleScale.axisDoubleClickReset = {
                    time: s,
                    price: s
                })
            }
            const i = t.handleScroll;
            f(i) && (t.handleScroll = {
                horzTouchDrag: i,
                vertTouchDrag: i,
                mouseWheel: i,
                pressedMouseMove: i
            })
        }(t), t
    }
    class Nn {
        constructor(t, i, s) {
            this.Mg = new Map, this.bg = new Map, this.xg = new o, this.Sg = new o, this.Cg = new o, this.zu = new WeakMap, this.yg = new rn(i);
            const n = void 0 === s ? p(Dn()) : _(p(Dn()), Ln(s));
            this.Pg = i, this.Df = new Fs(t, n, i), this.Df.Ov().i((t => {
                this.xg.v() && this.xg.p(this.kg(t()))
            }), this), this.Df.Lv().i((t => {
                this.Sg.v() && this.Sg.p(this.kg(t()))
            }), this), this.Df.nc().i((t => {
                this.Cg.v() && this.Cg.p(this.kg(t()))
            }), this);
            const e = this.Df.Qt();
            this.Tg = new zn(e, this.Df.Um(), this.Pg)
        }
        remove() {
            this.Df.Ov().u(this), this.Df.Lv().u(this), this.Df.nc().u(this), this.Tg.m(), this.Df.m(), this.Mg.clear(), this.bg.clear(), this.xg.m(), this.Sg.m(), this.Cg.m(), this.yg.m()
        }
        resize(t, i, s) {
            this.autoSizeActive() || this.Df.Wm(t, i, s)
        }
        addCustomSeries(t, i = {}, s = 0) {
            const n = (t => ({
                type: "Custom",
                isBuiltIn: !1,
                defaultOptions: {
                    ...fn,
                    ...t.defaultOptions()
                },
                Rg: pn,
                Dg: t
            }))(l(t));
            return this.Eg(n, i, s)
        }
        addSeries(t, i = {}, s = 0) {
            return this.Eg(t, i, s)
        }
        removeSeries(t) {
            const i = h(this.Mg.get(t)),
                s = this.yg.yc(i);
            this.Df.Qt().yc(i), this.Vg(s), this.Mg.delete(t), this.bg.delete(i)
        }
        dg(t, i) {
            this.Vg(this.yg.Rw(t, i))
        }
        pg(t, i, s) {
            this.Vg(this.yg.Aw(t, i, s))
        }
        subscribeClick(t) {
            this.xg.i(t)
        }
        unsubscribeClick(t) {
            this.xg._(t)
        }
        subscribeCrosshairMove(t) {
            this.Cg.i(t)
        }
        unsubscribeCrosshairMove(t) {
            this.Cg._(t)
        }
        subscribeDblClick(t) {
            this.Sg.i(t)
        }
        unsubscribeDblClick(t) {
            this.Sg._(t)
        }
        priceScale(t, i = 0) {
            return new En(this.Df, t, i)
        }
        timeScale() {
            return this.Tg
        }
        applyOptions(t) {
            this.Df.hr(Ln(t))
        }
        options() {
            return this.Df.N()
        }
        takeScreenshot() {
            return this.Df.Xm()
        }
        removePane(t) {
            this.Df.Qt().rc(t)
        }
        swapPanes(t, i) {
            this.Df.Qt().ac(t, i)
        }
        autoSizeActive() {
            return this.Df.tw()
        }
        chartElement() {
            return this.Df.Uf()
        }
        panes() {
            return this.Df.Qt().$s().map((t => this.Bg(t)))
        }
        paneSize(t = 0) {
            const i = this.Df.nw(t);
            return {
                height: i.height,
                width: i.width
            }
        }
        setCrosshairPosition(t, i, s) {
            const n = this.Mg.get(s);
            if (void 0 === n) return;
            const e = this.Df.Qt().Hn(n);
            null !== e && this.Df.Qt().gc(t, i, e)
        }
        clearCrosshairPosition() {
            this.Df.Qt().Mc(!0)
        }
        horzBehaviour() {
            return this.Pg
        }
        Eg(i, s = {}, n = 0) {
            r(void 0 !== i.Rg), On(s.priceFormat), "Candlestick" === i.type && function(t) {
                void 0 !== t.borderColor && (t.borderUpColor = t.borderColor, t.borderDownColor = t.borderColor), void 0 !== t.wickColor && (t.wickUpColor = t.wickColor, t.wickDownColor = t.wickColor)
            }(s);
            const e = _(p(t), p(i.defaultOptions), s),
                h = i.Rg,
                a = new Ht(this.Df.Qt(), i.type, e, h, i.Dg);
            this.Df.Qt().Sc(a, n);
            const l = new An(a, this, this, this, this.Pg, (t => this.Bg(t)));
            return this.Mg.set(l, a), this.bg.set(a, l), l
        }
        Vg(t) {
            const i = this.Df.Qt();
            i.bc(t.It.iu, t.It.Ww, t.It.Fw), t.Do.forEach(((t, i) => i.ht(t.se, t.Nw))), i.It().L_(), i.au()
        }
        Ig(t) {
            return h(this.bg.get(t))
        }
        kg(t) {
            const i = new Map;
            t.ww.forEach(((t, s) => {
                const n = s.Rr(),
                    e = Sn(n)(t);
                if ("Custom" !== n) r($s(e));
                else {
                    const t = s.pa();
                    r(!t || !1 === t(e))
                }
                i.set(this.Ig(s), e)
            }));
            const s = void 0 !== t.mw && this.bg.has(t.mw) ? this.Ig(t.mw) : void 0;
            return {
                time: t.dw,
                logical: t.Re,
                point: t.fw,
                paneIndex: t.pw,
                hoveredSeries: s,
                hoveredObjectId: t.gw,
                seriesData: i,
                sourceEvent: t.Mw
            }
        }
        Bg(t) {
            let i = this.zu.get(t);
            return i || (i = new Vn(this.Df, (t => this.Ig(t)), t, this), this.zu.set(t, i)), i
        }
    }

    function Wn(t) {
        if (d(t)) {
            const i = document.getElementById(t);
            return r(null !== i, `Cannot find element in DOM with id=${t}`), i
        }
        return t
    }

    function Fn(t, i, s) {
        const n = Wn(t),
            e = new Nn(n, i, s);
        return i.setOptions(e.options()), e
    }
    class Hn extends _n {
        constructor(t, i) {
            super(t, i, !0)
        }
        tg(t, i, s) {
            i.su(this.jw, m(this.qw)), t.Hl(this.jw, s, m(this.qw))
        }
        Ag(t, i) {
            return {
                wt: t,
                gt: i,
                _t: NaN,
                ut: NaN
            }
        }
        Jw() {
            const t = this.Jn.Rh();
            this.jw = this.Jn.Xs().Hr().map((i => {
                const s = i.Ft[3];
                return this.zg(i.Re, s, t)
            }))
        }
    }

    function Un(t, i, s, n, e, r, h) {
        if (0 === i.length || n.from >= i.length || n.to <= 0) return;
        const {
            context: a,
            horizontalPixelRatio: l,
            verticalPixelRatio: o
        } = t, _ = i[n.from];
        let u = r(t, _),
            c = _;
        if (n.to - n.from < 2) {
            const i = e / 2;
            a.beginPath();
            const s = {
                    _t: _._t - i,
                    ut: _.ut
                },
                n = {
                    _t: _._t + i,
                    ut: _.ut
                };
            a.moveTo(s._t * l, s.ut * o), a.lineTo(n._t * l, n.ut * o), h(t, u, s, n)
        } else {
            const e = (i, s) => {
                h(t, u, c, s), a.beginPath(), u = i, c = s
            };
            let d = c;
            a.beginPath(), a.moveTo(_._t * l, _.ut * o);
            for (let h = n.from + 1; h < n.to; ++h) {
                d = i[h];
                const n = r(t, d);
                switch (s) {
                    case 0:
                        a.lineTo(d._t * l, d.ut * o);
                        break;
                    case 1:
                        a.lineTo(d._t * l, i[h - 1].ut * o), n !== u && (e(n, d), a.lineTo(d._t * l, i[h - 1].ut * o)), a.lineTo(d._t * l, d.ut * o);
                        break;
                    case 2: {
                        const [t, s] = Yn(i, h - 1, h);
                        a.bezierCurveTo(t._t * l, t.ut * o, s._t * l, s.ut * o, d._t * l, d.ut * o);
                        break
                    }
                }
                1 !== s && n !== u && (e(n, d), a.moveTo(d._t * l, d.ut * o))
            }(c !== d || c === d && 1 === s) && h(t, u, c, d)
        }
    }
    const $n = 6;

    function jn(t, i) {
        return {
            _t: t._t - i._t,
            ut: t.ut - i.ut
        }
    }

    function qn(t, i) {
        return {
            _t: t._t / i,
            ut: t.ut / i
        }
    }

    function Yn(t, i, s) {
        const n = Math.max(0, i - 1),
            e = Math.min(t.length - 1, s + 1);
        var r, h;
        return [(r = t[i], h = qn(jn(t[s], t[n]), $n), {
            _t: r._t + h._t,
            ut: r.ut + h.ut
        }), jn(t[s], qn(jn(t[e], t[i]), $n))]
    }

    function Kn(t, i) {
        const s = t.context;
        s.strokeStyle = i, s.stroke()
    }
    class Xn extends y {
        constructor() {
            super(...arguments), this.rt = null
        }
        ht(t) {
            this.rt = t
        }
        et(t) {
            if (null === this.rt) return;
            const {
                ot: i,
                lt: s,
                Og: e,
                Lg: r,
                ct: h,
                Xt: a,
                Ng: l
            } = this.rt;
            if (null === s) return;
            const o = t.context;
            o.lineCap = "butt", o.lineWidth = h * t.verticalPixelRatio, n(o, a), o.lineJoin = "round";
            const _ = this.Wg.bind(this);
            void 0 !== r && Un(t, i, r, s, e, _, Kn), l && function(t, i, s, n, e) {
                if (n.to - n.from <= 0) return;
                const {
                    horizontalPixelRatio: r,
                    verticalPixelRatio: h,
                    context: a
                } = t;
                let l = null;
                const o = Math.max(1, Math.floor(r)) % 2 / 2,
                    _ = s * h + o;
                for (let s = n.to - 1; s >= n.from; --s) {
                    const n = i[s];
                    if (n) {
                        const i = e(t, n);
                        i !== l && (a.beginPath(), null !== l && a.fill(), a.fillStyle = i, l = i);
                        const s = Math.round(n._t * r) + o,
                            u = n.ut * h;
                        a.moveTo(s, u), a.arc(s, u, _, 0, 2 * Math.PI)
                    }
                }
                a.fill()
            }(t, i, l, s, _)
        }
    }
    class Zn extends Xn {
        Wg(t, i) {
            return i.vt
        }
    }
    class Gn extends Hn {
        constructor() {
            super(...arguments), this.Xw = new Zn
        }
        zg(t, i, s) {
            return {
                ...this.Ag(t, i),
                ...s.Dr(t)
            }
        }
        ig() {
            const t = this.Jn.N(),
                i = {
                    ot: this.jw,
                    Xt: t.lineStyle,
                    Lg: t.lineVisible ? t.lineType : void 0,
                    ct: t.lineWidth,
                    Ng: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0,
                    lt: this.qw,
                    Og: this.Qn.It().lu()
                };
            this.Xw.ht(i)
        }
    }
    const Jn = {
        type: "Line",
        isBuiltIn: !0,
        defaultOptions: {
            color: "#2196f3",
            lineStyle: 0,
            lineWidth: 3,
            lineType: 0,
            lineVisible: !0,
            crosshairMarkerVisible: !0,
            crosshairMarkerRadius: 4,
            crosshairMarkerBorderColor: "",
            crosshairMarkerBorderWidth: 2,
            crosshairMarkerBackgroundColor: "",
            lastPriceAnimation: 0,
            pointMarkersVisible: !1
        },
        Rg: (t, i) => new Gn(t, i)
    };

    function Qn(t, i) {
        return t.weight > i.weight ? t : i
    }
    class te {
        constructor() {
            this.Fg = new o, this.Hg = function(t) {
                let i = !1;
                return function(...s) {
                    i || (i = !0, queueMicrotask((() => {
                        t(...s), i = !1
                    })))
                }
            }((() => this.Fg.p(this.Ug))), this.Ug = 0
        }
        $g() {
            return this.Fg
        }
        m() {
            this.Fg.m()
        }
        options() {
            return this.ys
        }
        setOptions(t) {
            this.ys = t
        }
        preprocessData(t) {}
        updateFormatter(t) {
            this.ys && (this.ys.localization = t)
        }
        createConverterToInternalObj(t) {
            return this.Hg(), t => (t > this.Ug && (this.Ug = t), t)
        }
        key(t) {
            return t
        }
        cacheKey(t) {
            return t
        }
        convertHorzItemToInternal(t) {
            return t
        }
        formatHorzItem(t) {
            return this.jg(t)
        }
        formatTickmark(t) {
            return this.jg(t.time)
        }
        maxTickMarkWeight(t) {
            return t.reduce(Qn, t[0]).weight
        }
        fillWeightsForPoints(t, i) {
            for (let n = i; n < t.length; ++n) t[n].timeWeight = (s = t[n].time) % 120 == 0 ? 10 : s % 60 == 0 ? 9 : s % 36 == 0 ? 8 : s % 12 == 0 ? 7 : s % 6 == 0 ? 6 : s % 3 == 0 ? 5 : s % 1 == 0 ? 4 : 0;
            var s;
            this.Ug = t[t.length - 1].time, this.Hg()
        }
        jg(t) {
            if (this.ys.localization?.timeFormatter) return this.ys.localization.timeFormatter(t);
            if (t < 12) return `${t}M`;
            const i = Math.floor(t / 12),
                s = t % 12;
            return 0 === s ? `${i}Y` : `${i}Y${s}M`
        }
    }
    const ie = {
            yieldCurve: {
                baseResolution: 1,
                minimumTimeRange: 120,
                startTimeRange: 0
            },
            timeScale: {
                ignoreWhitespaceIndices: !0
            },
            leftPriceScale: {
                visible: !0
            },
            rightPriceScale: {
                visible: !1
            },
            localization: {
                priceFormatter: t => t.toFixed(3) + "%"
            }
        },
        se = {
            lastValueVisible: !1,
            priceLineVisible: !1
        };
    class ne extends Nn {
        constructor(t, i) {
            const s = _(ie, i || {}),
                n = new te;
            super(t, n, s), n.setOptions(this.options()), this._initWhitespaceSeries()
        }
        addSeries(t, i = {}, s = 0) {
            if (t.isBuiltIn && !1 === ["Area", "Line"].includes(t.type)) throw new Error("Yield curve only support Area and Line series");
            const n = {
                ...se,
                ...i
            };
            return super.addSeries(t, n, s)
        }
        _initWhitespaceSeries() {
            const t = this.horzBehaviour(),
                i = this.addSeries(Jn);
            let s;

            function n(n) {
                const e = function(t, i) {
                        return {
                            le: Math.max(0, t.startTimeRange),
                            oe: Math.max(0, t.minimumTimeRange, i || 0),
                            qg: Math.max(1, t.baseResolution)
                        }
                    }(t.options().yieldCurve, n),
                    r = (({
                        le: t,
                        oe: i,
                        qg: s
                    }) => `${t}~${i}~${s}`)(e);
                r !== s && (s = r, i.setData(function({
                    le: t,
                    oe: i,
                    qg: s
                }) {
                    return Array.from({
                        length: Math.floor((i - t) / s) + 1
                    }, ((i, n) => ({
                        time: t + n * s
                    })))
                }(e)))
            }
            n(0), t.$g().i(n)
        }
    }

    function ee(t, i) {
        return t.weight > i.weight ? t : i
    }
    class re {
        options() {
            return this.ys
        }
        setOptions(t) {
            this.ys = t
        }
        preprocessData(t) {}
        updateFormatter(t) {
            this.ys && (this.ys.localization = t)
        }
        createConverterToInternalObj(t) {
            return t => t
        }
        key(t) {
            return t
        }
        cacheKey(t) {
            return t
        }
        convertHorzItemToInternal(t) {
            return t
        }
        formatHorzItem(t) {
            return t.toFixed(this.Cn())
        }
        formatTickmark(t, i) {
            return t.time.toFixed(this.Cn())
        }
        maxTickMarkWeight(t) {
            return t.reduce(ee, t[0]).weight
        }
        fillWeightsForPoints(t, i) {
            for (let n = i; n < t.length; ++n) t[n].timeWeight = (s = t[n].time) === 100 * Math.ceil(s / 100) ? 8 : s === 50 * Math.ceil(s / 50) ? 7 : s === 25 * Math.ceil(s / 25) ? 6 : s === 10 * Math.ceil(s / 10) ? 5 : s === 5 * Math.ceil(s / 5) ? 4 : s === Math.ceil(s) ? 3 : 2 * s === Math.ceil(2 * s) ? 1 : 0;
            var s
        }
        Cn() {
            return this.ys.localization.precision
        }
    }

    function he(t, i, s, n, e) {
        const {
            context: r,
            horizontalPixelRatio: h,
            verticalPixelRatio: a
        } = i;
        r.lineTo(e._t * h, t * a), r.lineTo(n._t * h, t * a), r.closePath(), r.fillStyle = s, r.fill()
    }
    class ae extends y {
        constructor() {
            super(...arguments), this.rt = null
        }
        ht(t) {
            this.rt = t
        }
        et(t) {
            if (null === this.rt) return;
            const {
                ot: i,
                lt: s,
                Og: e,
                ct: r,
                Xt: h,
                Lg: a
            } = this.rt, l = this.rt.Yg ?? (this.rt.Kg ? 0 : t.mediaSize.height);
            if (null === s) return;
            const o = t.context;
            o.lineCap = "butt", o.lineJoin = "round", o.lineWidth = r, n(o, h), o.lineWidth = 1, Un(t, i, a, s, e, this.Xg.bind(this), he.bind(null, l))
        }
    }
    class le {
        Zg(t, i) {
            const s = this.Gg,
                {
                    Jg: n,
                    Qg: e,
                    tM: r,
                    iM: h,
                    Yg: a,
                    sM: l,
                    nM: o
                } = i;
            if (void 0 === this.eM || void 0 === s || s.Jg !== n || s.Qg !== e || s.tM !== r || s.iM !== h || s.Yg !== a || s.sM !== l || s.nM !== o) {
                const {
                    verticalPixelRatio: s
                } = t, _ = a || l > 0 ? s : 1, u = l * _, c = o === t.bitmapSize.height ? o : o * _, d = (a ?? 0) * _, f = t.context.createLinearGradient(0, u, 0, c);
                if (f.addColorStop(0, n), null != a) {
                    const t = qt((d - u) / (c - u), 0, 1);
                    f.addColorStop(t, e), f.addColorStop(t, r)
                }
                f.addColorStop(1, h), this.eM = f, this.Gg = i
            }
            return this.eM
        }
    }
    class oe extends ae {
        constructor() {
            super(...arguments), this.rM = new le
        }
        Xg(t, i) {
            const s = this.rt;
            return this.rM.Zg(t, {
                Jg: i.br,
                Qg: i.Sr,
                tM: i.Cr,
                iM: i.yr,
                Yg: s.Yg,
                sM: s.sM ?? 0,
                nM: s.nM ?? t.bitmapSize.height
            })
        }
    }
    class _e extends Xn {
        constructor() {
            super(...arguments), this.hM = new le
        }
        Wg(t, i) {
            const s = this.rt;
            return this.hM.Zg(t, {
                Jg: i.gr,
                Qg: i.gr,
                tM: i.Mr,
                iM: i.Mr,
                Yg: s.Yg,
                sM: s.sM ?? 0,
                nM: s.nM ?? t.bitmapSize.height
            })
        }
    }
    class ue extends Hn {
        constructor(t, i) {
            super(t, i), this.Xw = new C, this.aM = new oe, this.lM = new _e, this.Xw.st([this.aM, this.lM])
        }
        zg(t, i, s) {
            return {
                ...this.Ag(t, i),
                ...s.Dr(t)
            }
        }
        ig() {
            const t = this.Jn.zt();
            if (null === t) return;
            const i = this.Jn.N(),
                s = this.Jn.Wt().Nt(i.baseValue.price, t.Ft),
                n = this.Qn.It().lu();
            if (null === this.qw || 0 === this.jw.length) return;
            let e, r;
            if (i.relativeGradient) {
                e = this.jw[this.qw.from].ut, r = this.jw[this.qw.from].ut;
                for (let t = this.qw.from; t < this.qw.to; t++) {
                    const i = this.jw[t];
                    i.ut < e && (e = i.ut), i.ut > r && (r = i.ut)
                }
            }
            this.aM.ht({
                ot: this.jw,
                ct: i.lineWidth,
                Xt: i.lineStyle,
                Lg: i.lineType,
                Yg: s,
                sM: e,
                nM: r,
                Kg: !1,
                lt: this.qw,
                Og: n
            }), this.lM.ht({
                ot: this.jw,
                ct: i.lineWidth,
                Xt: i.lineStyle,
                Lg: i.lineVisible ? i.lineType : void 0,
                Ng: i.pointMarkersVisible ? i.pointMarkersRadius || i.lineWidth / 2 + 2 : void 0,
                Yg: s,
                sM: e,
                nM: r,
                lt: this.qw,
                Og: n
            })
        }
    }
    const ce = {
        type: "Baseline",
        isBuiltIn: !0,
        defaultOptions: {
            baseValue: {
                type: "price",
                price: 0
            },
            relativeGradient: !1,
            topFillColor1: "rgba(38, 166, 154, 0.28)",
            topFillColor2: "rgba(38, 166, 154, 0.05)",
            topLineColor: "rgba(38, 166, 154, 1)",
            bottomFillColor1: "rgba(239, 83, 80, 0.05)",
            bottomFillColor2: "rgba(239, 83, 80, 0.28)",
            bottomLineColor: "rgba(239, 83, 80, 1)",
            lineWidth: 3,
            lineStyle: 0,
            lineType: 0,
            lineVisible: !0,
            crosshairMarkerVisible: !0,
            crosshairMarkerRadius: 4,
            crosshairMarkerBorderColor: "",
            crosshairMarkerBorderWidth: 2,
            crosshairMarkerBackgroundColor: "",
            lastPriceAnimation: 0,
            pointMarkersVisible: !1
        },
        Rg: (t, i) => new ue(t, i)
    };
    class de extends ae {
        constructor() {
            super(...arguments), this.rM = new le
        }
        Xg(t, i) {
            return this.rM.Zg(t, {
                Jg: i.mr,
                Qg: "",
                tM: "",
                iM: i.wr,
                sM: this.rt?.sM ?? 0,
                nM: t.bitmapSize.height
            })
        }
    }
    class fe extends Hn {
        constructor(t, i) {
            super(t, i), this.Xw = new C, this.oM = new de, this._M = new Zn, this.Xw.st([this.oM, this._M])
        }
        zg(t, i, s) {
            return {
                ...this.Ag(t, i),
                ...s.Dr(t)
            }
        }
        ig() {
            const t = this.Jn.N();
            if (null === this.qw || 0 === this.jw.length) return;
            let i;
            if (t.relativeGradient) {
                i = this.jw[this.qw.from].ut;
                for (let t = this.qw.from; t < this.qw.to; t++) {
                    const s = this.jw[t];
                    s.ut < i && (i = s.ut)
                }
            }
            this.oM.ht({
                Lg: t.lineType,
                ot: this.jw,
                Xt: t.lineStyle,
                ct: t.lineWidth,
                Yg: null,
                sM: i,
                Kg: t.invertFilledArea,
                lt: this.qw,
                Og: this.Qn.It().lu()
            }), this._M.ht({
                Lg: t.lineVisible ? t.lineType : void 0,
                ot: this.jw,
                Xt: t.lineStyle,
                ct: t.lineWidth,
                lt: this.qw,
                Og: this.Qn.It().lu(),
                Ng: t.pointMarkersVisible ? t.pointMarkersRadius || t.lineWidth / 2 + 2 : void 0
            })
        }
    }
    const pe = {
        type: "Area",
        isBuiltIn: !0,
        defaultOptions: {
            topColor: "rgba( 46, 220, 135, 0.4)",
            bottomColor: "rgba( 40, 221, 100, 0)",
            invertFilledArea: !1,
            relativeGradient: !1,
            lineColor: "#33D778",
            lineStyle: 0,
            lineWidth: 3,
            lineType: 0,
            lineVisible: !0,
            crosshairMarkerVisible: !0,
            crosshairMarkerRadius: 4,
            crosshairMarkerBorderColor: "",
            crosshairMarkerBorderWidth: 2,
            crosshairMarkerBackgroundColor: "",
            lastPriceAnimation: 0,
            pointMarkersVisible: !1
        },
        Rg: (t, i) => new fe(t, i)
    };
    class ve extends y {
        constructor() {
            super(...arguments), this.qt = null, this.uM = 0, this.cM = 0
        }
        ht(t) {
            this.qt = t
        }
        et({
            context: t,
            horizontalPixelRatio: i,
            verticalPixelRatio: s
        }) {
            if (null === this.qt || 0 === this.qt.Xs.length || null === this.qt.lt) return;
            if (this.uM = this.dM(i), this.uM >= 2) {
                Math.max(1, Math.floor(i)) % 2 != this.uM % 2 && this.uM--
            }
            this.cM = this.qt.fM ? Math.min(this.uM, Math.floor(i)) : this.uM;
            let n = null;
            const e = this.cM <= this.uM && this.qt.lu >= Math.floor(1.5 * i);
            for (let r = this.qt.lt.from; r < this.qt.lt.to; ++r) {
                const h = this.qt.Xs[r];
                n !== h.cr && (t.fillStyle = h.cr, n = h.cr);
                const a = Math.floor(.5 * this.cM),
                    l = Math.round(h._t * i),
                    o = l - a,
                    _ = this.cM,
                    u = o + _ - 1,
                    c = Math.min(h.ql, h.Yl),
                    d = Math.max(h.ql, h.Yl),
                    f = Math.round(c * s) - a,
                    p = Math.round(d * s) + a,
                    v = Math.max(p - f, this.cM);
                t.fillRect(o, f, _, v);
                const m = Math.ceil(1.5 * this.uM);
                if (e) {
                    if (this.qt.pM) {
                        const i = l - m;
                        let n = Math.max(f, Math.round(h.jl * s) - a),
                            e = n + _ - 1;
                        e > f + v - 1 && (e = f + v - 1, n = e - _ + 1), t.fillRect(i, n, o - i, e - n + 1)
                    }
                    const i = l + m;
                    let n = Math.max(f, Math.round(h.Kl * s) - a),
                        e = n + _ - 1;
                    e > f + v - 1 && (e = f + v - 1, n = e - _ + 1), t.fillRect(u + 1, n, i - u, e - n + 1)
                }
            }
        }
        dM(t) {
            const i = Math.floor(t);
            return Math.max(i, Math.floor(function(t, i) {
                return Math.floor(.3 * t * i)
            }(a(this.qt).lu, t)))
        }
    }
    class me extends _n {
        constructor(t, i) {
            super(t, i, !1)
        }
        tg(t, i, s) {
            i.su(this.jw, m(this.qw)), t.$l(this.jw, s, m(this.qw))
        }
        vM(t, i, s) {
            return {
                wt: t,
                jh: i.Ft[0],
                qh: i.Ft[1],
                Yh: i.Ft[2],
                Kh: i.Ft[3],
                _t: NaN,
                jl: NaN,
                ql: NaN,
                Yl: NaN,
                Kl: NaN
            }
        }
        Jw() {
            const t = this.Jn.Rh();
            this.jw = this.Jn.Xs().Hr().map((i => this.zg(i.Re, i, t)))
        }
    }
    class we extends me {
        constructor() {
            super(...arguments), this.Xw = new ve
        }
        zg(t, i, s) {
            return {
                ...this.vM(t, i, s),
                ...s.Dr(t)
            }
        }
        ig() {
            const t = this.Jn.N();
            this.Xw.ht({
                Xs: this.jw,
                lu: this.Qn.It().lu(),
                pM: t.openVisible,
                fM: t.thinBars,
                lt: this.qw
            })
        }
    }
    const ge = {
        type: "Bar",
        isBuiltIn: !0,
        defaultOptions: {
            upColor: "#26a69a",
            downColor: "#ef5350",
            openVisible: !0,
            thinBars: !0
        },
        Rg: (t, i) => new we(t, i)
    };
    class Me extends y {
        constructor() {
            super(...arguments), this.qt = null, this.uM = 0
        }
        ht(t) {
            this.qt = t
        }
        et(t) {
            if (null === this.qt || 0 === this.qt.Xs.length || null === this.qt.lt) return;
            const {
                horizontalPixelRatio: i
            } = t;
            if (this.uM = function(t, i) {
                    if (t >= 2.5 && t <= 4) return Math.floor(3 * i);
                    const s = 1 - .2 * Math.atan(Math.max(4, t) - 4) / (.5 * Math.PI),
                        n = Math.floor(t * s * i),
                        e = Math.floor(t * i),
                        r = Math.min(n, e);
                    return Math.max(Math.floor(i), r)
                }(this.qt.lu, i), this.uM >= 2) {
                Math.floor(i) % 2 != this.uM % 2 && this.uM--
            }
            const s = this.qt.Xs;
            this.qt.mM && this.wM(t, s, this.qt.lt), this.qt.Mi && this.Qp(t, s, this.qt.lt);
            const n = this.gM(i);
            (!this.qt.Mi || this.uM > 2 * n) && this.MM(t, s, this.qt.lt)
        }
        wM(t, i, s) {
            if (null === this.qt) return;
            const {
                context: n,
                horizontalPixelRatio: e,
                verticalPixelRatio: r
            } = t;
            let h = "",
                a = Math.min(Math.floor(e), Math.floor(this.qt.lu * e));
            a = Math.max(Math.floor(e), Math.min(a, this.uM));
            const l = Math.floor(.5 * a);
            let o = null;
            for (let t = s.from; t < s.to; t++) {
                const s = i[t];
                s.pr !== h && (n.fillStyle = s.pr, h = s.pr);
                const _ = Math.round(Math.min(s.jl, s.Kl) * r),
                    u = Math.round(Math.max(s.jl, s.Kl) * r),
                    c = Math.round(s.ql * r),
                    d = Math.round(s.Yl * r);
                let f = Math.round(e * s._t) - l;
                const p = f + a - 1;
                null !== o && (f = Math.max(o + 1, f), f = Math.min(f, p));
                const v = p - f + 1;
                n.fillRect(f, c, v, _ - c), n.fillRect(f, u + 1, v, d - u), o = p
            }
        }
        gM(t) {
            let i = Math.floor(1 * t);
            this.uM <= 2 * i && (i = Math.floor(.5 * (this.uM - 1)));
            const s = Math.max(Math.floor(t), i);
            return this.uM <= 2 * s ? Math.max(Math.floor(t), Math.floor(1 * t)) : s
        }
        Qp(t, i, s) {
            if (null === this.qt) return;
            const {
                context: n,
                horizontalPixelRatio: e,
                verticalPixelRatio: r
            } = t;
            let h = "";
            const a = this.gM(e);
            let l = null;
            for (let t = s.from; t < s.to; t++) {
                const s = i[t];
                s.dr !== h && (n.fillStyle = s.dr, h = s.dr);
                let o = Math.round(s._t * e) - Math.floor(.5 * this.uM);
                const _ = o + this.uM - 1,
                    u = Math.round(Math.min(s.jl, s.Kl) * r),
                    c = Math.round(Math.max(s.jl, s.Kl) * r);
                if (null !== l && (o = Math.max(l + 1, o), o = Math.min(o, _)), this.qt.lu * e > 2 * a) V(n, o, u, _ - o + 1, c - u + 1, a);
                else {
                    const t = _ - o + 1;
                    n.fillRect(o, u, t, c - u + 1)
                }
                l = _
            }
        }
        MM(t, i, s) {
            if (null === this.qt) return;
            const {
                context: n,
                horizontalPixelRatio: e,
                verticalPixelRatio: r
            } = t;
            let h = "";
            const a = this.gM(e);
            for (let t = s.from; t < s.to; t++) {
                const s = i[t];
                let l = Math.round(Math.min(s.jl, s.Kl) * r),
                    o = Math.round(Math.max(s.jl, s.Kl) * r),
                    _ = Math.round(s._t * e) - Math.floor(.5 * this.uM),
                    u = _ + this.uM - 1;
                if (s.cr !== h) {
                    const t = s.cr;
                    n.fillStyle = t, h = t
                }
                this.qt.Mi && (_ += a, l += a, u -= a, o -= a), l > o || n.fillRect(_, l, u - _ + 1, o - l + 1)
            }
        }
    }
    class be extends me {
        constructor() {
            super(...arguments), this.Xw = new Me
        }
        zg(t, i, s) {
            return {
                ...this.vM(t, i, s),
                ...s.Dr(t)
            }
        }
        ig() {
            const t = this.Jn.N();
            this.Xw.ht({
                Xs: this.jw,
                lu: this.Qn.It().lu(),
                mM: t.wickVisible,
                Mi: t.borderVisible,
                lt: this.qw
            })
        }
    }
    const xe = {
        type: "Candlestick",
        isBuiltIn: !0,
        defaultOptions: {
            upColor: "#26a69a",
            downColor: "#ef5350",
            wickVisible: !0,
            borderVisible: !0,
            borderColor: "#378658",
            borderUpColor: "#26a69a",
            borderDownColor: "#ef5350",
            wickColor: "#737375",
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350"
        },
        Rg: (t, i) => new be(t, i)
    };
    class Se extends y {
        constructor() {
            super(...arguments), this.qt = null, this.bM = []
        }
        ht(t) {
            this.qt = t, this.bM = []
        }
        et({
            context: t,
            horizontalPixelRatio: i,
            verticalPixelRatio: s
        }) {
            if (null === this.qt || 0 === this.qt.ot.length || null === this.qt.lt) return;
            this.bM.length || this.xM(i);
            const n = Math.max(1, Math.floor(s)),
                e = Math.round(this.qt.SM * s) - Math.floor(n / 2),
                r = e + n;
            for (let i = this.qt.lt.from; i < this.qt.lt.to; i++) {
                const h = this.qt.ot[i],
                    a = this.bM[i - this.qt.lt.from],
                    l = Math.round(h.ut * s);
                let o, _;
                t.fillStyle = h.cr, l <= e ? (o = l, _ = r) : (o = e, _ = l - Math.floor(n / 2) + n), t.fillRect(a.Uh, o, a.bi - a.Uh + 1, _ - o)
            }
        }
        xM(t) {
            if (null === this.qt || 0 === this.qt.ot.length || null === this.qt.lt) return void(this.bM = []);
            const i = Math.ceil(this.qt.lu * t) <= 1 ? 0 : Math.max(1, Math.floor(t)),
                s = Math.round(this.qt.lu * t) - i;
            this.bM = new Array(this.qt.lt.to - this.qt.lt.from);
            for (let i = this.qt.lt.from; i < this.qt.lt.to; i++) {
                const n = this.qt.ot[i],
                    e = Math.round(n._t * t);
                let r, h;
                if (s % 2) {
                    const t = (s - 1) / 2;
                    r = e - t, h = e + t
                } else {
                    const t = s / 2;
                    r = e - t, h = e + t - 1
                }
                this.bM[i - this.qt.lt.from] = {
                    Uh: r,
                    bi: h,
                    CM: e,
                    ne: n._t * t,
                    wt: n.wt
                }
            }
            for (let t = this.qt.lt.from + 1; t < this.qt.lt.to; t++) {
                const s = this.bM[t - this.qt.lt.from],
                    n = this.bM[t - this.qt.lt.from - 1];
                s.wt === n.wt + 1 && (s.Uh - n.bi !== i + 1 && (n.CM > n.ne ? n.bi = s.Uh - i - 1 : s.Uh = n.bi + i + 1))
            }
            let n = Math.ceil(this.qt.lu * t);
            for (let t = this.qt.lt.from; t < this.qt.lt.to; t++) {
                const i = this.bM[t - this.qt.lt.from];
                i.bi < i.Uh && (i.bi = i.Uh);
                const s = i.bi - i.Uh + 1;
                n = Math.min(s, n)
            }
            if (i > 0 && n < 4)
                for (let t = this.qt.lt.from; t < this.qt.lt.to; t++) {
                    const i = this.bM[t - this.qt.lt.from];
                    i.bi - i.Uh + 1 > n && (i.CM > i.ne ? i.bi -= 1 : i.Uh += 1)
                }
        }
    }
    class Ce extends Hn {
        constructor() {
            super(...arguments), this.Xw = new Se
        }
        zg(t, i, s) {
            return {
                ...this.Ag(t, i),
                ...s.Dr(t)
            }
        }
        ig() {
            const t = {
                ot: this.jw,
                lu: this.Qn.It().lu(),
                lt: this.qw,
                SM: this.Jn.Wt().Nt(this.Jn.N().base, a(this.Jn.zt()).Ft)
            };
            this.Xw.ht(t)
        }
    }
    const ye = {
        type: "Histogram",
        isBuiltIn: !0,
        defaultOptions: {
            color: "#26a69a",
            base: 0
        },
        Rg: (t, i) => new Ce(t, i)
    };
    class Pe {
        constructor(t, i) {
            this.yt = t, this.yM = i, this.PM()
        }
        detach() {
            this.yt.detachPrimitive(this.yM)
        }
        getPane() {
            return this.yt
        }
        applyOptions(t) {
            this.yM.hr?.(t)
        }
        PM() {
            this.yt.attachPrimitive(this.yM)
        }
    }
    const ke = {
            visible: !0,
            horzAlign: "center",
            vertAlign: "center",
            lines: []
        },
        Te = {
            color: "rgba(0, 0, 0, 0.5)",
            fontSize: 48,
            fontFamily: w,
            fontStyle: "",
            text: ""
        };
    class Re {
        constructor(t) {
            this.kM = new Map, this.qt = t
        }
        draw(t) {
            t.useMediaCoordinateSpace((t => {
                if (!this.qt.visible) return;
                const {
                    context: i,
                    mediaSize: s
                } = t;
                let n = 0;
                for (const t of this.qt.lines) {
                    if (0 === t.text.length) continue;
                    i.font = t.k;
                    const e = this.TM(i, t.text);
                    e > s.width ? t.pu = s.width / e : t.pu = 1, n += t.lineHeight * t.pu
                }
                let e = 0;
                switch (this.qt.vertAlign) {
                    case "top":
                        e = 0;
                        break;
                    case "center":
                        e = Math.max((s.height - n) / 2, 0);
                        break;
                    case "bottom":
                        e = Math.max(s.height - n, 0)
                }
                for (const t of this.qt.lines) {
                    i.save(), i.fillStyle = t.color;
                    let n = 0;
                    switch (this.qt.horzAlign) {
                        case "left":
                            i.textAlign = "left", n = t.lineHeight / 2;
                            break;
                        case "center":
                            i.textAlign = "center", n = s.width / 2;
                            break;
                        case "right":
                            i.textAlign = "right", n = s.width - 1 - t.lineHeight / 2
                    }
                    i.translate(n, e), i.textBaseline = "top", i.font = t.k, i.scale(t.pu, t.pu), i.fillText(t.text, 0, t.RM), i.restore(), e += t.lineHeight * t.pu
                }
            }))
        }
        TM(t, i) {
            const s = this.DM(t.font);
            let n = s.get(i);
            return void 0 === n && (n = t.measureText(i).width, s.set(i, n)), n
        }
        DM(t) {
            let i = this.kM.get(t);
            return void 0 === i && (i = new Map, this.kM.set(t, i)), i
        }
    }
    class De {
        constructor(t) {
            this.ys = Ve(t)
        }
        Pt(t) {
            this.ys = Ve(t)
        }
        renderer() {
            return new Re(this.ys)
        }
    }

    function Ee(t) {
        return {
            ...t,
            k: g(t.fontSize, t.fontFamily, t.fontStyle),
            lineHeight: t.lineHeight || 1.2 * t.fontSize,
            RM: 0,
            pu: 0
        }
    }

    function Ve(t) {
        return {
            ...t,
            lines: t.lines.map(Ee)
        }
    }

    function Be(t) {
        return {
            ...Te,
            ...t
        }
    }

    function Ie(t) {
        return {
            ...ke,
            ...t,
            lines: t.lines?.map(Be) ?? []
        }
    }
    class Ae {
        constructor(t) {
            this.ys = Ie(t), this.EM = [new De(this.ys)]
        }
        updateAllViews() {
            this.EM.forEach((t => t.Pt(this.ys)))
        }
        paneViews() {
            return this.EM
        }
        attached({
            requestUpdate: t
        }) {
            this.VM = t
        }
        detached() {
            this.VM = void 0
        }
        hr(t) {
            this.ys = Ie({
                ...this.ys,
                ...t
            }), this.VM && this.VM()
        }
    }
    const ze = {
        alpha: 1,
        padding: 0
    };
    class Oe {
        constructor(t) {
            this.qt = t
        }
        draw(t) {
            t.useMediaCoordinateSpace((t => {
                const i = t.context,
                    s = this.BM(this.qt, t.mediaSize);
                s && this.qt.IM && (i.globalAlpha = this.qt.alpha ?? 1, i.drawImage(this.qt.IM, s._t, s.ut, s.Qi, s.$t))
            }))
        }
        BM(t, i) {
            const {
                maxHeight: s,
                maxWidth: n,
                AM: e,
                zM: r,
                padding: h
            } = t, a = Math.round(i.width / 2), l = Math.round(i.height / 2), o = h ?? 0;
            let _ = i.width - 2 * o,
                u = i.height - 2 * o;
            s && (u = Math.min(u, s)), n && (_ = Math.min(_, n));
            const c = _ / r,
                d = u / e,
                f = Math.min(c, d),
                p = r * f,
                v = e * f;
            return {
                _t: a - .5 * p,
                ut: l - .5 * v,
                $t: v,
                Qi: p
            }
        }
    }
    class Le {
        constructor(t) {
            this.OM = null, this.LM = 0, this.NM = 0, this.ys = t, this.M = Ne(this.ys, this.OM, this.LM, this.NM)
        }
        WM(t) {
            void 0 !== t.FM && (this.LM = t.FM), void 0 !== t.HM && (this.NM = t.HM), void 0 !== t.UM && (this.OM = t.UM), this.Pt()
        }
        $M(t) {
            this.ys = t, this.Pt()
        }
        zOrder() {
            return "bottom"
        }
        Pt() {
            this.M = Ne(this.ys, this.OM, this.LM, this.NM)
        }
        renderer() {
            return new Oe(this.M)
        }
    }

    function Ne(t, i, s, n) {
        return {
            ...t,
            IM: i,
            zM: s,
            AM: n
        }
    }

    function We(t) {
        return {
            ...ze,
            ...t
        }
    }
    class Fe {
        constructor(t, i) {
            this.jM = null, this.qM = t, this.ys = We(i), this.EM = [new Le(this.ys)]
        }
        updateAllViews() {
            this.EM.forEach((t => t.Pt()))
        }
        paneViews() {
            return this.EM
        }
        attached(t) {
            const {
                requestUpdate: i
            } = t;
            this.YM = i, this.jM = new Image, this.jM.onload = () => {
                const t = this.jM?.naturalHeight ?? 1,
                    i = this.jM?.naturalWidth ?? 1;
                this.EM.forEach((s => s.WM({
                    HM: t,
                    FM: i,
                    UM: this.jM
                }))), this.YM && this.YM()
            }, this.jM.src = this.qM
        }
        detached() {
            this.YM = void 0, this.jM = null
        }
        hr(t) {
            this.ys = We({
                ...this.ys,
                ...t
            }), this.KM(), this.VM && this.VM()
        }
        VM() {
            this.YM && this.YM()
        }
        KM() {
            this.EM.forEach((t => t.$M(this.ys)))
        }
    }
    class He {
        constructor(t, i) {
            this.Jn = t, this.ah = i, this.PM()
        }
        detach() {
            this.Jn.detachPrimitive(this.ah)
        }
        getSeries() {
            return this.Jn
        }
        applyOptions(t) {
            this.ah && this.ah.hr && this.ah.hr(t)
        }
        PM() {
            this.Jn.attachPrimitive(this.ah)
        }
    }
    const Ue = {
        zOrder: "normal"
    };

    function $e(t, i) {
        return Kt(Math.min(Math.max(t, 12), 30) * i)
    }

    function je(t, i) {
        switch (t) {
            case "arrowDown":
            case "arrowUp":
                return $e(i, 1);
            case "circle":
                return $e(i, .8);
            case "square":
                return $e(i, .7)
        }
    }

    function qe(t) {
        return function(t) {
            const i = Math.ceil(t);
            return i % 2 != 0 ? i - 1 : i
        }($e(t, 1))
    }

    function Ye(t) {
        return Math.max($e(t, .1), 3)
    }

    function Ke(t, i, s) {
        return i ? t : s ? Math.ceil(t / 2) : 0
    }

    function Xe(t, i, s, n) {
        const e = (je("arrowUp", n) - 1) / 2 * s.XM,
            r = (Kt(n / 2) - 1) / 2 * s.XM;
        i.beginPath(), t ? (i.moveTo(s._t - e, s.ut), i.lineTo(s._t, s.ut - e), i.lineTo(s._t + e, s.ut), i.lineTo(s._t + r, s.ut), i.lineTo(s._t + r, s.ut + e), i.lineTo(s._t - r, s.ut + e), i.lineTo(s._t - r, s.ut)) : (i.moveTo(s._t - e, s.ut), i.lineTo(s._t, s.ut + e), i.lineTo(s._t + e, s.ut), i.lineTo(s._t + r, s.ut), i.lineTo(s._t + r, s.ut - e), i.lineTo(s._t - r, s.ut - e), i.lineTo(s._t - r, s.ut)), i.fill()
    }

    function Ze(t, i, s, n, e, r) {
        const h = (je("arrowUp", n) - 1) / 2,
            a = (Kt(n / 2) - 1) / 2;
        if (e >= i - a - 2 && e <= i + a + 2 && r >= (t ? s : s - h) - 2 && r <= (t ? s + h : s) + 2) return !0;
        return (() => {
            if (e < i - h - 3 || e > i + h + 3 || r < (t ? s - h - 3 : s) || r > (t ? s : s + h + 3)) return !1;
            const n = Math.abs(e - i);
            return Math.abs(r - s) + 3 >= n / 2
        })()
    }
    class Ge {
        constructor() {
            this.qt = null, this.Ln = new tt, this.W = -1, this.F = "", this.Rp = "", this.ZM = "normal"
        }
        ht(t) {
            this.qt = t
        }
        Nn(t, i, s) {
            this.W === t && this.F === i || (this.W = t, this.F = i, this.Rp = g(t, i), this.Ln.Vn()), this.ZM = s
        }
        Yn(t, i) {
            if (null === this.qt || null === this.qt.lt) return null;
            for (let s = this.qt.lt.from; s < this.qt.lt.to; s++) {
                const n = this.qt.ot[s];
                if (n && Qe(n, t, i)) return {
                    zOrder: "normal",
                    externalId: n.Kn ?? ""
                }
            }
            return null
        }
        draw(t) {
            "aboveSeries" !== this.ZM && t.useBitmapCoordinateSpace((t => {
                this.et(t)
            }))
        }
        drawBackground(t) {
            "aboveSeries" === this.ZM && t.useBitmapCoordinateSpace((t => {
                this.et(t)
            }))
        }
        et({
            context: t,
            horizontalPixelRatio: i,
            verticalPixelRatio: s
        }) {
            if (null !== this.qt && null !== this.qt.lt) {
                t.textBaseline = "middle", t.font = this.Rp;
                for (let n = this.qt.lt.from; n < this.qt.lt.to; n++) {
                    const e = this.qt.ot[n];
                    void 0 !== e.ri && (e.ri.Qi = this.Ln.Ei(t, e.ri.GM), e.ri.$t = this.W, e.ri._t = e._t - e.ri.Qi / 2), Je(e, t, i, s)
                }
            }
        }
    }

    function Je(t, i, s, n) {
        i.fillStyle = t.R, void 0 !== t.ri && function(t, i, s, n, e, r) {
                t.save(), t.scale(e, r), t.fillText(i, s, n), t.restore()
            }(i, t.ri.GM, t.ri._t, t.ri.ut, s, n),
            function(t, i, s) {
                if (0 === t.zr) return;
                switch (t.JM) {
                    case "arrowDown":
                        return void Xe(!1, i, s, t.zr);
                    case "arrowUp":
                        return void Xe(!0, i, s, t.zr);
                    case "circle":
                        return void
                        function(t, i, s) {
                            const n = (je("circle", s) - 1) / 2;
                            t.beginPath(), t.arc(i._t, i.ut, n * i.XM, 0, 2 * Math.PI, !1), t.fill()
                        }(i, s, t.zr);
                    case "square":
                        return void
                        function(t, i, s) {
                            const n = je("square", s),
                                e = (n - 1) * i.XM / 2,
                                r = i._t - e,
                                h = i.ut - e;
                            t.fillRect(r, h, n * i.XM, n * i.XM)
                        }(i, s, t.zr)
                }
                t.JM
            }(t, i, function(t, i, s) {
                const n = Math.max(1, Math.floor(i)) % 2 / 2;
                return {
                    _t: Math.round(t._t * i) + n,
                    ut: t.ut * s,
                    XM: i
                }
            }(t, s, n))
    }

    function Qe(t, i, s) {
        return !(void 0 === t.ri || ! function(t, i, s, n, e, r) {
            const h = n / 2;
            return e >= t && e <= t + s && r >= i - h && r <= i + h
        }(t.ri._t, t.ri.ut, t.ri.Qi, t.ri.$t, i, s)) || function(t, i, s) {
            if (0 === t.zr) return !1;
            switch (t.JM) {
                case "arrowDown":
                    return Ze(!0, t._t, t.ut, t.zr, i, s);
                case "arrowUp":
                    return Ze(!1, t._t, t.ut, t.zr, i, s);
                case "circle":
                    return function(t, i, s, n, e) {
                        const r = 2 + je("circle", s) / 2,
                            h = t - n,
                            a = i - e;
                        return Math.sqrt(h * h + a * a) <= r
                    }(t._t, t.ut, t.zr, i, s);
                case "square":
                    return function(t, i, s, n, e) {
                        const r = je("square", s),
                            h = (r - 1) / 2,
                            a = t - h,
                            l = i - h;
                        return n >= a && n <= a + r && e >= l && e <= l + r
                    }(t._t, t.ut, t.zr, i, s)
            }
        }(t, i, s)
    }

    function tr(t) {
        return "atPriceTop" === t || "atPriceBottom" === t || "atPriceMiddle" === t
    }

    function ir(t, i, s, n, e, r, h, l) {
        const o = function(t, i) {
            if (tr(i.position) && void 0 !== i.price) return i.price;
            if ("value" in (s = t) && "number" == typeof s.value) return t.value;
            var s;
            if (function(t) {
                    return "open" in t && "high" in t && "low" in t && "close" in t
                }(t)) {
                if ("inBar" === i.position) return t.close;
                if ("aboveBar" === i.position) return t.high;
                if ("belowBar" === i.position) return t.low
            }
        }(s, i);
        if (void 0 === o) return;
        const _ = tr(i.position),
            c = l.timeScale(),
            d = u(i.size) ? Math.max(i.size, 0) : 1,
            f = qe(c.options().barSpacing) * d,
            p = f / 2;
        t.zr = f;
        switch (i.position) {
            case "inBar":
            case "atPriceMiddle":
                return t.ut = a(h.priceToCoordinate(o)), void(void 0 !== t.ri && (t.ri.ut = t.ut + p + r + .6 * e));
            case "aboveBar":
            case "atPriceTop": {
                const i = _ ? 0 : n.QM;
                return t.ut = a(h.priceToCoordinate(o)) - p - i, void 0 !== t.ri && (t.ri.ut = t.ut - p - .6 * e, n.QM += 1.2 * e), void(_ || (n.QM += f + r))
            }
            case "belowBar":
            case "atPriceBottom": {
                const i = _ ? 0 : n.tb;
                return t.ut = a(h.priceToCoordinate(o)) + p + i, void 0 !== t.ri && (t.ri.ut = t.ut + p + r + .6 * e, n.tb += 1.2 * e), void(_ || (n.tb += f + r))
            }
        }
    }
    class sr {
        constructor(t, i, s) {
            this.ib = [], this.St = !0, this.sb = !0, this.Gt = new Ge, this.ge = t, this.gp = i, this.qt = {
                ot: [],
                lt: null
            }, this.ys = s
        }
        renderer() {
            if (!this.ge.options().visible) return null;
            this.St && this.nb();
            const t = this.gp.options().layout;
            return this.Gt.Nn(t.fontSize, t.fontFamily, this.ys.zOrder), this.Gt.ht(this.qt), this.Gt
        }
        eb(t) {
            this.ib = t, this.Pt("data")
        }
        Pt(t) {
            this.St = !0, "data" === t && (this.sb = !0)
        }
        rb(t) {
            this.St = !0, this.ys = t
        }
        zOrder() {
            return "aboveSeries" === this.ys.zOrder ? "top" : this.ys.zOrder
        }
        nb() {
            const t = this.gp.timeScale(),
                i = this.ib;
            this.sb && (this.qt.ot = i.map((t => ({
                wt: t.time,
                _t: 0,
                ut: 0,
                zr: 0,
                JM: t.shape,
                R: t.color,
                Kn: t.id,
                hb: t.hb,
                ri: void 0
            }))), this.sb = !1);
            const s = this.gp.options().layout;
            this.qt.lt = null;
            const n = t.getVisibleLogicalRange();
            if (null === n) return;
            const e = new xi(Math.floor(n.from), Math.ceil(n.to));
            if (null === this.ge.data()[0]) return;
            if (0 === this.qt.ot.length) return;
            let r = NaN;
            const h = Ye(t.options().barSpacing),
                l = {
                    QM: h,
                    tb: h
                };
            this.qt.lt = on(this.qt.ot, e, !0);
            for (let n = this.qt.lt.from; n < this.qt.lt.to; n++) {
                const e = i[n];
                e.time !== r && (l.QM = h, l.tb = h, r = e.time);
                const o = this.qt.ot[n];
                o._t = a(t.logicalToCoordinate(e.time)), void 0 !== e.text && e.text.length > 0 && (o.ri = {
                    GM: e.text,
                    _t: 0,
                    ut: 0,
                    Qi: 0,
                    $t: 0
                });
                const _ = this.ge.dataByIndex(e.time, 0);
                null !== _ && ir(o, e, _, l, s.fontSize, h, this.ge, this.gp)
            }
            this.St = !1
        }
    }

    function nr(t) {
        return {
            ...Ue,
            ...t
        }
    }
    class er {
        constructor(t) {
            this.sh = null, this.ib = [], this.ab = [], this.lb = null, this.ge = null, this.gp = null, this.ob = !0, this._b = null, this.ub = null, this.cb = null, this.fb = !0, this.ys = nr(t)
        }
        attached(t) {
            this.pb(), this.gp = t.chart, this.ge = t.series, this.sh = new sr(this.ge, a(this.gp), this.ys), this.YM = t.requestUpdate, this.ge.subscribeDataChanged((t => this.fg(t))), this.fb = !0, this.VM()
        }
        VM() {
            this.YM && this.YM()
        }
        detached() {
            this.ge && this.lb && this.ge.unsubscribeDataChanged(this.lb), this.gp = null, this.ge = null, this.sh = null, this.lb = null
        }
        eb(t) {
            this.fb = !0, this.ib = t, this.pb(), this.ob = !0, this.ub = null, this.VM()
        }
        mb() {
            return this.ib
        }
        paneViews() {
            return this.sh ? [this.sh] : []
        }
        updateAllViews() {
            this.wb()
        }
        hitTest(t, i) {
            return this.sh ? this.sh.renderer()?.Yn(t, i) ?? null : null
        }
        autoscaleInfo(t, i) {
            if (this.sh) {
                const t = this.gb();
                if (t) return {
                    priceRange: null,
                    margins: t
                }
            }
            return null
        }
        hr(t) {
            this.ys = nr({
                ...this.ys,
                ...t
            }), this.VM && this.VM()
        }
        gb() {
            const t = a(this.gp).timeScale().options().barSpacing;
            if (this.ob || t !== this.cb) {
                if (this.cb = t, this.ib.length > 0) {
                    const i = Ye(t),
                        s = 1.5 * qe(t) + 2 * i,
                        n = this.Mb();
                    this._b = {
                        above: Ke(s, n.aboveBar, n.inBar),
                        below: Ke(s, n.belowBar, n.inBar)
                    }
                } else this._b = null;
                this.ob = !1
            }
            return this._b
        }
        Mb() {
            return null === this.ub && (this.ub = this.ib.reduce(((t, i) => (t[i.position] || (t[i.position] = !0), t)), {
                inBar: !1,
                aboveBar: !1,
                belowBar: !1,
                atPriceTop: !1,
                atPriceBottom: !1,
                atPriceMiddle: !1
            })), this.ub
        }
        pb() {
            if (!this.fb || !this.gp || !this.ge) return;
            const t = this.gp.timeScale(),
                i = this.ge?.data();
            if (null == t.getVisibleLogicalRange() || !this.ge || 0 === i.length) return void(this.ab = []);
            const s = t.timeToIndex(a(i[0].time), !0);
            this.ab = this.ib.map(((i, n) => {
                const e = t.timeToIndex(i.time, !0),
                    r = e < s ? 1 : -1,
                    h = a(this.ge).dataByIndex(e, r),
                    l = {
                        time: t.timeToIndex(a(h).time, !1),
                        position: i.position,
                        shape: i.shape,
                        color: i.color,
                        id: i.id,
                        hb: n,
                        text: i.text,
                        size: i.size,
                        price: i.price,
                        dw: i.time
                    };
                if ("atPriceTop" === i.position || "atPriceBottom" === i.position || "atPriceMiddle" === i.position) {
                    if (void 0 === i.price) throw new Error(`Price is required for position ${i.position}`);
                    return {
                        ...l,
                        position: i.position,
                        price: i.price
                    }
                }
                return {
                    ...l,
                    position: i.position,
                    price: i.price
                }
            })), this.fb = !1
        }
        wb(t) {
            this.sh && (this.pb(), this.sh.eb(this.ab), this.sh.rb(this.ys), this.sh.Pt(t))
        }
        fg(t) {
            this.fb = !0, this.VM()
        }
    }
    class rr extends He {
        constructor(t, i, s) {
            super(t, i), s && this.setMarkers(s)
        }
        setMarkers(t) {
            this.ah.eb(t)
        }
        markers() {
            return this.ah.mb()
        }
    }
    class hr {
        constructor(t) {
            this.ib = new Map, this.bb = t
        }
        xb(t, i, s) {
            if (this.Sb(i), void 0 !== s) {
                const n = window.setTimeout((() => {
                        this.ib.delete(i), this.Cb()
                    }), s),
                    e = {
                        ...t,
                        yb: n,
                        Pb: Date.now() + s
                    };
                this.ib.set(i, e)
            } else this.ib.set(i, {
                ...t,
                yb: void 0,
                Pb: void 0
            });
            this.Cb()
        }
        Sb(t) {
            const i = this.ib.get(t);
            i && void 0 !== i.yb && window.clearTimeout(i.yb), this.ib.delete(t), this.Cb()
        }
        kb() {
            for (const [t] of this.ib) this.Sb(t)
        }
        Tb() {
            const t = Date.now(),
                i = [];
            for (const [s, n] of this.ib) !n.Pb || n.Pb > t ? i.push({
                time: n.time,
                sign: n.sign,
                value: n.value
            }) : this.Sb(s);
            return i
        }
        Rb(t) {
            this.bb = t
        }
        Cb() {
            this.bb && this.bb()
        }
    }
    const ar = {
        positiveColor: "#22AB94",
        negativeColor: "#F7525F",
        updateVisibilityDuration: 5e3
    };
    class lr {
        constructor(t, i, s, n) {
            this.qt = t, this.Db = i, this.Eb = s, this.Vb = n
        }
        draw(t) {
            t.useBitmapCoordinateSpace((t => {
                const i = t.context,
                    s = Math.max(1, Math.floor(t.horizontalPixelRatio)) % 2 / 2,
                    n = 4 * t.verticalPixelRatio + s;
                this.qt.forEach((e => {
                    const r = Math.round(e._t * t.horizontalPixelRatio) + s;
                    i.beginPath();
                    const h = this.Bb(e.Ib);
                    i.fillStyle = h, i.arc(r, e.ut * t.verticalPixelRatio, n, 0, 2 * Math.PI, !1), i.fill(), e.Ib && (i.strokeStyle = h, i.lineWidth = Math.floor(2 * t.horizontalPixelRatio), i.beginPath(), i.moveTo((e._t - 4.7) * t.horizontalPixelRatio + s, (e.ut - 7 * e.Ib) * t.verticalPixelRatio), i.lineTo(e._t * t.horizontalPixelRatio + s, (e.ut - 7 * e.Ib - 7 * e.Ib * .5) * t.verticalPixelRatio), i.lineTo((e._t + 4.7) * t.horizontalPixelRatio + s, (e.ut - 7 * e.Ib) * t.verticalPixelRatio), i.stroke())
                }))
            }))
        }
        Bb(t) {
            return 0 === t ? this.Db : t > 0 ? this.Vb : this.Eb
        }
    }
    class or {
        constructor(t, i, s) {
            this.qt = [], this.ge = t, this.uh = i, this.ys = s
        }
        Pt(t) {
            this.qt = t.map((t => {
                const i = this.ge.priceToCoordinate(t.value);
                if (null === i) return null;
                return {
                    _t: a(this.uh.timeToCoordinate(t.time)),
                    ut: i,
                    Ib: t.sign
                }
            })).filter(v)
        }
        renderer() {
            const t = function(t, i) {
                return function(t, i) {
                    return "Area" === i
                }(0, i) ? t.lineColor : t.color
            }(this.ge.options(), this.ge.seriesType());
            return new lr(this.qt, t, this.ys.negativeColor, this.ys.positiveColor)
        }
    }

    function _r(t, i) {
        return "Line" === i || "Area" === i
    }
    class ur {
        constructor(t) {
            this.gp = void 0, this.ge = void 0, this.EM = [], this.i_ = null, this.Ab = new Map, this.zb = new hr((() => this.VM())), this.ys = {
                ...ar,
                ...t
            }
        }
        hr(t) {
            this.ys = {
                ...this.ys,
                ...t
            }, this.VM()
        }
        eb(t) {
            this.zb.kb();
            const i = this.i_;
            i && t.forEach((t => {
                this.zb.xb(t, i.key(t.time))
            }))
        }
        mb() {
            return this.zb.Tb()
        }
        VM() {
            this.YM?.()
        }
        attached(t) {
            const {
                chart: i,
                series: s,
                requestUpdate: n,
                horzScaleBehavior: e
            } = t;
            this.gp = i, this.ge = s, this.i_ = e;
            const r = this.ge.seriesType();
            if ("Area" !== r && "Line" !== r) throw new Error("UpDownMarkersPrimitive is only supported for Area and Line series types");
            this.EM = [new or(this.ge, this.gp.timeScale(), this.ys)], this.YM = n, this.VM()
        }
        detached() {
            this.gp = void 0, this.ge = void 0, this.YM = void 0
        }
        Bp() {
            return h(this.gp)
        }
        Do() {
            return h(this.ge)
        }
        updateAllViews() {
            this.EM.forEach((t => t.Pt(this.mb())))
        }
        paneViews() {
            return this.EM
        }
        ht(t) {
            if (!this.ge) throw new Error("Primitive not attached to series");
            const i = this.ge.seriesType();
            this.Ab.clear();
            const s = this.i_;
            s && t.forEach((t => {
                $s(t) && _r(0, i) && this.Ab.set(s.key(t.time), t.value)
            })), h(this.ge).setData(t)
        }
        Pt(t, i) {
            if (!this.ge || !this.i_) throw new Error("Primitive not attached to series");
            const s = this.ge.seriesType(),
                n = this.i_.key(t.time);
            if (Us(t) && this.Ab.delete(n), $s(t) && _r(0, s)) {
                const i = this.Ab.get(n);
                i && this.zb.xb({
                    time: t.time,
                    value: t.value,
                    sign: cr(t.value, i)
                }, n, this.ys.updateVisibilityDuration)
            }
            h(this.ge).update(t, i)
        }
        Ob() {
            this.zb.kb()
        }
    }

    function cr(t, i) {
        return t === i ? 0 : t - i > 0 ? 1 : -1
    }
    class dr extends He {
        setData(t) {
            return this.ah.ht(t)
        }
        update(t, i) {
            return this.ah.Pt(t, i)
        }
        markers() {
            return this.ah.mb()
        }
        setMarkers(t) {
            return this.ah.eb(t)
        }
        clearMarkers() {
            return this.ah.Ob()
        }
    }
    const fr = {
        ...t,
        color: "#2196f3"
    };
    var pr = Object.freeze({
        __proto__: null,
        AreaSeries: pe,
        BarSeries: ge,
        BaselineSeries: ce,
        CandlestickSeries: xe,
        get ColorType() {
            return Ei
        },
        get CrosshairMode() {
            return $
        },
        HistogramSeries: ye,
        get LastPriceAnimationMode() {
            return Ri
        },
        LineSeries: Jn,
        get LineStyle() {
            return s
        },
        get LineType() {
            return i
        },
        get MismatchDirection() {
            return St
        },
        get PriceLineSource() {
            return Di
        },
        get PriceScaleMode() {
            return ui
        },
        get TickMarkType() {
            return Vi
        },
        get TrackingModeExitMode() {
            return Ti
        },
        createChart: function(t, i) {
            return Fn(t, new Gi, Gi.Xc(i))
        },
        createChartEx: Fn,
        createImageWatermark: function(t, i, s) {
            return new Pe(t, new Fe(i, s))
        },
        createOptionsChart: function(t, i) {
            return Fn(t, new re, i)
        },
        createSeriesMarkers: function(t, i, s) {
            const n = new rr(t, new er(s ?? {}));
            return i && n.setMarkers(i), n
        },
        createTextWatermark: function(t, i) {
            return new Pe(t, new Ae(i))
        },
        createUpDownMarkers: function(t, i = {}) {
            return new dr(t, new ur(i))
        },
        createYieldCurveChart: function(t, i) {
            const s = Wn(t);
            return new ne(s, i)
        },
        customSeriesDefaultOptions: fr,
        defaultHorzScaleBehavior: function() {
            return Gi
        },
        isBusinessDay: Ii,
        isUTCTimestamp: Ai,
        version: function() {
            return "5.0.7"
        }
    });
    window.LightweightCharts = pr
}();