/*! For license information please see index.min.js.LICENSE.txt */ ! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define
		.amd ? define([], t) : "object" == typeof exports ? exports.IpfsHttpClient = t() : e.IpfsHttpClient = t()
}(window, (function() {
	return function(e) {
		var t = {};

		function n(r) {
			if (t[r]) return t[r].exports;
			var s = t[r] = {
				i: r,
				l: !1,
				exports: {}
			};
			return e[r].call(s.exports, s, s.exports, n), s.l = !0, s.exports
		}
		return n.m = e, n.c = t, n.d = function(e, t, r) {
			n.o(e, t) || Object.defineProperty(e, t, {
				enumerable: !0,
				get: r
			})
		}, n.r = function(e) {
			"undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
				value: "Module"
			}), Object.defineProperty(e, "__esModule", {
				value: !0
			})
		}, n.t = function(e, t) {
			if (1 & t && (e = n(e)), 8 & t) return e;
			if (4 & t && "object" == typeof e && e && e.__esModule) return e;
			var r = Object.create(null);
			if (n.r(r), Object.defineProperty(r, "default", {
					enumerable: !0,
					value: e
				}), 2 & t && "string" != typeof e)
				for (var s in e) n.d(r, s, function(t) {
					return e[t]
				}.bind(null, s));
			return r
		}, n.n = function(e) {
			var t = e && e.__esModule ? function() {
				return e.default
			} : function() {
				return e
			};
			return n.d(t, "a", t), t
		}, n.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}, n.p = "", n(n.s = 79)
	}([function(e, t, n) {
		"use strict";
		const r = n(112);
		e.exports = e => t => e(new r(t), t)
	}, function(e, t, n) {
		"use strict";
		const r = n(34),
			s = n(35);
		e.exports = ({
			arg: e,
			searchParams: t,
			hashAlg: n,
			mtime: i,
			mode: o,
			...a
		} = {}) => {
			t && (a = { ...a,
				...t
			}), n && (a.hash = n), null != i && (i = s(i), a.mtime = i.secs, a.mtimeNsecs = i.nsecs), null != o && (a.mode =
				r(o)), a.timeout && !isNaN(a.timeout) && (a.timeout = a.timeout + "ms"), null == e ? e = [] : Array.isArray(
				e) || (e = [e]);
			const u = new URLSearchParams(a);
			return e.forEach(e => u.append("arg", e)), u
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(13),
			s = n(24),
			i = n(15),
			o = n(20),
			a = n(98),
			u = n(21),
			c = n(19),
			f = n(8),
			h = n(25),
			l = Object.keys(o).reduce((e, t) => (e[o[t]] = t, e), {});
		class p {
			constructor(e, t, n, o) {
				if (d.isCID(e)) {
					const t = e;
					return this.version = t.version, this.codec = t.codec, this.multihash = t.multihash, void(this.multibaseName =
						t.multibaseName || (0 === t.version ? "base58btc" : "base32"))
				}
				if ("string" == typeof e) {
					const t = s.isEncoded(e);
					if (t) {
						const n = s.decode(e);
						this.version = parseInt(n.slice(0, 1).toString("hex"), 16), this.codec = i.getCodec(n.slice(1)), this.multihash =
							i.rmPrefix(n.slice(1)), this.multibaseName = t
					} else this.version = 0, this.codec = "dag-pb", this.multihash = r.fromB58String(e), this.multibaseName =
						"base58btc";
					return p.validateCID(this), void Object.defineProperty(this, "string", {
						value: e
					})
				}
				if (e instanceof Uint8Array) {
					const t = e.slice(0, 1),
						n = parseInt(t.toString("hex"), 16);
					if (1 === n) {
						const t = e;
						this.version = n, this.codec = i.getCodec(t.slice(1)), this.multihash = i.rmPrefix(t.slice(1)), this.multibaseName =
							"base32"
					} else this.version = 0, this.codec = "dag-pb", this.multihash = e, this.multibaseName = "base58btc";
					p.validateCID(this)
				} else this.version = e, "number" == typeof t && (t = l[t]), this.codec = t, this.multihash = n, this.multibaseName =
					o || (0 === e ? "base58btc" : "base32"), p.validateCID(this)
			}
			get bytes() {
				let e = this._bytes;
				if (!e) {
					if (0 === this.version) e = this.multihash;
					else {
						if (1 !== this.version) throw new Error("unsupported version"); {
							const t = i.getCodeVarint(this.codec);
							e = c([
								[1], t, this.multihash
							], 1 + t.byteLength + this.multihash.byteLength)
						}
					}
					Object.defineProperty(this, "_bytes", {
						value: e
					})
				}
				return e
			}
			get prefix() {
				const e = i.getCodeVarint(this.codec),
					t = r.prefix(this.multihash);
				return c([
					[this.version], e, t
				], 1 + e.byteLength + t.byteLength)
			}
			get code() {
				return o[this.codec]
			}
			toV0() {
				if ("dag-pb" !== this.codec) throw new Error("Cannot convert a non dag-pb CID to CIDv0");
				const {
					name: e,
					length: t
				} = r.decode(this.multihash);
				if ("sha2-256" !== e) throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
				if (32 !== t) throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
				return new d(0, this.codec, this.multihash)
			}
			toV1() {
				return new d(1, this.codec, this.multihash)
			}
			toBaseEncodedString(e = this.multibaseName) {
				if (this.string && e === this.multibaseName) return this.string;
				let t = null;
				if (0 === this.version) {
					if ("base58btc" !== e) throw new Error(
						"not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()"
					);
					t = r.toB58String(this.multihash)
				} else {
					if (1 !== this.version) throw new Error("unsupported version");
					t = f(s.encode(e, this.bytes))
				}
				return e === this.multibaseName && Object.defineProperty(this, "string", {
					value: t
				}), t
			} [Symbol.for("nodejs.util.inspect.custom")]() {
				return "CID(" + this.toString() + ")"
			}
			toString(e) {
				return this.toBaseEncodedString(e)
			}
			toJSON() {
				return {
					codec: this.codec,
					version: this.version,
					hash: this.multihash
				}
			}
			equals(e) {
				return this.codec === e.codec && this.version === e.version && h(this.multihash, e.multihash)
			}
			static validateCID(e) {
				const t = a.checkCIDComponents(e);
				if (t) throw new Error(t)
			}
		}
		const d = u(p, {
			className: "CID",
			symbolName: "@ipld/js-cid/CID"
		});
		d.codecs = o, e.exports = d
	}, function(e, t, n) {
		"use strict";
		e.exports = e => {
			if (null == e) return e;
			const t = /^[A-Z]+$/;
			return Object.keys(e).reduce((n, r) => (t.test(r) ? n[r.toLowerCase()] = e[r] : t.test(r[0]) ? n[r[0].toLowerCase() +
				r.slice(1)] = e[r] : n[r] = e[r], n), {})
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = {
			encode: n(87),
			decode: n(88),
			encodingLength: n(89)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(99),
			s = n(33),
			i = n(4),
			o = n(2),
			a = n(21),
			u = Symbol.for("nodejs.util.inspect.custom"),
			c = n(8),
			f = n(25),
			h = a.proto((function(e) {
				if (!(this instanceof h)) return new h(e);
				if (null == e && (e = ""), e instanceof Uint8Array) this.bytes = r.fromBytes(e);
				else if ("string" == typeof e || e instanceof String) {
					if (e.length > 0 && "/" !== e.charAt(0)) throw new Error(`multiaddr "${e}" must start with a "/"`);
					this.bytes = r.fromString(e)
				} else {
					if (!(e.bytes && e.protos && e.protoCodes)) throw new Error(
						"addr must be a string, Buffer, or another Multiaddr");
					this.bytes = r.fromBytes(e.bytes)
				}
			}), {
				className: "Multiaddr",
				symbolName: "@multiformats/js-multiaddr/multiaddr"
			});
		h.prototype.toString = function() {
			return r.bytesToString(this.bytes)
		}, h.prototype.toJSON = h.prototype.toString, h.prototype.toOptions = function() {
			const e = {},
				t = this.toString().split("/");
			return e.family = "ip4" === t[1] ? "ipv4" : "ipv6", e.host = t[2], e.transport = t[3], e.port = parseInt(t[4]),
				e
		}, h.prototype[u] = function() {
			return "<Multiaddr " + c(this.bytes, "base16") + " - " + r.bytesToString(this.bytes) + ">"
		}, h.prototype.inspect = function() {
			return "<Multiaddr " + c(this.bytes, "base16") + " - " + r.bytesToString(this.bytes) + ">"
		}, h.prototype.protos = function() {
			return this.protoCodes().map(e => Object.assign({}, s(e)))
		}, h.prototype.protoCodes = function() {
			const e = [],
				t = this.bytes;
			let n = 0;
			for (; n < t.length;) {
				const o = i.decode(t, n),
					a = i.decode.bytes,
					u = s(o);
				n += r.sizeForAddr(u, t.slice(n + a)) + a, e.push(o)
			}
			return e
		}, h.prototype.protoNames = function() {
			return this.protos().map(e => e.name)
		}, h.prototype.tuples = function() {
			return r.bytesToTuples(this.bytes)
		}, h.prototype.stringTuples = function() {
			const e = r.bytesToTuples(this.bytes);
			return r.tuplesToStringTuples(e)
		}, h.prototype.encapsulate = function(e) {
			return e = h(e), h(this.toString() + e.toString())
		}, h.prototype.decapsulate = function(e) {
			e = e.toString();
			const t = this.toString(),
				n = t.lastIndexOf(e);
			if (n < 0) throw new Error("Address " + this + " does not contain subaddress: " + e);
			return h(t.slice(0, n))
		}, h.prototype.decapsulateCode = function(e) {
			const t = this.tuples();
			for (let n = t.length - 1; n >= 0; n--)
				if (t[n][0] === e) return h(r.tuplesToBytes(t.slice(0, n)));
			return this
		}, h.prototype.getPeerId = function() {
			let e = null;
			try {
				e = this.stringTuples().filter(e => {
					if (e[0] === s.names.ipfs.code) return !0
				}).pop()[1], e = c(new o(e).multihash, "base58btc")
			} catch (t) {
				e = null
			}
			return e
		}, h.prototype.getPath = function() {
			let e = null;
			try {
				e = this.stringTuples().filter(e => {
					if (s(e[0]).path) return !0
				})[0][1]
			} catch (t) {
				e = null
			}
			return e
		}, h.prototype.equals = function(e) {
			return f(this.bytes, e.bytes)
		}, h.prototype.nodeAddress = function() {
			const e = this.protoCodes(),
				t = this.protoNames(),
				n = this.toString().split("/").slice(1);
			if (n.length < 4) throw new Error(
				'multiaddr must have a valid format: "/{ip4, ip6, dns4, dns6}/{address}/{tcp, udp}/{port}".');
			if (4 !== e[0] && 41 !== e[0] && 54 !== e[0] && 55 !== e[0]) throw new Error(
				`no protocol with name: "'${t[0]}'". Must have a valid family name: "{ip4, ip6, dns4, dns6}".`);
			if ("tcp" !== n[2] && "udp" !== n[2]) throw new Error(
				`no protocol with name: "'${t[1]}'". Must have a valid transport protocol: "{tcp, udp}".`);
			return {
				family: 41 === e[0] || 55 === e[0] ? 6 : 4,
				address: n[1],
				port: parseInt(n[3])
			}
		}, h.fromNodeAddress = function(e, t) {
			if (!e) throw new Error("requires node address object");
			if (!t) throw new Error("requires transport protocol");
			let n;
			switch (e.family) {
				case "IPv4":
					n = "ip4";
					break;
				case "IPv6":
					n = "ip6";
					break;
				default:
					throw Error(`Invalid addr family. Got '${e.family}' instead of 'IPv4' or 'IPv6'`)
			}
			return h("/" + [n, e.address, t, e.port].join("/"))
		}, h.prototype.isThinWaistAddress = function(e) {
			const t = (e || this).protos();
			return 2 === t.length && ((4 === t[0].code || 41 === t[0].code) && (6 === t[1].code || 273 === t[1].code))
		}, h.protocols = s, h.isName = function(e) {
			return !!h.isMultiaddr(e) && e.protos().some(e => e.resolvable)
		}, h.resolve = function(e) {
			return h.isMultiaddr(e) && h.isName(e) ? Promise.reject(new Error("not implemented yet")) : Promise.reject(
				Error("not a valid name"))
		}, e.exports = h
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t, n, r) {
			return t.bytes = n.bytes = 0, {
				type: e,
				encode: t,
				decode: n,
				encodingLength: r
			}
		}
	}, function(e, t, n) {
		"use strict";
		const {
			names: r
		} = n(17), {
			TextEncoder: s
		} = n(18), i = new s;
		e.exports = function(e, t = "utf8") {
			if ("utf8" === t || "utf-8" === t) return i.encode(e);
			if ("ascii" === t) return function(e) {
				const t = new Uint8Array(e.length);
				for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
				return t
			}(e);
			const n = r[t];
			if (!n) throw new Error("Unknown base");
			return n.decode(e)
		}
	}, function(e, t, n) {
		"use strict";
		const {
			names: r
		} = n(17), {
			TextDecoder: s
		} = n(18), i = new s("utf8");
		e.exports = function(e, t = "utf8") {
			if ("utf8" === t || "utf-8" === t) return i.decode(e);
			if ("ascii" === t) return function(e) {
				let t = "";
				for (let n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
				return t
			}(e);
			const n = r[t];
			if (!n) throw new Error("Unknown base");
			return n.encode(e)
		}
	}, function(e, t, n) {
		"use strict";
		const {
			AbortController: r,
			AbortSignal: s
		} = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0;
		e.exports = r, e.exports.AbortSignal = s, e.exports.default = r
	}, function(e, t, n) {
		"use strict";
		const r = n(110);

		function s(e) {
			const t = new r;

			function n() {
				t.abort();
				for (const t of e) t && t.removeEventListener && t.removeEventListener("abort", n)
			}
			for (const r of e)
				if (r && r.addEventListener) {
					if (r.aborted) {
						n();
						break
					}
					r.addEventListener("abort", n)
				} return t.signal
		}
		e.exports = s, e.exports.anySignal = s
	}, function(e, t, n) {
		"use strict";
		const r = n(119),
			s = n(34),
			i = n(35),
			{
				File: o,
				FormData: a
			} = n(27);
		e.exports = async function(e = "", t, n = {}) {
			const u = new a;
			let c = 0;
			for await (const {
				content: a,
				path: f,
				mode: h,
				mtime: l
			} of r(e)) {
				let e = "";
				c > 0 && (e = "-" + c);
				let t = (a ? "file" : "dir") + e;
				const n = [];
				if (null != h && n.push("mode=" + s(h)), null != l) {
					const {
						secs: e,
						nsecs: t
					} = i(l);
					n.push("mtime=" + e), null != t && n.push("mtime-nsecs=" + t)
				}
				n.length && (t = `${t}?${n.join("&")}`), a ? u.set(t, a, encodeURIComponent(f)) : u.set(t, new o([""],
					encodeURIComponent(f), {
						type: "application/x-directory"
					})), c++
			}
			return {
				headers: n,
				body: u
			}
		}
	}, function(e, t, n) {
		"use strict";
		(function(e) {
			var r = n(83),
				s = n(42),
				i = n(84);

			function o() {
				return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
			}

			function a(e, t) {
				if (o() < t) throw new RangeError("Invalid typed array length");
				return u.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = u.prototype : (null === e && (e = new u(t)),
					e.length = t), e
			}

			function u(e, t, n) {
				if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(e, t, n);
				if ("number" == typeof e) {
					if ("string" == typeof t) throw new Error(
						"If encoding is specified then the first argument must be a string");
					return h(this, e)
				}
				return c(this, e, t, n)
			}

			function c(e, t, n, r) {
				if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
				return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, n, r) {
					if (t.byteLength, n < 0 || t.byteLength < n) throw new RangeError("'offset' is out of bounds");
					if (t.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
					t = void 0 === n && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, n) : new Uint8Array(
						t, n, r);
					u.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = u.prototype : e = l(e, t);
					return e
				}(e, t, n, r) : "string" == typeof t ? function(e, t, n) {
					"string" == typeof n && "" !== n || (n = "utf8");
					if (!u.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
					var r = 0 | d(t, n),
						s = (e = a(e, r)).write(t, n);
					s !== r && (e = e.slice(0, s));
					return e
				}(e, t, n) : function(e, t) {
					if (u.isBuffer(t)) {
						var n = 0 | p(t.length);
						return 0 === (e = a(e, n)).length || t.copy(e, 0, 0, n), e
					}
					if (t) {
						if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" !=
							typeof t.length || (r = t.length) != r ? a(e, 0) : l(e, t);
						if ("Buffer" === t.type && i(t.data)) return l(e, t.data)
					}
					var r;
					throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
				}(e, t)
			}

			function f(e) {
				if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
				if (e < 0) throw new RangeError('"size" argument must not be negative')
			}

			function h(e, t) {
				if (f(t), e = a(e, t < 0 ? 0 : 0 | p(t)), !u.TYPED_ARRAY_SUPPORT)
					for (var n = 0; n < t; ++n) e[n] = 0;
				return e
			}

			function l(e, t) {
				var n = t.length < 0 ? 0 : 0 | p(t.length);
				e = a(e, n);
				for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
				return e
			}

			function p(e) {
				if (e >= o()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o().toString(
					16) + " bytes");
				return 0 | e
			}

			function d(e, t) {
				if (u.isBuffer(e)) return e.length;
				if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) ||
						e instanceof ArrayBuffer)) return e.byteLength;
				"string" != typeof e && (e = "" + e);
				var n = e.length;
				if (0 === n) return 0;
				for (var r = !1;;) switch (t) {
					case "ascii":
					case "latin1":
					case "binary":
						return n;
					case "utf8":
					case "utf-8":
					case void 0:
						return M(e).length;
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return 2 * n;
					case "hex":
						return n >>> 1;
					case "base64":
						return H(e).length;
					default:
						if (r) return M(e).length;
						t = ("" + t).toLowerCase(), r = !0
				}
			}

			function g(e, t, n) {
				var r = !1;
				if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
				if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
				if ((n >>>= 0) <= (t >>>= 0)) return "";
				for (e || (e = "utf8");;) switch (e) {
					case "hex":
						return O(this, t, n);
					case "utf8":
					case "utf-8":
						return x(this, t, n);
					case "ascii":
						return N(this, t, n);
					case "latin1":
					case "binary":
						return I(this, t, n);
					case "base64":
						return A(this, t, n);
					case "ucs2":
					case "ucs-2":
					case "utf16le":
					case "utf-16le":
						return T(this, t, n);
					default:
						if (r) throw new TypeError("Unknown encoding: " + e);
						e = (e + "").toLowerCase(), r = !0
				}
			}

			function m(e, t, n) {
				var r = e[t];
				e[t] = e[n], e[n] = r
			}

			function b(e, t, n, r, s) {
				if (0 === e.length) return -1;
				if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -
						2147483648), n = +n, isNaN(n) && (n = s ? 0 : e.length - 1), n < 0 && (n = e.length + n), n >= e.length) {
					if (s) return -1;
					n = e.length - 1
				} else if (n < 0) {
					if (!s) return -1;
					n = 0
				}
				if ("string" == typeof t && (t = u.from(t, r)), u.isBuffer(t)) return 0 === t.length ? -1 : y(e, t, n, r, s);
				if ("number" == typeof t) return t &= 255, u.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype
					.indexOf ? s ? Uint8Array.prototype.indexOf.call(e, t, n) : Uint8Array.prototype.lastIndexOf.call(e, t, n) :
					y(e, [t], n, r, s);
				throw new TypeError("val must be string, number or Buffer")
			}

			function y(e, t, n, r, s) {
				var i, o = 1,
					a = e.length,
					u = t.length;
				if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r ||
						"utf-16le" === r)) {
					if (e.length < 2 || t.length < 2) return -1;
					o = 2, a /= 2, u /= 2, n /= 2
				}

				function c(e, t) {
					return 1 === o ? e[t] : e.readUInt16BE(t * o)
				}
				if (s) {
					var f = -1;
					for (i = n; i < a; i++)
						if (c(e, i) === c(t, -1 === f ? 0 : i - f)) {
							if (-1 === f && (f = i), i - f + 1 === u) return f * o
						} else -1 !== f && (i -= i - f), f = -1
				} else
					for (n + u > a && (n = a - u), i = n; i >= 0; i--) {
						for (var h = !0, l = 0; l < u; l++)
							if (c(e, i + l) !== c(t, l)) {
								h = !1;
								break
							} if (h) return i
					}
				return -1
			}

			function w(e, t, n, r) {
				n = Number(n) || 0;
				var s = e.length - n;
				r ? (r = Number(r)) > s && (r = s) : r = s;
				var i = t.length;
				if (i % 2 != 0) throw new TypeError("Invalid hex string");
				r > i / 2 && (r = i / 2);
				for (var o = 0; o < r; ++o) {
					var a = parseInt(t.substr(2 * o, 2), 16);
					if (isNaN(a)) return o;
					e[n + o] = a
				}
				return o
			}

			function k(e, t, n, r) {
				return G(M(t, e.length - n), e, n, r)
			}

			function E(e, t, n, r) {
				return G(function(e) {
					for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
					return t
				}(t), e, n, r)
			}

			function v(e, t, n, r) {
				return E(e, t, n, r)
			}

			function S(e, t, n, r) {
				return G(H(t), e, n, r)
			}

			function _(e, t, n, r) {
				return G(function(e, t) {
					for (var n, r, s, i = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) n = e.charCodeAt(o), r = n >> 8, s =
						n % 256, i.push(s), i.push(r);
					return i
				}(t, e.length - n), e, n, r)
			}

			function A(e, t, n) {
				return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n))
			}

			function x(e, t, n) {
				n = Math.min(e.length, n);
				for (var r = [], s = t; s < n;) {
					var i, o, a, u, c = e[s],
						f = null,
						h = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
					if (s + h <= n) switch (h) {
						case 1:
							c < 128 && (f = c);
							break;
						case 2:
							128 == (192 & (i = e[s + 1])) && (u = (31 & c) << 6 | 63 & i) > 127 && (f = u);
							break;
						case 3:
							i = e[s + 1], o = e[s + 2], 128 == (192 & i) && 128 == (192 & o) && (u = (15 & c) << 12 | (63 & i) << 6 |
								63 & o) > 2047 && (u < 55296 || u > 57343) && (f = u);
							break;
						case 4:
							i = e[s + 1], o = e[s + 2], a = e[s + 3], 128 == (192 & i) && 128 == (192 & o) && 128 == (192 & a) && (u =
								(15 & c) << 18 | (63 & i) << 12 | (63 & o) << 6 | 63 & a) > 65535 && u < 1114112 && (f = u)
					}
					null === f ? (f = 65533, h = 1) : f > 65535 && (f -= 65536, r.push(f >>> 10 & 1023 | 55296), f = 56320 |
						1023 & f), r.push(f), s += h
				}
				return function(e) {
					var t = e.length;
					if (t <= 4096) return String.fromCharCode.apply(String, e);
					var n = "",
						r = 0;
					for (; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += 4096));
					return n
				}(r)
			}
			t.Buffer = u, t.SlowBuffer = function(e) {
					+e != e && (e = 0);
					return u.alloc(+e)
				}, t.INSPECT_MAX_BYTES = 50, u.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT :
				function() {
					try {
						var e = new Uint8Array(1);
						return e.__proto__ = {
							__proto__: Uint8Array.prototype,
							foo: function() {
								return 42
							}
						}, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength
					} catch (t) {
						return !1
					}
				}(), t.kMaxLength = o(), u.poolSize = 8192, u._augment = function(e) {
					return e.__proto__ = u.prototype, e
				}, u.from = function(e, t, n) {
					return c(null, e, t, n)
				}, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array,
					"undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol
						.species, {
							value: null,
							configurable: !0
						})), u.alloc = function(e, t, n) {
					return function(e, t, n, r) {
						return f(t), t <= 0 ? a(e, t) : void 0 !== n ? "string" == typeof r ? a(e, t).fill(n, r) : a(e, t).fill(n) :
							a(e, t)
					}(null, e, t, n)
				}, u.allocUnsafe = function(e) {
					return h(null, e)
				}, u.allocUnsafeSlow = function(e) {
					return h(null, e)
				}, u.isBuffer = function(e) {
					return !(null == e || !e._isBuffer)
				}, u.compare = function(e, t) {
					if (!u.isBuffer(e) || !u.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
					if (e === t) return 0;
					for (var n = e.length, r = t.length, s = 0, i = Math.min(n, r); s < i; ++s)
						if (e[s] !== t[s]) {
							n = e[s], r = t[s];
							break
						} return n < r ? -1 : r < n ? 1 : 0
				}, u.isEncoding = function(e) {
					switch (String(e).toLowerCase()) {
						case "hex":
						case "utf8":
						case "utf-8":
						case "ascii":
						case "latin1":
						case "binary":
						case "base64":
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return !0;
						default:
							return !1
					}
				}, u.concat = function(e, t) {
					if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');
					if (0 === e.length) return u.alloc(0);
					var n;
					if (void 0 === t)
						for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
					var r = u.allocUnsafe(t),
						s = 0;
					for (n = 0; n < e.length; ++n) {
						var o = e[n];
						if (!u.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
						o.copy(r, s), s += o.length
					}
					return r
				}, u.byteLength = d, u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
					var e = this.length;
					if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
					for (var t = 0; t < e; t += 2) m(this, t, t + 1);
					return this
				}, u.prototype.swap32 = function() {
					var e = this.length;
					if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
					for (var t = 0; t < e; t += 4) m(this, t, t + 3), m(this, t + 1, t + 2);
					return this
				}, u.prototype.swap64 = function() {
					var e = this.length;
					if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
					for (var t = 0; t < e; t += 8) m(this, t, t + 7), m(this, t + 1, t + 6), m(this, t + 2, t + 5), m(this, t +
						3, t + 4);
					return this
				}, u.prototype.toString = function() {
					var e = 0 | this.length;
					return 0 === e ? "" : 0 === arguments.length ? x(this, 0, e) : g.apply(this, arguments)
				}, u.prototype.equals = function(e) {
					if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
					return this === e || 0 === u.compare(this, e)
				}, u.prototype.inspect = function() {
					var e = "",
						n = t.INSPECT_MAX_BYTES;
					return this.length > 0 && (e = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (e +=
						" ... ")), "<Buffer " + e + ">"
				}, u.prototype.compare = function(e, t, n, r, s) {
					if (!u.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
					if (void 0 === t && (t = 0), void 0 === n && (n = e ? e.length : 0), void 0 === r && (r = 0), void 0 === s &&
						(s = this.length), t < 0 || n > e.length || r < 0 || s > this.length) throw new RangeError(
						"out of range index");
					if (r >= s && t >= n) return 0;
					if (r >= s) return -1;
					if (t >= n) return 1;
					if (this === e) return 0;
					for (var i = (s >>>= 0) - (r >>>= 0), o = (n >>>= 0) - (t >>>= 0), a = Math.min(i, o), c = this.slice(r, s),
							f = e.slice(t, n), h = 0; h < a; ++h)
						if (c[h] !== f[h]) {
							i = c[h], o = f[h];
							break
						} return i < o ? -1 : o < i ? 1 : 0
				}, u.prototype.includes = function(e, t, n) {
					return -1 !== this.indexOf(e, t, n)
				}, u.prototype.indexOf = function(e, t, n) {
					return b(this, e, t, n, !0)
				}, u.prototype.lastIndexOf = function(e, t, n) {
					return b(this, e, t, n, !1)
				}, u.prototype.write = function(e, t, n, r) {
					if (void 0 === t) r = "utf8", n = this.length, t = 0;
					else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0;
					else {
						if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
						t |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
					}
					var s = this.length - t;
					if ((void 0 === n || n > s) && (n = s), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError(
						"Attempt to write outside buffer bounds");
					r || (r = "utf8");
					for (var i = !1;;) switch (r) {
						case "hex":
							return w(this, e, t, n);
						case "utf8":
						case "utf-8":
							return k(this, e, t, n);
						case "ascii":
							return E(this, e, t, n);
						case "latin1":
						case "binary":
							return v(this, e, t, n);
						case "base64":
							return S(this, e, t, n);
						case "ucs2":
						case "ucs-2":
						case "utf16le":
						case "utf-16le":
							return _(this, e, t, n);
						default:
							if (i) throw new TypeError("Unknown encoding: " + r);
							r = ("" + r).toLowerCase(), i = !0
					}
				}, u.prototype.toJSON = function() {
					return {
						type: "Buffer",
						data: Array.prototype.slice.call(this._arr || this, 0)
					}
				};

			function N(e, t, n) {
				var r = "";
				n = Math.min(e.length, n);
				for (var s = t; s < n; ++s) r += String.fromCharCode(127 & e[s]);
				return r
			}

			function I(e, t, n) {
				var r = "";
				n = Math.min(e.length, n);
				for (var s = t; s < n; ++s) r += String.fromCharCode(e[s]);
				return r
			}

			function O(e, t, n) {
				var r = e.length;
				(!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
				for (var s = "", i = t; i < n; ++i) s += F(e[i]);
				return s
			}

			function T(e, t, n) {
				for (var r = e.slice(t, n), s = "", i = 0; i < r.length; i += 2) s += String.fromCharCode(r[i] + 256 * r[i +
					1]);
				return s
			}

			function P(e, t, n) {
				if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
				if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
			}

			function R(e, t, n, r, s, i) {
				if (!u.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
				if (t > s || t < i) throw new RangeError('"value" argument is out of bounds');
				if (n + r > e.length) throw new RangeError("Index out of range")
			}

			function U(e, t, n, r) {
				t < 0 && (t = 65535 + t + 1);
				for (var s = 0, i = Math.min(e.length - n, 2); s < i; ++s) e[n + s] = (t & 255 << 8 * (r ? s : 1 - s)) >>> 8 *
					(r ? s : 1 - s)
			}

			function C(e, t, n, r) {
				t < 0 && (t = 4294967295 + t + 1);
				for (var s = 0, i = Math.min(e.length - n, 4); s < i; ++s) e[n + s] = t >>> 8 * (r ? s : 3 - s) & 255
			}

			function L(e, t, n, r, s, i) {
				if (n + r > e.length) throw new RangeError("Index out of range");
				if (n < 0) throw new RangeError("Index out of range")
			}

			function D(e, t, n, r, i) {
				return i || L(e, 0, n, 4), s.write(e, t, n, r, 23, 4), n + 4
			}

			function B(e, t, n, r, i) {
				return i || L(e, 0, n, 8), s.write(e, t, n, r, 52, 8), n + 8
			}
			u.prototype.slice = function(e, t) {
				var n, r = this.length;
				if ((e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) <
					0 && (t = 0) : t > r && (t = r), t < e && (t = e), u.TYPED_ARRAY_SUPPORT)(n = this.subarray(e, t)).__proto__ =
					u.prototype;
				else {
					var s = t - e;
					n = new u(s, void 0);
					for (var i = 0; i < s; ++i) n[i] = this[i + e]
				}
				return n
			}, u.prototype.readUIntLE = function(e, t, n) {
				e |= 0, t |= 0, n || P(e, t, this.length);
				for (var r = this[e], s = 1, i = 0; ++i < t && (s *= 256);) r += this[e + i] * s;
				return r
			}, u.prototype.readUIntBE = function(e, t, n) {
				e |= 0, t |= 0, n || P(e, t, this.length);
				for (var r = this[e + --t], s = 1; t > 0 && (s *= 256);) r += this[e + --t] * s;
				return r
			}, u.prototype.readUInt8 = function(e, t) {
				return t || P(e, 1, this.length), this[e]
			}, u.prototype.readUInt16LE = function(e, t) {
				return t || P(e, 2, this.length), this[e] | this[e + 1] << 8
			}, u.prototype.readUInt16BE = function(e, t) {
				return t || P(e, 2, this.length), this[e] << 8 | this[e + 1]
			}, u.prototype.readUInt32LE = function(e, t) {
				return t || P(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
			}, u.prototype.readUInt32BE = function(e, t) {
				return t || P(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
			}, u.prototype.readIntLE = function(e, t, n) {
				e |= 0, t |= 0, n || P(e, t, this.length);
				for (var r = this[e], s = 1, i = 0; ++i < t && (s *= 256);) r += this[e + i] * s;
				return r >= (s *= 128) && (r -= Math.pow(2, 8 * t)), r
			}, u.prototype.readIntBE = function(e, t, n) {
				e |= 0, t |= 0, n || P(e, t, this.length);
				for (var r = t, s = 1, i = this[e + --r]; r > 0 && (s *= 256);) i += this[e + --r] * s;
				return i >= (s *= 128) && (i -= Math.pow(2, 8 * t)), i
			}, u.prototype.readInt8 = function(e, t) {
				return t || P(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
			}, u.prototype.readInt16LE = function(e, t) {
				t || P(e, 2, this.length);
				var n = this[e] | this[e + 1] << 8;
				return 32768 & n ? 4294901760 | n : n
			}, u.prototype.readInt16BE = function(e, t) {
				t || P(e, 2, this.length);
				var n = this[e + 1] | this[e] << 8;
				return 32768 & n ? 4294901760 | n : n
			}, u.prototype.readInt32LE = function(e, t) {
				return t || P(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
			}, u.prototype.readInt32BE = function(e, t) {
				return t || P(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
			}, u.prototype.readFloatLE = function(e, t) {
				return t || P(e, 4, this.length), s.read(this, e, !0, 23, 4)
			}, u.prototype.readFloatBE = function(e, t) {
				return t || P(e, 4, this.length), s.read(this, e, !1, 23, 4)
			}, u.prototype.readDoubleLE = function(e, t) {
				return t || P(e, 8, this.length), s.read(this, e, !0, 52, 8)
			}, u.prototype.readDoubleBE = function(e, t) {
				return t || P(e, 8, this.length), s.read(this, e, !1, 52, 8)
			}, u.prototype.writeUIntLE = function(e, t, n, r) {
				(e = +e, t |= 0, n |= 0, r) || R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
				var s = 1,
					i = 0;
				for (this[t] = 255 & e; ++i < n && (s *= 256);) this[t + i] = e / s & 255;
				return t + n
			}, u.prototype.writeUIntBE = function(e, t, n, r) {
				(e = +e, t |= 0, n |= 0, r) || R(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
				var s = n - 1,
					i = 1;
				for (this[t + s] = 255 & e; --s >= 0 && (i *= 256);) this[t + s] = e / i & 255;
				return t + n
			}, u.prototype.writeUInt8 = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 1, 255, 0), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), this[t] =
					255 & e, t + 1
			}, u.prototype.writeUInt16LE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, this[t +
					1] = e >>> 8) : U(this, e, t, !0), t + 2
			}, u.prototype.writeUInt16BE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 2, 65535, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, this[t +
					1] = 255 & e) : U(this, e, t, !1), t + 2
			}, u.prototype.writeUInt32LE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24,
					this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : C(this, e, t, !0), t + 4
			}, u.prototype.writeUInt32BE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 4, 4294967295, 0), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24,
					this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : C(this, e, t, !1), t + 4
			}, u.prototype.writeIntLE = function(e, t, n, r) {
				if (e = +e, t |= 0, !r) {
					var s = Math.pow(2, 8 * n - 1);
					R(this, e, t, n, s - 1, -s)
				}
				var i = 0,
					o = 1,
					a = 0;
				for (this[t] = 255 & e; ++i < n && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t +
					i] = (e / o >> 0) - a & 255;
				return t + n
			}, u.prototype.writeIntBE = function(e, t, n, r) {
				if (e = +e, t |= 0, !r) {
					var s = Math.pow(2, 8 * n - 1);
					R(this, e, t, n, s - 1, -s)
				}
				var i = n - 1,
					o = 1,
					a = 0;
				for (this[t + i] = 255 & e; --i >= 0 && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1),
					this[t + i] = (e / o >> 0) - a & 255;
				return t + n
			}, u.prototype.writeInt8 = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 1, 127, -128), u.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), e < 0 &&
					(e = 255 + e + 1), this[t] = 255 & e, t + 1
			}, u.prototype.writeInt16LE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e,
					this[t + 1] = e >>> 8) : U(this, e, t, !0), t + 2
			}, u.prototype.writeInt16BE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 2, 32767, -32768), u.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8,
					this[t + 1] = 255 & e) : U(this, e, t, !1), t + 2
			}, u.prototype.writeInt32LE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 4, 2147483647, -2147483648), u.TYPED_ARRAY_SUPPORT ? (this[t] =
					255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : C(this, e, t, !0), t + 4
			}, u.prototype.writeInt32BE = function(e, t, n) {
				return e = +e, t |= 0, n || R(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), u.TYPED_ARRAY_SUPPORT ?
					(this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : C(this, e, t,
						!1), t + 4
			}, u.prototype.writeFloatLE = function(e, t, n) {
				return D(this, e, t, !0, n)
			}, u.prototype.writeFloatBE = function(e, t, n) {
				return D(this, e, t, !1, n)
			}, u.prototype.writeDoubleLE = function(e, t, n) {
				return B(this, e, t, !0, n)
			}, u.prototype.writeDoubleBE = function(e, t, n) {
				return B(this, e, t, !1, n)
			}, u.prototype.copy = function(e, t, n, r) {
				if (n || (n = 0), r || 0 === r || (r = this.length), t >= e.length && (t = e.length), t || (t = 0), r > 0 &&
					r < n && (r = n), r === n) return 0;
				if (0 === e.length || 0 === this.length) return 0;
				if (t < 0) throw new RangeError("targetStart out of bounds");
				if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
				if (r < 0) throw new RangeError("sourceEnd out of bounds");
				r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
				var s, i = r - n;
				if (this === e && n < t && t < r)
					for (s = i - 1; s >= 0; --s) e[s + t] = this[s + n];
				else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT)
					for (s = 0; s < i; ++s) e[s + t] = this[s + n];
				else Uint8Array.prototype.set.call(e, this.subarray(n, n + i), t);
				return i
			}, u.prototype.fill = function(e, t, n, r) {
				if ("string" == typeof e) {
					if ("string" == typeof t ? (r = t, t = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length),
						1 === e.length) {
						var s = e.charCodeAt(0);
						s < 256 && (e = s)
					}
					if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
					if ("string" == typeof r && !u.isEncoding(r)) throw new TypeError("Unknown encoding: " + r)
				} else "number" == typeof e && (e &= 255);
				if (t < 0 || this.length < t || this.length < n) throw new RangeError("Out of range index");
				if (n <= t) return this;
				var i;
				if (t >>>= 0, n = void 0 === n ? this.length : n >>> 0, e || (e = 0), "number" == typeof e)
					for (i = t; i < n; ++i) this[i] = e;
				else {
					var o = u.isBuffer(e) ? e : M(new u(e, r).toString()),
						a = o.length;
					for (i = 0; i < n - t; ++i) this[i + t] = o[i % a]
				}
				return this
			};
			var j = /[^+\/0-9A-Za-z-_]/g;

			function F(e) {
				return e < 16 ? "0" + e.toString(16) : e.toString(16)
			}

			function M(e, t) {
				var n;
				t = t || 1 / 0;
				for (var r = e.length, s = null, i = [], o = 0; o < r; ++o) {
					if ((n = e.charCodeAt(o)) > 55295 && n < 57344) {
						if (!s) {
							if (n > 56319) {
								(t -= 3) > -1 && i.push(239, 191, 189);
								continue
							}
							if (o + 1 === r) {
								(t -= 3) > -1 && i.push(239, 191, 189);
								continue
							}
							s = n;
							continue
						}
						if (n < 56320) {
							(t -= 3) > -1 && i.push(239, 191, 189), s = n;
							continue
						}
						n = 65536 + (s - 55296 << 10 | n - 56320)
					} else s && (t -= 3) > -1 && i.push(239, 191, 189);
					if (s = null, n < 128) {
						if ((t -= 1) < 0) break;
						i.push(n)
					} else if (n < 2048) {
						if ((t -= 2) < 0) break;
						i.push(n >> 6 | 192, 63 & n | 128)
					} else if (n < 65536) {
						if ((t -= 3) < 0) break;
						i.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
					} else {
						if (!(n < 1114112)) throw new Error("Invalid code point");
						if ((t -= 4) < 0) break;
						i.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
					}
				}
				return i
			}

			function H(e) {
				return r.toByteArray(function(e) {
					if ((e = function(e) {
							return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
						}(e).replace(j, "")).length < 2) return "";
					for (; e.length % 4 != 0;) e += "=";
					return e
				}(e))
			}

			function G(e, t, n, r) {
				for (var s = 0; s < r && !(s + n >= t.length || s >= e.length); ++s) t[s + n] = e[s];
				return s
			}
		}).call(this, n(31))
	}, function(e, t, n) {
		"use strict";
		const r = n(24),
			s = n(4),
			{
				names: i
			} = n(90),
			o = n(8),
			a = n(7),
			u = n(19),
			c = {};
		for (const h in i) c[i[h]] = h;

		function f(e) {
			t.decode(e)
		}
		t.names = i, t.codes = Object.freeze(c), t.toHexString = function(e) {
			if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
			return o(e, "base16")
		}, t.fromHexString = function(e) {
			return a(e, "base16")
		}, t.toB58String = function(e) {
			if (!(e instanceof Uint8Array)) throw new Error("must be passed a Uint8Array");
			return o(r.encode("base58btc", e)).slice(1)
		}, t.fromB58String = function(e) {
			const t = e instanceof Uint8Array ? o(e) : e;
			return r.decode("z" + t)
		}, t.decode = function(e) {
			if (!(e instanceof Uint8Array)) throw new Error("multihash must be a Uint8Array");
			if (e.length < 2) throw new Error("multihash too short. must be > 2 bytes.");
			const n = s.decode(e);
			if (!t.isValidCode(n)) throw new Error("multihash unknown function code: 0x" + n.toString(16));
			e = e.slice(s.decode.bytes);
			const r = s.decode(e);
			if (r < 0) throw new Error("multihash invalid length: " + r);
			if ((e = e.slice(s.decode.bytes)).length !== r) throw new Error("multihash length inconsistent: 0x" + o(e,
				"base16"));
			return {
				code: n,
				name: c[n],
				length: r,
				digest: e
			}
		}, t.encode = function(e, n, r) {
			if (!e || void 0 === n) throw new Error("multihash encode requires at least two args: digest, code");
			const i = t.coerceCode(n);
			if (!(e instanceof Uint8Array)) throw new Error("digest should be a Uint8Array");
			if (null == r && (r = e.length), r && e.length !== r) throw new Error(
				"digest length should be equal to specified length.");
			const o = s.encode(i),
				a = s.encode(r);
			return u([o, a, e], o.length + a.length + e.length)
		}, t.coerceCode = function(e) {
			let n = e;
			if ("string" == typeof e) {
				if (void 0 === i[e]) throw new Error("Unrecognized hash function named: " + e);
				n = i[e]
			}
			if ("number" != typeof n) throw new Error("Hash function code should be a number. Got: " + n);
			if (void 0 === c[n] && !t.isAppCode(n)) throw new Error("Unrecognized function code: " + n);
			return n
		}, t.isAppCode = function(e) {
			return e > 0 && e < 16
		}, t.isValidCode = function(e) {
			return !!t.isAppCode(e) || !!c[e]
		}, t.validate = f, t.prefix = function(e) {
			return f(e), e.subarray(0, 2)
		}
	}, function(e, t, n) {
		"use strict";
		var r;
		! function(s) {
			var i, o = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
				a = Math.ceil,
				u = Math.floor,
				c = "[BigNumber Error] ",
				f = c + "Number primitive has more than 15 significant digits: ",
				h = 1e14,
				l = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
				p = 1e9;

			function d(e) {
				var t = 0 | e;
				return e > 0 || e === t ? t : t - 1
			}

			function g(e) {
				for (var t, n, r = 1, s = e.length, i = e[0] + ""; r < s;) {
					for (n = 14 - (t = e[r++] + "").length; n--; t = "0" + t);
					i += t
				}
				for (s = i.length; 48 === i.charCodeAt(--s););
				return i.slice(0, s + 1 || 1)
			}

			function m(e, t) {
				var n, r, s = e.c,
					i = t.c,
					o = e.s,
					a = t.s,
					u = e.e,
					c = t.e;
				if (!o || !a) return null;
				if (n = s && !s[0], r = i && !i[0], n || r) return n ? r ? 0 : -a : o;
				if (o != a) return o;
				if (n = o < 0, r = u == c, !s || !i) return r ? 0 : !s ^ n ? 1 : -1;
				if (!r) return u > c ^ n ? 1 : -1;
				for (a = (u = s.length) < (c = i.length) ? u : c, o = 0; o < a; o++)
					if (s[o] != i[o]) return s[o] > i[o] ^ n ? 1 : -1;
				return u == c ? 0 : u > c ^ n ? 1 : -1
			}

			function b(e, t, n, r) {
				if (e < t || e > n || e !== u(e)) throw Error(c + (r || "Argument") + ("number" == typeof e ? e < t || e > n ?
					" out of range: " : " not an integer: " : " not a primitive number: ") + String(e))
			}

			function y(e) {
				var t = e.c.length - 1;
				return d(e.e / 14) == t && e.c[t] % 2 != 0
			}

			function w(e, t) {
				return (e.length > 1 ? e.charAt(0) + "." + e.slice(1) : e) + (t < 0 ? "e" : "e+") + t
			}

			function k(e, t, n) {
				var r, s;
				if (t < 0) {
					for (s = n + "."; ++t; s += n);
					e = s + e
				} else if (++t > (r = e.length)) {
					for (s = n, t -= r; --t; s += n);
					e += s
				} else t < r && (e = e.slice(0, t) + "." + e.slice(t));
				return e
			}(i = function e(t) {
				var n, r, s, i, E, v, S, _, A, x = F.prototype = {
						constructor: F,
						toString: null,
						valueOf: null
					},
					N = new F(1),
					I = 20,
					O = 4,
					T = -7,
					P = 21,
					R = -1e7,
					U = 1e7,
					C = !1,
					L = 1,
					D = 0,
					B = {
						prefix: "",
						groupSize: 3,
						secondaryGroupSize: 0,
						groupSeparator: ",",
						decimalSeparator: ".",
						fractionGroupSize: 0,
						fractionGroupSeparator: " ",
						suffix: ""
					},
					j = "0123456789abcdefghijklmnopqrstuvwxyz";

				function F(e, t) {
					var n, i, a, c, h, l, p, d, g = this;
					if (!(g instanceof F)) return new F(e, t);
					if (null == t) {
						if (e && !0 === e._isBigNumber) return g.s = e.s, void(!e.c || e.e > U ? g.c = g.e = null : e.e < R ? g.c = [
							g.e = 0
						] : (g.e = e.e, g.c = e.c.slice()));
						if ((l = "number" == typeof e) && 0 * e == 0) {
							if (g.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
								for (c = 0, h = e; h >= 10; h /= 10, c++);
								return void(c > U ? g.c = g.e = null : (g.e = c, g.c = [e]))
							}
							d = String(e)
						} else {
							if (!o.test(d = String(e))) return s(g, d, l);
							g.s = 45 == d.charCodeAt(0) ? (d = d.slice(1), -1) : 1
						}(c = d.indexOf(".")) > -1 && (d = d.replace(".", "")), (h = d.search(/e/i)) > 0 ? (c < 0 && (c = h), c +=
							+d.slice(h + 1), d = d.substring(0, h)) : c < 0 && (c = d.length)
					} else {
						if (b(t, 2, j.length, "Base"), 10 == t) return z(g = new F(e), I + g.e + 1, O);
						if (d = String(e), l = "number" == typeof e) {
							if (0 * e != 0) return s(g, d, l, t);
							if (g.s = 1 / e < 0 ? (d = d.slice(1), -1) : 1, F.DEBUG && d.replace(/^0\.0*|\./, "").length > 15) throw Error(
								f + e)
						} else g.s = 45 === d.charCodeAt(0) ? (d = d.slice(1), -1) : 1;
						for (n = j.slice(0, t), c = h = 0, p = d.length; h < p; h++)
							if (n.indexOf(i = d.charAt(h)) < 0) {
								if ("." == i) {
									if (h > c) {
										c = p;
										continue
									}
								} else if (!a && (d == d.toUpperCase() && (d = d.toLowerCase()) || d == d.toLowerCase() && (d = d.toUpperCase()))) {
									a = !0, h = -1, c = 0;
									continue
								}
								return s(g, String(e), l, t)
							} l = !1, (c = (d = r(d, t, 10, g.s)).indexOf(".")) > -1 ? d = d.replace(".", "") : c = d.length
					}
					for (h = 0; 48 === d.charCodeAt(h); h++);
					for (p = d.length; 48 === d.charCodeAt(--p););
					if (d = d.slice(h, ++p)) {
						if (p -= h, l && F.DEBUG && p > 15 && (e > 9007199254740991 || e !== u(e))) throw Error(f + g.s * e);
						if ((c = c - h - 1) > U) g.c = g.e = null;
						else if (c < R) g.c = [g.e = 0];
						else {
							if (g.e = c, g.c = [], h = (c + 1) % 14, c < 0 && (h += 14), h < p) {
								for (h && g.c.push(+d.slice(0, h)), p -= 14; h < p;) g.c.push(+d.slice(h, h += 14));
								h = 14 - (d = d.slice(h)).length
							} else h -= p;
							for (; h--; d += "0");
							g.c.push(+d)
						}
					} else g.c = [g.e = 0]
				}

				function M(e, t, n, r) {
					var s, i, o, a, u;
					if (null == n ? n = O : b(n, 0, 8), !e.c) return e.toString();
					if (s = e.c[0], o = e.e, null == t) u = g(e.c), u = 1 == r || 2 == r && (o <= T || o >= P) ? w(u, o) : k(u,
						o, "0");
					else if (i = (e = z(new F(e), t, n)).e, a = (u = g(e.c)).length, 1 == r || 2 == r && (t <= i || i <= T)) {
						for (; a < t; u += "0", a++);
						u = w(u, i)
					} else if (t -= o, u = k(u, i, "0"), i + 1 > a) {
						if (--t > 0)
							for (u += "."; t--; u += "0");
					} else if ((t += i - a) > 0)
						for (i + 1 == a && (u += "."); t--; u += "0");
					return e.s < 0 && s ? "-" + u : u
				}

				function H(e, t) {
					for (var n, r = 1, s = new F(e[0]); r < e.length; r++) {
						if (!(n = new F(e[r])).s) {
							s = n;
							break
						}
						t.call(s, n) && (s = n)
					}
					return s
				}

				function G(e, t, n) {
					for (var r = 1, s = t.length; !t[--s]; t.pop());
					for (s = t[0]; s >= 10; s /= 10, r++);
					return (n = r + 14 * n - 1) > U ? e.c = e.e = null : n < R ? e.c = [e.e = 0] : (e.e = n, e.c = t), e
				}

				function z(e, t, n, r) {
					var s, i, o, c, f, p, d, g = e.c,
						m = l;
					if (g) {
						e: {
							for (s = 1, c = g[0]; c >= 10; c /= 10, s++);
							if ((i = t - s) < 0) i += 14,
							o = t,
							d = (f = g[p = 0]) / m[s - o - 1] % 10 | 0;
							else if ((p = a((i + 1) / 14)) >= g.length) {
								if (!r) break e;
								for (; g.length <= p; g.push(0));
								f = d = 0, s = 1, o = (i %= 14) - 14 + 1
							} else {
								for (f = c = g[p], s = 1; c >= 10; c /= 10, s++);
								d = (o = (i %= 14) - 14 + s) < 0 ? 0 : f / m[s - o - 1] % 10 | 0
							}
							if (r = r || t < 0 || null != g[p + 1] || (o < 0 ? f : f % m[s - o - 1]), r = n < 4 ? (d || r) && (0 == n ||
									n == (e.s < 0 ? 3 : 2)) : d > 5 || 5 == d && (4 == n || r || 6 == n && (i > 0 ? o > 0 ? f / m[s - o] : 0 :
									g[p - 1]) % 10 & 1 || n == (e.s < 0 ? 8 : 7)), t < 1 || !g[0]) return g.length = 0,
							r ? (t -= e.e + 1, g[0] = m[(14 - t % 14) % 14], e.e = -t || 0) : g[0] = e.e = 0,
							e;
							if (0 == i ? (g.length = p, c = 1, p--) : (g.length = p + 1, c = m[14 - i], g[p] = o > 0 ? u(f / m[s - o] %
									m[o]) * c : 0), r)
								for (;;) {
									if (0 == p) {
										for (i = 1, o = g[0]; o >= 10; o /= 10, i++);
										for (o = g[0] += c, c = 1; o >= 10; o /= 10, c++);
										i != c && (e.e++, g[0] == h && (g[0] = 1));
										break
									}
									if (g[p] += c, g[p] != h) break;
									g[p--] = 0, c = 1
								}
							for (i = g.length; 0 === g[--i]; g.pop());
						}
						e.e > U ? e.c = e.e = null : e.e < R && (e.c = [e.e = 0])
					}
					return e
				}

				function $(e) {
					var t, n = e.e;
					return null === n ? e.toString() : (t = g(e.c), t = n <= T || n >= P ? w(t, n) : k(t, n, "0"), e.s < 0 ? "-" +
						t : t)
				}
				return F.clone = e, F.ROUND_UP = 0, F.ROUND_DOWN = 1, F.ROUND_CEIL = 2, F.ROUND_FLOOR = 3, F.ROUND_HALF_UP =
					4, F.ROUND_HALF_DOWN = 5, F.ROUND_HALF_EVEN = 6, F.ROUND_HALF_CEIL = 7, F.ROUND_HALF_FLOOR = 8, F.EUCLID = 9,
					F.config = F.set = function(e) {
						var t, n;
						if (null != e) {
							if ("object" != typeof e) throw Error(c + "Object expected: " + e);
							if (e.hasOwnProperty(t = "DECIMAL_PLACES") && (b(n = e[t], 0, p, t), I = n), e.hasOwnProperty(t =
									"ROUNDING_MODE") && (b(n = e[t], 0, 8, t), O = n), e.hasOwnProperty(t = "EXPONENTIAL_AT") && ((n = e[t]) &&
									n.pop ? (b(n[0], -p, 0, t), b(n[1], 0, p, t), T = n[0], P = n[1]) : (b(n, -p, p, t), T = -(P = n < 0 ? -
										n : n))), e.hasOwnProperty(t = "RANGE"))
								if ((n = e[t]) && n.pop) b(n[0], -p, -1, t), b(n[1], 1, p, t), R = n[0], U = n[1];
								else {
									if (b(n, -p, p, t), !n) throw Error(c + t + " cannot be zero: " + n);
									R = -(U = n < 0 ? -n : n)
								} if (e.hasOwnProperty(t = "CRYPTO")) {
								if ((n = e[t]) !== !!n) throw Error(c + t + " not true or false: " + n);
								if (n) {
									if ("undefined" == typeof crypto || !crypto || !crypto.getRandomValues && !crypto.randomBytes) throw C = !
										n, Error(c + "crypto unavailable");
									C = n
								} else C = n
							}
							if (e.hasOwnProperty(t = "MODULO_MODE") && (b(n = e[t], 0, 9, t), L = n), e.hasOwnProperty(t =
									"POW_PRECISION") && (b(n = e[t], 0, p, t), D = n), e.hasOwnProperty(t = "FORMAT")) {
								if ("object" != typeof(n = e[t])) throw Error(c + t + " not an object: " + n);
								B = n
							}
							if (e.hasOwnProperty(t = "ALPHABET")) {
								if ("string" != typeof(n = e[t]) || /^.$|[+-.\s]|(.).*\1/.test(n)) throw Error(c + t + " invalid: " + n);
								j = n
							}
						}
						return {
							DECIMAL_PLACES: I,
							ROUNDING_MODE: O,
							EXPONENTIAL_AT: [T, P],
							RANGE: [R, U],
							CRYPTO: C,
							MODULO_MODE: L,
							POW_PRECISION: D,
							FORMAT: B,
							ALPHABET: j
						}
					}, F.isBigNumber = function(e) {
						if (!e || !0 !== e._isBigNumber) return !1;
						if (!F.DEBUG) return !0;
						var t, n, r = e.c,
							s = e.e,
							i = e.s;
						e: if ("[object Array]" == {}.toString.call(r)) {
							if ((1 === i || -1 === i) && s >= -p && s <= p && s === u(s)) {
								if (0 === r[0]) {
									if (0 === s && 1 === r.length) return !0;
									break e
								}
								if ((t = (s + 1) % 14) < 1 && (t += 14), String(r[0]).length == t) {
									for (t = 0; t < r.length; t++)
										if ((n = r[t]) < 0 || n >= h || n !== u(n)) break e;
									if (0 !== n) return !0
								}
							}
						} else if (null === r && null === s && (null === i || 1 === i || -1 === i)) return !0;
						throw Error(c + "Invalid BigNumber: " + e)
					}, F.maximum = F.max = function() {
						return H(arguments, x.lt)
					}, F.minimum = F.min = function() {
						return H(arguments, x.gt)
					}, F.random = (i = 9007199254740992 * Math.random() & 2097151 ? function() {
						return u(9007199254740992 * Math.random())
					} : function() {
						return 8388608 * (1073741824 * Math.random() | 0) + (8388608 * Math.random() | 0)
					}, function(e) {
						var t, n, r, s, o, f = 0,
							h = [],
							d = new F(N);
						if (null == e ? e = I : b(e, 0, p), s = a(e / 14), C)
							if (crypto.getRandomValues) {
								for (t = crypto.getRandomValues(new Uint32Array(s *= 2)); f < s;)(o = 131072 * t[f] + (t[f + 1] >>> 11)) >=
									9e15 ? (n = crypto.getRandomValues(new Uint32Array(2)), t[f] = n[0], t[f + 1] = n[1]) : (h.push(o %
										1e14), f += 2);
								f = s / 2
							} else {
								if (!crypto.randomBytes) throw C = !1, Error(c + "crypto unavailable");
								for (t = crypto.randomBytes(s *= 7); f < s;)(o = 281474976710656 * (31 & t[f]) + 1099511627776 * t[f + 1] +
										4294967296 * t[f + 2] + 16777216 * t[f + 3] + (t[f + 4] << 16) + (t[f + 5] << 8) + t[f + 6]) >= 9e15 ?
									crypto.randomBytes(7).copy(t, f) : (h.push(o % 1e14), f += 7);
								f = s / 7
							} if (!C)
							for (; f < s;)(o = i()) < 9e15 && (h[f++] = o % 1e14);
						for (e %= 14, (s = h[--f]) && e && (o = l[14 - e], h[f] = u(s / o) * o); 0 === h[f]; h.pop(), f--);
						if (f < 0) h = [r = 0];
						else {
							for (r = -1; 0 === h[0]; h.splice(0, 1), r -= 14);
							for (f = 1, o = h[0]; o >= 10; o /= 10, f++);
							f < 14 && (r -= 14 - f)
						}
						return d.e = r, d.c = h, d
					}), F.sum = function() {
						for (var e = 1, t = arguments, n = new F(t[0]); e < t.length;) n = n.plus(t[e++]);
						return n
					}, r = function() {
						function e(e, t, n, r) {
							for (var s, i, o = [0], a = 0, u = e.length; a < u;) {
								for (i = o.length; i--; o[i] *= t);
								for (o[0] += r.indexOf(e.charAt(a++)), s = 0; s < o.length; s++) o[s] > n - 1 && (null == o[s + 1] && (o[
									s + 1] = 0), o[s + 1] += o[s] / n | 0, o[s] %= n)
							}
							return o.reverse()
						}
						return function(t, r, s, i, o) {
							var a, u, c, f, h, l, p, d, m = t.indexOf("."),
								b = I,
								y = O;
							for (m >= 0 && (f = D, D = 0, t = t.replace(".", ""), l = (d = new F(r)).pow(t.length - m), D = f, d.c =
									e(k(g(l.c), l.e, "0"), 10, s, "0123456789"), d.e = d.c.length), c = f = (p = e(t, r, s, o ? (a = j,
									"0123456789") : (a = "0123456789", j))).length; 0 == p[--f]; p.pop());
							if (!p[0]) return a.charAt(0);
							if (m < 0 ? --c : (l.c = p, l.e = c, l.s = i, p = (l = n(l, d, b, y, s)).c, h = l.r, c = l.e), m = p[u =
									c + b + 1], f = s / 2, h = h || u < 0 || null != p[u + 1], h = y < 4 ? (null != m || h) && (0 == y || y ==
									(l.s < 0 ? 3 : 2)) : m > f || m == f && (4 == y || h || 6 == y && 1 & p[u - 1] || y == (l.s < 0 ? 8 : 7)),
								u < 1 || !p[0]) t = h ? k(a.charAt(1), -b, a.charAt(0)) : a.charAt(0);
							else {
								if (p.length = u, h)
									for (--s; ++p[--u] > s;) p[u] = 0, u || (++c, p = [1].concat(p));
								for (f = p.length; !p[--f];);
								for (m = 0, t = ""; m <= f; t += a.charAt(p[m++]));
								t = k(t, c, a.charAt(0))
							}
							return t
						}
					}(), n = function() {
						function e(e, t, n) {
							var r, s, i, o, a = 0,
								u = e.length,
								c = t % 1e7,
								f = t / 1e7 | 0;
							for (e = e.slice(); u--;) a = ((s = c * (i = e[u] % 1e7) + (r = f * i + (o = e[u] / 1e7 | 0) * c) % 1e7 *
								1e7 + a) / n | 0) + (r / 1e7 | 0) + f * o, e[u] = s % n;
							return a && (e = [a].concat(e)), e
						}

						function t(e, t, n, r) {
							var s, i;
							if (n != r) i = n > r ? 1 : -1;
							else
								for (s = i = 0; s < n; s++)
									if (e[s] != t[s]) {
										i = e[s] > t[s] ? 1 : -1;
										break
									} return i
						}

						function n(e, t, n, r) {
							for (var s = 0; n--;) e[n] -= s, s = e[n] < t[n] ? 1 : 0, e[n] = s * r + e[n] - t[n];
							for (; !e[0] && e.length > 1; e.splice(0, 1));
						}
						return function(r, s, i, o, a) {
							var c, f, l, p, g, m, b, y, w, k, E, v, S, _, A, x, N, I = r.s == s.s ? 1 : -1,
								O = r.c,
								T = s.c;
							if (!(O && O[0] && T && T[0])) return new F(r.s && s.s && (O ? !T || O[0] != T[0] : T) ? O && 0 == O[0] ||
								!T ? 0 * I : I / 0 : NaN);
							for (w = (y = new F(I)).c = [], I = i + (f = r.e - s.e) + 1, a || (a = h, f = d(r.e / 14) - d(s.e / 14),
									I = I / 14 | 0), l = 0; T[l] == (O[l] || 0); l++);
							if (T[l] > (O[l] || 0) && f--, I < 0) w.push(1), p = !0;
							else {
								for (_ = O.length, x = T.length, l = 0, I += 2, (g = u(a / (T[0] + 1))) > 1 && (T = e(T, g, a), O = e(O,
										g, a), x = T.length, _ = O.length), S = x, E = (k = O.slice(0, x)).length; E < x; k[E++] = 0);
								N = T.slice(), N = [0].concat(N), A = T[0], T[1] >= a / 2 && A++;
								do {
									if (g = 0, (c = t(T, k, x, E)) < 0) {
										if (v = k[0], x != E && (v = v * a + (k[1] || 0)), (g = u(v / A)) > 1)
											for (g >= a && (g = a - 1), b = (m = e(T, g, a)).length, E = k.length; 1 == t(m, k, b, E);) g--, n(m,
												x < b ? N : T, b, a), b = m.length, c = 1;
										else 0 == g && (c = g = 1), b = (m = T.slice()).length;
										if (b < E && (m = [0].concat(m)), n(k, m, E, a), E = k.length, -1 == c)
											for (; t(T, k, x, E) < 1;) g++, n(k, x < E ? N : T, E, a), E = k.length
									} else 0 === c && (g++, k = [0]);
									w[l++] = g, k[0] ? k[E++] = O[S] || 0 : (k = [O[S]], E = 1)
								} while ((S++ < _ || null != k[0]) && I--);
								p = null != k[0], w[0] || w.splice(0, 1)
							}
							if (a == h) {
								for (l = 1, I = w[0]; I >= 10; I /= 10, l++);
								z(y, i + (y.e = l + 14 * f - 1) + 1, o, p)
							} else y.e = f, y.r = +p;
							return y
						}
					}(), E = /^(-?)0([xbo])(?=\w[\w.]*$)/i, v = /^([^.]+)\.$/, S = /^\.([^.]+)$/, _ = /^-?(Infinity|NaN)$/, A =
					/^\s*\+(?=[\w.])|^\s+|\s+$/g, s = function(e, t, n, r) {
						var s, i = n ? t : t.replace(A, "");
						if (_.test(i)) e.s = isNaN(i) ? null : i < 0 ? -1 : 1;
						else {
							if (!n && (i = i.replace(E, (function(e, t, n) {
									return s = "x" == (n = n.toLowerCase()) ? 16 : "b" == n ? 2 : 8, r && r != s ? e : t
								})), r && (s = r, i = i.replace(v, "$1").replace(S, "0.$1")), t != i)) return new F(i, s);
							if (F.DEBUG) throw Error(c + "Not a" + (r ? " base " + r : "") + " number: " + t);
							e.s = null
						}
						e.c = e.e = null
					}, x.absoluteValue = x.abs = function() {
						var e = new F(this);
						return e.s < 0 && (e.s = 1), e
					}, x.comparedTo = function(e, t) {
						return m(this, new F(e, t))
					}, x.decimalPlaces = x.dp = function(e, t) {
						var n, r, s, i = this;
						if (null != e) return b(e, 0, p), null == t ? t = O : b(t, 0, 8), z(new F(i), e + i.e + 1, t);
						if (!(n = i.c)) return null;
						if (r = 14 * ((s = n.length - 1) - d(this.e / 14)), s = n[s])
							for (; s % 10 == 0; s /= 10, r--);
						return r < 0 && (r = 0), r
					}, x.dividedBy = x.div = function(e, t) {
						return n(this, new F(e, t), I, O)
					}, x.dividedToIntegerBy = x.idiv = function(e, t) {
						return n(this, new F(e, t), 0, 1)
					}, x.exponentiatedBy = x.pow = function(e, t) {
						var n, r, s, i, o, f, h, l, p = this;
						if ((e = new F(e)).c && !e.isInteger()) throw Error(c + "Exponent not an integer: " + $(e));
						if (null != t && (t = new F(t)), o = e.e > 14, !p.c || !p.c[0] || 1 == p.c[0] && !p.e && 1 == p.c.length ||
							!e.c || !e.c[0]) return l = new F(Math.pow(+$(p), o ? 2 - y(e) : +$(e))), t ? l.mod(t) : l;
						if (f = e.s < 0, t) {
							if (t.c ? !t.c[0] : !t.s) return new F(NaN);
							(r = !f && p.isInteger() && t.isInteger()) && (p = p.mod(t))
						} else {
							if (e.e > 9 && (p.e > 0 || p.e < -1 || (0 == p.e ? p.c[0] > 1 || o && p.c[1] >= 24e7 : p.c[0] < 8e13 || o &&
									p.c[0] <= 9999975e7))) return i = p.s < 0 && y(e) ? -0 : 0, p.e > -1 && (i = 1 / i), new F(f ? 1 / i : i);
							D && (i = a(D / 14 + 2))
						}
						for (o ? (n = new F(.5), f && (e.s = 1), h = y(e)) : h = (s = Math.abs(+$(e))) % 2, l = new F(N);;) {
							if (h) {
								if (!(l = l.times(p)).c) break;
								i ? l.c.length > i && (l.c.length = i) : r && (l = l.mod(t))
							}
							if (s) {
								if (0 === (s = u(s / 2))) break;
								h = s % 2
							} else if (z(e = e.times(n), e.e + 1, 1), e.e > 14) h = y(e);
							else {
								if (0 === (s = +$(e))) break;
								h = s % 2
							}
							p = p.times(p), i ? p.c && p.c.length > i && (p.c.length = i) : r && (p = p.mod(t))
						}
						return r ? l : (f && (l = N.div(l)), t ? l.mod(t) : i ? z(l, D, O, void 0) : l)
					}, x.integerValue = function(e) {
						var t = new F(this);
						return null == e ? e = O : b(e, 0, 8), z(t, t.e + 1, e)
					}, x.isEqualTo = x.eq = function(e, t) {
						return 0 === m(this, new F(e, t))
					}, x.isFinite = function() {
						return !!this.c
					}, x.isGreaterThan = x.gt = function(e, t) {
						return m(this, new F(e, t)) > 0
					}, x.isGreaterThanOrEqualTo = x.gte = function(e, t) {
						return 1 === (t = m(this, new F(e, t))) || 0 === t
					}, x.isInteger = function() {
						return !!this.c && d(this.e / 14) > this.c.length - 2
					}, x.isLessThan = x.lt = function(e, t) {
						return m(this, new F(e, t)) < 0
					}, x.isLessThanOrEqualTo = x.lte = function(e, t) {
						return -1 === (t = m(this, new F(e, t))) || 0 === t
					}, x.isNaN = function() {
						return !this.s
					}, x.isNegative = function() {
						return this.s < 0
					}, x.isPositive = function() {
						return this.s > 0
					}, x.isZero = function() {
						return !!this.c && 0 == this.c[0]
					}, x.minus = function(e, t) {
						var n, r, s, i, o = this,
							a = o.s;
						if (t = (e = new F(e, t)).s, !a || !t) return new F(NaN);
						if (a != t) return e.s = -t, o.plus(e);
						var u = o.e / 14,
							c = e.e / 14,
							f = o.c,
							l = e.c;
						if (!u || !c) {
							if (!f || !l) return f ? (e.s = -t, e) : new F(l ? o : NaN);
							if (!f[0] || !l[0]) return l[0] ? (e.s = -t, e) : new F(f[0] ? o : 3 == O ? -0 : 0)
						}
						if (u = d(u), c = d(c), f = f.slice(), a = u - c) {
							for ((i = a < 0) ? (a = -a, s = f) : (c = u, s = l), s.reverse(), t = a; t--; s.push(0));
							s.reverse()
						} else
							for (r = (i = (a = f.length) < (t = l.length)) ? a : t, a = t = 0; t < r; t++)
								if (f[t] != l[t]) {
									i = f[t] < l[t];
									break
								} if (i && (s = f, f = l, l = s, e.s = -e.s), (t = (r = l.length) - (n = f.length)) > 0)
							for (; t--; f[n++] = 0);
						for (t = h - 1; r > a;) {
							if (f[--r] < l[r]) {
								for (n = r; n && !f[--n]; f[n] = t);
								--f[n], f[r] += h
							}
							f[r] -= l[r]
						}
						for (; 0 == f[0]; f.splice(0, 1), --c);
						return f[0] ? G(e, f, c) : (e.s = 3 == O ? -1 : 1, e.c = [e.e = 0], e)
					}, x.modulo = x.mod = function(e, t) {
						var r, s, i = this;
						return e = new F(e, t), !i.c || !e.s || e.c && !e.c[0] ? new F(NaN) : !e.c || i.c && !i.c[0] ? new F(i) : (
							9 == L ? (s = e.s, e.s = 1, r = n(i, e, 0, 3), e.s = s, r.s *= s) : r = n(i, e, 0, L), (e = i.minus(r.times(
								e))).c[0] || 1 != L || (e.s = i.s), e)
					}, x.multipliedBy = x.times = function(e, t) {
						var n, r, s, i, o, a, u, c, f, l, p, g, m, b, y = this,
							w = y.c,
							k = (e = new F(e, t)).c;
						if (!(w && k && w[0] && k[0])) return !y.s || !e.s || w && !w[0] && !k || k && !k[0] && !w ? e.c = e.e = e.s =
							null : (e.s *= y.s, w && k ? (e.c = [0], e.e = 0) : e.c = e.e = null), e;
						for (r = d(y.e / 14) + d(e.e / 14), e.s *= y.s, (u = w.length) < (l = k.length) && (m = w, w = k, k = m, s =
								u, u = l, l = s), s = u + l, m = []; s--; m.push(0));
						for (b = h, 1e7, s = l; --s >= 0;) {
							for (n = 0, p = k[s] % 1e7, g = k[s] / 1e7 | 0, i = s + (o = u); i > s;) n = ((c = p * (c = w[--o] % 1e7) +
									(a = g * c + (f = w[o] / 1e7 | 0) * p) % 1e7 * 1e7 + m[i] + n) / b | 0) + (a / 1e7 | 0) + g * f, m[i--] =
								c % b;
							m[i] = n
						}
						return n ? ++r : m.splice(0, 1), G(e, m, r)
					}, x.negated = function() {
						var e = new F(this);
						return e.s = -e.s || null, e
					}, x.plus = function(e, t) {
						var n, r = this,
							s = r.s;
						if (t = (e = new F(e, t)).s, !s || !t) return new F(NaN);
						if (s != t) return e.s = -t, r.minus(e);
						var i = r.e / 14,
							o = e.e / 14,
							a = r.c,
							u = e.c;
						if (!i || !o) {
							if (!a || !u) return new F(s / 0);
							if (!a[0] || !u[0]) return u[0] ? e : new F(a[0] ? r : 0 * s)
						}
						if (i = d(i), o = d(o), a = a.slice(), s = i - o) {
							for (s > 0 ? (o = i, n = u) : (s = -s, n = a), n.reverse(); s--; n.push(0));
							n.reverse()
						}
						for ((s = a.length) - (t = u.length) < 0 && (n = u, u = a, a = n, t = s), s = 0; t;) s = (a[--t] = a[t] + u[
							t] + s) / h | 0, a[t] = h === a[t] ? 0 : a[t] % h;
						return s && (a = [s].concat(a), ++o), G(e, a, o)
					}, x.precision = x.sd = function(e, t) {
						var n, r, s, i = this;
						if (null != e && e !== !!e) return b(e, 1, p), null == t ? t = O : b(t, 0, 8), z(new F(i), e, t);
						if (!(n = i.c)) return null;
						if (r = 14 * (s = n.length - 1) + 1, s = n[s]) {
							for (; s % 10 == 0; s /= 10, r--);
							for (s = n[0]; s >= 10; s /= 10, r++);
						}
						return e && i.e + 1 > r && (r = i.e + 1), r
					}, x.shiftedBy = function(e) {
						return b(e, -9007199254740991, 9007199254740991), this.times("1e" + e)
					}, x.squareRoot = x.sqrt = function() {
						var e, t, r, s, i, o = this,
							a = o.c,
							u = o.s,
							c = o.e,
							f = I + 4,
							h = new F("0.5");
						if (1 !== u || !a || !a[0]) return new F(!u || u < 0 && (!a || a[0]) ? NaN : a ? o : 1 / 0);
						if (0 == (u = Math.sqrt(+$(o))) || u == 1 / 0 ? (((t = g(a)).length + c) % 2 == 0 && (t += "0"), u = Math.sqrt(
								+t), c = d((c + 1) / 2) - (c < 0 || c % 2), r = new F(t = u == 1 / 0 ? "1e" + c : (t = u.toExponential())
								.slice(0, t.indexOf("e") + 1) + c)) : r = new F(u + ""), r.c[0])
							for ((u = (c = r.e) + f) < 3 && (u = 0);;)
								if (i = r, r = h.times(i.plus(n(o, i, f, 1))), g(i.c).slice(0, u) === (t = g(r.c)).slice(0, u)) {
									if (r.e < c && --u, "9999" != (t = t.slice(u - 3, u + 1)) && (s || "4999" != t)) {
										+t && (+t.slice(1) || "5" != t.charAt(0)) || (z(r, r.e + I + 2, 1), e = !r.times(r).eq(o));
										break
									}
									if (!s && (z(i, i.e + I + 2, 0), i.times(i).eq(o))) {
										r = i;
										break
									}
									f += 4, u += 4, s = 1
								} return z(r, r.e + I + 1, O, e)
					}, x.toExponential = function(e, t) {
						return null != e && (b(e, 0, p), e++), M(this, e, t, 1)
					}, x.toFixed = function(e, t) {
						return null != e && (b(e, 0, p), e = e + this.e + 1), M(this, e, t)
					}, x.toFormat = function(e, t, n) {
						var r, s = this;
						if (null == n) null != e && t && "object" == typeof t ? (n = t, t = null) : e && "object" == typeof e ? (n =
							e, e = t = null) : n = B;
						else if ("object" != typeof n) throw Error(c + "Argument not an object: " + n);
						if (r = s.toFixed(e, t), s.c) {
							var i, o = r.split("."),
								a = +n.groupSize,
								u = +n.secondaryGroupSize,
								f = n.groupSeparator || "",
								h = o[0],
								l = o[1],
								p = s.s < 0,
								d = p ? h.slice(1) : h,
								g = d.length;
							if (u && (i = a, a = u, u = i, g -= i), a > 0 && g > 0) {
								for (i = g % a || a, h = d.substr(0, i); i < g; i += a) h += f + d.substr(i, a);
								u > 0 && (h += f + d.slice(i)), p && (h = "-" + h)
							}
							r = l ? h + (n.decimalSeparator || "") + ((u = +n.fractionGroupSize) ? l.replace(new RegExp("\\d{" + u +
								"}\\B", "g"), "$&" + (n.fractionGroupSeparator || "")) : l) : h
						}
						return (n.prefix || "") + r + (n.suffix || "")
					}, x.toFraction = function(e) {
						var t, r, s, i, o, a, u, f, h, p, d, m, b = this,
							y = b.c;
						if (null != e && (!(u = new F(e)).isInteger() && (u.c || 1 !== u.s) || u.lt(N))) throw Error(c +
							"Argument " + (u.isInteger() ? "out of range: " : "not an integer: ") + $(u));
						if (!y) return new F(b);
						for (t = new F(N), h = r = new F(N), s = f = new F(N), m = g(y), o = t.e = m.length - b.e - 1, t.c[0] = l[(
								a = o % 14) < 0 ? 14 + a : a], e = !e || u.comparedTo(t) > 0 ? o > 0 ? t : h : u, a = U, U = 1 / 0, u =
							new F(m), f.c[0] = 0; p = n(u, t, 0, 1), 1 != (i = r.plus(p.times(s))).comparedTo(e);) r = s, s = i, h = f
							.plus(p.times(i = h)), f = i, t = u.minus(p.times(i = t)), u = i;
						return i = n(e.minus(r), s, 0, 1), f = f.plus(i.times(h)), r = r.plus(i.times(s)), f.s = h.s = b.s, d = n(h,
							s, o *= 2, O).minus(b).abs().comparedTo(n(f, r, o, O).minus(b).abs()) < 1 ? [h, s] : [f, r], U = a, d
					}, x.toNumber = function() {
						return +$(this)
					}, x.toPrecision = function(e, t) {
						return null != e && b(e, 1, p), M(this, e, t, 2)
					}, x.toString = function(e) {
						var t, n = this,
							s = n.s,
							i = n.e;
						return null === i ? s ? (t = "Infinity", s < 0 && (t = "-" + t)) : t = "NaN" : (null == e ? t = i <= T || i >=
							P ? w(g(n.c), i) : k(g(n.c), i, "0") : 10 === e ? t = k(g((n = z(new F(n), I + i + 1, O)).c), n.e, "0") :
							(b(e, 2, j.length, "Base"), t = r(k(g(n.c), i, "0"), 10, e, s, !0)), s < 0 && n.c[0] && (t = "-" + t)), t
					}, x.valueOf = x.toJSON = function() {
						return $(this)
					}, x._isBigNumber = !0, null != t && F.set(t), F
			}()).default = i.BigNumber = i, void 0 === (r = function() {
				return i
			}.call(t, n, t, e)) || (e.exports = r)
		}()
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(91),
			i = n(92),
			o = n(43),
			a = n(95);
		(t = e.exports).addPrefix = (e, t) => {
			let n;
			if (e instanceof Uint8Array) n = o.varintUint8ArrayEncode(e);
			else {
				if (!i[e]) throw new Error("multicodec not recognized");
				n = i[e]
			}
			return a([n, t], n.length + t.length)
		}, t.rmPrefix = e => (r.decode(e), e.slice(r.decode.bytes)), t.getCodec = e => {
			const t = r.decode(e),
				n = s.get(t);
			if (void 0 === n) throw new Error(`Code ${t} not found`);
			return n
		}, t.getName = e => s.get(e), t.getNumber = e => {
			const t = i[e];
			if (void 0 === t) throw new Error("Codec `" + e + "` not found");
			return r.decode(t)
		}, t.getCode = e => r.decode(e), t.getCodeVarint = e => {
			const t = i[e];
			if (void 0 === t) throw new Error("Codec `" + e + "` not found");
			return t
		}, t.getVarint = e => r.encode(e);
		const u = n(96);
		Object.assign(t, u), t.print = n(97)
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(21),
			i = n(7);
		e.exports = s(class {
			constructor(e, t, n) {
				if (!n) throw new Error("A link requires a cid to point to");
				Object.defineProperties(this, {
					Name: {
						value: e || "",
						writable: !1,
						enumerable: !0
					},
					Tsize: {
						value: t,
						writable: !1,
						enumerable: !0
					},
					Hash: {
						value: new r(n),
						writable: !1,
						enumerable: !0
					},
					_nameBuf: {
						value: null,
						writable: !0,
						enumerable: !1
					}
				})
			}
			toString() {
				return `DAGLink <${this.Hash.toBaseEncodedString()} - name: "${this.Name}", size: ${this.Tsize}>`
			}
			toJSON() {
				return this._json || (this._json = Object.freeze({
					name: this.Name,
					size: this.Tsize,
					cid: this.Hash.toBaseEncodedString()
				})), Object.assign({}, this._json)
			}
			get nameAsBuffer() {
				return null !== this._nameBuf || (this._nameBuf = i(this.Name)), this._nameBuf
			}
		}, {
			className: "DAGLink",
			symbolName: "@ipld/js-ipld-dag-pb/daglink"
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(81),
			s = n(85),
			i = n(86),
			{
				decodeText: o,
				encodeText: a
			} = n(32),
			u = [
				["identity", "\0", () => ({
					encode: o,
					decode: a
				}), ""],
				["base2", "0", i(1), "01"],
				["base8", "7", i(3), "01234567"],
				["base10", "9", r, "0123456789"],
				["base16", "f", i(4), "0123456789abcdef"],
				["base16upper", "F", i(4), "0123456789ABCDEF"],
				["base32hex", "v", i(5), "0123456789abcdefghijklmnopqrstuv"],
				["base32hexupper", "V", i(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"],
				["base32hexpad", "t", i(5), "0123456789abcdefghijklmnopqrstuv="],
				["base32hexpadupper", "T", i(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="],
				["base32", "b", i(5), "abcdefghijklmnopqrstuvwxyz234567"],
				["base32upper", "B", i(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"],
				["base32pad", "c", i(5), "abcdefghijklmnopqrstuvwxyz234567="],
				["base32padupper", "C", i(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="],
				["base32z", "h", i(5), "ybndrfg8ejkmcpqxot1uwisza345h769"],
				["base36", "k", r, "0123456789abcdefghijklmnopqrstuvwxyz"],
				["base36upper", "K", r, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
				["base58btc", "z", r, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"],
				["base58flickr", "Z", r, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"],
				["base64", "m", i(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"],
				["base64pad", "M", i(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="],
				["base64url", "u", i(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"],
				["base64urlpad", "U", i(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]
			],
			c = u.reduce((e, t) => (e[t[0]] = new s(t[0], t[1], t[2], t[3]), e), {}),
			f = u.reduce((e, t) => (e[t[1]] = c[t[0]], e), {});
		e.exports = {
			names: c,
			codes: f
		}
	}, function(e, t, n) {
		"use strict";
		t.TextEncoder = TextEncoder, t.TextDecoder = TextDecoder
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t) {
			t || (t = e.reduce((e, t) => e + t.length, 0));
			const n = new Uint8Array(t);
			let r = 0;
			for (const s of e) n.set(s, r), r += s.length;
			return n
		}
	}, function(e) {
		e.exports = JSON.parse(
			'{"identity":0,"ip4":4,"tcp":6,"sha1":17,"sha2-256":18,"sha2-512":19,"sha3-512":20,"sha3-384":21,"sha3-256":22,"sha3-224":23,"shake-128":24,"shake-256":25,"keccak-224":26,"keccak-256":27,"keccak-384":28,"keccak-512":29,"blake3":30,"dccp":33,"murmur3-128":34,"murmur3-32":35,"ip6":41,"ip6zone":42,"path":47,"multicodec":48,"multihash":49,"multiaddr":50,"multibase":51,"dns":53,"dns4":54,"dns6":55,"dnsaddr":56,"protobuf":80,"cbor":81,"raw":85,"dbl-sha2-256":86,"rlp":96,"bencode":99,"dag-pb":112,"dag-cbor":113,"libp2p-key":114,"git-raw":120,"torrent-info":123,"torrent-file":124,"leofcoin-block":129,"leofcoin-tx":130,"leofcoin-pr":131,"sctp":132,"dag-jose":133,"dag-cose":134,"eth-block":144,"eth-block-list":145,"eth-tx-trie":146,"eth-tx":147,"eth-tx-receipt-trie":148,"eth-tx-receipt":149,"eth-state-trie":150,"eth-account-snapshot":151,"eth-storage-trie":152,"bitcoin-block":176,"bitcoin-tx":177,"bitcoin-witness-commitment":178,"zcash-block":192,"zcash-tx":193,"stellar-block":208,"stellar-tx":209,"md4":212,"md5":213,"bmt":214,"decred-block":224,"decred-tx":225,"ipld-ns":226,"ipfs-ns":227,"swarm-ns":228,"ipns-ns":229,"zeronet":230,"secp256k1-pub":231,"bls12_381-g1-pub":234,"bls12_381-g2-pub":235,"x25519-pub":236,"ed25519-pub":237,"dash-block":240,"dash-tx":241,"swarm-manifest":250,"swarm-feed":251,"udp":273,"p2p-webrtc-star":275,"p2p-webrtc-direct":276,"p2p-stardust":277,"p2p-circuit":290,"dag-json":297,"udt":301,"utp":302,"unix":400,"p2p":421,"ipfs":421,"https":443,"onion":444,"onion3":445,"garlic64":446,"garlic32":447,"tls":448,"quic":460,"ws":477,"wss":478,"p2p-websocket-star":479,"http":480,"json":512,"messagepack":513,"libp2p-peer-record":769,"sha2-256-trunc254-padded":4114,"ripemd-128":4178,"ripemd-160":4179,"ripemd-256":4180,"ripemd-320":4181,"x11":4352,"sm3-256":21325,"blake2b-8":45569,"blake2b-16":45570,"blake2b-24":45571,"blake2b-32":45572,"blake2b-40":45573,"blake2b-48":45574,"blake2b-56":45575,"blake2b-64":45576,"blake2b-72":45577,"blake2b-80":45578,"blake2b-88":45579,"blake2b-96":45580,"blake2b-104":45581,"blake2b-112":45582,"blake2b-120":45583,"blake2b-128":45584,"blake2b-136":45585,"blake2b-144":45586,"blake2b-152":45587,"blake2b-160":45588,"blake2b-168":45589,"blake2b-176":45590,"blake2b-184":45591,"blake2b-192":45592,"blake2b-200":45593,"blake2b-208":45594,"blake2b-216":45595,"blake2b-224":45596,"blake2b-232":45597,"blake2b-240":45598,"blake2b-248":45599,"blake2b-256":45600,"blake2b-264":45601,"blake2b-272":45602,"blake2b-280":45603,"blake2b-288":45604,"blake2b-296":45605,"blake2b-304":45606,"blake2b-312":45607,"blake2b-320":45608,"blake2b-328":45609,"blake2b-336":45610,"blake2b-344":45611,"blake2b-352":45612,"blake2b-360":45613,"blake2b-368":45614,"blake2b-376":45615,"blake2b-384":45616,"blake2b-392":45617,"blake2b-400":45618,"blake2b-408":45619,"blake2b-416":45620,"blake2b-424":45621,"blake2b-432":45622,"blake2b-440":45623,"blake2b-448":45624,"blake2b-456":45625,"blake2b-464":45626,"blake2b-472":45627,"blake2b-480":45628,"blake2b-488":45629,"blake2b-496":45630,"blake2b-504":45631,"blake2b-512":45632,"blake2s-8":45633,"blake2s-16":45634,"blake2s-24":45635,"blake2s-32":45636,"blake2s-40":45637,"blake2s-48":45638,"blake2s-56":45639,"blake2s-64":45640,"blake2s-72":45641,"blake2s-80":45642,"blake2s-88":45643,"blake2s-96":45644,"blake2s-104":45645,"blake2s-112":45646,"blake2s-120":45647,"blake2s-128":45648,"blake2s-136":45649,"blake2s-144":45650,"blake2s-152":45651,"blake2s-160":45652,"blake2s-168":45653,"blake2s-176":45654,"blake2s-184":45655,"blake2s-192":45656,"blake2s-200":45657,"blake2s-208":45658,"blake2s-216":45659,"blake2s-224":45660,"blake2s-232":45661,"blake2s-240":45662,"blake2s-248":45663,"blake2s-256":45664,"skein256-8":45825,"skein256-16":45826,"skein256-24":45827,"skein256-32":45828,"skein256-40":45829,"skein256-48":45830,"skein256-56":45831,"skein256-64":45832,"skein256-72":45833,"skein256-80":45834,"skein256-88":45835,"skein256-96":45836,"skein256-104":45837,"skein256-112":45838,"skein256-120":45839,"skein256-128":45840,"skein256-136":45841,"skein256-144":45842,"skein256-152":45843,"skein256-160":45844,"skein256-168":45845,"skein256-176":45846,"skein256-184":45847,"skein256-192":45848,"skein256-200":45849,"skein256-208":45850,"skein256-216":45851,"skein256-224":45852,"skein256-232":45853,"skein256-240":45854,"skein256-248":45855,"skein256-256":45856,"skein512-8":45857,"skein512-16":45858,"skein512-24":45859,"skein512-32":45860,"skein512-40":45861,"skein512-48":45862,"skein512-56":45863,"skein512-64":45864,"skein512-72":45865,"skein512-80":45866,"skein512-88":45867,"skein512-96":45868,"skein512-104":45869,"skein512-112":45870,"skein512-120":45871,"skein512-128":45872,"skein512-136":45873,"skein512-144":45874,"skein512-152":45875,"skein512-160":45876,"skein512-168":45877,"skein512-176":45878,"skein512-184":45879,"skein512-192":45880,"skein512-200":45881,"skein512-208":45882,"skein512-216":45883,"skein512-224":45884,"skein512-232":45885,"skein512-240":45886,"skein512-248":45887,"skein512-256":45888,"skein512-264":45889,"skein512-272":45890,"skein512-280":45891,"skein512-288":45892,"skein512-296":45893,"skein512-304":45894,"skein512-312":45895,"skein512-320":45896,"skein512-328":45897,"skein512-336":45898,"skein512-344":45899,"skein512-352":45900,"skein512-360":45901,"skein512-368":45902,"skein512-376":45903,"skein512-384":45904,"skein512-392":45905,"skein512-400":45906,"skein512-408":45907,"skein512-416":45908,"skein512-424":45909,"skein512-432":45910,"skein512-440":45911,"skein512-448":45912,"skein512-456":45913,"skein512-464":45914,"skein512-472":45915,"skein512-480":45916,"skein512-488":45917,"skein512-496":45918,"skein512-504":45919,"skein512-512":45920,"skein1024-8":45921,"skein1024-16":45922,"skein1024-24":45923,"skein1024-32":45924,"skein1024-40":45925,"skein1024-48":45926,"skein1024-56":45927,"skein1024-64":45928,"skein1024-72":45929,"skein1024-80":45930,"skein1024-88":45931,"skein1024-96":45932,"skein1024-104":45933,"skein1024-112":45934,"skein1024-120":45935,"skein1024-128":45936,"skein1024-136":45937,"skein1024-144":45938,"skein1024-152":45939,"skein1024-160":45940,"skein1024-168":45941,"skein1024-176":45942,"skein1024-184":45943,"skein1024-192":45944,"skein1024-200":45945,"skein1024-208":45946,"skein1024-216":45947,"skein1024-224":45948,"skein1024-232":45949,"skein1024-240":45950,"skein1024-248":45951,"skein1024-256":45952,"skein1024-264":45953,"skein1024-272":45954,"skein1024-280":45955,"skein1024-288":45956,"skein1024-296":45957,"skein1024-304":45958,"skein1024-312":45959,"skein1024-320":45960,"skein1024-328":45961,"skein1024-336":45962,"skein1024-344":45963,"skein1024-352":45964,"skein1024-360":45965,"skein1024-368":45966,"skein1024-376":45967,"skein1024-384":45968,"skein1024-392":45969,"skein1024-400":45970,"skein1024-408":45971,"skein1024-416":45972,"skein1024-424":45973,"skein1024-432":45974,"skein1024-440":45975,"skein1024-448":45976,"skein1024-456":45977,"skein1024-464":45978,"skein1024-472":45979,"skein1024-480":45980,"skein1024-488":45981,"skein1024-496":45982,"skein1024-504":45983,"skein1024-512":45984,"skein1024-520":45985,"skein1024-528":45986,"skein1024-536":45987,"skein1024-544":45988,"skein1024-552":45989,"skein1024-560":45990,"skein1024-568":45991,"skein1024-576":45992,"skein1024-584":45993,"skein1024-592":45994,"skein1024-600":45995,"skein1024-608":45996,"skein1024-616":45997,"skein1024-624":45998,"skein1024-632":45999,"skein1024-640":46000,"skein1024-648":46001,"skein1024-656":46002,"skein1024-664":46003,"skein1024-672":46004,"skein1024-680":46005,"skein1024-688":46006,"skein1024-696":46007,"skein1024-704":46008,"skein1024-712":46009,"skein1024-720":46010,"skein1024-728":46011,"skein1024-736":46012,"skein1024-744":46013,"skein1024-752":46014,"skein1024-760":46015,"skein1024-768":46016,"skein1024-776":46017,"skein1024-784":46018,"skein1024-792":46019,"skein1024-800":46020,"skein1024-808":46021,"skein1024-816":46022,"skein1024-824":46023,"skein1024-832":46024,"skein1024-840":46025,"skein1024-848":46026,"skein1024-856":46027,"skein1024-864":46028,"skein1024-872":46029,"skein1024-880":46030,"skein1024-888":46031,"skein1024-896":46032,"skein1024-904":46033,"skein1024-912":46034,"skein1024-920":46035,"skein1024-928":46036,"skein1024-936":46037,"skein1024-944":46038,"skein1024-952":46039,"skein1024-960":46040,"skein1024-968":46041,"skein1024-976":46042,"skein1024-984":46043,"skein1024-992":46044,"skein1024-1000":46045,"skein1024-1008":46046,"skein1024-1016":46047,"skein1024-1024":46048,"poseidon-bls12_381-a2-fc1":46081,"poseidon-bls12_381-a2-fc1-sc":46082,"zeroxcert-imprint-256":52753,"fil-commitment-unsealed":61697,"fil-commitment-sealed":61698,"holochain-adr-v0":8417572,"holochain-adr-v1":8483108,"holochain-key-v0":9728292,"holochain-key-v1":9793828,"holochain-sig-v0":10645796,"holochain-sig-v1":10711332}'
		)
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, {
			className: t,
			symbolName: n
		}) {
			const r = Symbol.for(n),
				s = {
					[t]: class extends e {
						constructor(...e) {
							super(...e), Object.defineProperty(this, r, {
								value: !0
							})
						}
						get[Symbol.toStringTag]() {
							return t
						}
					}
				} [t];
			return s["is" + t] = e => !(!e || !e[r]), s
		}, e.exports.proto = function(e, {
			className: t,
			symbolName: n,
			withoutNew: r
		}) {
			const s = Symbol.for(n),
				i = {
					[t]: function(...t) {
						if (r && !(this instanceof i)) return new i(...t);
						const n = e.call(this, ...t) || this;
						return n && !n[s] && Object.defineProperty(n, s, {
							value: !0
						}), n
					}
				} [t];
			return i.prototype = Object.create(e.prototype), i.prototype.constructor = i, Object.defineProperty(i.prototype,
				Symbol.toStringTag, {
					get: () => t
				}), i["is" + t] = e => !(!e || !e[s]), i
		}
	}, function(e, t, n) {
		"use strict";
		t.DAGNode = n(149), t.DAGLink = n(63), t.resolver = n(189), t.util = n(64), t.codec = t.util.codec, t.defaultHashAlg =
			t.util.defaultHashAlg
	}, function(e, t, n) {
		"use strict";
		const {
			Buffer: r
		} = n(12), s = Symbol.for("BufferList");

		function i(e) {
			if (!(this instanceof i)) return new i(e);
			i._init.call(this, e)
		}
		i._init = function(e) {
				Object.defineProperty(this, s, {
					value: !0
				}), this._bufs = [], this.length = 0, e && this.append(e)
			}, i.prototype._new = function(e) {
				return new i(e)
			}, i.prototype._offset = function(e) {
				if (0 === e) return [0, 0];
				let t = 0;
				for (let n = 0; n < this._bufs.length; n++) {
					const r = t + this._bufs[n].length;
					if (e < r || n === this._bufs.length - 1) return [n, e - t];
					t = r
				}
			}, i.prototype._reverseOffset = function(e) {
				const t = e[0];
				let n = e[1];
				for (let r = 0; r < t; r++) n += this._bufs[r].length;
				return n
			}, i.prototype.get = function(e) {
				if (e > this.length || e < 0) return;
				const t = this._offset(e);
				return this._bufs[t[0]][t[1]]
			}, i.prototype.slice = function(e, t) {
				return "number" == typeof e && e < 0 && (e += this.length), "number" == typeof t && t < 0 && (t += this.length),
					this.copy(null, 0, e, t)
			}, i.prototype.copy = function(e, t, n, s) {
				if (("number" != typeof n || n < 0) && (n = 0), ("number" != typeof s || s > this.length) && (s = this.length),
					n >= this.length) return e || r.alloc(0);
				if (s <= 0) return e || r.alloc(0);
				const i = !!e,
					o = this._offset(n),
					a = s - n;
				let u = a,
					c = i && t || 0,
					f = o[1];
				if (0 === n && s === this.length) {
					if (!i) return 1 === this._bufs.length ? this._bufs[0] : r.concat(this._bufs, this.length);
					for (let t = 0; t < this._bufs.length; t++) this._bufs[t].copy(e, c), c += this._bufs[t].length;
					return e
				}
				if (u <= this._bufs[o[0]].length - f) return i ? this._bufs[o[0]].copy(e, t, f, f + u) : this._bufs[o[0]].slice(
					f, f + u);
				i || (e = r.allocUnsafe(a));
				for (let r = o[0]; r < this._bufs.length; r++) {
					const t = this._bufs[r].length - f;
					if (!(u > t)) {
						this._bufs[r].copy(e, c, f, f + u), c += t;
						break
					}
					this._bufs[r].copy(e, c, f), c += t, u -= t, f && (f = 0)
				}
				return e.length > c ? e.slice(0, c) : e
			}, i.prototype.shallowSlice = function(e, t) {
				if (e = e || 0, t = "number" != typeof t ? this.length : t, e < 0 && (e += this.length), t < 0 && (t += this.length),
					e === t) return this._new();
				const n = this._offset(e),
					r = this._offset(t),
					s = this._bufs.slice(n[0], r[0] + 1);
				return 0 === r[1] ? s.pop() : s[s.length - 1] = s[s.length - 1].slice(0, r[1]), 0 !== n[1] && (s[0] = s[0].slice(
					n[1])), this._new(s)
			}, i.prototype.toString = function(e, t, n) {
				return this.slice(t, n).toString(e)
			}, i.prototype.consume = function(e) {
				if (e = Math.trunc(e), Number.isNaN(e) || e <= 0) return this;
				for (; this._bufs.length;) {
					if (!(e >= this._bufs[0].length)) {
						this._bufs[0] = this._bufs[0].slice(e), this.length -= e;
						break
					}
					e -= this._bufs[0].length, this.length -= this._bufs[0].length, this._bufs.shift()
				}
				return this
			}, i.prototype.duplicate = function() {
				const e = this._new();
				for (let t = 0; t < this._bufs.length; t++) e.append(this._bufs[t]);
				return e
			}, i.prototype.append = function(e) {
				if (null == e) return this;
				if (e.buffer) this._appendBuffer(r.from(e.buffer, e.byteOffset, e.byteLength));
				else if (Array.isArray(e))
					for (let t = 0; t < e.length; t++) this.append(e[t]);
				else if (this._isBufferList(e))
					for (let t = 0; t < e._bufs.length; t++) this.append(e._bufs[t]);
				else "number" == typeof e && (e = e.toString()), this._appendBuffer(r.from(e));
				return this
			}, i.prototype._appendBuffer = function(e) {
				this._bufs.push(e), this.length += e.length
			}, i.prototype.indexOf = function(e, t, n) {
				if (void 0 === n && "string" == typeof t && (n = t, t = void 0), "function" == typeof e || Array.isArray(e))
					throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
				if ("number" == typeof e ? e = r.from([e]) : "string" == typeof e ? e = r.from(e, n) : this._isBufferList(e) ?
					e = e.slice() : Array.isArray(e.buffer) ? e = r.from(e.buffer, e.byteOffset, e.byteLength) : r.isBuffer(e) ||
					(e = r.from(e)), t = Number(t || 0), isNaN(t) && (t = 0), t < 0 && (t = this.length + t), t < 0 && (t = 0), 0 ===
					e.length) return t > this.length ? this.length : t;
				const s = this._offset(t);
				let i = s[0],
					o = s[1];
				for (; i < this._bufs.length; i++) {
					const t = this._bufs[i];
					for (; o < t.length;) {
						if (t.length - o >= e.length) {
							const n = t.indexOf(e, o);
							if (-1 !== n) return this._reverseOffset([i, n]);
							o = t.length - e.length + 1
						} else {
							const t = this._reverseOffset([i, o]);
							if (this._match(t, e)) return t;
							o++
						}
					}
					o = 0
				}
				return -1
			}, i.prototype._match = function(e, t) {
				if (this.length - e < t.length) return !1;
				for (let n = 0; n < t.length; n++)
					if (this.get(e + n) !== t[n]) return !1;
				return !0
			},
			function() {
				const e = {
					readDoubleBE: 8,
					readDoubleLE: 8,
					readFloatBE: 4,
					readFloatLE: 4,
					readInt32BE: 4,
					readInt32LE: 4,
					readUInt32BE: 4,
					readUInt32LE: 4,
					readInt16BE: 2,
					readInt16LE: 2,
					readUInt16BE: 2,
					readUInt16LE: 2,
					readInt8: 1,
					readUInt8: 1,
					readIntBE: null,
					readIntLE: null,
					readUIntBE: null,
					readUIntLE: null
				};
				for (const t in e) ! function(t) {
					i.prototype[t] = null === e[t] ? function(e, n) {
						return this.slice(e, e + n)[t](0, n)
					} : function(n) {
						return this.slice(n, n + e[t])[t](0)
					}
				}(t)
			}(), i.prototype._isBufferList = function(e) {
				return e instanceof i || i.isBufferList(e)
			}, i.isBufferList = function(e) {
				return null != e && e[s]
			}, e.exports = i
	}, function(e, t, n) {
		"use strict";
		const r = n(17),
			{
				encodeText: s,
				decodeText: i,
				concat: o
			} = n(32);

		function a(e) {
			if (r.names[e]) return r.names[e];
			if (r.codes[e]) return r.codes[e];
			throw new Error("Unsupported encoding: " + e)
		}(t = e.exports = function(e, t) {
			if (!t) throw new Error("requires an encoded Uint8Array");
			const {
				name: n,
				codeBuf: r
			} = a(e);
			return function(e, t) {
				a(e).decode(i(t))
			}(n, t), o([r, t], r.length + t.length)
		}).encode = function(e, t) {
			const n = a(e),
				r = s(n.encode(t));
			return o([n.codeBuf, r], n.codeBuf.length + r.length)
		}, t.decode = function(e) {
			e instanceof Uint8Array && (e = i(e));
			const t = e[0];
			return ["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(t) && (e = e.toLowerCase()),
				a(e[0]).decode(e.substring(1))
		}, t.isEncoded = function(e) {
			if (e instanceof Uint8Array && (e = i(e)), "[object String]" !== Object.prototype.toString.call(e)) return !1;
			try {
				return a(e[0]).name
			} catch (t) {
				return !1
			}
		}, t.encoding = a, t.encodingFromData = function(e) {
			return e instanceof Uint8Array && (e = i(e)), a(e[0])
		}, t.names = Object.freeze(r.names), t.codes = Object.freeze(r.codes)
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t) {
			if (e === t) return !0;
			if (e.byteLength !== t.byteLength) return !1;
			for (let n = 0; n < e.byteLength; n++)
				if (e[n] !== t[n]) return !1;
			return !0
		}
	}, function(e, t, n) {
		"use strict";
		const {
			URLWithLegacySupport: r,
			format: s,
			URLSearchParams: i,
			defaultBase: o
		} = n(46), a = n(108);
		e.exports = {
			URL: r,
			URLSearchParams: i,
			format: s,
			relative: a,
			defaultBase: o
		}
	}, function(e, t, n) {
		"use strict";
		"object" != typeof globalThis && (Object.defineProperty(Object.prototype, "__magic__", {
			get: function() {
				return this
			},
			configurable: !0
		}), __magic__.globalThis = __magic__, delete Object.prototype.__magic__), e.exports = globalThis
	}, function(e, t, n) {
		"use strict";
		var r, s, i = e.exports = {};

		function o() {
			throw new Error("setTimeout has not been defined")
		}

		function a() {
			throw new Error("clearTimeout has not been defined")
		}

		function u(e) {
			if (r === setTimeout) return setTimeout(e, 0);
			if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
			try {
				return r(e, 0)
			} catch (t) {
				try {
					return r.call(null, e, 0)
				} catch (t) {
					return r.call(this, e, 0)
				}
			}
		}! function() {
			try {
				r = "function" == typeof setTimeout ? setTimeout : o
			} catch (e) {
				r = o
			}
			try {
				s = "function" == typeof clearTimeout ? clearTimeout : a
			} catch (e) {
				s = a
			}
		}();
		var c, f = [],
			h = !1,
			l = -1;

		function p() {
			h && c && (h = !1, c.length ? f = c.concat(f) : l = -1, f.length && d())
		}

		function d() {
			if (!h) {
				var e = u(p);
				h = !0;
				for (var t = f.length; t;) {
					for (c = f, f = []; ++l < t;) c && c[l].run();
					l = -1, t = f.length
				}
				c = null, h = !1,
					function(e) {
						if (s === clearTimeout) return clearTimeout(e);
						if ((s === a || !s) && clearTimeout) return s = clearTimeout, clearTimeout(e);
						try {
							s(e)
						} catch (t) {
							try {
								return s.call(null, e)
							} catch (t) {
								return s.call(this, e)
							}
						}
					}(e)
			}
		}

		function g(e, t) {
			this.fun = e, this.array = t
		}

		function m() {}
		i.nextTick = function(e) {
				var t = new Array(arguments.length - 1);
				if (arguments.length > 1)
					for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
				f.push(new g(e, t)), 1 !== f.length || h || u(d)
			}, g.prototype.run = function() {
				this.fun.apply(null, this.array)
			}, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = m, i.addListener =
			m, i.once = m, i.off = m, i.removeListener = m, i.removeAllListeners = m, i.emit = m, i.prependListener = m, i.prependOnceListener =
			m, i.listeners = function(e) {
				return []
			}, i.binding = function(e) {
				throw new Error("process.binding is not supported")
			}, i.cwd = function() {
				return "/"
			}, i.chdir = function(e) {
				throw new Error("process.chdir is not supported")
			}, i.umask = function() {
				return 0
			}
	}, function(e, t, n) {
		"use strict";

		function r(e, t) {
			for (const n in t) Object.defineProperty(e, n, {
				value: t[n],
				enumerable: !0,
				configurable: !0
			});
			return e
		}
		e.exports = function(e, t, n) {
			if (!e || "string" == typeof e) throw new TypeError("Please pass an Error to err-code");
			n || (n = {}), "object" == typeof t && (n = t, t = void 0), null != t && (n.code = t);
			try {
				return r(e, n)
			} catch (s) {
				n.message = e.message, n.stack = e.stack;
				const t = function() {};
				return t.prototype = Object.create(Object.getPrototypeOf(e)), r(new t, n)
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(14).BigNumber;
		t.MT = {
				POS_INT: 0,
				NEG_INT: 1,
				BYTE_STRING: 2,
				UTF8_STRING: 3,
				ARRAY: 4,
				MAP: 5,
				TAG: 6,
				SIMPLE_FLOAT: 7
			}, t.TAG = {
				DATE_STRING: 0,
				DATE_EPOCH: 1,
				POS_BIGINT: 2,
				NEG_BIGINT: 3,
				DECIMAL_FRAC: 4,
				BIGFLOAT: 5,
				BASE64URL_EXPECTED: 21,
				BASE64_EXPECTED: 22,
				BASE16_EXPECTED: 23,
				CBOR: 24,
				URI: 32,
				BASE64URL: 33,
				BASE64: 34,
				REGEXP: 35,
				MIME: 36
			}, t.NUMBYTES = {
				ZERO: 0,
				ONE: 24,
				TWO: 25,
				FOUR: 26,
				EIGHT: 27,
				INDEFINITE: 31
			}, t.SIMPLE = {
				FALSE: 20,
				TRUE: 21,
				NULL: 22,
				UNDEFINED: 23
			}, t.SYMS = {
				NULL: Symbol("null"),
				UNDEFINED: Symbol("undef"),
				PARENT: Symbol("parent"),
				BREAK: Symbol("break"),
				STREAM: Symbol("stream")
			}, t.SHIFT32 = Math.pow(2, 32), t.SHIFT16 = Math.pow(2, 16), t.MAX_SAFE_HIGH = 2097151, t.NEG_ONE = new r(-1),
			t.TEN = new r(10), t.TWO = new r(2), t.PARENT = {
				ARRAY: 0,
				OBJECT: 1,
				MAP: 2,
				TAG: 3,
				BYTE_STRING: 4,
				UTF8_STRING: 5
			}
	}, function(e, t, n) {
		"use strict";
		var r;
		r = function() {
			return this
		}();
		try {
			r = r || new Function("return this")()
		} catch (s) {
			"object" == typeof window && (r = window)
		}
		e.exports = r
	}, function(e, t, n) {
		"use strict";
		const {
			TextEncoder: r,
			TextDecoder: s
		} = n(18), i = new s, o = new r;
		e.exports = {
			decodeText: e => i.decode(e),
			encodeText: e => o.encode(e),
			concat: function(e, t) {
				const n = new Uint8Array(t);
				let r = 0;
				for (const s of e) n.set(s, r), r += s.length;
				return n
			}
		}
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			if ("number" == typeof e) {
				if (r.codes[e]) return r.codes[e];
				throw new Error("no protocol with code: " + e)
			}
			if ("string" == typeof e || e instanceof String) {
				if (r.names[e]) return r.names[e];
				throw new Error("no protocol with name: " + e)
			}
			throw new Error("invalid protocol id type: " + e)
		}
		const s = -1;

		function i(e, t, n, r, s) {
			return {
				code: e,
				size: t,
				name: n,
				resolvable: Boolean(r),
				path: Boolean(s)
			}
		}
		r.lengthPrefixedVarSize = s, r.V = s, r.table = [
			[4, 32, "ip4"],
			[6, 16, "tcp"],
			[33, 16, "dccp"],
			[41, 128, "ip6"],
			[42, s, "ip6zone"],
			[53, s, "dns", "resolvable"],
			[54, s, "dns4", "resolvable"],
			[55, s, "dns6", "resolvable"],
			[56, s, "dnsaddr", "resolvable"],
			[132, 16, "sctp"],
			[273, 16, "udp"],
			[275, 0, "p2p-webrtc-star"],
			[276, 0, "p2p-webrtc-direct"],
			[277, 0, "p2p-stardust"],
			[290, 0, "p2p-circuit"],
			[301, 0, "udt"],
			[302, 0, "utp"],
			[400, s, "unix", !1, "path"],
			[421, s, "ipfs"],
			[421, s, "p2p"],
			[443, 0, "https"],
			[444, 96, "onion"],
			[445, 296, "onion3"],
			[446, s, "garlic64"],
			[460, 0, "quic"],
			[477, 0, "ws"],
			[478, 0, "wss"],
			[479, 0, "p2p-websocket-star"],
			[480, 0, "http"],
			[777, s, "memory"]
		], r.names = {}, r.codes = {}, r.table.map(e => {
			const t = i.apply(null, e);
			r.codes[t.code] = t, r.names[t.name] = t
		}), r.object = i, e.exports = r
	}, function(e, t, n) {
		"use strict";
		e.exports = e => {
			if (null != e) return "string" == typeof e || e instanceof String ? e : e.toString(8).padStart(4, "0")
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e) {
			if (null != e) {
				if (e instanceof Date) {
					const t = e.getTime(),
						n = Math.floor(t / 1e3);
					return {
						secs: n,
						nsecs: 1e3 * (t - 1e3 * n)
					}
				}
				return Object.prototype.hasOwnProperty.call(e, "secs") ? {
					secs: e.secs,
					nsecs: e.nsecs
				} : Object.prototype.hasOwnProperty.call(e, "Seconds") ? {
					secs: e.Seconds,
					nsecs: e.FractionalNanoseconds
				} : Array.isArray(e) ? {
					secs: e[0],
					nsecs: e[1]
				} : void 0
			}
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = async e => {
			let t;
			for await (const n of e) t = n;
			return t
		}
	}, function(e, t, n) {
		"use strict";
		t.defined = function(e) {
			return null != e && ("number" != typeof e || !isNaN(e))
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(29),
			s = n(13),
			i = n(175),
			o = n(25);
		async function a(e, t, n) {
			const r = await a.digest(e, t, n);
			return s.encode(r, t, n)
		}
		a.multihash = s, a.digest = async (e, t, n) => {
			const r = a.createHash(t),
				s = await r(e);
			return n ? s.slice(0, n) : s
		}, a.createHash = function(e) {
			if (!e) throw r(new Error("hash algorithm must be specified"), "ERR_HASH_ALGORITHM_NOT_SPECIFIED");
			if (e = s.coerceCode(e), !a.functions[e]) throw r(new Error(`multihash function '${e}' not yet supported`),
				"ERR_HASH_ALGORITHM_NOT_SUPPORTED");
			return a.functions[e]
		}, a.functions = {
			0: i.identity,
			17: i.sha1,
			18: i.sha2256,
			19: i.sha2512,
			20: i.sha3512,
			21: i.sha3384,
			22: i.sha3256,
			23: i.sha3224,
			24: i.shake128,
			25: i.shake256,
			26: i.keccak224,
			27: i.keccak256,
			28: i.keccak384,
			29: i.keccak512,
			34: i.murmur3128,
			35: i.murmur332,
			86: i.dblSha2256
		}, i.addBlake(a.functions), a.validate = async (e, t) => {
			const n = await a(e, s.decode(t).name);
			return o(t, n)
		}, e.exports = a
	}, function(e, t, n) {
		"use strict";
		const {
			Buffer: r
		} = n(12), s = n(14).BigNumber, i = n(30), o = i.SHIFT32, a = i.SHIFT16;
		t.parseHalf = function(e) {
			var t, n, r;
			return r = 128 & e[0] ? -1 : 1, t = (124 & e[0]) >> 2, n = (3 & e[0]) << 8 | e[1], t ? 31 === t ? r * (n ? NaN :
				Infinity) : r * Math.pow(2, t - 25) * (1024 + n) : 5.960464477539063e-8 * r * n
		}, t.arrayBufferToBignumber = function(e) {
			const t = e.byteLength;
			let n = "";
			for (let s = 0; s < t; s++) n += (r = e[s]) < 16 ? "0" + r.toString(16) : r.toString(16);
			var r;
			return new s(n, 16)
		}, t.buildMap = e => {
			const t = new Map,
				n = Object.keys(e),
				r = n.length;
			for (let s = 0; s < r; s++) t.set(n[s], e[n[s]]);
			return t
		}, t.buildInt32 = (e, t) => e * a + t, t.buildInt64 = (e, n, r, i) => {
			const a = t.buildInt32(e, n),
				u = t.buildInt32(r, i);
			return a > 2097151 ? new s(a).times(o).plus(u) : a * o + u
		}, t.writeHalf = function(e, t) {
			const n = r.allocUnsafe(4);
			n.writeFloatBE(t, 0);
			const s = n.readUInt32BE(0);
			if (0 != (8191 & s)) return !1;
			var i = s >> 16 & 32768;
			const o = s >> 23 & 255,
				a = 8388607 & s;
			if (o >= 113 && o <= 142) i += (o - 112 << 10) + (a >> 13);
			else {
				if (!(o >= 103 && o < 113)) return !1;
				if (a & (1 << 126 - o) - 1) return !1;
				i += a + 8388608 >> 126 - o
			}
			return e.writeUInt16BE(i, 0), !0
		}, t.keySorter = function(e, t) {
			var n = e[0].byteLength,
				r = t[0].byteLength;
			return n > r ? 1 : r > n ? -1 : e[0].compare(t[0])
		}, t.isNegativeZero = e => 0 === e && 1 / e < 0, t.nextPowerOf2 = e => {
			let t = 0;
			if (e && !(e & e - 1)) return e;
			for (; 0 !== e;) e >>= 1, t += 1;
			return 1 << t
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = {
			SendingQuery: 0,
			PeerResponse: 1,
			FinalPeer: 2,
			QueryError: 3,
			Provider: 4,
			Value: 5,
			AddingPeer: 6,
			DialingPeer: 7
		}
	}, function(e, t, n) {
		"use strict";
		t.findSources = e => {
			let t = {},
				n = [];
			return Array.isArray(e[e.length - 1]) || "object" != typeof e[e.length - 1] || (t = e.pop()), n = 1 === e.length &&
				Array.isArray(e[0]) ? e[0] : e, {
					sources: n,
					options: t
				}
		}
	}, function(e, t, n) {
		"use strict";
		t.read = function(e, t, n, r, s) {
			var i, o, a = 8 * s - r - 1,
				u = (1 << a) - 1,
				c = u >> 1,
				f = -7,
				h = n ? s - 1 : 0,
				l = n ? -1 : 1,
				p = e[t + h];
			for (h += l, i = p & (1 << -f) - 1, p >>= -f, f += a; f > 0; i = 256 * i + e[t + h], h += l, f -= 8);
			for (o = i & (1 << -f) - 1, i >>= -f, f += r; f > 0; o = 256 * o + e[t + h], h += l, f -= 8);
			if (0 === i) i = 1 - c;
			else {
				if (i === u) return o ? NaN : 1 / 0 * (p ? -1 : 1);
				o += Math.pow(2, r), i -= c
			}
			return (p ? -1 : 1) * o * Math.pow(2, i - r)
		}, t.write = function(e, t, n, r, s, i) {
			var o, a, u, c = 8 * i - s - 1,
				f = (1 << c) - 1,
				h = f >> 1,
				l = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
				p = r ? 0 : i - 1,
				d = r ? 1 : -1,
				g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
			for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, o = f) : (o = Math.floor(Math.log(t) /
						Math.LN2), t * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), (t += o + h >= 1 ? l / u : l * Math.pow(2, 1 - h)) *
					u >= 2 && (o++, u /= 2), o + h >= f ? (a = 0, o = f) : o + h >= 1 ? (a = (t * u - 1) * Math.pow(2, s), o +=
						h) : (a = t * Math.pow(2, h - 1) * Math.pow(2, s), o = 0)); s >= 8; e[n + p] = 255 & a, p += d, a /= 256, s -=
				8);
			for (o = o << s | a, c += s; c > 0; e[n + p] = 255 & o, p += d, o /= 256, c -= 8);
			e[n + p - d] |= 128 * g
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(93),
			i = n(94);

		function o(e) {
			return parseInt(s(e, "base16"), 16)
		}
		e.exports = {
			numberToUint8Array: function(e) {
				let t = e.toString(16);
				t.length % 2 == 1 && (t = "0" + t);
				return i(t, "base16")
			},
			uint8ArrayToNumber: o,
			varintUint8ArrayEncode: function(e) {
				return Uint8Array.from(r.encode(o(e)))
			},
			varintEncode: function(e) {
				return Uint8Array.from(r.encode(e))
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(106),
			s = n(45).bind({
				ignoreUndefined: !0
			}),
			{
				URL: i,
				URLSearchParams: o
			} = n(26),
			a = n(109),
			u = n(9),
			c = n(10),
			f = r.Request,
			h = r.Headers;
		class l extends Error {
			constructor() {
				super("Request timed out"), this.name = "TimeoutError"
			}
		}
		class p extends Error {
			constructor(e) {
				super(e.statusText), this.name = "HTTPError", this.response = e
			}
		}
		const d = {
			headers: {},
			throwHttpErrors: !0,
			credentials: "same-origin",
			transformSearchParams: e => e
		};
		class g {
			constructor(e = {}) {
				this.opts = s(d, e)
			}
			async fetch(e, t = {}) {
				const n = s(this.opts, t);
				if (n.headers = new h(n.headers), "string" != typeof e && !(e instanceof i || e instanceof f)) throw new TypeError(
					"`resource` must be a string, URL, or Request");
				if (n.base && "string" == typeof n.base && "string" == typeof e) {
					if (e.startsWith("/")) throw new Error("`resource` must not begin with a slash when using `base`");
					n.base.endsWith("/") || (n.base += "/"), e = n.base + e
				}
				const a = new i(e, n.base);
				n.searchParams && (a.search = n.transformSearchParams(new o(n.searchParams))), void 0 !== n.json && (n.body =
					JSON.stringify(n.json), n.headers.set("content-type", "application/json"));
				const d = new u,
					g = c([d.signal, n.signal]),
					w = await ((e, t, n) => {
						if (void 0 === t) return e;
						const r = Date.now(),
							s = () => Date.now() - r >= t;
						return new Promise((r, i) => {
							const o = setTimeout(() => {
									s() && (i(new l), n.abort())
								}, t),
								a = e => t => {
									clearTimeout(o), s() ? i(new l) : e(t)
								};
							e.then(a(r), a(i))
						})
					})(r(a, { ...n,
						signal: g,
						timeout: void 0
					}), n.timeout, d);
				if (!w.ok && n.throwHttpErrors) throw n.handleError && await n.handleError(w), new p(w);
				return w.iterator = function() {
					const e = b(w.body);
					if (!y(e)) throw new Error("Can't convert fetch body into a Async Iterator:");
					return e
				}, w.ndjson = async function*() {
					for await (const e of m(w.iterator())) t.transform ? yield t.transform(e): yield e
				}, w
			}
			post(e, t = {}) {
				return this.fetch(e, { ...t,
					method: "POST"
				})
			}
			get(e, t = {}) {
				return this.fetch(e, { ...t,
					method: "GET"
				})
			}
			put(e, t = {}) {
				return this.fetch(e, { ...t,
					method: "PUT"
				})
			}
			delete(e, t = {}) {
				return this.fetch(e, { ...t,
					method: "DELETE"
				})
			}
			options(e, t = {}) {
				return this.fetch(e, { ...t,
					method: "OPTIONS"
				})
			}
		}
		const m = async function*(e) {
			const t = new a;
			let n = "";
			for await (const r of e) {
				n += t.decode(r, {
					stream: !0
				});
				const e = n.split(/\r?\n/);
				for (let t = 0; t < e.length - 1; t++) {
					const n = e[t].trim();
					n.length > 0 && (yield JSON.parse(n))
				}
				n = e[e.length - 1]
			}
			n += t.decode(), n = n.trim(), 0 !== n.length && (yield JSON.parse(n))
		}, b = function(e) {
			if (y(e)) {
				if (Object.prototype.hasOwnProperty.call(e, "readable") && Object.prototype.hasOwnProperty.call(e,
						"writable")) {
					const t = e[Symbol.asyncIterator](),
						n = {
							next: t.next.bind(t),
							return: () => (e.destroy(), t.return()),
							[Symbol.asyncIterator]: () => n
						};
					return n
				}
				return e
			}
			const t = e.getReader();
			return {
				next: () => t.read(),
				return: () => (t.releaseLock(), {}),
				[Symbol.asyncIterator]() {
					return this
				}
			}
		}, y = e => "object" == typeof e && null !== e && "function" == typeof e[Symbol.asyncIterator];
		g.HTTPError = p, g.TimeoutError = l, g.streamToAsyncIterator = b, g.post = (e, t) => new g(t).post(e, t), g.get =
			(e, t) => new g(t).get(e, t), g.put = (e, t) => new g(t).put(e, t), g.delete = (e, t) => new g(t).delete(e, t),
			g.options = (e, t) => new g(t).options(e, t), e.exports = g
	}, function(e, t, n) {
		"use strict";
		const r = n(107),
			{
				hasOwnProperty: s
			} = Object.prototype,
			{
				propertyIsEnumerable: i
			} = Object,
			o = (e, t, n) => Object.defineProperty(e, t, {
				value: n,
				writable: !0,
				enumerable: !0,
				configurable: !0
			}),
			a = {
				concatArrays: !1,
				ignoreUndefined: !1
			},
			u = e => {
				const t = [];
				for (const n in e) s.call(e, n) && t.push(n);
				if (Object.getOwnPropertySymbols) {
					const n = Object.getOwnPropertySymbols(e);
					for (const r of n) i.call(e, r) && t.push(r)
				}
				return t
			};

		function c(e) {
			return Array.isArray(e) ? function(e) {
				const t = e.slice(0, 0);
				return u(e).forEach(n => {
					o(t, n, c(e[n]))
				}), t
			}(e) : r(e) ? function(e) {
				const t = null === Object.getPrototypeOf(e) ? Object.create(null) : {};
				return u(e).forEach(n => {
					o(t, n, c(e[n]))
				}), t
			}(e) : e
		}
		const f = (e, t, n, r) => (n.forEach(n => {
			void 0 === t[n] && r.ignoreUndefined || (n in e && e[n] !== Object.getPrototypeOf(e) ? o(e, n, h(e[n], t[n],
				r)) : o(e, n, c(t[n])))
		}), e);

		function h(e, t, n) {
			return n.concatArrays && Array.isArray(e) && Array.isArray(t) ? ((e, t, n) => {
				let r = e.slice(0, 0),
					i = 0;
				return [e, t].forEach(t => {
					const a = [];
					for (let n = 0; n < t.length; n++) s.call(t, n) && (a.push(String(n)), o(r, i++, t === e ? t[n] : c(t[n])));
					r = f(r, t, u(t).filter(e => !a.includes(e)), n)
				}), r
			})(e, t, n) : r(t) && r(e) ? f(e, t, u(t), n) : c(t)
		}
		e.exports = function(...e) {
			const t = h(c(a), void 0 !== this && this || {}, a);
			let n = {
				_: {}
			};
			for (const s of e)
				if (void 0 !== s) {
					if (!r(s)) throw new TypeError("`" + s + "` is not an Option Object");
					n = h(n, {
						_: s
					}, t)
				} return n._
		}
	}, function(e, t, n) {
		"use strict";
		const r = self.location ? self.location.protocol + "//" + self.location.host : "",
			s = self.URL;
		e.exports = {
			URLWithLegacySupport: class {
				constructor(e = "", t = r) {
					this.super = new s(e, t), this.path = this.pathname + this.search, this.auth = this.username && this.password ?
						this.username + ":" + this.password : null, this.query = this.search && this.search.startsWith("?") ?
						this.search.slice(1) : null
				}
				get hash() {
					return this.super.hash
				}
				get host() {
					return this.super.host
				}
				get hostname() {
					return this.super.hostname
				}
				get href() {
					return this.super.href
				}
				get origin() {
					return this.super.origin
				}
				get password() {
					return this.super.password
				}
				get pathname() {
					return this.super.pathname
				}
				get port() {
					return this.super.port
				}
				get protocol() {
					return this.super.protocol
				}
				get search() {
					return this.super.search
				}
				get searchParams() {
					return this.super.searchParams
				}
				get username() {
					return this.super.username
				}
				set hash(e) {
					this.super.hash = e
				}
				set host(e) {
					this.super.host = e
				}
				set hostname(e) {
					this.super.hostname = e
				}
				set href(e) {
					this.super.href = e
				}
				set origin(e) {
					this.super.origin = e
				}
				set password(e) {
					this.super.password = e
				}
				set pathname(e) {
					this.super.pathname = e
				}
				set port(e) {
					this.super.port = e
				}
				set protocol(e) {
					this.super.protocol = e
				}
				set search(e) {
					this.super.search = e
				}
				set searchParams(e) {
					this.super.searchParams = e
				}
				set username(e) {
					this.super.username = e
				}
				createObjectURL(e) {
					return this.super.createObjectURL(e)
				}
				revokeObjectURL(e) {
					this.super.revokeObjectURL(e)
				}
				toJSON() {
					return this.super.toJSON()
				}
				toString() {
					return this.super.toString()
				}
				format() {
					return this.toString()
				}
			},
			URLSearchParams: self.URLSearchParams,
			defaultBase: r,
			format: function(e) {
				if ("string" == typeof e) {
					return new s(e).toString()
				}
				if (!(e instanceof s)) {
					const t = e.username && e.password ? `${e.username}:${e.password}@` : "",
						n = e.auth ? e.auth + "@" : "",
						r = e.port ? ":" + e.port : "",
						s = e.protocol ? e.protocol + "//" : "",
						i = e.host || "",
						o = e.hostname || "",
						a = e.search || (e.query ? "?" + e.query : ""),
						u = e.hash || "",
						c = e.pathname || "";
					return `${s}${t||n}${i||o+r}${e.path||c+a}${u}`
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(3),
			i = n(0),
			o = n(11),
			a = n(1),
			u = n(10),
			c = n(9).default;

		function f({
			name: e,
			hash: t,
			size: n,
			mode: s,
			mtime: i,
			mtimeNsecs: o
		}) {
			const a = {
				path: e,
				cid: new r(t),
				size: parseInt(n)
			};
			return null != s && (a.mode = parseInt(s, 8)), null != i && (a.mtime = {
				secs: i,
				nsecs: o || 0
			}), a
		}
		e.exports = i(e => async function*(t, n = {}) {
			const r = n.progress,
				i = new c,
				h = u([i.signal, n.signal]),
				l = await e.post("add", {
					searchParams: a({
						"stream-channels": !0,
						...n,
						progress: Boolean(r)
					}),
					timeout: n.timeout,
					signal: h,
					...await o(t, i, n.headers)
				});
			for await (let e of l.ndjson()) e = s(e), void 0 !== e.hash ? yield f(e): r && r(e.bytes || 0)
		})
	}, function(e, t, n) {
		"use strict";
		(function(r) {
			t.log = function(...e) {
				return "object" == typeof console && console.log && console.log(...e)
			}, t.formatArgs = function(t) {
				if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ?
						"%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors) return;
				const n = "color: " + this.color;
				t.splice(1, 0, n, "color: inherit");
				let r = 0,
					s = 0;
				t[0].replace(/%[a-zA-Z%]/g, e => {
					"%%" !== e && (r++, "%c" === e && (s = r))
				}), t.splice(s, 0, n)
			}, t.save = function(e) {
				try {
					e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug")
				} catch (n) {}
			}, t.load = function() {
				let e;
				try {
					e = t.storage.getItem("debug")
				} catch (n) {}!e && void 0 !== r && "env" in r && (e = {
					NODE_ENV: "production"
				}.DEBUG);
				return e
			}, t.useColors = function() {
				if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs))
					return !0;
				if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(
						/(edge|trident)\/(\d+)/)) return !1;
				return "undefined" != typeof document && document.documentElement && document.documentElement.style &&
					document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (
						window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator &&
					navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >=
					31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(
						/applewebkit\/(\d+)/)
			}, t.storage = function() {
				try {
					return localStorage
				} catch (e) {}
			}(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF",
				"#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF",
				"#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF",
				"#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF",
				"#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333",
				"#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33",
				"#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399",
				"#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"
			], e.exports = n(117)(t);
			const {
				formatters: s
			} = e.exports;
			s.j = function(e) {
				try {
					return JSON.stringify(e)
				} catch (t) {
					return "[UnexpectedJSONParseError]: " + t.message
				}
			}
		}).call(this, n(28))
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e) {
			const t = e[Symbol.asyncIterator] ? e[Symbol.asyncIterator]() : e[Symbol.iterator](),
				n = [],
				r = {
					peek: () => t.next(),
					push: e => {
						n.push(e)
					},
					next: () => n.length ? {
						done: !1,
						value: n.shift()
					} : t.next()
				};
			return e[Symbol.asyncIterator] ? r[Symbol.asyncIterator] = () => r : r[Symbol.iterator] = () => r, r
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = async function*(e, t = {}) {
			const n = e.getReader();
			try {
				for (;;) {
					const e = await n.read();
					if (e.done) return;
					yield e.value
				}
			} finally {
				!0 !== t.preventCancel && n.cancel(), n.releaseLock()
			}
		}
	}, function(e, t, n) {
		"use strict";
		const {
			Blob: r
		} = n(27);
		e.exports = {
			isBytes: function(e) {
				return ArrayBuffer.isView(e) || e instanceof ArrayBuffer
			},
			isBlob: function(e) {
				return void 0 !== r && e instanceof r
			},
			isFileObject: function(e) {
				return "object" == typeof e && (e.path || e.content)
			}
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = async function*(e, t) {
			for await (const n of e) yield t(n)
		}
	}, function(e, t, n) {
		"use strict";
		const {
			BigNumber: r
		} = n(14), s = n(2), i = n(0), o = n(1);
		e.exports = i(e => async function(t = {}) {
			const n = await e.post("bitswap/stat", {
				searchParams: o(t),
				timeout: t.timeout,
				signal: t.signal,
				headers: t.headers
			});
			return function(e) {
				return {
					provideBufLen: e.ProvideBufLen,
					wantlist: (e.Wantlist || []).map(e => new s(e["/"])),
					peers: e.Peers || [],
					blocksReceived: new r(e.BlocksReceived),
					dataReceived: new r(e.DataReceived),
					blocksSent: new r(e.BlocksSent),
					dataSent: new r(e.DataSent),
					dupBlksReceived: new r(e.DupBlksReceived),
					dupDataReceived: new r(e.DupDataReceived)
				}
			}(await n.json())
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(55),
			s = n(2),
			i = n(0),
			o = n(1);
		e.exports = i(e => async function(t, n = {}) {
			t = new s(t);
			const i = await e.post("block/get", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: o({
					arg: t.toString(),
					...n
				}),
				headers: n.headers
			});
			return new r(new Uint8Array(await i.arrayBuffer()), t)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(21);
		e.exports = class {
			constructor(e, t) {
				if (!(e && e instanceof Uint8Array)) throw new Error("first argument  must be a Uint8Array");
				if (!t || !r.isCID(t)) throw new Error("second argument must be a CID");
				this._data = e, this._cid = t
			}
			get data() {
				return this._data
			}
			set data(e) {
				throw new Error("Tried to change an immutable block")
			}
			get cid() {
				return this._cid
			}
			set cid(e) {
				throw new Error("Tried to change an immutable block")
			}
			static isBlock(e) {}
		}, e.exports = s(e.exports, {
			className: "Block",
			symbolName: "@ipld/js-ipld-block/block"
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(21),
			s = n(57),
			i = n(16),
			{
				serializeDAGNode: o
			} = n(58),
			a = n(174),
			u = n(186),
			c = n(188),
			f = n(7),
			h = n(8);
		e.exports = r(class {
			constructor(e, t = [], n = null) {
				if (e || (e = new Uint8Array(0)), "string" == typeof e && (e = f(e)), !(e instanceof Uint8Array)) throw new Error(
					"Passed 'data' is not a Uint8Array or a String!");
				if (null !== n && "number" != typeof n) throw new Error("Passed 'serializedSize' must be a number!");
				t = t.map(e => i.isDAGLink(e) ? e : i.util.createDagLinkFromB58EncodedHash(e)), s(t), Object.defineProperties(
					this, {
						Data: {
							value: e,
							writable: !1,
							enumerable: !0
						},
						Links: {
							value: t,
							writable: !1,
							enumerable: !0
						},
						_serializedSize: {
							value: n,
							writable: !0,
							enumerable: !1
						},
						_size: {
							value: null,
							writable: !0,
							enumerable: !1
						}
					})
			}
			toJSON() {
				return this._json || (this._json = Object.freeze({
					data: this.Data,
					links: this.Links.map(e => e.toJSON()),
					size: this.size
				})), Object.assign({}, this._json)
			}
			toString() {
				return `DAGNode <data: "${h(this.Data,"base64urlpad")}", links: ${this.Links.length}, size: ${this.size}>`
			}
			_invalidateCached() {
				this._serializedSize = null, this._size = null
			}
			addLink(e) {
				return this._invalidateCached(), u(this, e)
			}
			rmLink(e) {
				return this._invalidateCached(), c(this, e)
			}
			toDAGLink(e) {
				return a(this, e)
			}
			serialize() {
				return o(this)
			}
			get size() {
				return null === this._size && (null === this._serializedSize && (this._serializedSize = this.serialize().length),
					this._size = this.Links.reduce((e, t) => e + t.Tsize, this._serializedSize)), this._size
			}
			set size(e) {
				throw new Error("Can't set property: 'size' is immutable")
			}
		}, {
			className: "DAGNode",
			symbolName: "@ipld/js-ipld-dag-pb/dagnode"
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(150),
			s = n(151),
			i = (e, t) => {
				const n = e.nameAsBuffer,
					r = t.nameAsBuffer;
				return s(n, r)
			};
		e.exports = e => {
			r.inplace(e, i)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(59)(n(60)),
			s = n(16);
		t = e.exports;
		const i = e => {
			const t = e.Data,
				n = e.Links || [];
			return r.PBNode.encode((e => {
				const t = {};
				return e.Data && e.Data.byteLength > 0 ? t.Data = e.Data : t.Data = null, e.Links && e.Links.length > 0 ?
					t.Links = e.Links.map(e => ({
						Hash: e.Hash.bytes,
						Name: e.Name,
						Tsize: e.Tsize
					})) : t.Links = null, t
			})({
				Data: t,
				Links: n
			}))
		};
		t.serializeDAGNode = i, t.serializeDAGNodeLike = (e, t = []) => {
			const n = {
				Data: e
			};
			return n.Links = t.map(e => s.isDAGLink(e) ? e : s.util.createDagLinkFromB58EncodedHash(e)), i(n)
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(152),
			s = n(156);
		e.exports = function(e, t) {
			if (t || (t = {}), !e) throw new Error("Pass in a .proto string or a protobuf-schema parsed object");
			var n = "object" != typeof e || e instanceof Uint8Array ? r.parse(e) : e,
				i = function() {
					var e = this;
					s(n, t.encodings || {}).forEach((function(t) {
						e[t.name] = function(e) {
							if (!e) return null;
							var t = {};
							return Object.keys(e).forEach((function(n) {
								t[n] = e[n].value
							})), t
						}(t.values) || t
					}))
				};
			return i.prototype.toString = function() {
				return r.stringify(n)
			}, i.prototype.toJSON = function() {
				return n
			}, new i
		}
	}, function(e, t, n) {
		"use strict";
		e.exports =
			"// An IPFS MerkleDAG Link\nmessage PBLink {\n\n  // multihash of the target object\n  optional bytes Hash = 1;\n\n  // utf string name. should be unique per object\n  optional string Name = 2;\n\n  // cumulative size of target object\n  optional uint64 Tsize = 3;\n}\n\n// An IPFS MerkleDAG Node\nmessage PBNode {\n\n  // refs to other objects\n  repeated PBLink Links = 2;\n\n  // opaque user data\n  optional bytes Data = 1;\n}"
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(15),
			i = n(38);
		(t = e.exports).codec = s.DAG_PB, t.defaultHashAlg = s.SHA2_256;
		t.cid = async (e, n) => {
			const o = {
					cidVersion: 1,
					hashAlg: t.defaultHashAlg
				},
				a = Object.assign(o, n),
				u = await i(e, a.hashAlg),
				c = s.print[t.codec];
			return new r(a.cidVersion, c, u)
		}
	}, function(e, t, n) {
		"use strict";

		function r(e) {
			return (4294967296 + e).toString(16).substring(1)
		}
		e.exports = {
			normalizeInput: function(e) {
				var t;
				if (e instanceof Uint8Array) t = e;
				else if (e instanceof Buffer) t = new Uint8Array(e);
				else {
					if ("string" != typeof e) throw new Error("Input must be an string, Buffer or Uint8Array");
					t = new Uint8Array(Buffer.from(e, "utf8"))
				}
				return t
			},
			toHex: function(e) {
				return Array.prototype.map.call(e, (function(e) {
					return (e < 16 ? "0" : "") + e.toString(16)
				})).join("")
			},
			debugPrint: function(e, t, n) {
				for (var s = "\n" + e + " = ", i = 0; i < t.length; i += 2) {
					if (32 === n) s += r(t[i]).toUpperCase(), s += " ", s += r(t[i + 1]).toUpperCase();
					else {
						if (64 !== n) throw new Error("Invalid size " + n);
						s += r(t[i + 1]).toUpperCase(), s += r(t[i]).toUpperCase()
					}
					i % 6 == 4 ? s += "\n" + new Array(e.length + 4).join(" ") : i < t.length - 2 && (s += " ")
				}
				console.log(s)
			},
			testSpeed: function(e, t, n) {
				for (var r = (new Date).getTime(), s = new Uint8Array(t), i = 0; i < t; i++) s[i] = i % 256;
				var o = (new Date).getTime();
				for (console.log("Generated random input in " + (o - r) + "ms"), r = o, i = 0; i < n; i++) {
					var a = e(s),
						u = (new Date).getTime(),
						c = u - r;
					r = u, console.log("Hashed in " + c + "ms: " + a.substring(0, 20) + "..."), console.log(Math.round(t / (1 <<
						20) / (c / 1e3) * 100) / 100 + " MB PER SECOND")
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		(e.exports = n(16)).util = n(187)
	}, function(e, t, n) {
		"use strict";
		const r = n(59)(n(60)),
			s = n(16),
			i = n(56),
			{
				serializeDAGNodeLike: o
			} = n(58),
			a = n(61);
		(t = e.exports).codec = a.codec, t.defaultHashAlg = a.defaultHashAlg;
		t.serialize = e => i.isDAGNode(e) ? e.serialize() : o(e.Data, e.Links), t.deserialize = e => {
			const t = r.PBNode.decode(e),
				n = t.Links.map(e => new s(e.Name, e.Tsize, e.Hash)),
				o = null == t.Data ? new Uint8Array(0) : t.Data;
			return new i(o, n, e.byteLength)
		}, t.cid = (e, t) => a.cid(e, t)
	}, function(e, t, n) {
		"use strict";
		t.util = n(66), t.resolver = n(196), t.codec = t.util.codec, t.defaultHashAlg = t.util.defaultHashAlg
	}, function(e, t, n) {
		"use strict";
		const r = n(190),
			s = n(15),
			i = n(38),
			o = n(2),
			a = n(194),
			u = n(19),
			c = n(7);

		function f(e) {
			let t;
			try {
				t = a(e)
			} catch (n) {
				t = !1
			}
			if (t) throw new Error("The object passed has circular references");
			return function e(t) {
				if (!t || t instanceof Uint8Array || "string" == typeof t) return t;
				if (Array.isArray(t)) return t.map(e);
				if (o.isCID(t)) return "string" == typeof(n = t) ? n = new o(n).bytes : o.isCID(n) && (n = n.bytes), new r.Tagged(
					42, u([c("00", "base16"), n], 1 + n.length));
				var n;
				const s = Object.keys(t);
				if (s.length > 0) {
					const n = {};
					return s.forEach(r => {
						"object" == typeof t[r] ? n[r] = e(t[r]) : n[r] = t[r]
					}), n
				}
				return t
			}(e)
		}(t = e.exports).codec = s.DAG_CBOR, t.defaultHashAlg = s.SHA2_256;
		const h = {
			42: e => (e = e.slice(1), new o(e))
		};
		let l = 65536;
		let p = 67108864,
			d = null;
		t.configureDecoder = e => {
			let t = h;
			e ? ("number" == typeof e.size && (l = e.size), "number" == typeof e.maxSize && (p = e.maxSize), e.tags && (t =
				Object.assign({}, h, e && e.tags))) : (l = 65536, p = 67108864);
			const n = {
				tags: t,
				size: l
			};
			d = new r.Decoder(n), l = n.size
		}, t.configureDecoder(), t.serialize = e => {
			const t = f(e);
			return r.encode(t)
		}, t.deserialize = e => {
			if (e.length > l && e.length <= p && t.configureDecoder({
					size: e.length
				}), e.length > l) throw new Error("Data is too large to deserialize with current decoder");
			const n = d.decodeAll(e);
			if (1 !== n.length) throw new Error("Extraneous CBOR data found beyond initial top-level object");
			return n[0]
		}, t.cid = async (e, n) => {
			const r = {
					cidVersion: 1,
					hashAlg: t.defaultHashAlg
				},
				a = Object.assign(r, n),
				u = await i(e, a.hashAlg),
				c = s.print[t.codec];
			return new o(a.cidVersion, c, u)
		}
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			const {
				Buffer: r
			} = n(12), s = n(42), i = n(14).BigNumber, o = n(192), a = n(39), u = n(30), c = n(68), f = n(69), {
				URL: h
			} = n(26);
			class l {
				constructor(e) {
					!(e = e || {}).size || e.size < 65536 ? e.size = 65536 : e.size = a.nextPowerOf2(e.size), this._heap = new ArrayBuffer(
							e.size), this._heap8 = new Uint8Array(this._heap), this._buffer = r.from(this._heap), this._reset(), this
						._knownTags = Object.assign({
							0: e => new Date(e),
							1: e => new Date(1e3 * e),
							2: e => a.arrayBufferToBignumber(e),
							3: e => u.NEG_ONE.minus(a.arrayBufferToBignumber(e)),
							4: e => u.TEN.pow(e[0]).times(e[1]),
							5: e => u.TWO.pow(e[0]).times(e[1]),
							32: e => new h(e),
							35: e => new RegExp(e)
						}, e.tags), this.parser = o(t, {
							log: console.log.bind(console),
							pushInt: this.pushInt.bind(this),
							pushInt32: this.pushInt32.bind(this),
							pushInt32Neg: this.pushInt32Neg.bind(this),
							pushInt64: this.pushInt64.bind(this),
							pushInt64Neg: this.pushInt64Neg.bind(this),
							pushFloat: this.pushFloat.bind(this),
							pushFloatSingle: this.pushFloatSingle.bind(this),
							pushFloatDouble: this.pushFloatDouble.bind(this),
							pushTrue: this.pushTrue.bind(this),
							pushFalse: this.pushFalse.bind(this),
							pushUndefined: this.pushUndefined.bind(this),
							pushNull: this.pushNull.bind(this),
							pushInfinity: this.pushInfinity.bind(this),
							pushInfinityNeg: this.pushInfinityNeg.bind(this),
							pushNaN: this.pushNaN.bind(this),
							pushNaNNeg: this.pushNaNNeg.bind(this),
							pushArrayStart: this.pushArrayStart.bind(this),
							pushArrayStartFixed: this.pushArrayStartFixed.bind(this),
							pushArrayStartFixed32: this.pushArrayStartFixed32.bind(this),
							pushArrayStartFixed64: this.pushArrayStartFixed64.bind(this),
							pushObjectStart: this.pushObjectStart.bind(this),
							pushObjectStartFixed: this.pushObjectStartFixed.bind(this),
							pushObjectStartFixed32: this.pushObjectStartFixed32.bind(this),
							pushObjectStartFixed64: this.pushObjectStartFixed64.bind(this),
							pushByteString: this.pushByteString.bind(this),
							pushByteStringStart: this.pushByteStringStart.bind(this),
							pushUtf8String: this.pushUtf8String.bind(this),
							pushUtf8StringStart: this.pushUtf8StringStart.bind(this),
							pushSimpleUnassigned: this.pushSimpleUnassigned.bind(this),
							pushTagUnassigned: this.pushTagUnassigned.bind(this),
							pushTagStart: this.pushTagStart.bind(this),
							pushTagStart4: this.pushTagStart4.bind(this),
							pushTagStart8: this.pushTagStart8.bind(this),
							pushBreak: this.pushBreak.bind(this)
						}, this._heap)
				}
				get _depth() {
					return this._parents.length
				}
				get _currentParent() {
					return this._parents[this._depth - 1]
				}
				get _ref() {
					return this._currentParent.ref
				}
				_closeParent() {
					var e = this._parents.pop();
					if (e.length > 0) throw new Error(`Missing ${e.length} elements`);
					switch (e.type) {
						case u.PARENT.TAG:
							this._push(this.createTag(e.ref[0], e.ref[1]));
							break;
						case u.PARENT.BYTE_STRING:
							this._push(this.createByteString(e.ref, e.length));
							break;
						case u.PARENT.UTF8_STRING:
							this._push(this.createUtf8String(e.ref, e.length));
							break;
						case u.PARENT.MAP:
							if (e.values % 2 > 0) throw new Error("Odd number of elements in the map");
							this._push(this.createMap(e.ref, e.length));
							break;
						case u.PARENT.OBJECT:
							if (e.values % 2 > 0) throw new Error("Odd number of elements in the map");
							this._push(this.createObject(e.ref, e.length));
							break;
						case u.PARENT.ARRAY:
							this._push(this.createArray(e.ref, e.length))
					}
					this._currentParent && this._currentParent.type === u.PARENT.TAG && this._dec()
				}
				_dec() {
					const e = this._currentParent;
					e.length < 0 || (e.length--, 0 === e.length && this._closeParent())
				}
				_push(e, t) {
					const n = this._currentParent;
					switch (n.values++, n.type) {
						case u.PARENT.ARRAY:
						case u.PARENT.BYTE_STRING:
						case u.PARENT.UTF8_STRING:
							n.length > -1 ? this._ref[this._ref.length - n.length] = e : this._ref.push(e), this._dec();
							break;
						case u.PARENT.OBJECT:
							null != n.tmpKey ? (this._ref[n.tmpKey] = e, n.tmpKey = null, this._dec()) : (n.tmpKey = e, "string" !=
								typeof n.tmpKey && (n.type = u.PARENT.MAP, n.ref = a.buildMap(n.ref)));
							break;
						case u.PARENT.MAP:
							null != n.tmpKey ? (this._ref.set(n.tmpKey, e), n.tmpKey = null, this._dec()) : n.tmpKey = e;
							break;
						case u.PARENT.TAG:
							this._ref.push(e), t || this._dec();
							break;
						default:
							throw new Error("Unknown parent type")
					}
				}
				_createParent(e, t, n) {
					this._parents[this._depth] = {
						type: t,
						length: n,
						ref: e,
						values: 0,
						tmpKey: null
					}
				}
				_reset() {
					this._res = [], this._parents = [{
						type: u.PARENT.ARRAY,
						length: -1,
						ref: this._res,
						values: 0,
						tmpKey: null
					}]
				}
				createTag(e, t) {
					const n = this._knownTags[e];
					return n ? n(t) : new f(e, t)
				}
				createMap(e, t) {
					return e
				}
				createObject(e, t) {
					return e
				}
				createArray(e, t) {
					return e
				}
				createByteString(e, t) {
					return r.concat(e)
				}
				createByteStringFromHeap(e, t) {
					return e === t ? r.alloc(0) : r.from(this._heap.slice(e, t))
				}
				createInt(e) {
					return e
				}
				createInt32(e, t) {
					return a.buildInt32(e, t)
				}
				createInt64(e, t, n, r) {
					return a.buildInt64(e, t, n, r)
				}
				createFloat(e) {
					return e
				}
				createFloatSingle(e, t, n, r) {
					return s.read([e, t, n, r], 0, !1, 23, 4)
				}
				createFloatDouble(e, t, n, r, i, o, a, u) {
					return s.read([e, t, n, r, i, o, a, u], 0, !1, 52, 8)
				}
				createInt32Neg(e, t) {
					return -1 - a.buildInt32(e, t)
				}
				createInt64Neg(e, t, n, r) {
					const s = a.buildInt32(e, t),
						o = a.buildInt32(n, r);
					return s > u.MAX_SAFE_HIGH ? u.NEG_ONE.minus(new i(s).times(u.SHIFT32).plus(o)) : -1 - (s * u.SHIFT32 + o)
				}
				createTrue() {
					return !0
				}
				createFalse() {
					return !1
				}
				createNull() {
					return null
				}
				createUndefined() {}
				createInfinity() {
					return 1 / 0
				}
				createInfinityNeg() {
					return -1 / 0
				}
				createNaN() {
					return NaN
				}
				createNaNNeg() {
					return NaN
				}
				createUtf8String(e, t) {
					return e.join("")
				}
				createUtf8StringFromHeap(e, t) {
					return e === t ? "" : this._buffer.toString("utf8", e, t)
				}
				createSimpleUnassigned(e) {
					return new c(e)
				}
				pushInt(e) {
					this._push(this.createInt(e))
				}
				pushInt32(e, t) {
					this._push(this.createInt32(e, t))
				}
				pushInt64(e, t, n, r) {
					this._push(this.createInt64(e, t, n, r))
				}
				pushFloat(e) {
					this._push(this.createFloat(e))
				}
				pushFloatSingle(e, t, n, r) {
					this._push(this.createFloatSingle(e, t, n, r))
				}
				pushFloatDouble(e, t, n, r, s, i, o, a) {
					this._push(this.createFloatDouble(e, t, n, r, s, i, o, a))
				}
				pushInt32Neg(e, t) {
					this._push(this.createInt32Neg(e, t))
				}
				pushInt64Neg(e, t, n, r) {
					this._push(this.createInt64Neg(e, t, n, r))
				}
				pushTrue() {
					this._push(this.createTrue())
				}
				pushFalse() {
					this._push(this.createFalse())
				}
				pushNull() {
					this._push(this.createNull())
				}
				pushUndefined() {
					this._push(this.createUndefined())
				}
				pushInfinity() {
					this._push(this.createInfinity())
				}
				pushInfinityNeg() {
					this._push(this.createInfinityNeg())
				}
				pushNaN() {
					this._push(this.createNaN())
				}
				pushNaNNeg() {
					this._push(this.createNaNNeg())
				}
				pushArrayStart() {
					this._createParent([], u.PARENT.ARRAY, -1)
				}
				pushArrayStartFixed(e) {
					this._createArrayStartFixed(e)
				}
				pushArrayStartFixed32(e, t) {
					const n = a.buildInt32(e, t);
					this._createArrayStartFixed(n)
				}
				pushArrayStartFixed64(e, t, n, r) {
					const s = a.buildInt64(e, t, n, r);
					this._createArrayStartFixed(s)
				}
				pushObjectStart() {
					this._createObjectStartFixed(-1)
				}
				pushObjectStartFixed(e) {
					this._createObjectStartFixed(e)
				}
				pushObjectStartFixed32(e, t) {
					const n = a.buildInt32(e, t);
					this._createObjectStartFixed(n)
				}
				pushObjectStartFixed64(e, t, n, r) {
					const s = a.buildInt64(e, t, n, r);
					this._createObjectStartFixed(s)
				}
				pushByteStringStart() {
					this._parents[this._depth] = {
						type: u.PARENT.BYTE_STRING,
						length: -1,
						ref: [],
						values: 0,
						tmpKey: null
					}
				}
				pushByteString(e, t) {
					this._push(this.createByteStringFromHeap(e, t))
				}
				pushUtf8StringStart() {
					this._parents[this._depth] = {
						type: u.PARENT.UTF8_STRING,
						length: -1,
						ref: [],
						values: 0,
						tmpKey: null
					}
				}
				pushUtf8String(e, t) {
					this._push(this.createUtf8StringFromHeap(e, t))
				}
				pushSimpleUnassigned(e) {
					this._push(this.createSimpleUnassigned(e))
				}
				pushTagStart(e) {
					this._parents[this._depth] = {
						type: u.PARENT.TAG,
						length: 1,
						ref: [e]
					}
				}
				pushTagStart4(e, t) {
					this.pushTagStart(a.buildInt32(e, t))
				}
				pushTagStart8(e, t, n, r) {
					this.pushTagStart(a.buildInt64(e, t, n, r))
				}
				pushTagUnassigned(e) {
					this._push(this.createTag(e))
				}
				pushBreak() {
					if (this._currentParent.length > -1) throw new Error("Unexpected break");
					this._closeParent()
				}
				_createObjectStartFixed(e) {
					0 !== e ? this._createParent({}, u.PARENT.OBJECT, e) : this._push(this.createObject({}))
				}
				_createArrayStartFixed(e) {
					0 !== e ? this._createParent(new Array(e), u.PARENT.ARRAY, e) : this._push(this.createArray([]))
				}
				_decode(e) {
					if (0 === e.byteLength) throw new Error("Input too short");
					this._reset(), this._heap8.set(e);
					const t = this.parser.parse(e.byteLength);
					if (this._depth > 1) {
						for (; 0 === this._currentParent.length;) this._closeParent();
						if (this._depth > 1) throw new Error("Undeterminated nesting")
					}
					if (t > 0) throw new Error("Failed to parse");
					if (0 === this._res.length) throw new Error("No valid result")
				}
				decodeFirst(e) {
					return this._decode(e), this._res[0]
				}
				decodeAll(e) {
					return this._decode(e), this._res
				}
				static decode(e, t) {
					"string" == typeof e && (e = r.from(e, t || "hex"));
					return new l({
						size: e.length
					}).decodeFirst(e)
				}
				static decodeAll(e, t) {
					"string" == typeof e && (e = r.from(e, t || "hex"));
					return new l({
						size: e.length
					}).decodeAll(e)
				}
			}
			l.decodeFirst = l.decode, e.exports = l
		}).call(this, n(31))
	}, function(e, t, n) {
		"use strict";
		const r = n(30),
			s = r.MT,
			i = r.SIMPLE,
			o = r.SYMS;
		class a {
			constructor(e) {
				if ("number" != typeof e) throw new Error("Invalid Simple type: " + typeof e);
				if (e < 0 || e > 255 || (0 | e) !== e) throw new Error("value must be a small positive integer: " + e);
				this.value = e
			}
			toString() {
				return "simple(" + this.value + ")"
			}
			inspect() {
				return "simple(" + this.value + ")"
			}
			encodeCBOR(e) {
				return e._pushInt(this.value, s.SIMPLE_FLOAT)
			}
			static isSimple(e) {
				return e instanceof a
			}
			static decode(e, t) {
				switch (null == t && (t = !0), e) {
					case i.FALSE:
						return !1;
					case i.TRUE:
						return !0;
					case i.NULL:
						return t ? null : o.NULL;
					case i.UNDEFINED:
						return t ? void 0 : o.UNDEFINED;
					case -1:
						if (!t) throw new Error("Invalid BREAK");
						return o.BREAK;
					default:
						return new a(e)
				}
			}
		}
		e.exports = a
	}, function(e, t, n) {
		"use strict";
		class r {
			constructor(e, t, n) {
				if (this.tag = e, this.value = t, this.err = n, "number" != typeof this.tag) throw new Error(
					"Invalid tag type (" + typeof this.tag + ")");
				if (this.tag < 0 || (0 | this.tag) !== this.tag) throw new Error("Tag must be a positive integer: " + this.tag)
			}
			toString() {
				return `${this.tag}(${JSON.stringify(this.value)})`
			}
			encodeCBOR(e) {
				return e._pushTag(this.tag), e.pushAny(this.value)
			}
			convert(e) {
				var t, n;
				if ("function" != typeof(n = null != e ? e[this.tag] : void 0) && "function" != typeof(n = r["_tag" + this.tag]))
					return this;
				try {
					return n.call(r, this.value)
				} catch (s) {
					return t = s, this.err = t, this
				}
			}
		}
		e.exports = r
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(38),
			i = n(15);
		e.exports = {
			codec: i.RAW,
			defaultHashAlg: i.SHA2_256,
			resolver: {
				resolve: (e, t) => {
					if ("/" !== t) throw new Error("Only the root path / may be resolved");
					return {
						value: e,
						remainderPath: ""
					}
				},
				tree: e => ({
					done: !0
				})
			},
			util: {
				deserialize: e => e,
				serialize: e => e,
				cid: async (t, n) => {
					const o = {
							cidVersion: 1,
							hashAlg: e.exports.defaultHashAlg
						},
						a = Object.assign(o, n),
						u = await s(t, a.hashAlg),
						c = i.print[e.exports.codec];
					return new r(a.cidVersion, c, u)
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			const s = await e.post("dag/resolve", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: i({
						arg: `${t}${n.path?("/"+n.path).replace(/\/[/]+/g,"/"):""}`,
						...n
					}),
					headers: n.headers
				}),
				o = await s.json();
			return {
				cid: new r(o.Cid["/"]),
				remainderPath: o.RemPath
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3);
		e.exports = function(e) {
			const t = r(e);
			return Object.prototype.hasOwnProperty.call(t, "mode") && (t.mode = parseInt(t.mode, 8)), Object.prototype.hasOwnProperty
				.call(t, "mtime") && (t.mtime = {
					secs: t.mtime,
					nsecs: t.mtimeNsecs || 0
				}, delete t.mtimeNsecs), t
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(74),
			o = n(1);
		e.exports = s(e => async function*(t, n = {}) {
			for await (const {
				path: s,
				recursive: a,
				metadata: u
			} of i(t)) {
				const t = await e.post("pin/add", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: o({ ...n,
						arg: s,
						recursive: a,
						metadata: u ? JSON.stringify(u) : void 0,
						stream: !0
					}),
					headers: n.headers
				});
				for await (const e of t.ndjson()) if (e.Pins)
					for (const t of e.Pins) yield new r(t);
				else yield new r(e)
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(29),
			s = n(2);

		function i(e) {
			const t = {
				path: e.cid || e.path,
				recursive: !1 !== e.recursive
			};
			return null != e.metadata && (t.metadata = e.metadata), t
		}
		e.exports = function(e) {
			if (null == e) throw r(new Error("Unexpected input: " + e, "ERR_UNEXPECTED_INPUT"));
			if (s.isCID(e) || e instanceof String || "string" == typeof e) return async function*() {
				yield i({
					cid: e
				})
			}();
			if (null != e.cid || null != e.path) return async function*() {
				yield i(e)
			}();
			if (e[Symbol.iterator]) return async function*() {
				const t = e[Symbol.iterator](),
					n = t.next();
				if (n.done) return t;
				if (s.isCID(n.value) || n.value instanceof String || "string" == typeof n.value) {
					yield i({
						cid: n.value
					});
					for (const e of t) yield i({
						cid: e
					})
				} else {
					if (null == n.value.cid && null == n.value.path) throw r(new Error("Unexpected input: " + typeof e),
						"ERR_UNEXPECTED_INPUT");
					yield i(n.value);
					for (const e of t) yield i(e)
				}
			}();
			if (e[Symbol.asyncIterator]) return async function*() {
				const t = e[Symbol.asyncIterator](),
					n = await t.next();
				if (n.done) return t;
				if (s.isCID(n.value) || n.value instanceof String || "string" == typeof n.value) {
					yield i({
						cid: n.value
					});
					for await (const e of t) yield i({
						cid: e
					})
				} else {
					if (null == n.value.cid && null == n.value.path) throw r(new Error("Unexpected input: " + typeof e),
						"ERR_UNEXPECTED_INPUT");
					yield i(n.value);
					for await (const e of t) yield i(e)
				}
			}();
			throw r(new Error("Unexpected input: " + typeof e), "ERR_UNEXPECTED_INPUT")
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(74),
			o = n(1);
		e.exports = s(e => async function*(t, n = {}) {
			n = n || {};
			for await (const {
				path: s,
				recursive: a
			} of i(t)) {
				const t = new URLSearchParams(n.searchParams);
				t.append("arg", "" + s), null != a && t.set("recursive", a);
				const i = await e.post("pin/rm", {
					timeout: n.timeout,
					signal: n.signal,
					headers: n.headers,
					searchParams: o({ ...n,
						arg: "" + s,
						recursive: a
					})
				});
				for await (const e of i.ndjson()) e.Pins ? yield* e.Pins.map(e => new r(e)): yield new r(e)
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(9).default;
		class s {
			constructor() {
				this._subs = new Map
			}
			static singleton() {
				return s.instance || (s.instance = new s), s.instance
			}
			subscribe(e, t, n) {
				const s = this._subs.get(e) || [];
				if (s.find(e => e.handler === t)) throw new Error(`Already subscribed to ${e} with this handler`);
				const i = new r;
				return this._subs.set(e, [{
					handler: t,
					controller: i
				}].concat(s)), n && n.addEventListener("abort", () => this.unsubscribe(e, t)), i.signal
			}
			unsubscribe(e, t) {
				const n = this._subs.get(e) || [];
				let r;
				t ? (this._subs.set(e, n.filter(e => e.handler !== t)), r = n.filter(e => e.handler === t)) : (this._subs.set(
					e, []), r = n), r.forEach(e => e.controller.abort())
			}
		}
		s.instance = null, e.exports = s
	}, function(e, t, n) {
		"use strict";
		const {
			BigNumber: r
		} = n(14), s = n(0), i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("repo/stat", {
					timeout: t.timeout,
					signal: t.signal,
					searchParams: i(t),
					headers: t.headers
				}),
				s = await n.json();
			return {
				numObjects: new r(s.NumObjects),
				repoSize: new r(s.RepoSize),
				repoPath: s.RepoPath,
				version: s.Version,
				storageMax: new r(s.StorageMax)
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => {
			const n = await e.post("shutdown", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: s(t),
				headers: t.headers
			});
			await n.text()
		})
	}, function(e, t, n) {
		e.exports = n(80)
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(5),
			i = n(24),
			o = n(15),
			a = n(13),
			u = n(104),
			c = n(105);

		function f(e = {}) {
			return {
				add: n(111)(e),
				addAll: n(47)(e),
				bitswap: n(123)(e),
				block: n(127)(e),
				bootstrap: n(131)(e),
				cat: n(137)(e),
				commands: n(138)(e),
				config: n(139)(e),
				dag: n(147)(e),
				dht: n(198)(e),
				diag: n(205)(e),
				dns: n(209)(e),
				files: n(210)(e),
				get: n(223)(e),
				getEndpointConfig: n(234)(e),
				id: n(235)(e),
				key: n(236)(e),
				log: n(242)(e),
				ls: n(246)(e),
				mount: n(247)(e),
				name: n(248)(e),
				object: n(255)(e),
				pin: n(267)(e),
				ping: n(271)(e),
				pubsub: n(272)(e),
				refs: n(278)(e),
				repo: n(280)(e),
				resolve: n(283)(e),
				stats: n(284)(e),
				stop: n(78)(e),
				shutdown: n(78)(e),
				swarm: n(286)(e),
				version: n(292)(e)
			}
		}
		Object.assign(f, {
			CID: r,
			multiaddr: s,
			multibase: i,
			multicodec: o,
			multihash: a,
			globSource: u,
			urlSource: c
		}), e.exports = f
	}, function(e, t, n) {
		"use strict";
		var r = n(82).Buffer;
		e.exports = function(e) {
			if (e.length >= 255) throw new TypeError("Alphabet too long");
			for (var t = new Uint8Array(256), n = 0; n < t.length; n++) t[n] = 255;
			for (var s = 0; s < e.length; s++) {
				var i = e.charAt(s),
					o = i.charCodeAt(0);
				if (255 !== t[o]) throw new TypeError(i + " is ambiguous");
				t[o] = s
			}
			var a = e.length,
				u = e.charAt(0),
				c = Math.log(a) / Math.log(256),
				f = Math.log(256) / Math.log(a);

			function h(e) {
				if ("string" != typeof e) throw new TypeError("Expected String");
				if (0 === e.length) return r.alloc(0);
				var n = 0;
				if (" " !== e[n]) {
					for (var s = 0, i = 0; e[n] === u;) s++, n++;
					for (var o = (e.length - n) * c + 1 >>> 0, f = new Uint8Array(o); e[n];) {
						var h = t[e.charCodeAt(n)];
						if (255 === h) return;
						for (var l = 0, p = o - 1;
							(0 !== h || l < i) && -1 !== p; p--, l++) h += a * f[p] >>> 0, f[p] = h % 256 >>> 0, h = h / 256 >>> 0;
						if (0 !== h) throw new Error("Non-zero carry");
						i = l, n++
					}
					if (" " !== e[n]) {
						for (var d = o - i; d !== o && 0 === f[d];) d++;
						var g = r.allocUnsafe(s + (o - d));
						g.fill(0, 0, s);
						for (var m = s; d !== o;) g[m++] = f[d++];
						return g
					}
				}
			}
			return {
				encode: function(t) {
					if ((Array.isArray(t) || t instanceof Uint8Array) && (t = r.from(t)), !r.isBuffer(t)) throw new TypeError(
						"Expected Buffer");
					if (0 === t.length) return "";
					for (var n = 0, s = 0, i = 0, o = t.length; i !== o && 0 === t[i];) i++, n++;
					for (var c = (o - i) * f + 1 >>> 0, h = new Uint8Array(c); i !== o;) {
						for (var l = t[i], p = 0, d = c - 1;
							(0 !== l || p < s) && -1 !== d; d--, p++) l += 256 * h[d] >>> 0, h[d] = l % a >>> 0, l = l / a >>> 0;
						if (0 !== l) throw new Error("Non-zero carry");
						s = p, i++
					}
					for (var g = c - s; g !== c && 0 === h[g];) g++;
					for (var m = u.repeat(n); g < c; ++g) m += e.charAt(h[g]);
					return m
				},
				decodeUnsafe: h,
				decode: function(e) {
					var t = h(e);
					if (t) return t;
					throw new Error("Non-base" + a + " character")
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(12),
			s = r.Buffer;

		function i(e, t) {
			for (var n in e) t[n] = e[n]
		}

		function o(e, t, n) {
			return s(e, t, n)
		}
		s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow ? e.exports = r : (i(r, t), t.Buffer = o), o.prototype =
			Object.create(s.prototype), i(s, o), o.from = function(e, t, n) {
				if ("number" == typeof e) throw new TypeError("Argument must not be a number");
				return s(e, t, n)
			}, o.alloc = function(e, t, n) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				var r = s(e);
				return void 0 !== t ? "string" == typeof n ? r.fill(t, n) : r.fill(t) : r.fill(0), r
			}, o.allocUnsafe = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return s(e)
			}, o.allocUnsafeSlow = function(e) {
				if ("number" != typeof e) throw new TypeError("Argument must be a number");
				return r.SlowBuffer(e)
			}
	}, function(e, t, n) {
		"use strict";
		t.byteLength = function(e) {
			var t = c(e),
				n = t[0],
				r = t[1];
			return 3 * (n + r) / 4 - r
		}, t.toByteArray = function(e) {
			var t, n, r = c(e),
				o = r[0],
				a = r[1],
				u = new i(function(e, t, n) {
					return 3 * (t + n) / 4 - n
				}(0, o, a)),
				f = 0,
				h = a > 0 ? o - 4 : o;
			for (n = 0; n < h; n += 4) t = s[e.charCodeAt(n)] << 18 | s[e.charCodeAt(n + 1)] << 12 | s[e.charCodeAt(n + 2)] <<
				6 | s[e.charCodeAt(n + 3)], u[f++] = t >> 16 & 255, u[f++] = t >> 8 & 255, u[f++] = 255 & t;
			2 === a && (t = s[e.charCodeAt(n)] << 2 | s[e.charCodeAt(n + 1)] >> 4, u[f++] = 255 & t);
			1 === a && (t = s[e.charCodeAt(n)] << 10 | s[e.charCodeAt(n + 1)] << 4 | s[e.charCodeAt(n + 2)] >> 2, u[f++] =
				t >> 8 & 255, u[f++] = 255 & t);
			return u
		}, t.fromByteArray = function(e) {
			for (var t, n = e.length, s = n % 3, i = [], o = 0, a = n - s; o < a; o += 16383) i.push(f(e, o, o + 16383 > a ?
				a : o + 16383));
			1 === s ? (t = e[n - 1], i.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === s && (t = (e[n - 2] << 8) + e[n -
				1], i.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
			return i.join("")
		};
		for (var r = [], s = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, o =
				"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = o.length; a < u; ++a) r[a] = o[
			a], s[o.charCodeAt(a)] = a;

		function c(e) {
			var t = e.length;
			if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
			var n = e.indexOf("=");
			return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4]
		}

		function f(e, t, n) {
			for (var s, i, o = [], a = t; a < n; a += 3) s = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a +
				2]), o.push(r[(i = s) >> 18 & 63] + r[i >> 12 & 63] + r[i >> 6 & 63] + r[63 & i]);
			return o.join("")
		}
		s["-".charCodeAt(0)] = 62, s["_".charCodeAt(0)] = 63
	}, function(e, t, n) {
		"use strict";
		var r = {}.toString;
		e.exports = Array.isArray || function(e) {
			return "[object Array]" == r.call(e)
		}
	}, function(e, t, n) {
		"use strict";
		const {
			encodeText: r
		} = n(32);
		e.exports = class {
			constructor(e, t, n, s) {
				this.name = e, this.code = t, this.codeBuf = r(this.code), this.alphabet = s, this.engine = n(s)
			}
			encode(e) {
				return this.engine.encode(e)
			}
			decode(e) {
				for (const t of e)
					if (this.alphabet && this.alphabet.indexOf(t) < 0) throw new Error(`invalid character '${t}' in '${e}'`);
				return this.engine.decode(e)
			}
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = e => t => ({
			encode: n => ((e, t, n) => {
				const r = "=" === t[t.length - 1],
					s = (1 << n) - 1;
				let i = "",
					o = 0,
					a = 0;
				for (let u = 0; u < e.length; ++u)
					for (a = a << 8 | e[u], o += 8; o > n;) o -= n, i += t[s & a >> o];
				if (o && (i += t[s & a << n - o]), r)
					for (; i.length * n & 7;) i += "=";
				return i
			})(n, t, e),
			decode: n => ((e, t, n) => {
				const r = {};
				for (let c = 0; c < t.length; ++c) r[t[c]] = c;
				let s = e.length;
				for (;
					"=" === e[s - 1];) --s;
				const i = new Uint8Array(s * n / 8 | 0);
				let o = 0,
					a = 0,
					u = 0;
				for (let c = 0; c < s; ++c) {
					const t = r[e[c]];
					if (void 0 === t) throw new SyntaxError("Invalid character " + e[c]);
					a = a << n | t, o += n, o >= 8 && (o -= 8, i[u++] = 255 & a >> o)
				}
				if (o >= n || 255 & a << 8 - o) throw new SyntaxError("Unexpected end of data");
				return i
			})(n, t, e)
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = function e(t, n, s) {
			n = n || [];
			var i = s = s || 0;
			for (; t >= r;) n[s++] = 255 & t | 128, t /= 128;
			for (; - 128 & t;) n[s++] = 255 & t | 128, t >>>= 7;
			return n[s] = 0 | t, e.bytes = s - i + 1, n
		};
		var r = Math.pow(2, 31)
	}, function(e, t, n) {
		"use strict";
		e.exports = function e(t, n) {
			var r, s = 0,
				i = 0,
				o = n = n || 0,
				a = t.length;
			do {
				if (o >= a) throw e.bytes = 0, new RangeError("Could not decode varint");
				r = t[o++], s += i < 28 ? (127 & r) << i : (127 & r) * Math.pow(2, i), i += 7
			} while (r >= 128);
			return e.bytes = o - n, s
		}
	}, function(e, t, n) {
		"use strict";
		var r = Math.pow(2, 7),
			s = Math.pow(2, 14),
			i = Math.pow(2, 21),
			o = Math.pow(2, 28),
			a = Math.pow(2, 35),
			u = Math.pow(2, 42),
			c = Math.pow(2, 49),
			f = Math.pow(2, 56),
			h = Math.pow(2, 63);
		e.exports = function(e) {
			return e < r ? 1 : e < s ? 2 : e < i ? 3 : e < o ? 4 : e < a ? 5 : e < u ? 6 : e < c ? 7 : e < f ? 8 : e < h ?
				9 : 10
		}
	}, function(e, t, n) {
		"use strict";
		const r = Object.freeze({
			identity: 0,
			sha1: 17,
			"sha2-256": 18,
			"sha2-512": 19,
			"sha3-512": 20,
			"sha3-384": 21,
			"sha3-256": 22,
			"sha3-224": 23,
			"shake-128": 24,
			"shake-256": 25,
			"keccak-224": 26,
			"keccak-256": 27,
			"keccak-384": 28,
			"keccak-512": 29,
			blake3: 30,
			"murmur3-128": 34,
			"murmur3-32": 35,
			"dbl-sha2-256": 86,
			md4: 212,
			md5: 213,
			bmt: 214,
			"sha2-256-trunc254-padded": 4114,
			"ripemd-128": 4178,
			"ripemd-160": 4179,
			"ripemd-256": 4180,
			"ripemd-320": 4181,
			x11: 4352,
			"sm3-256": 21325,
			"blake2b-8": 45569,
			"blake2b-16": 45570,
			"blake2b-24": 45571,
			"blake2b-32": 45572,
			"blake2b-40": 45573,
			"blake2b-48": 45574,
			"blake2b-56": 45575,
			"blake2b-64": 45576,
			"blake2b-72": 45577,
			"blake2b-80": 45578,
			"blake2b-88": 45579,
			"blake2b-96": 45580,
			"blake2b-104": 45581,
			"blake2b-112": 45582,
			"blake2b-120": 45583,
			"blake2b-128": 45584,
			"blake2b-136": 45585,
			"blake2b-144": 45586,
			"blake2b-152": 45587,
			"blake2b-160": 45588,
			"blake2b-168": 45589,
			"blake2b-176": 45590,
			"blake2b-184": 45591,
			"blake2b-192": 45592,
			"blake2b-200": 45593,
			"blake2b-208": 45594,
			"blake2b-216": 45595,
			"blake2b-224": 45596,
			"blake2b-232": 45597,
			"blake2b-240": 45598,
			"blake2b-248": 45599,
			"blake2b-256": 45600,
			"blake2b-264": 45601,
			"blake2b-272": 45602,
			"blake2b-280": 45603,
			"blake2b-288": 45604,
			"blake2b-296": 45605,
			"blake2b-304": 45606,
			"blake2b-312": 45607,
			"blake2b-320": 45608,
			"blake2b-328": 45609,
			"blake2b-336": 45610,
			"blake2b-344": 45611,
			"blake2b-352": 45612,
			"blake2b-360": 45613,
			"blake2b-368": 45614,
			"blake2b-376": 45615,
			"blake2b-384": 45616,
			"blake2b-392": 45617,
			"blake2b-400": 45618,
			"blake2b-408": 45619,
			"blake2b-416": 45620,
			"blake2b-424": 45621,
			"blake2b-432": 45622,
			"blake2b-440": 45623,
			"blake2b-448": 45624,
			"blake2b-456": 45625,
			"blake2b-464": 45626,
			"blake2b-472": 45627,
			"blake2b-480": 45628,
			"blake2b-488": 45629,
			"blake2b-496": 45630,
			"blake2b-504": 45631,
			"blake2b-512": 45632,
			"blake2s-8": 45633,
			"blake2s-16": 45634,
			"blake2s-24": 45635,
			"blake2s-32": 45636,
			"blake2s-40": 45637,
			"blake2s-48": 45638,
			"blake2s-56": 45639,
			"blake2s-64": 45640,
			"blake2s-72": 45641,
			"blake2s-80": 45642,
			"blake2s-88": 45643,
			"blake2s-96": 45644,
			"blake2s-104": 45645,
			"blake2s-112": 45646,
			"blake2s-120": 45647,
			"blake2s-128": 45648,
			"blake2s-136": 45649,
			"blake2s-144": 45650,
			"blake2s-152": 45651,
			"blake2s-160": 45652,
			"blake2s-168": 45653,
			"blake2s-176": 45654,
			"blake2s-184": 45655,
			"blake2s-192": 45656,
			"blake2s-200": 45657,
			"blake2s-208": 45658,
			"blake2s-216": 45659,
			"blake2s-224": 45660,
			"blake2s-232": 45661,
			"blake2s-240": 45662,
			"blake2s-248": 45663,
			"blake2s-256": 45664,
			"skein256-8": 45825,
			"skein256-16": 45826,
			"skein256-24": 45827,
			"skein256-32": 45828,
			"skein256-40": 45829,
			"skein256-48": 45830,
			"skein256-56": 45831,
			"skein256-64": 45832,
			"skein256-72": 45833,
			"skein256-80": 45834,
			"skein256-88": 45835,
			"skein256-96": 45836,
			"skein256-104": 45837,
			"skein256-112": 45838,
			"skein256-120": 45839,
			"skein256-128": 45840,
			"skein256-136": 45841,
			"skein256-144": 45842,
			"skein256-152": 45843,
			"skein256-160": 45844,
			"skein256-168": 45845,
			"skein256-176": 45846,
			"skein256-184": 45847,
			"skein256-192": 45848,
			"skein256-200": 45849,
			"skein256-208": 45850,
			"skein256-216": 45851,
			"skein256-224": 45852,
			"skein256-232": 45853,
			"skein256-240": 45854,
			"skein256-248": 45855,
			"skein256-256": 45856,
			"skein512-8": 45857,
			"skein512-16": 45858,
			"skein512-24": 45859,
			"skein512-32": 45860,
			"skein512-40": 45861,
			"skein512-48": 45862,
			"skein512-56": 45863,
			"skein512-64": 45864,
			"skein512-72": 45865,
			"skein512-80": 45866,
			"skein512-88": 45867,
			"skein512-96": 45868,
			"skein512-104": 45869,
			"skein512-112": 45870,
			"skein512-120": 45871,
			"skein512-128": 45872,
			"skein512-136": 45873,
			"skein512-144": 45874,
			"skein512-152": 45875,
			"skein512-160": 45876,
			"skein512-168": 45877,
			"skein512-176": 45878,
			"skein512-184": 45879,
			"skein512-192": 45880,
			"skein512-200": 45881,
			"skein512-208": 45882,
			"skein512-216": 45883,
			"skein512-224": 45884,
			"skein512-232": 45885,
			"skein512-240": 45886,
			"skein512-248": 45887,
			"skein512-256": 45888,
			"skein512-264": 45889,
			"skein512-272": 45890,
			"skein512-280": 45891,
			"skein512-288": 45892,
			"skein512-296": 45893,
			"skein512-304": 45894,
			"skein512-312": 45895,
			"skein512-320": 45896,
			"skein512-328": 45897,
			"skein512-336": 45898,
			"skein512-344": 45899,
			"skein512-352": 45900,
			"skein512-360": 45901,
			"skein512-368": 45902,
			"skein512-376": 45903,
			"skein512-384": 45904,
			"skein512-392": 45905,
			"skein512-400": 45906,
			"skein512-408": 45907,
			"skein512-416": 45908,
			"skein512-424": 45909,
			"skein512-432": 45910,
			"skein512-440": 45911,
			"skein512-448": 45912,
			"skein512-456": 45913,
			"skein512-464": 45914,
			"skein512-472": 45915,
			"skein512-480": 45916,
			"skein512-488": 45917,
			"skein512-496": 45918,
			"skein512-504": 45919,
			"skein512-512": 45920,
			"skein1024-8": 45921,
			"skein1024-16": 45922,
			"skein1024-24": 45923,
			"skein1024-32": 45924,
			"skein1024-40": 45925,
			"skein1024-48": 45926,
			"skein1024-56": 45927,
			"skein1024-64": 45928,
			"skein1024-72": 45929,
			"skein1024-80": 45930,
			"skein1024-88": 45931,
			"skein1024-96": 45932,
			"skein1024-104": 45933,
			"skein1024-112": 45934,
			"skein1024-120": 45935,
			"skein1024-128": 45936,
			"skein1024-136": 45937,
			"skein1024-144": 45938,
			"skein1024-152": 45939,
			"skein1024-160": 45940,
			"skein1024-168": 45941,
			"skein1024-176": 45942,
			"skein1024-184": 45943,
			"skein1024-192": 45944,
			"skein1024-200": 45945,
			"skein1024-208": 45946,
			"skein1024-216": 45947,
			"skein1024-224": 45948,
			"skein1024-232": 45949,
			"skein1024-240": 45950,
			"skein1024-248": 45951,
			"skein1024-256": 45952,
			"skein1024-264": 45953,
			"skein1024-272": 45954,
			"skein1024-280": 45955,
			"skein1024-288": 45956,
			"skein1024-296": 45957,
			"skein1024-304": 45958,
			"skein1024-312": 45959,
			"skein1024-320": 45960,
			"skein1024-328": 45961,
			"skein1024-336": 45962,
			"skein1024-344": 45963,
			"skein1024-352": 45964,
			"skein1024-360": 45965,
			"skein1024-368": 45966,
			"skein1024-376": 45967,
			"skein1024-384": 45968,
			"skein1024-392": 45969,
			"skein1024-400": 45970,
			"skein1024-408": 45971,
			"skein1024-416": 45972,
			"skein1024-424": 45973,
			"skein1024-432": 45974,
			"skein1024-440": 45975,
			"skein1024-448": 45976,
			"skein1024-456": 45977,
			"skein1024-464": 45978,
			"skein1024-472": 45979,
			"skein1024-480": 45980,
			"skein1024-488": 45981,
			"skein1024-496": 45982,
			"skein1024-504": 45983,
			"skein1024-512": 45984,
			"skein1024-520": 45985,
			"skein1024-528": 45986,
			"skein1024-536": 45987,
			"skein1024-544": 45988,
			"skein1024-552": 45989,
			"skein1024-560": 45990,
			"skein1024-568": 45991,
			"skein1024-576": 45992,
			"skein1024-584": 45993,
			"skein1024-592": 45994,
			"skein1024-600": 45995,
			"skein1024-608": 45996,
			"skein1024-616": 45997,
			"skein1024-624": 45998,
			"skein1024-632": 45999,
			"skein1024-640": 46e3,
			"skein1024-648": 46001,
			"skein1024-656": 46002,
			"skein1024-664": 46003,
			"skein1024-672": 46004,
			"skein1024-680": 46005,
			"skein1024-688": 46006,
			"skein1024-696": 46007,
			"skein1024-704": 46008,
			"skein1024-712": 46009,
			"skein1024-720": 46010,
			"skein1024-728": 46011,
			"skein1024-736": 46012,
			"skein1024-744": 46013,
			"skein1024-752": 46014,
			"skein1024-760": 46015,
			"skein1024-768": 46016,
			"skein1024-776": 46017,
			"skein1024-784": 46018,
			"skein1024-792": 46019,
			"skein1024-800": 46020,
			"skein1024-808": 46021,
			"skein1024-816": 46022,
			"skein1024-824": 46023,
			"skein1024-832": 46024,
			"skein1024-840": 46025,
			"skein1024-848": 46026,
			"skein1024-856": 46027,
			"skein1024-864": 46028,
			"skein1024-872": 46029,
			"skein1024-880": 46030,
			"skein1024-888": 46031,
			"skein1024-896": 46032,
			"skein1024-904": 46033,
			"skein1024-912": 46034,
			"skein1024-920": 46035,
			"skein1024-928": 46036,
			"skein1024-936": 46037,
			"skein1024-944": 46038,
			"skein1024-952": 46039,
			"skein1024-960": 46040,
			"skein1024-968": 46041,
			"skein1024-976": 46042,
			"skein1024-984": 46043,
			"skein1024-992": 46044,
			"skein1024-1000": 46045,
			"skein1024-1008": 46046,
			"skein1024-1016": 46047,
			"skein1024-1024": 46048,
			"poseidon-bls12_381-a2-fc1": 46081,
			"poseidon-bls12_381-a2-fc1-sc": 46082
		});
		e.exports = {
			names: r
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(20),
			s = new Map;
		for (const i in r) {
			const e = r[i];
			s.set(e, i)
		}
		e.exports = Object.freeze(s)
	}, function(e, t, n) {
		"use strict";
		const r = n(20),
			s = n(43).varintEncode,
			i = {};
		for (const o in r) {
			const e = r[o];
			i[o] = s(e)
		}
		e.exports = Object.freeze(i)
	}, function(e, t, n) {
		"use strict";
		const {
			names: r
		} = n(17), {
			TextDecoder: s
		} = n(18), i = new s("utf8");
		e.exports = function(e, t = "utf8") {
			if ("utf8" === t || "utf-8" === t) return i.decode(e);
			const n = r[t];
			if (!n) throw new Error("Unknown base");
			return n.encode(e)
		}
	}, function(e, t, n) {
		"use strict";
		const {
			names: r
		} = n(17), {
			TextEncoder: s
		} = n(18), i = new s;
		e.exports = function(e, t = "utf8") {
			if ("utf8" === t || "utf-8" === t) return i.encode(e);
			const n = r[t];
			if (!n) throw new Error("Unknown base");
			return n.decode(e)
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t) {
			t || (t = e.reduce((e, t) => e + t.length, 0));
			const n = new Uint8Array(t);
			let r = 0;
			for (const s of e) n.set(s, r), r += s.length;
			return n
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(20),
			s = {};
		for (const [i, o] of Object.entries(r)) s[i.toUpperCase().replace(/-/g, "_")] = o;
		e.exports = Object.freeze(s)
	}, function(e, t, n) {
		"use strict";
		const r = n(20),
			s = {};
		for (const [i, o] of Object.entries(r)) void 0 === s[o] && (s[o] = i);
		e.exports = Object.freeze(s)
	}, function(e, t, n) {
		"use strict";
		const r = n(13),
			s = {
				checkCIDComponents: function(e) {
					if (null == e) return "null values are not valid CIDs";
					if (0 !== e.version && 1 !== e.version) return "Invalid version, must be a number equal to 1 or 0";
					if ("string" != typeof e.codec) return "codec must be string";
					if (0 === e.version) {
						if ("dag-pb" !== e.codec) return "codec must be 'dag-pb' for CIDv0";
						if ("base58btc" !== e.multibaseName) return "multibaseName must be 'base58btc' for CIDv0"
					}
					if (!(e.multihash instanceof Uint8Array)) return "multihash must be a Uint8Array";
					try {
						r.validate(e.multihash)
					} catch (t) {
						let e = t.message;
						return e || (e = "Multihash validation failed"), e
					}
				}
			};
		e.exports = s
	}, function(e, t, n) {
		"use strict";
		const r = n(100),
			s = n(33),
			i = n(4),
			o = n(19),
			a = n(8);

		function u(e) {
			const t = [],
				n = e.split("/").slice(1);
			if (1 === n.length && "" === n[0]) return [];
			for (let r = 0; r < n.length; r++) {
				const i = n[r],
					o = s(i);
				if (0 !== o.size) {
					if (r++, r >= n.length) throw w("invalid address: " + e);
					if (o.path) {
						t.push([i, y(n.slice(r).join("/"))]);
						break
					}
					t.push([i, n[r]])
				} else t.push([i])
			}
			return t
		}

		function c(e) {
			const t = [];
			return e.map(e => {
				const n = k(e);
				t.push(n.name), e.length > 1 && t.push(e[1])
			}), y(t.join("/"))
		}

		function f(e) {
			return e.map(e => {
				Array.isArray(e) || (e = [e]);
				const t = k(e);
				return e.length > 1 ? [t.code, r.toBytes(t.code, e[1])] : [t.code]
			})
		}

		function h(e) {
			return e.map(e => {
				const t = k(e);
				return e.length > 1 ? [t.code, r.toString(t.code, e[1])] : [t.code]
			})
		}

		function l(e) {
			return m(o(e.map(e => {
				const t = k(e);
				let n = Uint8Array.from(i.encode(t.code));
				return e.length > 1 && (n = o([n, e[1]])), n
			})))
		}

		function p(e, t) {
			if (e.size > 0) return e.size / 8;
			if (0 === e.size) return 0;
			return i.decode(t) + i.decode.bytes
		}

		function d(e) {
			const t = [];
			let n = 0;
			for (; n < e.length;) {
				const r = i.decode(e, n),
					o = i.decode.bytes,
					u = p(s(r), e.slice(n + o));
				if (0 === u) {
					t.push([r]), n += o;
					continue
				}
				const c = e.slice(n + o, n + o + u);
				if (n += u + o, n > e.length) throw w("Invalid address Uint8Array: " + a(e, "base16"));
				t.push([r, c])
			}
			return t
		}

		function g(e) {
			return l(f(u(e = y(e))))
		}

		function m(e) {
			const t = b(e);
			if (t) throw t;
			return Uint8Array.from(e)
		}

		function b(e) {
			try {
				d(e)
			} catch (t) {
				return t
			}
		}

		function y(e) {
			return "/" + e.trim().split("/").filter(e => e).join("/")
		}

		function w(e) {
			return new Error("Error parsing address: " + e)
		}

		function k(e) {
			return s(e[0])
		}
		e.exports = {
			stringToStringTuples: u,
			stringTuplesToString: c,
			tuplesToStringTuples: h,
			stringTuplesToTuples: f,
			bytesToTuples: d,
			tuplesToBytes: l,
			bytesToString: function(e) {
				const t = d(e);
				return c(h(t))
			},
			stringToBytes: g,
			fromString: function(e) {
				return g(e)
			},
			fromBytes: m,
			validateBytes: b,
			isValidBytes: function(e) {
				return void 0 === b(e)
			},
			cleanPath: y,
			ParseError: w,
			protoFromTuple: k,
			sizeForAddr: p
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(101),
			s = n(33),
			i = n(2),
			o = n(24),
			a = n(4),
			u = n(8),
			c = n(7),
			f = n(19);

		function h(e, t) {
			return t instanceof Uint8Array ? h.toString(e, t) : h.toBytes(e, t)
		}

		function l(e) {
			if (!r.isIP(e)) throw new Error("invalid ip address");
			return r.toBytes(e)
		}

		function p(e) {
			const t = new ArrayBuffer(2);
			return new DataView(t).setUint16(0, e), new Uint8Array(t)
		}

		function d(e) {
			return new DataView(e.buffer).getUint16(0)
		}

		function g(e) {
			const t = e.slice(0, e.length - 2),
				n = e.slice(e.length - 2);
			return u(t, "base32") + ":" + d(n)
		}
		e.exports = h, h.toString = function(e, t) {
			switch ((e = s(e)).code) {
				case 4:
				case 41:
					return function(e) {
						const t = r.toString(e);
						if (!t || !r.isIP(t)) throw new Error("invalid ip address");
						return t
					}(t);
				case 6:
				case 273:
				case 33:
				case 132:
					return d(t);
				case 53:
				case 54:
				case 55:
				case 56:
				case 400:
				case 777:
					return function(e) {
						const t = a.decode(e);
						if ((e = e.slice(a.decode.bytes)).length !== t) throw new Error("inconsistent lengths");
						return u(e)
					}(t);
				case 421:
					return function(e) {
						const t = a.decode(e),
							n = e.slice(a.decode.bytes);
						if (n.length !== t) throw new Error("inconsistent lengths");
						return u(n, "base58btc")
					}(t);
				case 444:
				case 445:
					return g(t);
				default:
					return u(t, "base16")
			}
		}, h.toBytes = function(e, t) {
			switch ((e = s(e)).code) {
				case 4:
				case 41:
					return l(t);
				case 6:
				case 273:
				case 33:
				case 132:
					return p(parseInt(t, 10));
				case 53:
				case 54:
				case 55:
				case 56:
				case 400:
				case 777:
					return function(e) {
						const t = c(e),
							n = Uint8Array.from(a.encode(t.length));
						return f([n, t], n.length + t.length)
					}(t);
				case 421:
					return function(e) {
						const t = new i(e).multihash,
							n = Uint8Array.from(a.encode(t.length));
						return f([n, t], n.length + t.length)
					}(t);
				case 444:
					return function(e) {
						const t = e.split(":");
						if (2 !== t.length) throw new Error("failed to parse onion addr: " + t + " does not contain a port number");
						if (16 !== t[0].length) throw new Error("failed to parse onion addr: " + t[0] +
							" not a Tor onion address.");
						const n = o.decode("b" + t[0]),
							r = parseInt(t[1], 10);
						if (r < 1 || r > 65536) throw new Error("Port number is not in range(1, 65536)");
						const s = p(r);
						return f([n, s], n.length + s.length)
					}(t);
				case 445:
					return function(e) {
						const t = e.split(":");
						if (2 !== t.length) throw new Error("failed to parse onion addr: " + t + " does not contain a port number");
						if (56 !== t[0].length) throw new Error("failed to parse onion addr: " + t[0] +
							" not a Tor onion3 address.");
						const n = o.decode("b" + t[0]),
							r = parseInt(t[1], 10);
						if (r < 1 || r > 65536) throw new Error("Port number is not in range(1, 65536)");
						const s = p(r);
						return f([n, s], n.length + s.length)
					}(t);
				default:
					return c(t, "base16")
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(102),
			s = n(8),
			i = r,
			o = r.v4,
			a = r.v6,
			u = function(e, t, n) {
				var r;
				if (n = ~~n, o(e)) r = t || new Uint8Array(n + 4), e.split(/\./g).map((function(e) {
					r[n++] = 255 & parseInt(e, 10)
				}));
				else if (a(e)) {
					var i, c = e.split(":", 8);
					for (i = 0; i < c.length; i++) {
						var f;
						o(c[i]) && (f = u(c[i]), c[i] = s(f.slice(0, 2), "base16")), f && ++i < 8 && c.splice(i, 0, s(f.slice(2, 4),
							"base16"))
					}
					if ("" === c[0])
						for (; c.length < 8;) c.unshift("0");
					else if ("" === c[c.length - 1])
						for (; c.length < 8;) c.push("0");
					else if (c.length < 8) {
						for (i = 0; i < c.length && "" !== c[i]; i++);
						var h = [i, "1"];
						for (i = 9 - c.length; i > 0; i--) h.push("0");
						c.splice.apply(c, h)
					}
					for (r = t || new Uint8Array(n + 16), i = 0; i < c.length; i++) {
						var l = parseInt(c[i], 16);
						r[n++] = l >> 8 & 255, r[n++] = 255 & l
					}
				}
				if (!r) throw Error("Invalid ip address: " + e);
				return r
			};
		e.exports = {
			isIP: i,
			isV4: o,
			isV6: a,
			toBytes: u,
			toString: function(e, t, n) {
				t = ~~t, n = n || e.length - t;
				var r, s = [];
				const i = new DataView(e.buffer);
				if (4 === n) {
					for (let r = 0; r < n; r++) s.push(e[t + r]);
					r = s.join(".")
				} else if (16 === n) {
					for (let e = 0; e < n; e += 2) s.push(i.getUint16(t + e).toString(16));
					r = (r = (r = s.join(":")).replace(/(^|:)0(:0)*:0(:|$)/, "$1::$3")).replace(/:{3,4}/, "::")
				}
				return r
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(103),
			s = e => r({
				exact: !0
			}).test(e);
		s.v4 = e => r.v4({
			exact: !0
		}).test(e), s.v6 = e => r.v6({
			exact: !0
		}).test(e), s.version = e => s(e) ? s.v4(e) ? 4 : 6 : void 0, e.exports = s
	}, function(e, t, n) {
		"use strict";
		const r = e => e && e.includeBoundaries ? "(?:(?<=\\s|^)(?=[a-fA-F\\d:])|(?<=[a-fA-F\\d:])(?=\\s|$))" : "",
			s = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",
			i = "[a-fA-F\\d]{1,4}",
			o =
			`\n(\n(?:${i}:){7}(?:${i}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:${i}:){6}(?:${s}|:${i}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:${i}:){5}(?::${s}|(:${i}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:${i}:){4}(?:(:${i}){0,1}:${s}|(:${i}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:${i}:){3}(?:(:${i}){0,2}:${s}|(:${i}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:${i}:){2}(?:(:${i}){0,3}:${s}|(:${i}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:${i}:){1}(?:(:${i}){0,4}:${s}|(:${i}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::((?::${i}){0,5}:${s}|(?::${i}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1\n`
			.replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim(),
			a = e => e && e.exact ? new RegExp(`(?:^${s}$)|(?:^${o}$)`) : new RegExp(
				`(?:${r(e)}${s}${r(e)})|(?:${r(e)}${o}${r(e)})`, "g");
		a.v4 = e => e && e.exact ? new RegExp(`^${s}$`) : new RegExp(`${r(e)}${s}${r(e)}`, "g"), a.v6 = e => e && e.exact ?
			new RegExp(`^${o}$`) : new RegExp(`${r(e)}${o}${r(e)}`, "g"), e.exports = a
	}, function(e, t) {}, function(e, t, n) {
		"use strict";
		const r = n(44);
		e.exports = async function*(e, t) {
			const n = new r,
				s = await n.get(e, t);
			yield {
				path: decodeURIComponent(new URL(e).pathname.split("/").pop() || ""),
				content: s.iterator()
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = function() {
			if ("undefined" != typeof self) return self;
			if ("undefined" != typeof window) return window;
			if (void 0 !== r) return r;
			throw new Error("unable to locate global object")
		}();
		e.exports = t = r.fetch, r.fetch && (t.default = r.fetch.bind(r)), t.Headers = r.Headers, t.Request = r.Request,
			t.Response = r.Response
	}, function(e, t, n) {
		"use strict";
		e.exports = e => {
			if ("[object Object]" !== Object.prototype.toString.call(e)) return !1;
			const t = Object.getPrototypeOf(e);
			return null === t || t === Object.prototype
		}
	}, function(e, t, n) {
		"use strict";
		const {
			URLWithLegacySupport: r,
			format: s
		} = n(46);
		e.exports = (e, t = {}, n = {}, i) => {
			let o, a = t.protocol ? t.protocol.replace(":", "") : "http";
			a = (n[a] || i || a) + ":";
			try {
				o = new r(e)
			} catch (c) {
				o = {}
			}
			const u = Object.assign({}, t, {
				protocol: a || o.protocol,
				host: t.host || o.host
			});
			return new r(e, s(u)).toString()
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = n(27).TextDecoder
	}, function(e, t, n) {
		"use strict";
		e.exports = AbortController
	}, function(e, t, n) {
		"use strict";
		const r = n(47),
			s = n(36),
			i = n(0);
		e.exports = e => {
			const t = r(e);
			return i(() => async function(e, n = {}) {
				return s(t(e, n))
			})(e)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(5),
			s = n(113),
			{
				isBrowser: i,
				isWebWorker: o
			} = n(114),
			{
				URL: a
			} = n(26),
			u = n(116).default,
			c = n(48)("ipfs-http-client:lib:error-handler"),
			f = n(44),
			h = n(45),
			l = (e = {}) => {
				(e => {
					try {
						return r(e), !0
					} catch (t) {
						return !1
					}
				})(e) ? e = {
					url: s(e)
				}: "string" == typeof e && (e = {
					url: e
				});
				const t = new a(e.url);
				return e.apiPath ? t.pathname = e.apiPath : "/" !== t.pathname && void 0 !== t.pathname || (t.pathname =
					"api/v0"), e.url || (i || o ? (t.protocol = e.protocol || location.protocol, t.hostname = e.host || location
					.hostname, t.port = e.port || location.port) : (t.hostname = e.host || "localhost", t.port = e.port ||
					"5001", t.protocol = e.protocol || "http")), e.url = t, e
			},
			p = async e => {
				let t;
				try {
					if ((e.headers.get("Content-Type") || "").startsWith("application/json")) {
						const n = await e.json();
						c(n), t = n.Message || n.message
					} else t = await e.text()
				} catch (r) {
					c("Failed to parse error response", r), t = r.message
				}
				let n = new f.HTTPError(e);
				throw t && t.includes("context deadline exceeded") && (n = new f.TimeoutError(e)), t && (n.message = t), n
			}, d = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, g = e => e.replace(d, (function(e) {
				return "-" + e.toLowerCase()
			}));
		class m extends f {
			constructor(e = {}) {
				const t = l(e);
				var n;
				super({
					timeout: (n = t.timeout, ("string" == typeof n ? u(n) : n) || 12e5),
					headers: t.headers,
					base: l(t.url).toString(),
					handleError: p,
					transformSearchParams: e => {
						const t = new URLSearchParams;
						for (const [n, r] of e) "undefined" !== r && "null" !== r && "signal" !== n && t.append(g(n), r),
							"timeout" !== n || isNaN(r) || t.append(g(n), r);
						return t
					}
				}), delete this.get, delete this.put, delete this.delete, delete this.options;
				const r = this.fetch;
				this.fetch = (e, t = {}) => r.call(this, e, h(t, {
					method: "POST"
				}))
			}
		}
		m.errorHandler = p, e.exports = m
	}, function(e, t, n) {
		"use strict";
		const r = n(5),
			s = (e, t) => t,
			i = {
				ip4: s,
				ip6: (e, t, n, r) => 1 === r.length && "ip6" === r[0].protocol ? t : `[${t}]`,
				tcp: (e, t, n, r, s) => r.some(e => ["http", "https", "ws", "wss"].includes(e.protocol)) ? `${e}:${t}` : ((e,
					t, n, r) => {
					if (r && !1 === r.assumeHttp) return `tcp://${e}:${t}`;
					let s = "tcp",
						i = ":" + t;
					return "tcp" === n[n.length - 1].protocol && (s = "443" === t ? "https" : "http", i = "443" === t || "80" ===
						t ? "" : i), `${s}://${e}${i}`
				})(e, t, r, s),
				udp: (e, t) => `udp://${e}:${t}`,
				dnsaddr: s,
				dns4: s,
				dns6: s,
				ipfs: (e, t) => `${e}/ipfs/${t}`,
				p2p: (e, t) => `${e}/p2p/${t}`,
				http: e => "http://" + e,
				https: e => "https://" + e,
				ws: e => "ws://" + e,
				wss: e => "wss://" + e,
				"p2p-websocket-star": e => e + "/p2p-websocket-star",
				"p2p-webrtc-star": e => e + "/p2p-webrtc-star",
				"p2p-webrtc-direct": e => e + "/p2p-webrtc-direct"
			};
		e.exports = (e, t) => {
			const n = r(e),
				s = e.toString().split("/").slice(1);
			return n.tuples().map(e => ({
				protocol: s.shift(),
				content: e[1] ? s.shift() : null
			})).reduce((e, n, r, s) => {
				const o = i[n.protocol];
				if (!o) throw new Error("Unsupported protocol " + n.protocol);
				return o(e, n.content, r, s, t)
			}, "")
		}
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			const r = n(115),
				s = "object" == typeof window && "object" == typeof document && 9 === document.nodeType,
				i = r(),
				o = s && !i,
				a = i && !s,
				u = i && s,
				c = void 0 !== t && void 0 !== t.release && "node" === t.release.name && !i,
				f = "function" == typeof importScripts && "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope &&
				self instanceof WorkerGlobalScope,
				h = void 0 !== t && void 0 !== {
					NODE_ENV: "production"
				} && !1;
			e.exports = {
				isTest: h,
				isElectron: i,
				isElectronMain: a,
				isElectronRenderer: u,
				isNode: c,
				isBrowser: o,
				isWebWorker: f,
				isEnvWithDom: s
			}
		}).call(this, n(28))
	}, function(e, t, n) {
		"use strict";
		(function(t) {
			e.exports = function() {
				return "undefined" != typeof window && "object" == typeof window.process && "renderer" === window.process.type ||
					(!(void 0 === t || "object" != typeof t.versions || !t.versions.electron) || "object" == typeof navigator &&
						"string" == typeof navigator.userAgent && navigator.userAgent.indexOf("Electron") >= 0)
			}
		}).call(this, n(28))
	}, function(e, t, n) {
		"use strict";
		n.r(t), n.d(t, "default", (function() {
			return s
		}));
		let r = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([a-zµμ]*)/gi;

		function s(e = "", t = "ms") {
			var n = null;
			return (e = e.replace(/(\d),(\d)/g, "$1$2")).replace(r, (function(e, t, r) {
				(r = s[r] || s[r.toLowerCase().replace(/s$/, "")]) && (n = (n || 0) + parseFloat(t, 10) * r)
			})), n && n / s[t]
		}
		s.nanosecond = s.ns = 1e-6, s["µs"] = s["μs"] = s.us = s.microsecond = .001, s.millisecond = s.ms = 1, s.second =
			s.sec = s.s = 1e3 * s.ms, s.minute = s.min = s.m = 60 * s.s, s.hour = s.hr = s.h = 60 * s.m, s.day = s.d = 24 *
			s.h, s.week = s.wk = s.w = 7 * s.d, s.month = s.b = 30.4375 * s.d, s.year = s.yr = s.y = 365.25 * s.d
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e) {
			function t(e) {
				let t = 0;
				for (let n = 0; n < e.length; n++) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
				return r.colors[Math.abs(t) % r.colors.length]
			}

			function r(e) {
				let n;

				function o(...e) {
					if (!o.enabled) return;
					const t = o,
						s = Number(new Date),
						i = s - (n || s);
					t.diff = i, t.prev = n, t.curr = s, n = s, e[0] = r.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
					let a = 0;
					e[0] = e[0].replace(/%([a-zA-Z%])/g, (n, s) => {
						if ("%%" === n) return n;
						a++;
						const i = r.formatters[s];
						if ("function" == typeof i) {
							const r = e[a];
							n = i.call(t, r), e.splice(a, 1), a--
						}
						return n
					}), r.formatArgs.call(t, e);
					(t.log || r.log).apply(t, e)
				}
				return o.namespace = e, o.enabled = r.enabled(e), o.useColors = r.useColors(), o.color = t(e), o.destroy = s,
					o.extend = i, "function" == typeof r.init && r.init(o), r.instances.push(o), o
			}

			function s() {
				const e = r.instances.indexOf(this);
				return -1 !== e && (r.instances.splice(e, 1), !0)
			}

			function i(e, t) {
				const n = r(this.namespace + (void 0 === t ? ":" : t) + e);
				return n.log = this.log, n
			}

			function o(e) {
				return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
			}
			return r.debug = r, r.default = r, r.coerce = function(e) {
				if (e instanceof Error) return e.stack || e.message;
				return e
			}, r.disable = function() {
				const e = [...r.names.map(o), ...r.skips.map(o).map(e => "-" + e)].join(",");
				return r.enable(""), e
			}, r.enable = function(e) {
				let t;
				r.save(e), r.names = [], r.skips = [];
				const n = ("string" == typeof e ? e : "").split(/[\s,]+/),
					s = n.length;
				for (t = 0; t < s; t++) n[t] && ("-" === (e = n[t].replace(/\*/g, ".*?"))[0] ? r.skips.push(new RegExp("^" +
					e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$")));
				for (t = 0; t < r.instances.length; t++) {
					const e = r.instances[t];
					e.enabled = r.enabled(e.namespace)
				}
			}, r.enabled = function(e) {
				if ("*" === e[e.length - 1]) return !0;
				let t, n;
				for (t = 0, n = r.skips.length; t < n; t++)
					if (r.skips[t].test(e)) return !1;
				for (t = 0, n = r.names.length; t < n; t++)
					if (r.names[t].test(e)) return !0;
				return !1
			}, r.humanize = n(118), Object.keys(e).forEach(t => {
				r[t] = e[t]
			}), r.instances = [], r.names = [], r.skips = [], r.formatters = {}, r.selectColor = t, r.enable(r.load()), r
		}
	}, function(e, t, n) {
		"use strict";
		var r = 1e3,
			s = 6e4,
			i = 60 * s,
			o = 24 * i;

		function a(e, t, n, r) {
			var s = t >= 1.5 * n;
			return Math.round(e / n) + " " + r + (s ? "s" : "")
		}
		e.exports = function(e, t) {
			t = t || {};
			var n = typeof e;
			if ("string" === n && e.length > 0) return function(e) {
				if ((e = String(e)).length > 100) return;
				var t =
					/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i
					.exec(e);
				if (!t) return;
				var n = parseFloat(t[1]);
				switch ((t[2] || "ms").toLowerCase()) {
					case "years":
					case "year":
					case "yrs":
					case "yr":
					case "y":
						return 315576e5 * n;
					case "weeks":
					case "week":
					case "w":
						return 6048e5 * n;
					case "days":
					case "day":
					case "d":
						return n * o;
					case "hours":
					case "hour":
					case "hrs":
					case "hr":
					case "h":
						return n * i;
					case "minutes":
					case "minute":
					case "mins":
					case "min":
					case "m":
						return n * s;
					case "seconds":
					case "second":
					case "secs":
					case "sec":
					case "s":
						return n * r;
					case "milliseconds":
					case "millisecond":
					case "msecs":
					case "msec":
					case "ms":
						return n;
					default:
						return
				}
			}(e);
			if ("number" === n && isFinite(e)) return t.long ? function(e) {
				var t = Math.abs(e);
				if (t >= o) return a(e, t, o, "day");
				if (t >= i) return a(e, t, i, "hour");
				if (t >= s) return a(e, t, s, "minute");
				if (t >= r) return a(e, t, r, "second");
				return e + " ms"
			}(e) : function(e) {
				var t = Math.abs(e);
				if (t >= o) return Math.round(e / o) + "d";
				if (t >= i) return Math.round(e / i) + "h";
				if (t >= s) return Math.round(e / s) + "m";
				if (t >= r) return Math.round(e / r) + "s";
				return e + "ms"
			}(e);
			throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(120),
			s = n(122);
		e.exports = e => s(e, r)
	}, function(e, t, n) {
		"use strict";
		const r = n(29),
			{
				Blob: s
			} = n(27),
			i = n(49),
			o = n(50),
			a = n(121),
			{
				isBytes: u,
				isBlob: c
			} = n(51);
		async function f(e) {
			const t = [];
			for await (const n of e) t.push(n);
			return new s(t)
		}
		e.exports = async function(e) {
			if (u(e) || "string" == typeof e || e instanceof String) return new s([e]);
			if (c(e)) return e;
			if ("function" == typeof e.getReader && (e = o(e)), e[Symbol.iterator] || e[Symbol.asyncIterator]) {
				const t = i(e),
					{
						value: n,
						done: r
					} = await t.peek();
				if (r) return f(t);
				if (t.push(n), Number.isInteger(n)) return new s([Uint8Array.from(await a(t))]);
				if (u(n) || "string" == typeof n || n instanceof String) return f(t)
			}
			throw r(new Error("Unexpected input: " + e), "ERR_UNEXPECTED_INPUT")
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = async e => {
			const t = [];
			for await (const n of e) t.push(n);
			return t
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(29),
			s = n(50),
			i = n(49),
			o = n(52),
			{
				isBytes: a,
				isBlob: u,
				isFileObject: c
			} = n(51);
		async function f(e, t) {
			const n = {
				path: e.path || "",
				mode: e.mode,
				mtime: e.mtime
			};
			return e.content ? n.content = await t(e.content) : e.path || (n.content = await t(e)), n
		}
		e.exports = async function*(e, t) {
			if (null == e) throw r(new Error("Unexpected input: " + e), "ERR_UNEXPECTED_INPUT");
			if ("string" == typeof e || e instanceof String) yield f(e, t);
			else if (a(e) || u(e)) yield f(e, t);
			else {
				if ("function" == typeof e.getReader && (e = s(e)), e[Symbol.iterator] || e[Symbol.asyncIterator]) {
					const n = i(e),
						{
							value: r,
							done: s
						} = await n.peek();
					if (s) return void(yield* n);
					if (n.push(r), Number.isInteger(r) || a(r)) return void(yield f(n, t));
					if (c(r) || u(r) || "string" == typeof r || r instanceof String) return void(yield* o(n, e => f(e, t)));
					if (r[Symbol.iterator] || r[Symbol.asyncIterator] || "function" == typeof r.getReader) return void(yield* o(
						n, e => f(e, t)))
				}
				if (!c(e)) throw r(new Error("Unexpected input: " + typeof e), "ERR_UNEXPECTED_INPUT");
				yield f(e, t)
			}
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			wantlist: n(124)(e),
			wantlistForPeer: n(125)(e),
			stat: n(53)(e),
			unwant: n(126)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function(t = {}) {
			return ((await (await e.post("bitswap/wantlist", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i(t),
				headers: t.headers
			})).json()).Keys || []).map(e => new r(e["/"]))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function(t, n = {}) {
			return t = "string" == typeof t ? t : new r(t).toString(), ((await (await e.post("bitswap/wantlist", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({ ...n,
					peer: t
				}),
				headers: n.headers
			})).json()).Keys || []).map(e => new r(e["/"]))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function(t, n = {}) {
			return (await e.post("bitswap/unwant", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: "string" == typeof t ? t : new r(t).toString(),
					...n
				}),
				headers: n.headers
			})).json()
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			get: n(54)(e),
			stat: n(128)(e),
			put: n(129)(e),
			rm: n(130)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			const s = await e.post("block/stat", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: i({
						arg: new r(t).toString(),
						...n
					}),
					headers: n.headers
				}),
				o = await s.json();
			return {
				cid: new r(o.Key),
				size: o.Size
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(55),
			s = n(2),
			i = n(13),
			o = n(11),
			a = n(0),
			u = n(1),
			c = n(10),
			f = n(9).default;
		e.exports = a(e => async function t(n, a = {}) {
			if (r.isBlock(n)) {
				const {
					name: e,
					length: t
				} = i.decode(n.cid.multihash);
				a = { ...a,
					format: n.cid.codec,
					mhtype: e,
					mhlen: t,
					version: n.cid.version
				}, n = n.data
			} else if (a.cid) {
				const e = new s(a.cid),
					{
						name: t,
						length: n
					} = i.decode(e.multihash);
				delete(a = { ...a,
					format: e.codec,
					mhtype: t,
					mhlen: n,
					version: e.version
				}).cid
			}
			const h = new f,
				l = c([h.signal, a.signal]);
			let p;
			try {
				const t = await e.post("block/put", {
					timeout: a.timeout,
					signal: l,
					searchParams: u(a),
					...await o(n, h, a.headers)
				});
				p = await t.json()
			} catch (d) {
				if ("dag-pb" === a.format) return t(n, { ...a,
					format: "protobuf"
				});
				if ("dag-cbor" === a.format) return t(n, { ...a,
					format: "cbor"
				});
				throw d
			}
			return new r(n, new s(p.Key))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);

		function o(e) {
			const t = {
				cid: new r(e.Hash)
			};
			return e.Error && (t.error = new Error(e.Error)), t
		}
		e.exports = s(e => async function*(t, n = {}) {
			Array.isArray(t) || (t = [t]);
			const s = await e.post("block/rm", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: t.map(e => new r(e).toString()),
					"stream-channels": !0,
					...n
				}),
				headers: n.headers
			});
			for await (const e of s.ndjson()) yield o(e)
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			add: n(132)(e),
			clear: n(133)(e),
			rm: n(134)(e),
			reset: n(135)(e),
			list: n(136)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(5),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			t && "object" == typeof t && !r.isMultiaddr(t) && (n = t, t = null);
			return (await e.post("bootstrap/add", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: t,
					...n
				}),
				headers: n.headers
			})).json()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await e.post("bootstrap/rm", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s({ ...t,
				all: !0
			}),
			headers: t.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		const r = n(5),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			t && "object" == typeof t && !r.isMultiaddr(t) && (n = t, t = null);
			return (await e.post("bootstrap/rm", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: t,
					...n
				}),
				headers: n.headers
			})).json()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await e.post("bootstrap/add", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s({ ...t,
				default: !0
			}),
			headers: t.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await e.post("bootstrap/list", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s(t),
			headers: t.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function*(t, n = {}) {
			const s = await e.post("cat", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: "string" == typeof t ? t : new r(t).toString(),
					...n
				}),
				headers: n.headers
			});
			yield* s.iterator()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await e.post("commands", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s(t),
			headers: t.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			getAll: n(140)(e),
			get: n(141)(e),
			set: n(142)(e),
			replace: n(143)(e),
			profiles: n(144)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => {
			const n = await e.post("config/show", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: s({ ...t
				}),
				headers: t.headers
			});
			return await n.json()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t, n = {}) => {
			if (!t) throw new Error("key argument is required");
			const r = await e.post("config", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: s({
					arg: t,
					...n
				}),
				headers: n.headers
			});
			return (await r.json()).Value
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n, s = {}) => {
			if ("string" != typeof t) throw new Error("Invalid key type");
			const o = {
				arg: [t, n],
				...s
			};
			"boolean" == typeof n ? (o.arg[1] = n.toString(), o.bool = !0) : "string" != typeof n && (o.arg[1] = JSON.stringify(
				n), o.json = !0);
			const a = await e.post("config", {
				timeout: s.timeout,
				signal: s.signal,
				searchParams: i(o),
				headers: s.headers
			});
			return r(await a.json())
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(7),
			s = n(11),
			i = n(0),
			o = n(1),
			a = n(10),
			u = n(9).default;
		e.exports = i(e => async (t, n = {}) => {
			const i = new u,
				c = a([i.signal, n.signal]);
			return (await e.post("config/replace", {
				timeout: n.timeout,
				signal: c,
				searchParams: o(n),
				...await s(r(JSON.stringify(t)), i, n.headers)
			})).text()
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			apply: n(145)(e),
			list: n(146)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t, n = {}) => {
			const r = await e.post("config/profile/apply", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: s({
						arg: t,
						...n
					}),
					headers: n.headers
				}),
				i = await r.json();
			return {
				original: i.OldCfg,
				updated: i.NewCfg
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("config/profile/list", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i(t),
				headers: t.headers
			});
			return (await n.json()).map(e => r(e))
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			get: n(148)(e),
			put: n(197)(e),
			resolve: n(71)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(22),
			s = n(65),
			i = n(70),
			o = n(0),
			a = {
				"dag-cbor": s.resolver,
				"dag-pb": r.resolver,
				raw: i.resolver
			};
		e.exports = o((e, t) => {
			const r = n(54)(t),
				s = n(71)(t);
			return async (e, t = {}) => {
				const n = await s(e, t),
					i = await r(n.cid, t),
					o = a[n.cid.codec];
				if (!o) throw Object.assign(new Error(`Missing IPLD format "${n.cid.codec}"`), {
					missingMulticodec: n.cid.codec
				});
				return "raw" !== n.cid.codec || n.remPath || (n.remainderPath = "/"), o.resolve(i.data, n.remainderPath)
			}
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = n(56)
	}, function(e, t, n) {
		"use strict";
		e.exports = function() {
			var e = function(e, n) {
				return t(e.slice(), n)
			};

			function t(e, t) {
				"function" != typeof t && (t = function(e, t) {
					return String(e).localeCompare(t)
				});
				var r = e.length;
				if (r <= 1) return e;
				for (var s = new Array(r), i = 1; i < r; i *= 2) {
					n(e, t, i, s);
					var o = e;
					e = s, s = o
				}
				return e
			}
			e.inplace = function(e, r) {
				var s = t(e, r);
				return s !== e && n(s, null, e.length, e), e
			};
			var n = function(e, t, n, r) {
				var s, i, o, a, u, c = e.length,
					f = 0,
					h = 2 * n;
				for (s = 0; s < c; s += h)
					for (o = (i = s + n) + n, i > c && (i = c), o > c && (o = c), a = s, u = i;;)
						if (a < i && u < o) t(e[a], e[u]) <= 0 ? r[f++] = e[a++] : r[f++] = e[u++];
						else if (a < i) r[f++] = e[a++];
				else {
					if (!(u < o)) break;
					r[f++] = e[u++]
				}
			};
			return e
		}()
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t) {
			for (let n = 0; n < e.byteLength; n++) {
				if (e[n] < t[n]) return -1;
				if (e[n] > t[n]) return 1
			}
			return e.byteLength > t.byteLength ? 1 : e.byteLength < t.byteLength ? -1 : 0
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(153),
			s = n(155);
		e.exports = r, e.exports.parse = r, e.exports.stringify = s
	}, function(e, t, n) {
		"use strict";
		var r = n(154),
			s = ["int32", "int64", "uint32", "uint64", "sint32", "sint64", "bool", "fixed64", "sfixed64", "double",
				"fixed32", "sfixed32", "float"
			],
			i = function(e) {
				for (var t = {}; e.length;) switch (e[0]) {
					case "[":
					case ",":
						e.shift();
						var n = e.shift();
						if ("(" === n && (n = e.shift(), e.shift()), "=" !== e[0]) throw new Error(
							"Unexpected token in field options: " + e[0]);
						if (e.shift(), "]" === e[0]) throw new Error("Unexpected ] in field option");
						t[n] = e.shift();
						break;
					case "]":
						return e.shift(), t;
					default:
						throw new Error("Unexpected token in field options: " + e[0])
				}
				throw new Error("No closing tag for field options")
			},
			o = function(e) {
				for (var t = {
						name: null,
						type: null,
						tag: -1,
						map: null,
						oneof: null,
						required: !1,
						repeated: !1,
						options: {}
					}; e.length;) switch (e[0]) {
					case "=":
						e.shift(), t.tag = Number(e.shift());
						break;
					case "map":
						if (t.type = "map", t.map = {
								from: null,
								to: null
							}, e.shift(), "<" !== e[0]) throw new Error("Unexpected token in map type: " + e[0]);
						if (e.shift(), t.map.from = e.shift(), "," !== e[0]) throw new Error("Unexpected token in map type: " + e[0]);
						if (e.shift(), t.map.to = e.shift(), ">" !== e[0]) throw new Error("Unexpected token in map type: " + e[0]);
						e.shift(), t.name = e.shift();
						break;
					case "repeated":
					case "required":
					case "optional":
						var n = e.shift();
						t.required = "required" === n, t.repeated = "repeated" === n, t.type = e.shift(), t.name = e.shift();
						break;
					case "[":
						t.options = i(e);
						break;
					case ";":
						if (null === t.name) throw new Error("Missing field name");
						if (null === t.type) throw new Error("Missing type in message field: " + t.name);
						if (-1 === t.tag) throw new Error("Missing tag number in message field: " + t.name);
						return e.shift(), t;
					default:
						throw new Error("Unexpected token in message field: " + e[0])
				}
				throw new Error("No ; found for message field")
			},
			a = function(e) {
				for (var t = {
						enums: [],
						options: {},
						messages: [],
						fields: [],
						extends: [],
						extensions: null
					}; e.length;) switch (e[0]) {
					case "map":
					case "repeated":
					case "optional":
					case "required":
						t.fields.push(o(e));
						break;
					case "enum":
						t.enums.push(d(e));
						break;
					case "message":
						t.messages.push(f(e));
						break;
					case "extensions":
						t.extensions = c(e);
						break;
					case "oneof":
						e.shift();
						var n = e.shift();
						if ("{" !== e[0]) throw new Error("Unexpected token in oneof: " + e[0]);
						for (e.shift();
							"}" !== e[0];) {
							e.unshift("optional");
							var r = o(e);
							r.oneof = n, t.fields.push(r)
						}
						e.shift();
						break;
					case "extend":
						t.extends.push(u(e));
						break;
					case ";":
						e.shift();
						break;
					case "reserved":
						for (e.shift();
							";" !== e[0];) e.shift();
						break;
					case "option":
						var s = g(e);
						if (void 0 !== t.options[s.name]) throw new Error("Duplicate option " + s.name);
						t.options[s.name] = s.value;
						break;
					default:
						e.unshift("optional"), t.fields.push(o(e))
				}
				return t
			},
			u = function(e) {
				return {
					name: e[1],
					message: f(e)
				}
			},
			c = function(e) {
				e.shift();
				var t = Number(e.shift());
				if (isNaN(t)) throw new Error("Invalid from in extensions definition");
				if ("to" !== e.shift()) throw new Error("Expected keyword 'to' in extensions definition");
				var n = e.shift();
				if ("max" === n && (n = 536870911), n = Number(n), isNaN(n)) throw new Error(
					"Invalid to in extensions definition");
				if (";" !== e.shift()) throw new Error("Missing ; in extensions definition");
				return {
					from: t,
					to: n
				}
			},
			f = function(e) {
				e.shift();
				var t = 1,
					n = [],
					r = {
						name: e.shift(),
						options: {},
						enums: [],
						extends: [],
						messages: [],
						fields: []
					};
				if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
				for (e.shift(); e.length;) {
					if ("{" === e[0] ? t++ : "}" === e[0] && t--, !t) return e.shift(), n = a(n), r.enums = n.enums, r.messages =
						n.messages, r.fields = n.fields, r.extends = n.extends, r.extensions = n.extensions, r.options = n.options,
						r;
					n.push(e.shift())
				}
				if (t) throw new Error("No closing tag for message")
			},
			h = function(e) {
				e.shift();
				var t = e.shift();
				if (";" !== e[0]) throw new Error("Expected ; but found " + e[0]);
				return e.shift(), t
			},
			l = function(e) {
				if (e.shift(), "=" !== e[0]) throw new Error("Expected = but found " + e[0]);
				e.shift();
				var t = e.shift();
				switch (t) {
					case '"proto2"':
						t = 2;
						break;
					case '"proto3"':
						t = 3;
						break;
					default:
						throw new Error("Expected protobuf syntax version but found " + t)
				}
				if (";" !== e[0]) throw new Error("Expected ; but found " + e[0]);
				return e.shift(), t
			},
			p = function(e) {
				if (e.length < 4) throw new Error("Invalid enum value: " + e.slice(0, 3).join(" "));
				if ("=" !== e[1]) throw new Error("Expected = but found " + e[1]);
				if (";" !== e[3] && "[" !== e[3]) throw new Error("Expected ; or [ but found " + e[1]);
				var t = e.shift();
				e.shift();
				var n = {
					value: null,
					options: {}
				};
				return n.value = Number(e.shift()), "[" === e[0] && (n.options = i(e)), e.shift(), {
					name: t,
					val: n
				}
			},
			d = function(e) {
				e.shift();
				var t = {},
					n = {
						name: e.shift(),
						values: {},
						options: {}
					};
				if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
				for (e.shift(); e.length;) {
					if ("}" === e[0]) return e.shift(), ";" === e[0] && e.shift(), n;
					if ("option" !== e[0]) {
						var r = p(e);
						n.values[r.name] = r.val
					} else t = g(e), n.options[t.name] = t.value
				}
				throw new Error("No closing tag for enum")
			},
			g = function(e) {
				for (var t = null, n = null, r = function(e) {
						return "true" === e || "false" !== e && e.replace(/^"+|"+$/gm, "")
					}; e.length;) {
					if (";" === e[0]) return e.shift(), {
						name: t,
						value: n
					};
					switch (e[0]) {
						case "option":
							e.shift();
							var s = "(" === e[0];
							if (s && e.shift(), t = e.shift(), s) {
								if (")" !== e[0]) throw new Error("Expected ) but found " + e[0]);
								e.shift()
							}
							"." === e[0][0] && (t += e.shift());
							break;
						case "=":
							if (e.shift(), null === t) throw new Error("Expected key for option with value: " + e[0]);
							if (n = r(e.shift()), "optimize_for" === t && !/^(SPEED|CODE_SIZE|LITE_RUNTIME)$/.test(n)) throw new Error(
								"Unexpected value for option optimize_for: " + n);
							"{" === n && (n = m(e));
							break;
						default:
							throw new Error("Unexpected token in option: " + e[0])
					}
				}
			},
			m = function(e) {
				for (var t = function(e) {
						return "true" === e || "false" !== e && e.replace(/^"+|"+$/gm, "")
					}, n = {}; e.length;) {
					if ("}" === e[0]) return e.shift(), n;
					var r = "(" === e[0];
					r && e.shift();
					var s = e.shift();
					if (r) {
						if (")" !== e[0]) throw new Error("Expected ) but found " + e[0]);
						e.shift()
					}
					var i = null;
					switch (e[0]) {
						case ":":
							if (void 0 !== n[s]) throw new Error("Duplicate option map key " + s);
							e.shift(), "{" === (i = t(e.shift())) && (i = m(e)), n[s] = i, ";" === e[0] && e.shift();
							break;
						case "{":
							if (e.shift(), i = m(e), void 0 === n[s] && (n[s] = []), !Array.isArray(n[s])) throw new Error(
								"Duplicate option map key " + s);
							n[s].push(i);
							break;
						default:
							throw new Error("Unexpected token in option map: " + e[0])
					}
				}
				throw new Error("No closing tag for option map")
			},
			b = function(e) {
				e.shift();
				var t = e.shift().replace(/^"+|"+$/gm, "");
				if (";" !== e[0]) throw new Error("Unexpected token: " + e[0] + '. Expected ";"');
				return e.shift(), t
			},
			y = function(e) {
				e.shift();
				var t = {
					name: e.shift(),
					methods: [],
					options: {}
				};
				if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
				for (e.shift(); e.length;) {
					if ("}" === e[0]) return e.shift(), ";" === e[0] && e.shift(), t;
					switch (e[0]) {
						case "option":
							var n = g(e);
							if (void 0 !== t.options[n.name]) throw new Error("Duplicate option " + n.name);
							t.options[n.name] = n.value;
							break;
						case "rpc":
							t.methods.push(w(e));
							break;
						default:
							throw new Error("Unexpected token in service: " + e[0])
					}
				}
				throw new Error("No closing tag for service")
			},
			w = function(e) {
				e.shift();
				var t = {
					name: e.shift(),
					input_type: null,
					output_type: null,
					client_streaming: !1,
					server_streaming: !1,
					options: {}
				};
				if ("(" !== e[0]) throw new Error("Expected ( but found " + e[0]);
				if (e.shift(), "stream" === e[0] && (e.shift(), t.client_streaming = !0), t.input_type = e.shift(), ")" !== e[
						0]) throw new Error("Expected ) but found " + e[0]);
				if (e.shift(), "returns" !== e[0]) throw new Error("Expected returns but found " + e[0]);
				if (e.shift(), "(" !== e[0]) throw new Error("Expected ( but found " + e[0]);
				if (e.shift(), "stream" === e[0] && (e.shift(), t.server_streaming = !0), t.output_type = e.shift(), ")" !==
					e[0]) throw new Error("Expected ) but found " + e[0]);
				if (e.shift(), ";" === e[0]) return e.shift(), t;
				if ("{" !== e[0]) throw new Error("Expected { but found " + e[0]);
				for (e.shift(); e.length;) {
					if ("}" === e[0]) return e.shift(), ";" === e[0] && e.shift(), t;
					if ("option" !== e[0]) throw new Error("Unexpected token in rpc options: " + e[0]);
					var n = g(e);
					if (void 0 !== t.options[n.name]) throw new Error("Duplicate option " + n.name);
					t.options[n.name] = n.value
				}
				throw new Error("No closing tag for rpc")
			};
		e.exports = function(e) {
			for (var t = r(e.toString()), n = 0; n < t.length; n++) {
				var i;
				if (/^("|')([^'"]*)$/.test(t[n]))
					for (i = 1 === t[n].length ? n + 1 : n; i < t.length; i++)
						if (/^[^'"\\]*(?:\\.[^'"\\]*)*("|')$/.test(t[i])) {
							t = t.slice(0, n).concat(t.slice(n, i + 1).join("")).concat(t.slice(i + 1));
							break
						}
			}
			for (var o = {
					syntax: 3,
					package: null,
					imports: [],
					enums: [],
					messages: [],
					options: {},
					extends: []
				}, a = !0; t.length;) {
				switch (t[0]) {
					case "package":
						o.package = h(t);
						break;
					case "syntax":
						if (!a) throw new Error("Protobuf syntax version should be first thing in file");
						o.syntax = l(t);
						break;
					case "message":
						o.messages.push(f(t));
						break;
					case "enum":
						o.enums.push(d(t));
						break;
					case "option":
						var c = g(t);
						if (o.options[c.name]) throw new Error("Duplicate option " + c.name);
						o.options[c.name] = c.value;
						break;
					case "import":
						o.imports.push(b(t));
						break;
					case "extend":
						o.extends.push(u(t));
						break;
					case "service":
						o.services || (o.services = []), o.services.push(y(t));
						break;
					default:
						throw new Error("Unexpected token: " + t[0])
				}
				a = !1
			}
			return o.extends.forEach((function(e) {
				o.messages.forEach((function(t) {
					t.name === e.name && e.message.fields.forEach((function(e) {
						if (!t.extensions || e.tag < t.extensions.from || e.tag > t.extensions.to) throw new Error(t.name +
							" does not declare " + e.tag + " as an extension number");
						t.fields.push(e)
					}))
				}))
			})), o.messages.forEach((function(e) {
				e.fields.forEach((function(t) {
					var n, r, i, a;
					if (t.options && "true" === t.options.packed && -1 === s.indexOf(t.type)) {
						if (-1 === t.type.indexOf(".")) {
							if (e.enums && e.enums.some((function(e) {
									return e.name === t.type
								}))) return
						} else {
							if ((n = t.type.split(".")).length > 2) throw new Error("what is this?");
							if (r = n[0], i = n[1], o.messages.some((function(e) {
									if (e.name === r) return a = e, e
								})), a && a.enums && a.enums.some((function(e) {
									return e.name === i
								}))) return
						}
						throw new Error("Fields of type " + t.type +
							' cannot be declared [packed=true]. Only repeated fields of primitive numeric types (types which use the varint, 32-bit, or 64-bit wire types) can be declared "packed". See https://developers.google.com/protocol-buffers/docs/encoding#optional'
						)
					}
				}))
			})), o
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e) {
			var t, n = function(e) {
				return e.trim()
			};
			return e.replace(/([;,{}()=:[\]<>]|\/\*|\*\/)/g, " $1 ").split(/\n/).map(n).filter(Boolean).map((function(e) {
				var t = e.indexOf("//");
				return t > -1 ? e.slice(0, t) : e
			})).map(n).filter(Boolean).join("\n").split(/\s+|\n+/gm).filter((t = !1, function(e) {
				return "/*" === e ? (t = !0, !1) : "*/" === e ? (t = !1, !1) : !t
			}))
		}
	}, function(e, t, n) {
		"use strict";
		var r = function(e, t) {
				var n = e.repeated ? "repeated" : e.required ? "required" : "optional";
				"map" === e.type && (n = "map<" + e.map.from + "," + e.map.to + ">"), e.oneof && (n = "");
				var r = Object.keys(e.options || {}).map((function(t) {
					return t + " = " + e.options[t]
				})).join(",");
				return r && (r = " [" + r + "]"), t.push((n ? n + " " : "") + ("map" === e.map ? "" : e.type + " ") + e.name +
					" = " + e.tag + r + ";"), t
			},
			s = function(e, t) {
				t.push("message " + e.name + " {"), e.options || (e.options = {}), a(e.options, t), e.enums || (e.enums = []),
					e.enums.forEach((function(e) {
						t.push(i(e, []))
					})), e.messages || (e.messages = []), e.messages.forEach((function(e) {
						t.push(s(e, []))
					}));
				var n = {};
				return e.fields || (e.fields = []), e.fields.forEach((function(e) {
					e.oneof ? (n[e.oneof] || (n[e.oneof] = []), n[e.oneof].push(r(e, []))) : t.push(r(e, []))
				})), Object.keys(n).forEach((function(e) {
					n[e].unshift("oneof " + e + " {"), n[e].push("}"), t.push(n[e])
				})), t.push("}", ""), t
			},
			i = function(e, t) {
				t.push("enum " + e.name + " {"), e.options || (e.options = {});
				var n = a(e.options, []);
				return n.length > 1 && t.push(n.slice(0, -1)), Object.keys(e.values).map((function(n) {
					var r = o(e.values[n]);
					t.push([n + " = " + r + ";"])
				})), t.push("}", ""), t
			},
			o = function(e, t) {
				var n = Object.keys(e.options || {}).map((function(t) {
					return t + " = " + e.options[t]
				})).join(",");
				return n && (n = " [" + n + "]"), e.value + n
			},
			a = function(e, t) {
				var n = Object.keys(e);
				return n.forEach((function(n) {
					var r = e[n];
					~n.indexOf(".") && (n = "(" + n + ")");
					var s = typeof r;
					"object" === s ? (r = u(r, [])).length && t.push("option " + n + " = {", r, "};") : ("string" === s &&
						"optimize_for" !== n && (r = '"' + r + '"'), t.push("option " + n + " = " + r + ";"))
				})), n.length > 0 && t.push(""), t
			},
			u = function(e, t) {
				return Object.keys(e).forEach((function(n) {
					var r = e[n],
						s = typeof r;
					"object" === s ? Array.isArray(r) ? r.forEach((function(e) {
						(e = u(e, [])).length && t.push(n + " {", e, "}")
					})) : (r = u(r, [])).length && t.push(n + " {", r, "}") : ("string" === s && (r = '"' + r + '"'), t.push(
						n + ": " + r))
				})), t
			},
			c = function(e, t) {
				var n = "rpc " + e.name + "(";
				e.client_streaming && (n += "stream "), n += e.input_type + ") returns (", e.server_streaming && (n +=
					"stream "), n += e.output_type + ")", e.options || (e.options = {});
				var r = a(e.options, []);
				return r.length > 1 ? t.push(n + " {", r.slice(0, -1), "}") : t.push(n + ";"), t
			},
			f = function(e) {
				return function(t) {
					return Array.isArray(t) ? t.map(f(e + "  ")).join("\n") : e + t
				}
			};
		e.exports = function(e) {
			var t = [];
			return t.push('syntax = "proto' + e.syntax + '";', ""), e.package && t.push("package " + e.package + ";", ""),
				e.options || (e.options = {}), a(e.options, t), e.enums || (e.enums = []), e.enums.forEach((function(e) {
					i(e, t)
				})), e.messages || (e.messages = []), e.messages.forEach((function(e) {
					s(e, t)
				})), e.services && e.services.forEach((function(e) {
					! function(e, t) {
						t.push("service " + e.name + " {"), e.options || (e.options = {}), a(e.options, t), e.methods || (e.methods = []),
							e.methods.forEach((function(e) {
								t.push(c(e, []))
							})), t.push("}", "")
					}(e, t)
				})), t.map(f("")).join("\n")
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(157),
			s = n(171),
			i = n(172),
			o = n(173),
			a = n(4);
		e.exports = function(e, t) {
			const n = {},
				u = {},
				c = {},
				f = function(e, t) {
					e.enums && e.enums.forEach((function(e) {
						e.id = t + (t ? "." : "") + e.name, u[e.id] = e, f(e, e.id)
					})), e.messages && e.messages.forEach((function(r) {
						r.id = t + (t ? "." : "") + r.name, n[r.id] = r, r.fields.forEach((function(r) {
							if (!r.map) return;
							const s = "Map_" + r.map.from + "_" + r.map.to,
								i = {
									name: s,
									enums: [],
									messages: [],
									fields: [{
										name: "key",
										type: r.map.from,
										tag: 1,
										repeated: !1,
										required: !0
									}, {
										name: "value",
										type: r.map.to,
										tag: 2,
										repeated: !1,
										required: !1
									}],
									extensions: null,
									id: t + (t ? "." : "") + s
								};
							n[i.id] || (n[i.id] = i, e.messages.push(i)), r.type = s, r.repeated = !0
						})), f(r, r.id)
					}))
				};
			f(e, "");
			const h = function(e, t) {
					e.messages.forEach((function(n) {
						t[n.name] = l(n.name, e.id)
					})), e.enums.forEach((function(e) {
						t[e.name] = function(e) {
							if (!e) return null;
							const t = {};
							return Object.keys(e).forEach((function(n) {
								t[n] = e[n].value
							})), t
						}(e.values)
					})), t.type = 2, t.message = !0, t.name = e.name;
					const n = {};
					e.fields.forEach((function(e) {
						e.oneof && (n[e.oneof] || (n[e.oneof] = []), n[e.oneof].push(e.name))
					}));
					const r = e.fields.map((function(t) {
							return l(t.type, e.id)
						})),
						a = o(e, r, n),
						u = i(e, l, r, n, a),
						c = s(e, l, r);
					return u.bytes = c.bytes = 0, t.buffer = !0, t.encode = u, t.decode = c, t.encodingLength = a, t
				},
				l = function(e, s, i) {
					if (t && t[e]) return t[e];
					if (r[e]) return r[e];
					const o = (s ? s + "." + e : e).split(".").map((function(t, n, r) {
						return r.slice(0, n).concat(e).join(".")
					})).reverse().reduce((function(e, t) {
						return e || n[t] || u[t]
					}), null);
					if (!1 === i) return o;
					if (!o) throw new Error("Could not resolve " + e);
					if (o.values) return function(e) {
						const t = Object.keys(e.values || []).map((function(t) {
							return parseInt(e.values[t].value, 10)
						}));
						return r.make(0, (function e(n, r, s, i) {
							if (!t.length || -1 === t.indexOf(n)) throw new Error("Invalid enum value: " + n);
							return a.encode(n, r, i), e.bytes = a.encode.bytes, r
						}), (function e(n, r, s) {
							var i = a.decode(n, s);
							if (!t.length || -1 === t.indexOf(i)) throw new Error("Invalid enum value: " + i);
							return e.bytes = a.decode.bytes, i
						}), a.encodingLength)
					}(o);
					return c[o.id] || h(o, c[o.id] = {})
				};
			return (e.enums || []).concat((e.messages || []).map((function(e) {
				return l(e.id)
			})))
		}
	}, function(e, t, n) {
		"use strict";
		t.make = n(6), t.bytes = n(158), t.string = n(159), t.bool = n(160), t.int32 = n(161), t.int64 = n(162), t.sint32 =
			t.sint64 = n(163), t.uint32 = t.uint64 = t.enum = t.varint = n(165), t.fixed64 = t.sfixed64 = n(166), t.double =
			n(167), t.fixed32 = n(168), t.sfixed32 = n(169), t.float = n(170)
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(6);

		function i(e) {
			return e.byteLength
		}
		e.exports = s(2, (function e(t, n, s, o) {
			const a = o,
				u = i(t);
			r.encode(u, n, o), o += r.encode.bytes, n.set(t, o), e.bytes = (o += u) - a
		}), (function e(t, n, s) {
			const i = s,
				o = r.decode(t, s);
			s += r.decode.bytes;
			const a = t.slice(s, s + o);
			return s += a.length, e.bytes = s - i, a
		}), (function(e) {
			const t = i(e);
			return r.encodingLength(t) + t
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(7),
			i = n(8),
			o = n(6);
		e.exports = o(2, (function e(t, n, i, o) {
			const a = o,
				u = s(t).byteLength;
			r.encode(u, n, o, "utf-8"), o += r.encode.bytes;
			const c = s(t);
			n.set(c, o), o += c.length, e.bytes = o - a
		}), (function e(t, n, s) {
			const o = s,
				a = r.decode(t, s);
			s += r.decode.bytes;
			const u = i(t.subarray(s, s + a));
			return e.bytes = (s += a) - o, u
		}), (function(e) {
			const t = s(e).byteLength;
			return r.encodingLength(t) + t
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(6);
		e.exports = r(0, (function e(t, n, r, s) {
			n[s] = t ? 1 : 0, e.bytes = 1
		}), (function e(t, n, r) {
			const s = t[r] > 0;
			return e.bytes = 1, s
		}), (function() {
			return 1
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(6);
		e.exports = s(0, (function e(t, n, s, i) {
			r.encode(t < 0 ? t + 4294967296 : t, n, i), e.bytes = r.encode.bytes
		}), (function e(t, n, s) {
			const i = r.decode(t, s);
			return e.bytes = r.decode.bytes, i > 2147483647 ? i - 4294967296 : i
		}), (function(e) {
			return r.encodingLength(e < 0 ? e + 4294967296 : e)
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(6);
		e.exports = s(0, (function e(t, n, s, i) {
			if (t < 0) {
				const s = i + 9;
				for (r.encode(-1 * t, n, i), n[i += r.encode.bytes - 1] = 128 | n[i]; i < s - 1;) n[++i] = 255;
				n[s] = 1, e.bytes = 10
			} else r.encode(t, n, i), e.bytes = r.encode.bytes
		}), (function e(t, n, s) {
			let i = r.decode(t, s);
			if (i >= Math.pow(2, 63)) {
				let n = 9;
				for (; 255 === t[s + n - 1];) n--;
				n = n || 9;
				const o = t.subarray(s, s + n);
				o[n - 1] = 127 & o[n - 1], i = -1 * r.decode(o, 0), e.bytes = 10
			} else e.bytes = r.decode.bytes;
			return i
		}), (function(e) {
			return e < 0 ? 10 : r.encodingLength(e)
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(164),
			s = n(6);
		e.exports = s(0, (function e(t, n, s, i) {
			r.encode(t, n, i), e.bytes = r.encode.bytes
		}), (function e(t, n, s) {
			const i = r.decode(t, s);
			return e.bytes = r.decode.bytes, i
		}), r.encodingLength)
	}, function(e, t, n) {
		"use strict";
		var r = n(4);
		t.encode = function e(t, n, s) {
			t = t >= 0 ? 2 * t : -2 * t - 1;
			var i = r.encode(t, n, s);
			return e.bytes = r.encode.bytes, i
		}, t.decode = function e(t, n) {
			var s = r.decode(t, n);
			return e.bytes = r.decode.bytes, 1 & s ? (s + 1) / -2 : s / 2
		}, t.encodingLength = function(e) {
			return r.encodingLength(e >= 0 ? 2 * e : -2 * e - 1)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(6);
		e.exports = s(0, (function e(t, n, s, i) {
			r.encode(t, n, i), e.bytes = r.encode.bytes
		}), (function e(t, n, s) {
			const i = r.decode(t, s);
			return e.bytes = r.decode.bytes, i
		}), r.encodingLength)
	}, function(e, t, n) {
		"use strict";
		const r = n(6);
		e.exports = r(1, (function e(t, n, r, s) {
			for (const i of t) n[s] = i, s++;
			e.bytes = 8
		}), (function e(t, n, r) {
			const s = t.slice(r, r + 8);
			return e.bytes = 8, s
		}), (function() {
			return 8
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(6);
		e.exports = r(1, (function e(t, n, r, s) {
			r.setFloat64(s, t, !0), e.bytes = 8
		}), (function e(t, n, r) {
			const s = n.getFloat64(r, !0);
			return e.bytes = 8, s
		}), (function() {
			return 8
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(6);
		e.exports = r(5, (function e(t, n, r, s) {
			r.setUint32(s, t, !0), e.bytes = 4
		}), (function e(t, n, r) {
			const s = n.getUint32(r, !0);
			return e.bytes = 4, s
		}), (function(e) {
			return 4
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(6);
		e.exports = r(5, (function e(t, n, r, s) {
			r.setInt32(s, t, !0), e.bytes = 4
		}), (function e(t, n, r) {
			const s = n.getInt32(r, !0);
			return e.bytes = 4, s
		}), (function(e) {
			return 4
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(6);
		e.exports = r(5, (function e(t, n, r, s) {
			r.setFloat32(s, t, !0), e.bytes = 4
		}), (function e(t, n, r) {
			const s = n.getFloat32(r, !0);
			return e.bytes = 4, s
		}), (function() {
			return 4
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(4),
			s = n(37).defined;

		function i(e) {
			return `${e.substring(0,1).toUpperCase()}${e.substring(1)}`
		}

		function o(e, t, n, r) {
			if (Object.prototype.hasOwnProperty.call(e, t)) return;
			const s = i(t);
			Object.defineProperties(e, {
				[t]: {
					enumerable: !0,
					configurable: !0,
					set: e => {
						n = e
					},
					get: () => void 0 === n ? r : n
				},
				["has" + s]: {
					configurable: !0,
					value: () => void 0 !== n
				},
				["set" + s]: {
					configurable: !0,
					value: e => {
						n = e
					}
				},
				["get" + s]: {
					configurable: !0,
					value: () => n
				},
				["clear" + s]: {
					configurable: !0,
					value: () => {
						n = void 0, e[t] = void 0
					}
				}
			})
		}
		var a = function(e, t, n, s) {
				switch (e) {
					case 0:
						return r.decode(t, s), s + r.decode.bytes;
					case 1:
						return s + 8;
					case 2:
						var i = r.decode(t, s);
						return s + r.decode.bytes + i;
					case 3:
					case 4:
						throw new Error("Groups are not supported");
					case 5:
						return s + 4;
					default:
						throw new Error("Unknown wire type: " + e)
				}
			},
			u = function(e) {
				if (e.map) return {};
				if (e.repeated) return [];
				switch (e.type) {
					case "string":
						return "";
					case "bool":
						return !1;
					case "float":
					case "double":
					case "sfixed32":
					case "fixed32":
					case "varint":
					case "enum":
					case "uint64":
					case "uint32":
					case "int64":
					case "int32":
					case "sint64":
					case "sint32":
						return 0;
					default:
						return null
				}
			},
			c = function(e, t) {
				if (void 0 === t) return t;
				switch (e.type) {
					case "bool":
						return "true" === t;
					case "float":
					case "double":
					case "sfixed32":
					case "fixed32":
					case "varint":
					case "enum":
					case "uint64":
					case "uint32":
					case "int64":
					case "int32":
					case "sint64":
					case "sint32":
						return parseInt(t, 10);
					default:
						return t
				}
			};
		e.exports = function(e, t, n) {
			const f = [],
				h = {},
				l = [],
				p = [];
			for (var d = 0; d < n.length; d++) {
				const n = e.fields[d];
				h[n.tag] = d;
				const r = n.options && n.options.default,
					s = t(n.type, e.id, !1);
				p[d] = [r, s && s.values], e.fields[d].packed = n.repeated && n.options && n.options.packed && "false" !== n.options
					.packed, n.required && f.push(n.name), n.oneof && l.push(n.name)
			}

			function g(e, t, n, s, a, u, c) {
				const f = t.name;
				if (t.oneof) {
					const e = Object.keys(n);
					for (var h = 0; h < e.length; h++)
						if (l.indexOf(e[h]) > -1) {
							const t = i(e[h]);
							delete n["has" + t], delete n["get" + t], delete n["set" + t], delete n["clear" + t], delete n[e[h]]
						}
				}
				let p;
				if (e.message) {
					const i = r.decode(s, u);
					u += r.decode.bytes;
					const o = e.decode(s, a, u, u + i);
					t.map ? (p = n[f] || {}, p[o.key] = o.value) : t.repeated ? (p = n[f] || [], p.push(o)) : p = o
				} else t.repeated ? (p = n[f] || [], p.push(e.decode(s, a, u))) : p = e.decode(s, a, u);
				return o(n, f, p), u += e.decode.bytes
			}
			return function t(i, d, m, b) {
				if (null == m && (m = 0), null == b && (b = i.length), !(b <= i.length && m <= i.length)) throw new Error(
					"Decoded message is not valid");
				d || (d = new DataView(i.buffer, i.byteOffset, i.byteLength));
				for (var y, w = m, k = {};;) {
					if (b <= m) {
						var E, v, S = "",
							_ = 0;
						for (_ = 0; _ < f.length; _++)
							if (S = f[_], !s(k[S])) throw new Error("Decoded message is not valid, missing required field: " + S);
						for (_ = 0; _ < n.length; _++) {
							let t;
							if (y = e.fields[_], v = p[_][0], E = p[_][1], S = y.name, !Object.prototype.hasOwnProperty.call(k, S)) {
								var A = !1;
								if (y.oneof)
									for (var x = Object.keys(k), N = 0; N < x.length; N++)
										if (l.indexOf(x[N]) > -1) {
											A = !0;
											break
										} A || (E ? y.repeated ? v = [] : (v = v && E[v] ? E[v].value : E[Object.keys(E)[0]].value, v =
									parseInt(v || 0, 10)) : (t = u(y), v = c(y, v)), o(k, S, v, t))
							}
						}
						return t.bytes = m - w, k
					}
					var I = r.decode(i, m);
					m += r.decode.bytes;
					var O = h[I >> 3];
					if (null != O) {
						var T = n[O];
						if ((y = e.fields[O]).packed) {
							var P = r.decode(i, m);
							for (P += m += r.decode.bytes; m < P;) m = g(T, y, k, i, d, m)
						} else m = g(T, y, k, i, d, m)
					} else m = a(7 & I, i, d, m)
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(37).defined,
			s = n(4);
		e.exports = function(e, t, n, i, o) {
			const a = Object.keys(i),
				u = n.length,
				c = {};
			for (let r = 0; r < u; r++) {
				c[r] = {
					p: s.encode(e.fields[r].tag << 3 | 2),
					h: s.encode(e.fields[r].tag << 3 | n[r].type)
				};
				const t = e.fields[r];
				e.fields[r].packed = t.repeated && t.options && t.options.packed && "false" !== t.options.packed
			}

			function f(e, t, n, r, i, o, a) {
				let u = 0;
				if (!o)
					for (u = 0; u < r.length; u++) e[n++] = r[u];
				return i.message && (s.encode(i.encodingLength(a), e, n), n += s.encode.bytes), i.encode(a, e, t, n), n + i.encode
					.bytes
			}
			return function t(h, l, p, d = 0) {
				null == l && (l = new Uint8Array(o(h))), null == p && (p = new DataView(l.buffer, l.byteOffset, l.byteLength));
				const g = d,
					m = Object.keys(h);
				let b = 0,
					y = !1;
				for (b = 0; b < a.length; b++) {
					const e = a[b],
						t = i[b];
					if (m.indexOf(t) > -1) {
						if (y) throw new Error("only one of the properties defined in oneof " + e + " can be set");
						y = !0
					}
				}
				for (b = 0; b < u; b++) {
					const t = n[b],
						i = e.fields[b];
					let o = h[i.name],
						a = 0;
					if (!r(o)) {
						if (i.required) throw new Error(i.name + " is required");
						continue
					}
					const u = c[b].p,
						g = c[b].h,
						m = i.packed;
					if (i.map) {
						const e = Object.keys(o);
						for (a = 0; a < e.length; a++) e[a] = {
							key: e[a],
							value: o[e[a]]
						};
						o = e
					}
					if (m) {
						let e = 0;
						for (a = 0; a < o.length; a++) Object.prototype.hasOwnProperty.call(o, a) && (e += t.encodingLength(o[a]));
						if (e) {
							for (a = 0; a < g.length; a++) l[d++] = u[a];
							s.encode(e, l, d), d += s.encode.bytes
						}
					}
					if (i.repeated) {
						let e;
						for (a = 0; a < o.length; a++) e = o[a], r(e) && (d = f(l, p, d, g, t, m, e))
					} else d = f(l, p, d, g, t, m, o)
				}
				return t.bytes = d - g, l
			}
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(37).defined,
			s = n(4);
		e.exports = function(e, t, n) {
			const i = Object.keys(n),
				o = t.length,
				a = new Array(o);
			for (let r = 0; r < e.fields.length; r++) {
				a[r] = s.encodingLength(e.fields[r].tag << 3 | t[r].type);
				const n = e.fields[r];
				e.fields[r].packed = n.repeated && n.options && n.options.packed && "false" !== n.options.packed
			}
			return function(u) {
				let c = 0,
					f = 0,
					h = 0;
				for (f = 0; f < i.length; f++) {
					const e = i[f],
						t = n[e];
					let s = !1;
					for (h = 0; h < t.length; h++)
						if (r(u[t[h]])) {
							if (s) throw new Error("only one of the properties defined in oneof " + e + " can be set");
							s = !0
						}
				}
				for (f = 0; f < o; f++) {
					const n = t[f],
						i = e.fields[f];
					let o = u[i.name];
					const l = a[f];
					let p;
					if (r(o)) {
						if (i.map) {
							const e = Object.keys(o);
							for (h = 0; h < e.length; h++) e[h] = {
								key: e[h],
								value: o[e[h]]
							};
							o = e
						}
						if (i.packed) {
							let e = 0;
							for (h = 0; h < o.length; h++) r(o[h]) && (p = n.encodingLength(o[h]), e += p, n.message && (e += s.encodingLength(
								p)));
							e && (c += l + e + s.encodingLength(e))
						} else if (i.repeated)
							for (h = 0; h < o.length; h++) r(o[h]) && (p = n.encodingLength(o[h]), c += l + p + (n.message ? s.encodingLength(
								p) : 0));
						else p = n.encodingLength(o), c += l + p + (n.message ? s.encodingLength(p) : 0)
					} else if (i.required) throw new Error(i.name + " is required")
				}
				return c
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(16),
			s = n(61);
		e.exports = async (e, t = {}) => {
			const n = await s.cid(e.serialize(), t);
			return new r(t.name || "", e.size, n)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(176),
			s = n(178),
			{
				factory: i
			} = n(180),
			{
				fromNumberTo32BitBuf: o
			} = n(181),
			a = n(7),
			u = e => async t => {
				switch (e) {
					case "sha3-224":
						return new Uint8Array(r.sha3_224.arrayBuffer(t));
					case "sha3-256":
						return new Uint8Array(r.sha3_256.arrayBuffer(t));
					case "sha3-384":
						return new Uint8Array(r.sha3_384.arrayBuffer(t));
					case "sha3-512":
						return new Uint8Array(r.sha3_512.arrayBuffer(t));
					case "shake-128":
						return new Uint8Array(r.shake128.create(128).update(t).arrayBuffer());
					case "shake-256":
						return new Uint8Array(r.shake256.create(256).update(t).arrayBuffer());
					case "keccak-224":
						return new Uint8Array(r.keccak224.arrayBuffer(t));
					case "keccak-256":
						return new Uint8Array(r.keccak256.arrayBuffer(t));
					case "keccak-384":
						return new Uint8Array(r.keccak384.arrayBuffer(t));
					case "keccak-512":
						return new Uint8Array(r.keccak512.arrayBuffer(t));
					case "murmur3-128":
						return a(s.x64.hash128(t), "base16");
					case "murmur3-32":
						return o(s.x86.hash32(t));
					default:
						throw new TypeError(e + " is not a supported algorithm")
				}
			};
		e.exports = {
			identity: e => e,
			sha1: i("sha1"),
			sha2256: i("sha2-256"),
			sha2512: i("sha2-512"),
			dblSha2256: i("dbl-sha2-256"),
			sha3224: u("sha3-224"),
			sha3256: u("sha3-256"),
			sha3384: u("sha3-384"),
			sha3512: u("sha3-512"),
			shake128: u("shake-128"),
			shake256: u("shake-256"),
			keccak224: u("keccak-224"),
			keccak256: u("keccak-256"),
			keccak384: u("keccak-384"),
			keccak512: u("keccak-512"),
			murmur3128: u("murmur3-128"),
			murmur332: u("murmur3-32"),
			addBlake: n(182)
		}
	}, function(e, t, n) {
		"use strict";
		(function(r, s) {
			var i;
			! function() {
				var o = "input is invalid type",
					a = "object" == typeof window,
					u = a ? window : {};
				u.JS_SHA3_NO_WINDOW && (a = !1);
				var c = !a && "object" == typeof self;
				!u.JS_SHA3_NO_NODE_JS && "object" == typeof r && r.versions && r.versions.node ? u = s : c && (u = self);
				var f = !u.JS_SHA3_NO_COMMON_JS && "object" == typeof e && e.exports,
					h = n(177),
					l = !u.JS_SHA3_NO_ARRAY_BUFFER && "undefined" != typeof ArrayBuffer,
					p = "0123456789abcdef".split(""),
					d = [4, 1024, 262144, 67108864],
					g = [0, 8, 16, 24],
					m = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649, 0, 2147516545,
						2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0, 2147483658, 0, 2147516555, 0, 139, 2147483648,
						32905, 2147483648, 32771, 2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
						2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648
					],
					b = [224, 256, 384, 512],
					y = [128, 256],
					w = ["hex", "buffer", "arrayBuffer", "array", "digest"],
					k = {
						128: 168,
						256: 136
					};
				!u.JS_SHA3_NO_NODE_JS && Array.isArray || (Array.isArray = function(e) {
					return "[object Array]" === Object.prototype.toString.call(e)
				}), !l || !u.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW && ArrayBuffer.isView || (ArrayBuffer.isView = function(e) {
					return "object" == typeof e && e.buffer && e.buffer.constructor === ArrayBuffer
				});
				for (var E = function(e, t, n) {
						return function(r) {
							return new D(e, t, e).update(r)[n]()
						}
					}, v = function(e, t, n) {
						return function(r, s) {
							return new D(e, t, s).update(r)[n]()
						}
					}, S = function(e, t, n) {
						return function(t, r, s, i) {
							return I["cshake" + e].update(t, r, s, i)[n]()
						}
					}, _ = function(e, t, n) {
						return function(t, r, s, i) {
							return I["kmac" + e].update(t, r, s, i)[n]()
						}
					}, A = function(e, t, n, r) {
						for (var s = 0; s < w.length; ++s) {
							var i = w[s];
							e[i] = t(n, r, i)
						}
						return e
					}, x = function(e, t) {
						var n = E(e, t, "hex");
						return n.create = function() {
							return new D(e, t, e)
						}, n.update = function(e) {
							return n.create().update(e)
						}, A(n, E, e, t)
					}, N = [{
						name: "keccak",
						padding: [1, 256, 65536, 16777216],
						bits: b,
						createMethod: x
					}, {
						name: "sha3",
						padding: [6, 1536, 393216, 100663296],
						bits: b,
						createMethod: x
					}, {
						name: "shake",
						padding: [31, 7936, 2031616, 520093696],
						bits: y,
						createMethod: function(e, t) {
							var n = v(e, t, "hex");
							return n.create = function(n) {
								return new D(e, t, n)
							}, n.update = function(e, t) {
								return n.create(t).update(e)
							}, A(n, v, e, t)
						}
					}, {
						name: "cshake",
						padding: d,
						bits: y,
						createMethod: function(e, t) {
							var n = k[e],
								r = S(e, 0, "hex");
							return r.create = function(r, s, i) {
								return s || i ? new D(e, t, r).bytepad([s, i], n) : I["shake" + e].create(r)
							}, r.update = function(e, t, n, s) {
								return r.create(t, n, s).update(e)
							}, A(r, S, e, t)
						}
					}, {
						name: "kmac",
						padding: d,
						bits: y,
						createMethod: function(e, t) {
							var n = k[e],
								r = _(e, 0, "hex");
							return r.create = function(r, s, i) {
								return new B(e, t, s).bytepad(["KMAC", i], n).bytepad([r], n)
							}, r.update = function(e, t, n, s) {
								return r.create(e, n, s).update(t)
							}, A(r, _, e, t)
						}
					}], I = {}, O = [], T = 0; T < N.length; ++T)
					for (var P = N[T], R = P.bits, U = 0; U < R.length; ++U) {
						var C = P.name + "_" + R[U];
						if (O.push(C), I[C] = P.createMethod(R[U], P.padding), "sha3" !== P.name) {
							var L = P.name + R[U];
							O.push(L), I[L] = I[C]
						}
					}

				function D(e, t, n) {
					this.blocks = [], this.s = [], this.padding = t, this.outputBits = n, this.reset = !0, this.finalized = !1,
						this.block = 0, this.start = 0, this.blockCount = 1600 - (e << 1) >> 5, this.byteCount = this.blockCount <<
						2, this.outputBlocks = n >> 5, this.extraBytes = (31 & n) >> 3;
					for (var r = 0; r < 50; ++r) this.s[r] = 0
				}

				function B(e, t, n) {
					D.call(this, e, t, n)
				}
				D.prototype.update = function(e) {
					if (this.finalized) throw new Error("finalize already called");
					var t, n = typeof e;
					if ("string" !== n) {
						if ("object" !== n) throw new Error(o);
						if (null === e) throw new Error(o);
						if (l && e.constructor === ArrayBuffer) e = new Uint8Array(e);
						else if (!(Array.isArray(e) || l && ArrayBuffer.isView(e))) throw new Error(o);
						t = !0
					}
					for (var r, s, i = this.blocks, a = this.byteCount, u = e.length, c = this.blockCount, f = 0, h = this.s; f <
						u;) {
						if (this.reset)
							for (this.reset = !1, i[0] = this.block, r = 1; r < c + 1; ++r) i[r] = 0;
						if (t)
							for (r = this.start; f < u && r < a; ++f) i[r >> 2] |= e[f] << g[3 & r++];
						else
							for (r = this.start; f < u && r < a; ++f)(s = e.charCodeAt(f)) < 128 ? i[r >> 2] |= s << g[3 & r++] : s <
								2048 ? (i[r >> 2] |= (192 | s >> 6) << g[3 & r++], i[r >> 2] |= (128 | 63 & s) << g[3 & r++]) : s <
								55296 || s >= 57344 ? (i[r >> 2] |= (224 | s >> 12) << g[3 & r++], i[r >> 2] |= (128 | s >> 6 & 63) << g[
									3 & r++], i[r >> 2] |= (128 | 63 & s) << g[3 & r++]) : (s = 65536 + ((1023 & s) << 10 | 1023 & e.charCodeAt(
									++f)), i[r >> 2] |= (240 | s >> 18) << g[3 & r++], i[r >> 2] |= (128 | s >> 12 & 63) << g[3 & r++], i[
									r >> 2] |= (128 | s >> 6 & 63) << g[3 & r++], i[r >> 2] |= (128 | 63 & s) << g[3 & r++]);
						if (this.lastByteIndex = r, r >= a) {
							for (this.start = r - a, this.block = i[c], r = 0; r < c; ++r) h[r] ^= i[r];
							j(h), this.reset = !0
						} else this.start = r
					}
					return this
				}, D.prototype.encode = function(e, t) {
					var n = 255 & e,
						r = 1,
						s = [n];
					for (n = 255 & (e >>= 8); n > 0;) s.unshift(n), n = 255 & (e >>= 8), ++r;
					return t ? s.push(r) : s.unshift(r), this.update(s), s.length
				}, D.prototype.encodeString = function(e) {
					var t, n = typeof e;
					if ("string" !== n) {
						if ("object" !== n) throw new Error(o);
						if (null === e) throw new Error(o);
						if (l && e.constructor === ArrayBuffer) e = new Uint8Array(e);
						else if (!(Array.isArray(e) || l && ArrayBuffer.isView(e))) throw new Error(o);
						t = !0
					}
					var r = 0,
						s = e.length;
					if (t) r = s;
					else
						for (var i = 0; i < e.length; ++i) {
							var a = e.charCodeAt(i);
							a < 128 ? r += 1 : a < 2048 ? r += 2 : a < 55296 || a >= 57344 ? r += 3 : (a = 65536 + ((1023 & a) << 10 |
								1023 & e.charCodeAt(++i)), r += 4)
						}
					return r += this.encode(8 * r), this.update(e), r
				}, D.prototype.bytepad = function(e, t) {
					for (var n = this.encode(t), r = 0; r < e.length; ++r) n += this.encodeString(e[r]);
					var s = t - n % t,
						i = [];
					return i.length = s, this.update(i), this
				}, D.prototype.finalize = function() {
					if (!this.finalized) {
						this.finalized = !0;
						var e = this.blocks,
							t = this.lastByteIndex,
							n = this.blockCount,
							r = this.s;
						if (e[t >> 2] |= this.padding[3 & t], this.lastByteIndex === this.byteCount)
							for (e[0] = e[n], t = 1; t < n + 1; ++t) e[t] = 0;
						for (e[n - 1] |= 2147483648, t = 0; t < n; ++t) r[t] ^= e[t];
						j(r)
					}
				}, D.prototype.toString = D.prototype.hex = function() {
					this.finalize();
					for (var e, t = this.blockCount, n = this.s, r = this.outputBlocks, s = this.extraBytes, i = 0, o = 0, a =
							""; o < r;) {
						for (i = 0; i < t && o < r; ++i, ++o) e = n[i], a += p[e >> 4 & 15] + p[15 & e] + p[e >> 12 & 15] + p[e >>
							8 & 15] + p[e >> 20 & 15] + p[e >> 16 & 15] + p[e >> 28 & 15] + p[e >> 24 & 15];
						o % t == 0 && (j(n), i = 0)
					}
					return s && (e = n[i], a += p[e >> 4 & 15] + p[15 & e], s > 1 && (a += p[e >> 12 & 15] + p[e >> 8 & 15]), s >
						2 && (a += p[e >> 20 & 15] + p[e >> 16 & 15])), a
				}, D.prototype.arrayBuffer = function() {
					this.finalize();
					var e, t = this.blockCount,
						n = this.s,
						r = this.outputBlocks,
						s = this.extraBytes,
						i = 0,
						o = 0,
						a = this.outputBits >> 3;
					e = s ? new ArrayBuffer(r + 1 << 2) : new ArrayBuffer(a);
					for (var u = new Uint32Array(e); o < r;) {
						for (i = 0; i < t && o < r; ++i, ++o) u[o] = n[i];
						o % t == 0 && j(n)
					}
					return s && (u[i] = n[i], e = e.slice(0, a)), e
				}, D.prototype.buffer = D.prototype.arrayBuffer, D.prototype.digest = D.prototype.array = function() {
					this.finalize();
					for (var e, t, n = this.blockCount, r = this.s, s = this.outputBlocks, i = this.extraBytes, o = 0, a = 0, u = []; a <
						s;) {
						for (o = 0; o < n && a < s; ++o, ++a) e = a << 2, t = r[o], u[e] = 255 & t, u[e + 1] = t >> 8 & 255, u[e +
							2] = t >> 16 & 255, u[e + 3] = t >> 24 & 255;
						a % n == 0 && j(r)
					}
					return i && (e = a << 2, t = r[o], u[e] = 255 & t, i > 1 && (u[e + 1] = t >> 8 & 255), i > 2 && (u[e + 2] =
						t >> 16 & 255)), u
				}, B.prototype = new D, B.prototype.finalize = function() {
					return this.encode(this.outputBits, !0), D.prototype.finalize.call(this)
				};
				var j = function(e) {
					var t, n, r, s, i, o, a, u, c, f, h, l, p, d, g, b, y, w, k, E, v, S, _, A, x, N, I, O, T, P, R, U, C, L, D,
						B, j, F, M, H, G, z, $, Y, V, K, W, q, X, J, Z, Q, ee, te, ne, re, se, ie, oe, ae, ue, ce, fe;
					for (r = 0; r < 48; r += 2) s = e[0] ^ e[10] ^ e[20] ^ e[30] ^ e[40], i = e[1] ^ e[11] ^ e[21] ^ e[31] ^ e[
							41], o = e[2] ^ e[12] ^ e[22] ^ e[32] ^ e[42], a = e[3] ^ e[13] ^ e[23] ^ e[33] ^ e[43], u = e[4] ^ e[14] ^
						e[24] ^ e[34] ^ e[44], c = e[5] ^ e[15] ^ e[25] ^ e[35] ^ e[45], f = e[6] ^ e[16] ^ e[26] ^ e[36] ^ e[46],
						h = e[7] ^ e[17] ^ e[27] ^ e[37] ^ e[47], t = (l = e[8] ^ e[18] ^ e[28] ^ e[38] ^ e[48]) ^ (o << 1 | a >>>
							31), n = (p = e[9] ^ e[19] ^ e[29] ^ e[39] ^ e[49]) ^ (a << 1 | o >>> 31), e[0] ^= t, e[1] ^= n, e[10] ^=
						t, e[11] ^= n, e[20] ^= t, e[21] ^= n, e[30] ^= t, e[31] ^= n, e[40] ^= t, e[41] ^= n, t = s ^ (u << 1 | c >>>
							31), n = i ^ (c << 1 | u >>> 31), e[2] ^= t, e[3] ^= n, e[12] ^= t, e[13] ^= n, e[22] ^= t, e[23] ^= n, e[
							32] ^= t, e[33] ^= n, e[42] ^= t, e[43] ^= n, t = o ^ (f << 1 | h >>> 31), n = a ^ (h << 1 | f >>> 31), e[
							4] ^= t, e[5] ^= n, e[14] ^= t, e[15] ^= n, e[24] ^= t, e[25] ^= n, e[34] ^= t, e[35] ^= n, e[44] ^= t, e[
							45] ^= n, t = u ^ (l << 1 | p >>> 31), n = c ^ (p << 1 | l >>> 31), e[6] ^= t, e[7] ^= n, e[16] ^= t, e[
							17] ^= n, e[26] ^= t, e[27] ^= n, e[36] ^= t, e[37] ^= n, e[46] ^= t, e[47] ^= n, t = f ^ (s << 1 | i >>>
							31), n = h ^ (i << 1 | s >>> 31), e[8] ^= t, e[9] ^= n, e[18] ^= t, e[19] ^= n, e[28] ^= t, e[29] ^= n, e[
							38] ^= t, e[39] ^= n, e[48] ^= t, e[49] ^= n, d = e[0], g = e[1], K = e[11] << 4 | e[10] >>> 28, W = e[10] <<
						4 | e[11] >>> 28, O = e[20] << 3 | e[21] >>> 29, T = e[21] << 3 | e[20] >>> 29, ae = e[31] << 9 | e[30] >>>
						23, ue = e[30] << 9 | e[31] >>> 23, z = e[40] << 18 | e[41] >>> 14, $ = e[41] << 18 | e[40] >>> 14, L = e[
							2] << 1 | e[3] >>> 31, D = e[3] << 1 | e[2] >>> 31, b = e[13] << 12 | e[12] >>> 20, y = e[12] << 12 | e[
							13] >>> 20, q = e[22] << 10 | e[23] >>> 22, X = e[23] << 10 | e[22] >>> 22, P = e[33] << 13 | e[32] >>>
						19, R = e[32] << 13 | e[33] >>> 19, ce = e[42] << 2 | e[43] >>> 30, fe = e[43] << 2 | e[42] >>> 30, te = e[
							5] << 30 | e[4] >>> 2, ne = e[4] << 30 | e[5] >>> 2, B = e[14] << 6 | e[15] >>> 26, j = e[15] << 6 | e[14] >>>
						26, w = e[25] << 11 | e[24] >>> 21, k = e[24] << 11 | e[25] >>> 21, J = e[34] << 15 | e[35] >>> 17, Z = e[
							35] << 15 | e[34] >>> 17, U = e[45] << 29 | e[44] >>> 3, C = e[44] << 29 | e[45] >>> 3, A = e[6] << 28 |
						e[7] >>> 4, x = e[7] << 28 | e[6] >>> 4, re = e[17] << 23 | e[16] >>> 9, se = e[16] << 23 | e[17] >>> 9, F =
						e[26] << 25 | e[27] >>> 7, M = e[27] << 25 | e[26] >>> 7, E = e[36] << 21 | e[37] >>> 11, v = e[37] << 21 |
						e[36] >>> 11, Q = e[47] << 24 | e[46] >>> 8, ee = e[46] << 24 | e[47] >>> 8, Y = e[8] << 27 | e[9] >>> 5,
						V = e[9] << 27 | e[8] >>> 5, N = e[18] << 20 | e[19] >>> 12, I = e[19] << 20 | e[18] >>> 12, ie = e[29] <<
						7 | e[28] >>> 25, oe = e[28] << 7 | e[29] >>> 25, H = e[38] << 8 | e[39] >>> 24, G = e[39] << 8 | e[38] >>>
						24, S = e[48] << 14 | e[49] >>> 18, _ = e[49] << 14 | e[48] >>> 18, e[0] = d ^ ~b & w, e[1] = g ^ ~y & k,
						e[10] = A ^ ~N & O, e[11] = x ^ ~I & T, e[20] = L ^ ~B & F, e[21] = D ^ ~j & M, e[30] = Y ^ ~K & q, e[31] =
						V ^ ~W & X, e[40] = te ^ ~re & ie, e[41] = ne ^ ~se & oe, e[2] = b ^ ~w & E, e[3] = y ^ ~k & v, e[12] = N ^
						~O & P, e[13] = I ^ ~T & R, e[22] = B ^ ~F & H, e[23] = j ^ ~M & G, e[32] = K ^ ~q & J, e[33] = W ^ ~X & Z,
						e[42] = re ^ ~ie & ae, e[43] = se ^ ~oe & ue, e[4] = w ^ ~E & S, e[5] = k ^ ~v & _, e[14] = O ^ ~P & U, e[
							15] = T ^ ~R & C, e[24] = F ^ ~H & z, e[25] = M ^ ~G & $, e[34] = q ^ ~J & Q, e[35] = X ^ ~Z & ee, e[44] =
						ie ^ ~ae & ce, e[45] = oe ^ ~ue & fe, e[6] = E ^ ~S & d, e[7] = v ^ ~_ & g, e[16] = P ^ ~U & A, e[17] = R ^
						~C & x, e[26] = H ^ ~z & L, e[27] = G ^ ~$ & D, e[36] = J ^ ~Q & Y, e[37] = Z ^ ~ee & V, e[46] = ae ^ ~ce &
						te, e[47] = ue ^ ~fe & ne, e[8] = S ^ ~d & b, e[9] = _ ^ ~g & y, e[18] = U ^ ~A & N, e[19] = C ^ ~x & I, e[
							28] = z ^ ~L & B, e[29] = $ ^ ~D & j, e[38] = Q ^ ~Y & K, e[39] = ee ^ ~V & W, e[48] = ce ^ ~te & re, e[
							49] = fe ^ ~ne & se, e[0] ^= m[r], e[1] ^= m[r + 1]
				};
				if (f) e.exports = I;
				else {
					for (T = 0; T < O.length; ++T) u[O[T]] = I[O[T]];
					h && (void 0 === (i = function() {
						return I
					}.call(t, n, t, e)) || (e.exports = i))
				}
			}()
		}).call(this, n(28), n(31))
	}, function(e, t) {
		(function(t) {
			e.exports = t
		}).call(this, {})
	}, function(e, t, n) {
		"use strict";
		e.exports = n(179)
	}, function(e, t, n) {
		"use strict";
		! function(n, r) {
			var s = {
				version: "3.0.0",
				x86: {},
				x64: {},
				inputValidation: !0
			};

			function i(e) {
				if (!Array.isArray(e) && !ArrayBuffer.isView(e)) return !1;
				for (var t = 0; t < e.length; t++)
					if (!Number.isInteger(e[t]) || e[t] < 0 || e[t] > 255) return !1;
				return !0
			}

			function o(e, t) {
				return (65535 & e) * t + (((e >>> 16) * t & 65535) << 16)
			}

			function a(e, t) {
				return e << t | e >>> 32 - t
			}

			function u(e) {
				return e = o(e ^= e >>> 16, 2246822507), e = o(e ^= e >>> 13, 3266489909), e ^= e >>> 16
			}

			function c(e, t) {
				e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 &
					t[1]
				];
				var n = [0, 0, 0, 0];
				return n[3] += e[3] + t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] + t[2], n[1] += n[2] >>> 16, n[2] &=
					65535, n[1] += e[1] + t[1], n[0] += n[1] >>> 16, n[1] &= 65535, n[0] += e[0] + t[0], n[0] &= 65535, [n[0] <<
						16 | n[1], n[2] << 16 | n[3]
					]
			}

			function f(e, t) {
				e = [e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1]], t = [t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 &
					t[1]
				];
				var n = [0, 0, 0, 0];
				return n[3] += e[3] * t[3], n[2] += n[3] >>> 16, n[3] &= 65535, n[2] += e[2] * t[3], n[1] += n[2] >>> 16, n[2] &=
					65535, n[2] += e[3] * t[2], n[1] += n[2] >>> 16, n[2] &= 65535, n[1] += e[1] * t[3], n[0] += n[1] >>> 16, n[1] &=
					65535, n[1] += e[2] * t[2], n[0] += n[1] >>> 16, n[1] &= 65535, n[1] += e[3] * t[1], n[0] += n[1] >>> 16, n[1] &=
					65535, n[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0], n[0] &= 65535, [n[0] << 16 | n[1], n[2] <<
						16 | n[3]
					]
			}

			function h(e, t) {
				return 32 === (t %= 64) ? [e[1], e[0]] : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t] :
					(t -= 32, [e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t])
			}

			function l(e, t) {
				return 0 === (t %= 64) ? e : t < 32 ? [e[0] << t | e[1] >>> 32 - t, e[1] << t] : [e[1] << t - 32, 0]
			}

			function p(e, t) {
				return [e[0] ^ t[0], e[1] ^ t[1]]
			}

			function d(e) {
				return e = p(e, [0, e[0] >>> 1]), e = p(e = f(e, [4283543511, 3981806797]), [0, e[0] >>> 1]), e = p(e = f(e, [
					3301882366, 444984403
				]), [0, e[0] >>> 1])
			}
			s.x86.hash32 = function(e, t) {
				if (!s.inputValidation || i(e)) {
					t = t || 0;
					for (var n = e.length % 4, r = e.length - n, c = t, f = 0, h = 3432918353, l = 461845907, p = 0; p < r; p +=
						4) f = o(f = e[p] | e[p + 1] << 8 | e[p + 2] << 16 | e[p + 3] << 24, h), f = o(f = a(f, 15), l), c = o(c =
						a(c ^= f, 13), 5) + 3864292196;
					switch (f = 0, n) {
						case 3:
							f ^= e[p + 2] << 16;
						case 2:
							f ^= e[p + 1] << 8;
						case 1:
							f = o(f ^= e[p], h), c ^= f = o(f = a(f, 15), l)
					}
					return (c = u(c ^= e.length)) >>> 0
				}
			}, s.x86.hash128 = function(e, t) {
				if (!s.inputValidation || i(e)) {
					t = t || 0;
					for (var n = e.length % 16, r = e.length - n, c = t, f = t, h = t, l = t, p = 0, d = 0, g = 0, m = 0, b =
							597399067, y = 2869860233, w = 951274213, k = 2716044179, E = 0; E < r; E += 16) p = e[E] | e[E + 1] << 8 |
						e[E + 2] << 16 | e[E + 3] << 24, d = e[E + 4] | e[E + 5] << 8 | e[E + 6] << 16 | e[E + 7] << 24, g = e[E +
							8] | e[E + 9] << 8 | e[E + 10] << 16 | e[E + 11] << 24, m = e[E + 12] | e[E + 13] << 8 | e[E + 14] << 16 |
						e[E + 15] << 24, p = a(p = o(p, b), 15), c = a(c ^= p = o(p, y), 19), c = o(c += f, 5) + 1444728091, d = a(
							d = o(d, y), 16), f = a(f ^= d = o(d, w), 17), f = o(f += h, 5) + 197830471, g = a(g = o(g, w), 17), h = a(
							h ^= g = o(g, k), 15), h = o(h += l, 5) + 2530024501, m = a(m = o(m, k), 18), l = a(l ^= m = o(m, b), 13),
						l = o(l += c, 5) + 850148119;
					switch (p = 0, d = 0, g = 0, m = 0, n) {
						case 15:
							m ^= e[E + 14] << 16;
						case 14:
							m ^= e[E + 13] << 8;
						case 13:
							m = o(m ^= e[E + 12], k), l ^= m = o(m = a(m, 18), b);
						case 12:
							g ^= e[E + 11] << 24;
						case 11:
							g ^= e[E + 10] << 16;
						case 10:
							g ^= e[E + 9] << 8;
						case 9:
							g = o(g ^= e[E + 8], w), h ^= g = o(g = a(g, 17), k);
						case 8:
							d ^= e[E + 7] << 24;
						case 7:
							d ^= e[E + 6] << 16;
						case 6:
							d ^= e[E + 5] << 8;
						case 5:
							d = o(d ^= e[E + 4], y), f ^= d = o(d = a(d, 16), w);
						case 4:
							p ^= e[E + 3] << 24;
						case 3:
							p ^= e[E + 2] << 16;
						case 2:
							p ^= e[E + 1] << 8;
						case 1:
							p = o(p ^= e[E], b), c ^= p = o(p = a(p, 15), y)
					}
					return c ^= e.length, c += f ^= e.length, c += h ^= e.length, f += c += l ^= e.length, h += c, l += c, c = u(
							c), c += f = u(f), c += h = u(h), f += c += l = u(l), h += c, l += c, ("00000000" + (c >>> 0).toString(16))
						.slice(-8) + ("00000000" + (f >>> 0).toString(16)).slice(-8) + ("00000000" + (h >>> 0).toString(16)).slice(
							-8) + ("00000000" + (l >>> 0).toString(16)).slice(-8)
				}
			}, s.x64.hash128 = function(e, t) {
				if (!s.inputValidation || i(e)) {
					t = t || 0;
					for (var n = e.length % 16, r = e.length - n, o = [0, t], a = [0, t], u = [0, 0], g = [0, 0], m = [
							2277735313, 289559509
						], b = [1291169091, 658871167], y = 0; y < r; y += 16) u = [e[y + 4] | e[y + 5] << 8 | e[y + 6] << 16 | e[y +
						7] << 24, e[y] | e[y + 1] << 8 | e[y + 2] << 16 | e[y + 3] << 24], g = [e[y + 12] | e[y + 13] << 8 | e[y +
						14] << 16 | e[y + 15] << 24, e[y + 8] | e[y + 9] << 8 | e[y + 10] << 16 | e[y + 11] << 24], u = h(u = f(u,
						m), 31), o = c(o = h(o = p(o, u = f(u, b)), 27), a), o = c(f(o, [0, 5]), [0, 1390208809]), g = h(g = f(g,
						b), 33), a = c(a = h(a = p(a, g = f(g, m)), 31), o), a = c(f(a, [0, 5]), [0, 944331445]);
					switch (u = [0, 0], g = [0, 0], n) {
						case 15:
							g = p(g, l([0, e[y + 14]], 48));
						case 14:
							g = p(g, l([0, e[y + 13]], 40));
						case 13:
							g = p(g, l([0, e[y + 12]], 32));
						case 12:
							g = p(g, l([0, e[y + 11]], 24));
						case 11:
							g = p(g, l([0, e[y + 10]], 16));
						case 10:
							g = p(g, l([0, e[y + 9]], 8));
						case 9:
							g = f(g = p(g, [0, e[y + 8]]), b), a = p(a, g = f(g = h(g, 33), m));
						case 8:
							u = p(u, l([0, e[y + 7]], 56));
						case 7:
							u = p(u, l([0, e[y + 6]], 48));
						case 6:
							u = p(u, l([0, e[y + 5]], 40));
						case 5:
							u = p(u, l([0, e[y + 4]], 32));
						case 4:
							u = p(u, l([0, e[y + 3]], 24));
						case 3:
							u = p(u, l([0, e[y + 2]], 16));
						case 2:
							u = p(u, l([0, e[y + 1]], 8));
						case 1:
							u = f(u = p(u, [0, e[y]]), m), o = p(o, u = f(u = h(u, 31), b))
					}
					return o = c(o = p(o, [0, e.length]), a = p(a, [0, e.length])), a = c(a, o), o = c(o = d(o), a = d(a)), a =
						c(a, o), ("00000000" + (o[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (o[1] >>> 0).toString(16)).slice(
							-8) + ("00000000" + (a[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (a[1] >>> 0).toString(16)).slice(
							-8)
				}
			}, e.exports && (t = e.exports = s), t.murmurHash3 = s
		}()
	}, function(e, t, n) {
		"use strict";
		const r = n(13),
			s = self.crypto || self.msCrypto,
			i = async (e, t) => {
				if ("undefined" == typeof self || !self.crypto && !self.msCrypto) throw new Error(
					"Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context"
				);
				switch (t) {
					case "sha1":
						return new Uint8Array(await s.subtle.digest({
							name: "SHA-1"
						}, e));
					case "sha2-256":
						return new Uint8Array(await s.subtle.digest({
							name: "SHA-256"
						}, e));
					case "sha2-512":
						return new Uint8Array(await s.subtle.digest({
							name: "SHA-512"
						}, e));
					case "dbl-sha2-256":
						{
							const t = await s.subtle.digest({
								name: "SHA-256"
							}, e);
							return new Uint8Array(await s.subtle.digest({
								name: "SHA-256"
							}, t))
						}
					default:
						throw new Error(t + " is not a supported algorithm")
				}
			};
		e.exports = {
			factory: e => async t => i(t, e),
			digest: i,
			multihashing: async (e, t, n) => {
				const s = await i(e, t);
				return r.encode(s, t, n)
			}
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = {
			fromNumberTo32BitBuf: e => {
				const t = new Uint8Array(4);
				for (let n = 0; n < 4; n++) t[n] = 255 & e, e >>= 8;
				return t
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(183),
			s = {
				init: r.blake2bInit,
				update: r.blake2bUpdate,
				digest: r.blake2bFinal
			},
			i = {
				init: r.blake2sInit,
				update: r.blake2sUpdate,
				digest: r.blake2sFinal
			},
			o = (e, t) => async n => {
				const r = t.init(e, null);
				return t.update(r, n), t.digest(r)
			};
		e.exports = e => {
			for (let t = 0; t < 64; t++) e[45569 + t] = o(t + 1, s);
			for (let t = 0; t < 32; t++) e[45633 + t] = o(t + 1, i)
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(184),
			s = n(185);
		e.exports = {
			blake2b: r.blake2b,
			blake2bHex: r.blake2bHex,
			blake2bInit: r.blake2bInit,
			blake2bUpdate: r.blake2bUpdate,
			blake2bFinal: r.blake2bFinal,
			blake2s: s.blake2s,
			blake2sHex: s.blake2sHex,
			blake2sInit: s.blake2sInit,
			blake2sUpdate: s.blake2sUpdate,
			blake2sFinal: s.blake2sFinal
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(62);

		function s(e, t, n) {
			var r = e[t] + e[n],
				s = e[t + 1] + e[n + 1];
			r >= 4294967296 && s++, e[t] = r, e[t + 1] = s
		}

		function i(e, t, n, r) {
			var s = e[t] + n;
			n < 0 && (s += 4294967296);
			var i = e[t + 1] + r;
			s >= 4294967296 && i++, e[t] = s, e[t + 1] = i
		}

		function o(e, t) {
			return e[t] ^ e[t + 1] << 8 ^ e[t + 2] << 16 ^ e[t + 3] << 24
		}

		function a(e, t, n, r, o, a) {
			var u = h[o],
				c = h[o + 1],
				l = h[a],
				p = h[a + 1];
			s(f, e, t), i(f, e, u, c);
			var d = f[r] ^ f[e],
				g = f[r + 1] ^ f[e + 1];
			f[r] = g, f[r + 1] = d, s(f, n, r), d = f[t] ^ f[n], g = f[t + 1] ^ f[n + 1], f[t] = d >>> 24 ^ g << 8, f[t + 1] =
				g >>> 24 ^ d << 8, s(f, e, t), i(f, e, l, p), d = f[r] ^ f[e], g = f[r + 1] ^ f[e + 1], f[r] = d >>> 16 ^ g <<
				16, f[r + 1] = g >>> 16 ^ d << 16, s(f, n, r), d = f[t] ^ f[n], g = f[t + 1] ^ f[n + 1], f[t] = g >>> 31 ^ d <<
				1, f[t + 1] = d >>> 31 ^ g << 1
		}
		var u = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129,
				2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225
			]),
			c = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0,
				2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10,
				4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15,
				14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6,
				2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12,
				13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7,
				5, 3
			].map((function(e) {
				return 2 * e
			}))),
			f = new Uint32Array(32),
			h = new Uint32Array(32);

		function l(e, t) {
			var n = 0;
			for (n = 0; n < 16; n++) f[n] = e.h[n], f[n + 16] = u[n];
			for (f[24] = f[24] ^ e.t, f[25] = f[25] ^ e.t / 4294967296, t && (f[28] = ~f[28], f[29] = ~f[29]), n = 0; n <
				32; n++) h[n] = o(e.b, 4 * n);
			for (n = 0; n < 12; n++) a(0, 8, 16, 24, c[16 * n + 0], c[16 * n + 1]), a(2, 10, 18, 26, c[16 * n + 2], c[16 *
				n + 3]), a(4, 12, 20, 28, c[16 * n + 4], c[16 * n + 5]), a(6, 14, 22, 30, c[16 * n + 6], c[16 * n + 7]), a(0,
				10, 20, 30, c[16 * n + 8], c[16 * n + 9]), a(2, 12, 22, 24, c[16 * n + 10], c[16 * n + 11]), a(4, 14, 16, 26,
				c[16 * n + 12], c[16 * n + 13]), a(6, 8, 18, 28, c[16 * n + 14], c[16 * n + 15]);
			for (n = 0; n < 16; n++) e.h[n] = e.h[n] ^ f[n] ^ f[n + 16]
		}

		function p(e, t) {
			if (0 === e || e > 64) throw new Error("Illegal output length, expected 0 < length <= 64");
			if (t && t.length > 64) throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
			for (var n = {
					b: new Uint8Array(128),
					h: new Uint32Array(16),
					t: 0,
					c: 0,
					outlen: e
				}, r = 0; r < 16; r++) n.h[r] = u[r];
			var s = t ? t.length : 0;
			return n.h[0] ^= 16842752 ^ s << 8 ^ e, t && (d(n, t), n.c = 128), n
		}

		function d(e, t) {
			for (var n = 0; n < t.length; n++) 128 === e.c && (e.t += e.c, l(e, !1), e.c = 0), e.b[e.c++] = t[n]
		}

		function g(e) {
			for (e.t += e.c; e.c < 128;) e.b[e.c++] = 0;
			l(e, !0);
			for (var t = new Uint8Array(e.outlen), n = 0; n < e.outlen; n++) t[n] = e.h[n >> 2] >> 8 * (3 & n);
			return t
		}

		function m(e, t, n) {
			n = n || 64, e = r.normalizeInput(e);
			var s = p(n, t);
			return d(s, e), g(s)
		}
		e.exports = {
			blake2b: m,
			blake2bHex: function(e, t, n) {
				var s = m(e, t, n);
				return r.toHex(s)
			},
			blake2bInit: p,
			blake2bUpdate: d,
			blake2bFinal: g
		}
	}, function(e, t, n) {
		"use strict";
		var r = n(62);

		function s(e, t) {
			return e[t] ^ e[t + 1] << 8 ^ e[t + 2] << 16 ^ e[t + 3] << 24
		}

		function i(e, t, n, r, s, i) {
			c[e] = c[e] + c[t] + s, c[r] = o(c[r] ^ c[e], 16), c[n] = c[n] + c[r], c[t] = o(c[t] ^ c[n], 12), c[e] = c[e] +
				c[t] + i, c[r] = o(c[r] ^ c[e], 8), c[n] = c[n] + c[r], c[t] = o(c[t] ^ c[n], 7)
		}

		function o(e, t) {
			return e >>> t ^ e << 32 - t
		}
		var a = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635,
				1541459225
			]),
			u = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0,
				2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10,
				4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15,
				14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6,
				2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12,
				13, 0
			]),
			c = new Uint32Array(16),
			f = new Uint32Array(16);

		function h(e, t) {
			var n = 0;
			for (n = 0; n < 8; n++) c[n] = e.h[n], c[n + 8] = a[n];
			for (c[12] ^= e.t, c[13] ^= e.t / 4294967296, t && (c[14] = ~c[14]), n = 0; n < 16; n++) f[n] = s(e.b, 4 * n);
			for (n = 0; n < 10; n++) i(0, 4, 8, 12, f[u[16 * n + 0]], f[u[16 * n + 1]]), i(1, 5, 9, 13, f[u[16 * n + 2]], f[
				u[16 * n + 3]]), i(2, 6, 10, 14, f[u[16 * n + 4]], f[u[16 * n + 5]]), i(3, 7, 11, 15, f[u[16 * n + 6]], f[u[
				16 * n + 7]]), i(0, 5, 10, 15, f[u[16 * n + 8]], f[u[16 * n + 9]]), i(1, 6, 11, 12, f[u[16 * n + 10]], f[u[16 *
				n + 11]]), i(2, 7, 8, 13, f[u[16 * n + 12]], f[u[16 * n + 13]]), i(3, 4, 9, 14, f[u[16 * n + 14]], f[u[16 * n +
				15]]);
			for (n = 0; n < 8; n++) e.h[n] ^= c[n] ^ c[n + 8]
		}

		function l(e, t) {
			if (!(e > 0 && e <= 32)) throw new Error("Incorrect output length, should be in [1, 32]");
			var n = t ? t.length : 0;
			if (t && !(n > 0 && n <= 32)) throw new Error("Incorrect key length, should be in [1, 32]");
			var r = {
				h: new Uint32Array(a),
				b: new Uint32Array(64),
				c: 0,
				t: 0,
				outlen: e
			};
			return r.h[0] ^= 16842752 ^ n << 8 ^ e, n > 0 && (p(r, t), r.c = 64), r
		}

		function p(e, t) {
			for (var n = 0; n < t.length; n++) 64 === e.c && (e.t += e.c, h(e, !1), e.c = 0), e.b[e.c++] = t[n]
		}

		function d(e) {
			for (e.t += e.c; e.c < 64;) e.b[e.c++] = 0;
			h(e, !0);
			for (var t = new Uint8Array(e.outlen), n = 0; n < e.outlen; n++) t[n] = e.h[n >> 2] >> 8 * (3 & n) & 255;
			return t
		}

		function g(e, t, n) {
			n = n || 32, e = r.normalizeInput(e);
			var s = l(n, t);
			return p(s, e), d(s)
		}
		e.exports = {
			blake2s: g,
			blake2sHex: function(e, t, n) {
				var s = g(e, t, n);
				return r.toHex(s)
			},
			blake2sInit: l,
			blake2sUpdate: p,
			blake2sFinal: d
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(57),
			s = n(63);
		e.exports = (e, t) => {
			const n = (e => {
				if (s.isDAGLink(e)) return e;
				if (!("cid" in e || "hash" in e || "Hash" in e || "multihash" in e)) throw new Error(
					"Link must be a DAGLink or DAGLink-like. Convert the DAGNode into a DAGLink via `node.toDAGLink()`.");
				return new s(e.Name || e.name, e.Tsize || e.size, e.Hash || e.multihash || e.hash || e.cid)
			})(t);
			e.Links.push(n), r(e.Links)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(16);
		e.exports.createDagLinkFromB58EncodedHash = function(e) {
			return new r(e.Name || e.name || "", e.Tsize || e.Size || e.size || 0, e.Hash || e.hash || e.multihash || e.cid)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(25);
		e.exports = (e, t) => {
			let n = null;
			if ("string" == typeof t ? n = e => e.Name === t : (t instanceof Uint8Array || r.isCID(t)) && (n = e => s(e.Hash,
					t)), !n) throw new Error("second arg needs to be a name or CID"); {
				const t = e.Links;
				let r = 0;
				for (; r < t.length;) {
					n(t[r]) ? t.splice(r, 1) : r++
				}
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(64);
		t.resolve = (e, t) => {
			let n = s.deserialize(e);
			const i = t.split("/").filter(Boolean);
			for (; i.length;) {
				const e = i.shift();
				if (void 0 === n[e]) {
					for (const t of n.Links)
						if (t.Name === e) return {
							value: t.Hash,
							remainderPath: i.join("/")
						};
					throw new Error(`Object has no property '${e}'`)
				}
				if (n = n[e], r.isCID(n)) return {
					value: n,
					remainderPath: i.join("/")
				}
			}
			return {
				value: n,
				remainderPath: ""
			}
		}, t.tree = function*(e) {
			const t = s.deserialize(e);
			yield "Data", yield "Links";
			for (let n = 0; n < t.Links.length; n++) yield "Links/" + n, yield `Links/${n}/Name`, yield `Links/${n}/Tsize`,
				yield `Links/${n}/Hash`
		}
	}, function(e, t, n) {
		"use strict";
		t.Diagnose = n(191), t.Decoder = n(67), t.Encoder = n(193), t.Simple = n(68), t.Tagged = n(69), t.decodeAll = t.Decoder
			.decodeAll, t.decodeFirst = t.Decoder.decodeFirst, t.diagnose = t.Diagnose.diagnose, t.encode = t.Encoder.encode,
			t.decode = t.Decoder.decode, t.leveldb = {
				decode: t.Decoder.decodeAll,
				encode: t.Encoder.encode,
				buffer: !0,
				name: "cbor"
			}
	}, function(e, t, n) {
		"use strict";
		const {
			Buffer: r
		} = n(12), s = n(67), i = n(39);
		class o extends s {
			createTag(e, t) {
				return `${e}(${t})`
			}
			createInt(e) {
				return super.createInt(e).toString()
			}
			createInt32(e, t) {
				return super.createInt32(e, t).toString()
			}
			createInt64(e, t, n, r) {
				return super.createInt64(e, t, n, r).toString()
			}
			createInt32Neg(e, t) {
				return super.createInt32Neg(e, t).toString()
			}
			createInt64Neg(e, t, n, r) {
				return super.createInt64Neg(e, t, n, r).toString()
			}
			createTrue() {
				return "true"
			}
			createFalse() {
				return "false"
			}
			createFloat(e) {
				const t = super.createFloat(e);
				return i.isNegativeZero(e) ? "-0_1" : t + "_1"
			}
			createFloatSingle(e, t, n, r) {
				return super.createFloatSingle(e, t, n, r) + "_2"
			}
			createFloatDouble(e, t, n, r, s, i, o, a) {
				return super.createFloatDouble(e, t, n, r, s, i, o, a) + "_3"
			}
			createByteString(e, t) {
				const n = e.join(", ");
				return -1 === t ? `(_ ${n})` : "h'" + n
			}
			createByteStringFromHeap(e, t) {
				return `h'${r.from(super.createByteStringFromHeap(e,t)).toString("hex")}'`
			}
			createInfinity() {
				return "Infinity_1"
			}
			createInfinityNeg() {
				return "-Infinity_1"
			}
			createNaN() {
				return "NaN_1"
			}
			createNaNNeg() {
				return "-NaN_1"
			}
			createNull() {
				return "null"
			}
			createUndefined() {
				return "undefined"
			}
			createSimpleUnassigned(e) {
				return `simple(${e})`
			}
			createArray(e, t) {
				const n = super.createArray(e, t);
				return -1 === t ? `[_ ${n.join(", ")}]` : `[${n.join(", ")}]`
			}
			createMap(e, t) {
				const n = super.createMap(e),
					r = Array.from(n.keys()).reduce(a(n), "");
				return -1 === t ? `{_ ${r}}` : `{${r}}`
			}
			createObject(e, t) {
				const n = super.createObject(e),
					r = Object.keys(n).reduce(a(n), "");
				return -1 === t ? `{_ ${r}}` : `{${r}}`
			}
			createUtf8String(e, t) {
				const n = e.join(", ");
				return -1 === t ? `(_ ${n})` : `"${n}"`
			}
			createUtf8StringFromHeap(e, t) {
				return `"${r.from(super.createUtf8StringFromHeap(e,t)).toString("utf8")}"`
			}
			static diagnose(e, t) {
				"string" == typeof e && (e = r.from(e, t || "hex"));
				return (new o).decodeFirst(e)
			}
		}

		function a(e) {
			return (t, n) => t ? `${t}, ${n}: ${e[n]}` : `${n}: ${e[n]}`
		}
		e.exports = o
	}, function(e, t, n) {
		"use strict";
		e.exports = function(e, t, n) {
			"use asm";
			var r = new e.Uint8Array(n);
			var s = t.pushInt;
			var i = t.pushInt32;
			var o = t.pushInt32Neg;
			var a = t.pushInt64;
			var u = t.pushInt64Neg;
			var c = t.pushFloat;
			var f = t.pushFloatSingle;
			var h = t.pushFloatDouble;
			var l = t.pushTrue;
			var p = t.pushFalse;
			var d = t.pushUndefined;
			var g = t.pushNull;
			var m = t.pushInfinity;
			var b = t.pushInfinityNeg;
			var y = t.pushNaN;
			var w = t.pushNaNNeg;
			var k = t.pushArrayStart;
			var E = t.pushArrayStartFixed;
			var v = t.pushArrayStartFixed32;
			var S = t.pushArrayStartFixed64;
			var _ = t.pushObjectStart;
			var A = t.pushObjectStartFixed;
			var x = t.pushObjectStartFixed32;
			var N = t.pushObjectStartFixed64;
			var I = t.pushByteString;
			var O = t.pushByteStringStart;
			var T = t.pushUtf8String;
			var P = t.pushUtf8StringStart;
			var R = t.pushSimpleUnassigned;
			var U = t.pushTagStart;
			var C = t.pushTagStart4;
			var L = t.pushTagStart8;
			var D = t.pushTagUnassigned;
			var B = t.pushBreak;
			var j = e.Math.pow;
			var F = 0;
			var M = 0;
			var H = 0;

			function G(e) {
				e = e | 0;
				F = 0;
				M = e;
				while ((F | 0) < (M | 0)) {
					H = Xe[r[F] & 255](r[F] | 0) | 0;
					if ((H | 0) > 0) {
						break
					}
				}
				return H | 0
			}

			function z(e) {
				e = e | 0;
				if (((F | 0) + (e | 0) | 0) < (M | 0)) {
					return 0
				}
				return 1
			}

			function $(e) {
				e = e | 0;
				return r[e | 0] << 8 | r[e + 1 | 0] | 0
			}

			function Y(e) {
				e = e | 0;
				return r[e | 0] << 24 | r[e + 1 | 0] << 16 | r[e + 2 | 0] << 8 | r[e + 3 | 0] | 0
			}

			function V(e) {
				e = e | 0;
				s(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function K(e) {
				e = e | 0;
				if (z(1) | 0) {
					return 1
				}
				s(r[F + 1 | 0] | 0);
				F = F + 2 | 0;
				return 0
			}

			function W(e) {
				e = e | 0;
				if (z(2) | 0) {
					return 1
				}
				s($(F + 1 | 0) | 0);
				F = F + 3 | 0;
				return 0
			}

			function q(e) {
				e = e | 0;
				if (z(4) | 0) {
					return 1
				}
				i($(F + 1 | 0) | 0, $(F + 3 | 0) | 0);
				F = F + 5 | 0;
				return 0
			}

			function X(e) {
				e = e | 0;
				if (z(8) | 0) {
					return 1
				}
				a($(F + 1 | 0) | 0, $(F + 3 | 0) | 0, $(F + 5 | 0) | 0, $(F + 7 | 0) | 0);
				F = F + 9 | 0;
				return 0
			}

			function J(e) {
				e = e | 0;
				s(-1 - (e - 32 | 0) | 0);
				F = F + 1 | 0;
				return 0
			}

			function Z(e) {
				e = e | 0;
				if (z(1) | 0) {
					return 1
				}
				s(-1 - (r[F + 1 | 0] | 0) | 0);
				F = F + 2 | 0;
				return 0
			}

			function Q(e) {
				e = e | 0;
				var t = 0;
				if (z(2) | 0) {
					return 1
				}
				t = $(F + 1 | 0) | 0;
				s(-1 - (t | 0) | 0);
				F = F + 3 | 0;
				return 0
			}

			function ee(e) {
				e = e | 0;
				if (z(4) | 0) {
					return 1
				}
				o($(F + 1 | 0) | 0, $(F + 3 | 0) | 0);
				F = F + 5 | 0;
				return 0
			}

			function te(e) {
				e = e | 0;
				if (z(8) | 0) {
					return 1
				}
				u($(F + 1 | 0) | 0, $(F + 3 | 0) | 0, $(F + 5 | 0) | 0, $(F + 7 | 0) | 0);
				F = F + 9 | 0;
				return 0
			}

			function ne(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var r = 0;
				r = e - 64 | 0;
				if (z(r | 0) | 0) {
					return 1
				}
				t = F + 1 | 0;
				n = (F + 1 | 0) + (r | 0) | 0;
				I(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function re(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var s = 0;
				if (z(1) | 0) {
					return 1
				}
				s = r[F + 1 | 0] | 0;
				t = F + 2 | 0;
				n = (F + 2 | 0) + (s | 0) | 0;
				if (z(s + 1 | 0) | 0) {
					return 1
				}
				I(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function se(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var r = 0;
				if (z(2) | 0) {
					return 1
				}
				r = $(F + 1 | 0) | 0;
				t = F + 3 | 0;
				n = (F + 3 | 0) + (r | 0) | 0;
				if (z(r + 2 | 0) | 0) {
					return 1
				}
				I(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function ie(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var r = 0;
				if (z(4) | 0) {
					return 1
				}
				r = Y(F + 1 | 0) | 0;
				t = F + 5 | 0;
				n = (F + 5 | 0) + (r | 0) | 0;
				if (z(r + 4 | 0) | 0) {
					return 1
				}
				I(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function oe(e) {
				e = e | 0;
				return 1
			}

			function ae(e) {
				e = e | 0;
				O();
				F = F + 1 | 0;
				return 0
			}

			function ue(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var r = 0;
				r = e - 96 | 0;
				if (z(r | 0) | 0) {
					return 1
				}
				t = F + 1 | 0;
				n = (F + 1 | 0) + (r | 0) | 0;
				T(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function ce(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var s = 0;
				if (z(1) | 0) {
					return 1
				}
				s = r[F + 1 | 0] | 0;
				t = F + 2 | 0;
				n = (F + 2 | 0) + (s | 0) | 0;
				if (z(s + 1 | 0) | 0) {
					return 1
				}
				T(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function fe(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var r = 0;
				if (z(2) | 0) {
					return 1
				}
				r = $(F + 1 | 0) | 0;
				t = F + 3 | 0;
				n = (F + 3 | 0) + (r | 0) | 0;
				if (z(r + 2 | 0) | 0) {
					return 1
				}
				T(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function he(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var r = 0;
				if (z(4) | 0) {
					return 1
				}
				r = Y(F + 1 | 0) | 0;
				t = F + 5 | 0;
				n = (F + 5 | 0) + (r | 0) | 0;
				if (z(r + 4 | 0) | 0) {
					return 1
				}
				T(t | 0, n | 0);
				F = n | 0;
				return 0
			}

			function le(e) {
				e = e | 0;
				return 1
			}

			function pe(e) {
				e = e | 0;
				P();
				F = F + 1 | 0;
				return 0
			}

			function de(e) {
				e = e | 0;
				E(e - 128 | 0);
				F = F + 1 | 0;
				return 0
			}

			function ge(e) {
				e = e | 0;
				if (z(1) | 0) {
					return 1
				}
				E(r[F + 1 | 0] | 0);
				F = F + 2 | 0;
				return 0
			}

			function me(e) {
				e = e | 0;
				if (z(2) | 0) {
					return 1
				}
				E($(F + 1 | 0) | 0);
				F = F + 3 | 0;
				return 0
			}

			function be(e) {
				e = e | 0;
				if (z(4) | 0) {
					return 1
				}
				v($(F + 1 | 0) | 0, $(F + 3 | 0) | 0);
				F = F + 5 | 0;
				return 0
			}

			function ye(e) {
				e = e | 0;
				if (z(8) | 0) {
					return 1
				}
				S($(F + 1 | 0) | 0, $(F + 3 | 0) | 0, $(F + 5 | 0) | 0, $(F + 7 | 0) | 0);
				F = F + 9 | 0;
				return 0
			}

			function we(e) {
				e = e | 0;
				k();
				F = F + 1 | 0;
				return 0
			}

			function ke(e) {
				e = e | 0;
				var t = 0;
				t = e - 160 | 0;
				if (z(t | 0) | 0) {
					return 1
				}
				A(t | 0);
				F = F + 1 | 0;
				return 0
			}

			function Ee(e) {
				e = e | 0;
				if (z(1) | 0) {
					return 1
				}
				A(r[F + 1 | 0] | 0);
				F = F + 2 | 0;
				return 0
			}

			function ve(e) {
				e = e | 0;
				if (z(2) | 0) {
					return 1
				}
				A($(F + 1 | 0) | 0);
				F = F + 3 | 0;
				return 0
			}

			function Se(e) {
				e = e | 0;
				if (z(4) | 0) {
					return 1
				}
				x($(F + 1 | 0) | 0, $(F + 3 | 0) | 0);
				F = F + 5 | 0;
				return 0
			}

			function _e(e) {
				e = e | 0;
				if (z(8) | 0) {
					return 1
				}
				N($(F + 1 | 0) | 0, $(F + 3 | 0) | 0, $(F + 5 | 0) | 0, $(F + 7 | 0) | 0);
				F = F + 9 | 0;
				return 0
			}

			function Ae(e) {
				e = e | 0;
				_();
				F = F + 1 | 0;
				return 0
			}

			function xe(e) {
				e = e | 0;
				U(e - 192 | 0 | 0);
				F = F + 1 | 0;
				return 0
			}

			function Ne(e) {
				e | 0;
				U(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function Ie(e) {
				e | 0;
				U(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function Oe(e) {
				e | 0;
				U(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function Te(e) {
				e | 0;
				U(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function Pe(e) {
				e = e | 0;
				U(e - 192 | 0 | 0);
				F = F + 1 | 0;
				return 0
			}

			function Re(e) {
				e | 0;
				U(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function Ue(e) {
				e | 0;
				U(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function Ce(e) {
				e | 0;
				U(e | 0);
				F = F + 1 | 0;
				return 0
			}

			function Le(e) {
				e = e | 0;
				if (z(1) | 0) {
					return 1
				}
				U(r[F + 1 | 0] | 0);
				F = F + 2 | 0;
				return 0
			}

			function De(e) {
				e = e | 0;
				if (z(2) | 0) {
					return 1
				}
				U($(F + 1 | 0) | 0);
				F = F + 3 | 0;
				return 0
			}

			function Be(e) {
				e = e | 0;
				if (z(4) | 0) {
					return 1
				}
				C($(F + 1 | 0) | 0, $(F + 3 | 0) | 0);
				F = F + 5 | 0;
				return 0
			}

			function je(e) {
				e = e | 0;
				if (z(8) | 0) {
					return 1
				}
				L($(F + 1 | 0) | 0, $(F + 3 | 0) | 0, $(F + 5 | 0) | 0, $(F + 7 | 0) | 0);
				F = F + 9 | 0;
				return 0
			}

			function Fe(e) {
				e = e | 0;
				R((e | 0) - 224 | 0);
				F = F + 1 | 0;
				return 0
			}

			function Me(e) {
				e = e | 0;
				p();
				F = F + 1 | 0;
				return 0
			}

			function He(e) {
				e = e | 0;
				l();
				F = F + 1 | 0;
				return 0
			}

			function Ge(e) {
				e = e | 0;
				g();
				F = F + 1 | 0;
				return 0
			}

			function ze(e) {
				e = e | 0;
				d();
				F = F + 1 | 0;
				return 0
			}

			function $e(e) {
				e = e | 0;
				if (z(1) | 0) {
					return 1
				}
				R(r[F + 1 | 0] | 0);
				F = F + 2 | 0;
				return 0
			}

			function Ye(e) {
				e = e | 0;
				var t = 0;
				var n = 0;
				var s = 1.0;
				var i = 0.0;
				var o = 0.0;
				var a = 0.0;
				if (z(2) | 0) {
					return 1
				}
				t = r[F + 1 | 0] | 0;
				n = r[F + 2 | 0] | 0;
				if ((t | 0) & 0x80) {
					s = -1.0
				}
				i = +(((t | 0) & 0x7C) >> 2);
				o = +(((t | 0) & 0x03) << 8 | n);
				if (+i == 0.0) {
					c(+(+s * +5.9604644775390625e-8 * +o))
				} else if (+i == 31.0) {
					if (+s == 1.0) {
						if (+o > 0.0) {
							y()
						} else {
							m()
						}
					} else {
						if (+o > 0.0) {
							w()
						} else {
							b()
						}
					}
				} else {
					c(+(+s * j(+2, +(+i - 25.0)) * +(1024.0 + o)))
				}
				F = F + 3 | 0;
				return 0
			}

			function Ve(e) {
				e = e | 0;
				if (z(4) | 0) {
					return 1
				}
				f(r[F + 1 | 0] | 0, r[F + 2 | 0] | 0, r[F + 3 | 0] | 0, r[F + 4 | 0] | 0);
				F = F + 5 | 0;
				return 0
			}

			function Ke(e) {
				e = e | 0;
				if (z(8) | 0) {
					return 1
				}
				h(r[F + 1 | 0] | 0, r[F + 2 | 0] | 0, r[F + 3 | 0] | 0, r[F + 4 | 0] | 0, r[F + 5 | 0] | 0, r[F + 6 | 0] | 0,
					r[F + 7 | 0] | 0, r[F + 8 | 0] | 0);
				F = F + 9 | 0;
				return 0
			}

			function We(e) {
				e = e | 0;
				return 1
			}

			function qe(e) {
				e = e | 0;
				B();
				F = F + 1 | 0;
				return 0
			}
			var Xe = [V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, V, K, W, q, X, We, We, We, We,
				J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, J, Z, Q, ee, te, We, We, We, We, ne, ne,
				ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, ne, re, se, ie, oe, We,
				We, We, ae, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue, ue,
				ce, fe, he, le, We, We, We, pe, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de, de,
				de, de, de, de, de, ge, me, be, ye, We, We, We, we, ke, ke, ke, ke, ke, ke, ke, ke, ke, ke, ke, ke, ke, ke,
				ke, ke, ke, ke, ke, ke, ke, ke, ke, ke, Ee, ve, Se, _e, We, We, We, Ae, xe, xe, xe, xe, xe, xe, Pe, Pe, Pe,
				Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Pe, Le, De, Be, je, We, We, We, We, Fe, Fe, Fe, Fe,
				Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Fe, Me, He, Ge, ze, $e, Ye, Ve, Ke, We, We, We,
				qe
			];
			return {
				parse: G
			}
		}
	}, function(e, t, n) {
		"use strict";
		const {
			Buffer: r
		} = n(12), {
				URL: s
			} = n(26), i = n(14).BigNumber, o = n(39), a = n(30), u = a.MT, c = a.NUMBYTES, f = a.SHIFT32, h = a.SYMS, l =
			a.TAG, p = a.MT.SIMPLE_FLOAT << 5 | a.NUMBYTES.TWO, d = a.MT.SIMPLE_FLOAT << 5 | a.NUMBYTES.FOUR, g = a.MT.SIMPLE_FLOAT <<
			5 | a.NUMBYTES.EIGHT, m = a.MT.SIMPLE_FLOAT << 5 | a.SIMPLE.TRUE, b = a.MT.SIMPLE_FLOAT << 5 | a.SIMPLE.FALSE,
			y = a.MT.SIMPLE_FLOAT << 5 | a.SIMPLE.UNDEFINED, w = a.MT.SIMPLE_FLOAT << 5 | a.SIMPLE.NULL, k = new i(
				"0x20000000000000"), E = r.from("f97e00", "hex"), v = r.from("f9fc00", "hex"), S = r.from("f97c00", "hex");
		class _ {
			constructor(e) {
				e = e || {}, this.streaming = "function" == typeof e.stream, this.onData = e.stream, this.semanticTypes = [
					[s, this._pushUrl],
					[i, this._pushBigNumber]
				];
				const t = e.genTypes || [],
					n = t.length;
				for (let r = 0; r < n; r++) this.addSemanticType(t[r][0], t[r][1]);
				this._reset()
			}
			addSemanticType(e, t) {
				const n = this.semanticTypes.length;
				for (let r = 0; r < n; r++) {
					if (this.semanticTypes[r][0] === e) {
						const e = this.semanticTypes[r][1];
						return this.semanticTypes[r][1] = t, e
					}
				}
				return this.semanticTypes.push([e, t]), null
			}
			push(e) {
				return !e || (this.result[this.offset] = e, this.resultMethod[this.offset] = 0, this.resultLength[this.offset] =
					e.length, this.offset++, this.streaming && this.onData(this.finalize()), !0)
			}
			pushWrite(e, t, n) {
				return this.result[this.offset] = e, this.resultMethod[this.offset] = t, this.resultLength[this.offset] = n,
					this.offset++, this.streaming && this.onData(this.finalize()), !0
			}
			_pushUInt8(e) {
				return this.pushWrite(e, 1, 1)
			}
			_pushUInt16BE(e) {
				return this.pushWrite(e, 2, 2)
			}
			_pushUInt32BE(e) {
				return this.pushWrite(e, 3, 4)
			}
			_pushDoubleBE(e) {
				return this.pushWrite(e, 4, 8)
			}
			_pushNaN() {
				return this.push(E)
			}
			_pushInfinity(e) {
				const t = e < 0 ? v : S;
				return this.push(t)
			}
			_pushFloat(e) {
				const t = r.allocUnsafe(2);
				if (o.writeHalf(t, e) && o.parseHalf(t) === e) return this._pushUInt8(p) && this.push(t);
				const n = r.allocUnsafe(4);
				return n.writeFloatBE(e, 0), n.readFloatBE(0) === e ? this._pushUInt8(d) && this.push(n) : this._pushUInt8(g) &&
					this._pushDoubleBE(e)
			}
			_pushInt(e, t, n) {
				const r = t << 5;
				return e < 24 ? this._pushUInt8(r | e) : e <= 255 ? this._pushUInt8(r | c.ONE) && this._pushUInt8(e) : e <=
					65535 ? this._pushUInt8(r | c.TWO) && this._pushUInt16BE(e) : e <= 4294967295 ? this._pushUInt8(r | c.FOUR) &&
					this._pushUInt32BE(e) : e <= Number.MAX_SAFE_INTEGER ? this._pushUInt8(r | c.EIGHT) && this._pushUInt32BE(
						Math.floor(e / f)) && this._pushUInt32BE(e % f) : t === u.NEG_INT ? this._pushFloat(n) : this._pushFloat(e)
			}
			_pushIntNum(e) {
				return e < 0 ? this._pushInt(-e - 1, u.NEG_INT, e) : this._pushInt(e, u.POS_INT)
			}
			_pushNumber(e) {
				switch (!1) {
					case e == e:
						return this._pushNaN(e);
					case isFinite(e):
						return this._pushInfinity(e);
					case e % 1 != 0:
						return this._pushIntNum(e);
					default:
						return this._pushFloat(e)
				}
			}
			_pushString(e) {
				const t = r.byteLength(e, "utf8");
				return this._pushInt(t, u.UTF8_STRING) && this.pushWrite(e, 5, t)
			}
			_pushBoolean(e) {
				return this._pushUInt8(e ? m : b)
			}
			_pushUndefined(e) {
				return this._pushUInt8(y)
			}
			_pushArray(e, t) {
				const n = t.length;
				if (!e._pushInt(n, u.ARRAY)) return !1;
				for (let r = 0; r < n; r++)
					if (!e.pushAny(t[r])) return !1;
				return !0
			}
			_pushTag(e) {
				return this._pushInt(e, u.TAG)
			}
			_pushDate(e, t) {
				return e._pushTag(l.DATE_EPOCH) && e.pushAny(Math.round(t / 1e3))
			}
			_pushBuffer(e, t) {
				return e._pushInt(t.length, u.BYTE_STRING) && e.push(t)
			}
			_pushNoFilter(e, t) {
				return e._pushBuffer(e, t.slice())
			}
			_pushRegexp(e, t) {
				return e._pushTag(l.REGEXP) && e.pushAny(t.source)
			}
			_pushSet(e, t) {
				if (!e._pushInt(t.size, u.ARRAY)) return !1;
				for (const n of t)
					if (!e.pushAny(n)) return !1;
				return !0
			}
			_pushUrl(e, t) {
				return e._pushTag(l.URI) && e.pushAny(t.format())
			}
			_pushBigint(e) {
				let t = l.POS_BIGINT;
				e.isNegative() && (e = e.negated().minus(1), t = l.NEG_BIGINT);
				let n = e.toString(16);
				n.length % 2 && (n = "0" + n);
				const s = r.from(n, "hex");
				return this._pushTag(t) && this._pushBuffer(this, s)
			}
			_pushBigNumber(e, t) {
				if (t.isNaN()) return e._pushNaN();
				if (!t.isFinite()) return e._pushInfinity(t.isNegative() ? -1 / 0 : 1 / 0);
				if (t.isInteger()) return e._pushBigint(t);
				if (!e._pushTag(l.DECIMAL_FRAC) || !e._pushInt(2, u.ARRAY)) return !1;
				const n = t.decimalPlaces(),
					r = t.multipliedBy(new i(10).pow(n));
				return !!e._pushIntNum(-n) && (r.abs().isLessThan(k) ? e._pushIntNum(r.toNumber()) : e._pushBigint(r))
			}
			_pushMap(e, t) {
				return !!e._pushInt(t.size, u.MAP) && this._pushRawMap(t.size, Array.from(t))
			}
			_pushObject(e) {
				if (!e) return this._pushUInt8(w);
				for (var t = this.semanticTypes.length, n = 0; n < t; n++)
					if (e instanceof this.semanticTypes[n][0]) return this.semanticTypes[n][1].call(e, this, e);
				var r = e.encodeCBOR;
				if ("function" == typeof r) return r.call(e, this);
				var s = Object.keys(e),
					i = s.length;
				return !!this._pushInt(i, u.MAP) && this._pushRawMap(i, s.map(t => [t, e[t]]))
			}
			_pushRawMap(e, t) {
				t = t.map((function(e) {
					return e[0] = _.encode(e[0]), e
				})).sort(o.keySorter);
				for (var n = 0; n < e; n++) {
					if (!this.push(t[n][0])) return !1;
					if (!this.pushAny(t[n][1])) return !1
				}
				return !0
			}
			write(e) {
				return this.pushAny(e)
			}
			pushAny(e) {
				switch (function(e) {
					return {}.toString.call(e).slice(8, -1)
				}(e)) {
					case "Number":
						return this._pushNumber(e);
					case "String":
						return this._pushString(e);
					case "Boolean":
						return this._pushBoolean(e);
					case "Object":
						return this._pushObject(e);
					case "Array":
						return this._pushArray(this, e);
					case "Uint8Array":
						return this._pushBuffer(this, r.isBuffer(e) ? e : r.from(e));
					case "Null":
						return this._pushUInt8(w);
					case "Undefined":
						return this._pushUndefined(e);
					case "Map":
						return this._pushMap(this, e);
					case "Set":
						return this._pushSet(this, e);
					case "URL":
						return this._pushUrl(this, e);
					case "BigNumber":
						return this._pushBigNumber(this, e);
					case "Date":
						return this._pushDate(this, e);
					case "RegExp":
						return this._pushRegexp(this, e);
					case "Symbol":
						switch (e) {
							case h.NULL:
								return this._pushObject(null);
							case h.UNDEFINED:
								return this._pushUndefined(void 0);
							default:
								throw new Error("Unknown symbol: " + e.toString())
						}
					default:
						throw new Error("Unknown type: " + typeof e + ", " + (e ? e.toString() : ""))
				}
			}
			finalize() {
				if (0 === this.offset) return null;
				for (var e = this.result, t = this.resultLength, n = this.resultMethod, s = this.offset, i = 0, o = 0; o < s; o++)
					i += t[o];
				var a = r.allocUnsafe(i),
					u = 0,
					c = 0;
				for (o = 0; o < s; o++) {
					switch (c = t[o], n[o]) {
						case 0:
							e[o].copy(a, u);
							break;
						case 1:
							a.writeUInt8(e[o], u, !0);
							break;
						case 2:
							a.writeUInt16BE(e[o], u, !0);
							break;
						case 3:
							a.writeUInt32BE(e[o], u, !0);
							break;
						case 4:
							a.writeDoubleBE(e[o], u, !0);
							break;
						case 5:
							a.write(e[o], u, c, "utf8");
							break;
						default:
							throw new Error("unkown method")
					}
					u += c
				}
				var f = a;
				return this._reset(), f
			}
			_reset() {
				this.result = [], this.resultMethod = [], this.resultLength = [], this.offset = 0
			}
			static encode(e) {
				const t = new _;
				if (!t.pushAny(e)) throw new Error("Failed to encode input");
				return t.finalize()
			}
		}
		e.exports = _
	}, function(e, t, n) {
		"use strict";
		var r = n(195);
		e.exports = function(e) {
			if (!(e instanceof Object)) throw new TypeError('"obj" must be an object (or inherit from it)');
			return function e(t, n) {
				for (var s in n = new r(t, n), t) {
					var i = t[s];
					if (i instanceof Object && (n.contains(i) || e(i, n))) return !0
				}
				return !1
			}(e)
		}
	}, function(e, t, n) {
		"use strict";

		function r(e, t) {
			this.value = e, this.next = t
		}
		e.exports = r, r.prototype.contains = function(e) {
			for (var t = this; t;) {
				if (t.value === e) return !0;
				t = t.next
			}
			return !1
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(66);
		t.resolve = (e, t) => {
			let n = s.deserialize(e);
			const i = t.split("/").filter(Boolean);
			for (; i.length;) {
				const e = i.shift();
				if (void 0 === n[e]) throw new Error(`Object has no property '${e}'`);
				if (n = n[e], r.isCID(n)) return {
					value: n,
					remainderPath: i.join("/")
				}
			}
			return {
				value: n,
				remainderPath: ""
			}
		};
		const i = function*(e, t) {
			if (!(e instanceof Uint8Array || r.isCID(e) || "string" == typeof e || null === e))
				for (const n of Object.keys(e)) {
					const r = void 0 === t ? n : t + "/" + n;
					yield r, yield* i(e[n], r)
				}
		};
		t.tree = function*(e) {
			const t = s.deserialize(e);
			yield* i(t)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(65),
			s = n(22),
			i = n(70),
			o = n(2),
			a = n(13),
			u = n(0),
			c = n(11),
			f = n(1),
			h = n(10),
			l = n(9).default,
			p = n(15);
		e.exports = u((e, t) => {
			const n = {
					[p.DAG_PB]: s,
					[p.DAG_CBOR]: r,
					[p.RAW]: i
				},
				u = t && t.ipld || {};
			return (u && u.formats || []).forEach(e => {
				n[e.codec] = e
			}), async (r, s = {}) => {
				if (s.cid && (s.format || s.hashAlg)) throw new Error(
					"Failed to put DAG node. Provide either `cid` OR `format` and `hashAlg` options");
				if (s.format && !s.hashAlg || !s.format && s.hashAlg) throw new Error(
					"Failed to put DAG node. Provide `format` AND `hashAlg` options");
				if (s.cid) {
					const e = new o(s.cid);
					delete(s = { ...s,
						format: e.codec,
						hashAlg: a.decode(e.multihash).name
					}).cid
				}
				s = {
					format: "dag-cbor",
					hashAlg: "sha2-256",
					inputEnc: "raw",
					...s
				};
				const i = p.getNumber(s.format);
				let u = n[i];
				if (!u && (t && t.ipld && t.ipld.loadFormat && (u = await t.ipld.loadFormat(s.format)), !u)) throw new Error(
					"Format unsupported - please add support using the options.ipld.formats or options.ipld.loadFormat options"
				);
				if (!u.util || !u.util.serialize) throw new Error("Format does not support utils.serialize function");
				const d = u.util.serialize(r),
					g = new l,
					m = h([g.signal, s.signal]),
					b = await e.post("dag/put", {
						timeout: s.timeout,
						signal: m,
						searchParams: f(s),
						...await c(d, g, s.headers)
					}),
					y = await b.json();
				return new o(y.Cid["/"])
			}
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			get: n(199)(e),
			put: n(200)(e),
			findProvs: n(201)(e),
			findPeer: n(202)(e),
			provide: n(203)(e),
			query: n(204)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1),
			{
				Value: i
			} = n(40),
			o = n(8),
			a = n(7);
		e.exports = r(e => async function(t, n = {}) {
			const r = await e.post("dht/get", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: s({
					arg: t instanceof Uint8Array ? o(t) : t,
					...n
				}),
				headers: n.headers
			});
			for await (const e of r.ndjson()) if (e.Type === i) return a(e.Extra, "base64pad");
			throw new Error("not found")
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(5),
			i = n(3),
			o = n(0),
			a = n(1),
			u = n(11);
		e.exports = o(e => async function*(t, n, o = {}) {
			const c = await e.post("dht/put", {
				timeout: o.timeout,
				signal: o.signal,
				searchParams: a({
					arg: t,
					...o
				}),
				...await u(n, o.headers)
			});
			for await (let e of c.ndjson()) e = i(e), e.id = new r(e.id), e.responses && (e.responses = e.responses.map(
				({
					ID: e,
					Addrs: t
				}) => ({
					id: e,
					addrs: (t || []).map(e => s(e))
				}))), yield e
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(5),
			i = n(0),
			o = n(1),
			{
				Provider: a
			} = n(40);
		e.exports = i(e => async function*(t, n = {}) {
			const i = await e.post("dht/findprovs", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: o({
					arg: "" + new r(t),
					...n
				}),
				headers: n.headers
			});
			for await (const e of i.ndjson()) if (e.Type === a && e.Responses)
				for (const {
						ID: t,
						Addrs: n
					} of e.Responses) yield {
					id: t,
					addrs: (n || []).map(e => s(e))
				}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(5),
			i = n(0),
			o = n(1),
			{
				FinalPeer: a
			} = n(40);
		e.exports = i(e => async function(t, n = {}) {
			const i = await e.post("dht/findpeer", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: o({
					arg: "" + (t instanceof Uint8Array ? new r(t) : t),
					...n
				}),
				headers: n.headers
			});
			for await (const e of i.ndjson()) if (e.Type === a && e.Responses) {
				const {
					ID: t,
					Addrs: n
				} = e.Responses[0];
				return {
					id: t,
					addrs: (n || []).map(e => s(e))
				}
			}
			throw new Error("not found")
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(5),
			i = n(3),
			o = n(0),
			a = n(1);
		e.exports = o(e => async function*(t, n = {}) {
			t = Array.isArray(t) ? t : [t];
			const o = await e.post("dht/provide", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: a({
					arg: t.map(e => new r(e).toString()),
					...n
				}),
				headers: n.headers
			});
			for await (let e of o.ndjson()) e = i(e), e.id = new r(e.id), e.responses ? e.responses = e.responses.map(({
				ID: e,
				Addrs: t
			}) => ({
				id: e,
				addrs: (t || []).map(e => s(e))
			})) : e.responses = [], yield e
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(5),
			i = n(3),
			o = n(0),
			a = n(1);
		e.exports = o(e => async function*(t, n = {}) {
			const o = await e.post("dht/query", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: a({
					arg: new r(t),
					...n
				}),
				headers: n.headers
			});
			for await (let e of o.ndjson()) e = i(e), e.id = new r(e.id), e.responses = (e.responses || []).map(({
				ID: e,
				Addrs: t
			}) => ({
				id: e,
				addrs: (t || []).map(e => s(e))
			})), yield e
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			net: n(206)(e),
			sys: n(207)(e),
			cmds: n(208)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await e.post("diag/net", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s(t),
			headers: t.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await e.post("diag/sys", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s(t),
			headers: t.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await e.post("diag/cmds", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s(t),
			headers: t.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t, n = {}) => {
			const r = await e.post("dns", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: s({
					arg: t,
					...n
				}),
				headers: n.headers
			});
			return (await r.json()).Path
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			chmod: n(211)(e),
			cp: n(212)(e),
			flush: n(213)(e),
			ls: n(214)(e),
			mkdir: n(215)(e),
			mv: n(216)(e),
			read: n(217)(e),
			rm: n(219)(e),
			stat: n(220)(e),
			touch: n(221)(e),
			write: n(222)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async function(t, n, r = {}) {
			const i = await e.post("files/chmod", {
				timeout: r.timeout,
				signal: r.signal,
				searchParams: s({
					arg: t,
					mode: n,
					...r
				}),
				headers: r.headers
			});
			await i.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			{
				findSources: s
			} = n(41),
			i = n(0),
			o = n(1);
		e.exports = i(e => async (...t) => {
			const {
				sources: n,
				options: i
			} = s(t), a = await e.post("files/cp", {
				timeout: i.timeout,
				signal: i.signal,
				searchParams: o({
					arg: n.map(e => r.isCID(e) ? "/ipfs/" + e : e),
					...i
				}),
				headers: i.headers
			});
			await a.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			if (!t || "string" != typeof t) throw new Error("ipfs.files.flush requires a path");
			const s = await e.post("files/flush", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: i({
						arg: t,
						...n
					}),
					headers: n.headers
				}),
				o = await s.json();
			return new r(o.Cid)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(72),
			i = n(0),
			o = n(1);

		function a(e) {
			return e.hash && (e.cid = new r(e.hash)), delete e.hash, e
		}
		e.exports = i(e => async function*(t, n = {}) {
			if (!t || "string" != typeof t) throw new Error("ipfs.files.ls requires a path");
			const i = await e.post("files/ls", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: o({
					arg: r.isCID(t) ? "/ipfs/" + t : t,
					long: !0,
					...n,
					stream: !0
				}),
				headers: n.headers
			});
			for await (const e of i.ndjson()) if ("Entries" in e)
				for (const t of e.Entries || []) yield a(s(t));
			else yield a(s(e))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t, n = {}) => {
			const r = await e.post("files/mkdir", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: s({
					arg: t,
					...n
				}),
				headers: n.headers
			});
			await r.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			{
				findSources: s
			} = n(41),
			i = n(0),
			o = n(1);
		e.exports = i(e => async (...t) => {
			const {
				sources: n,
				options: i
			} = s(t), a = await e.post("files/mv", {
				timeout: i.timeout,
				signal: i.signal,
				searchParams: o({
					arg: n.map(e => r.isCID(e) ? "/ipfs/" + e : e),
					...i
				}),
				headers: i.headers
			});
			await a.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(218),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function*(t, n = {}) {
			const s = await e.post("files/read", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: t,
					count: n.count || n.length,
					...n
				}),
				headers: n.headers
			});
			yield* r(s.body)
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => {
			if (e[Symbol.asyncIterator]) return e;
			if (e.getReader) return async function*() {
				const t = e.getReader();
				try {
					for (;;) {
						const {
							done: e,
							value: n
						} = await t.read();
						if (e) return;
						yield n
					}
				} finally {
					t.releaseLock()
				}
			}();
			throw new Error("unknown stream")
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			{
				findSources: s
			} = n(41),
			i = n(1);
		e.exports = r(e => async (...t) => {
			const {
				sources: n,
				options: r
			} = s(t), o = await e.post("files/rm", {
				timeout: r.timeout,
				signal: r.signal,
				searchParams: i({
					arg: n,
					...r
				}),
				headers: r.headers
			});
			await o.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(72),
			i = n(0),
			o = n(1);
		e.exports = i(e => async (t, n = {}) => {
			"string" != typeof t && (n = t || {}, t = "/");
			const i = await e.post("files/stat", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: o({
						arg: t,
						...n
					}),
					headers: n.headers
				}),
				a = await i.json();
			return a.WithLocality = a.WithLocality || !1, (u = s(a)).cid = new r(u.hash), delete u.hash, u;
			var u
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async function(t, n = {}) {
			const r = await e.post("files/touch", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: s({
					arg: t,
					...n
				}),
				headers: n.headers
			});
			await r.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(34),
			s = n(35),
			i = n(0),
			o = n(11),
			a = n(1),
			u = n(10),
			c = n(9).default;
		e.exports = i(e => async (t, n, i = {}) => {
			const f = new c,
				h = u([f.signal, i.signal]),
				l = await e.post("files/write", {
					timeout: i.timeout,
					signal: h,
					searchParams: a({
						arg: t,
						streamChannels: !0,
						count: i.count || i.length,
						...i
					}),
					...await o({
						content: n,
						path: "arg",
						mode: r(i.mode),
						mtime: s(i.mtime)
					}, f, i.headers)
				});
			await l.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(224),
			s = n(2),
			i = n(0),
			o = n(1),
			a = n(52);
		e.exports = i(e => async function*(t, n = {}) {
			const i = await e.post("get", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: o({
						arg: "" + (t instanceof Uint8Array ? new s(t) : t),
						...n
					}),
					headers: n.headers
				}),
				u = r.extract();
			for await (const {
				header: e,
				body: r
			} of u(i.iterator()))
			"directory" === e.type ? yield {
				path: e.name
			} : yield {
				path: e.name,
				content: a(r, e => e.slice())
			}
		})
	}, function(e, t, n) {
		"use strict";
		t.extract = n(225), t.pack = n(230)
	}, function(e, t, n) {
		"use strict";
		const r = n(226),
			s = n(227),
			i = n(228);
		async function o(e, t) {
			const n = function(e) {
				return (e &= 511) && 512 - e
			}(t);
			n && await e.next(n)
		}
		e.exports = e => ((e = e || {}).highWaterMark = e.highWaterMark || 16384, t => async function*() {
			const n = i(t);
			let a, u, c, f;
			try {
				for (;;) {
					let t;
					try {
						const {
							done: e,
							value: r
						} = await n.next(512);
						if (e) return;
						t = r
					} catch (h) {
						if ("ERR_UNDER_READ" === h.code) return;
						throw h
					}
					const i = s.decode(t, e.filenameEncoding);
					if (!i) continue;
					if ("gnu-long-path" === i.type) {
						const {
							done: t,
							value: r
						} = await n.next(i.size);
						if (t) return;
						a = s.decodeLongPath(r, e.filenameEncoding), await o(n, i.size);
						continue
					}
					if ("gnu-long-link-path" === i.type) {
						const {
							done: t,
							value: r
						} = await n.next(i.size);
						if (t) return;
						u = s.decodeLongPath(r, e.filenameEncoding), await o(n, i.size);
						continue
					}
					if ("pax-global-header" === i.type) {
						const {
							done: t,
							value: r
						} = await n.next(i.size);
						if (t) return;
						c = s.decodePax(r, e.filenameEncoding), await o(n, i.size);
						continue
					}
					if ("pax-header" === i.type) {
						const {
							done: t,
							value: r
						} = await n.next(i.size);
						if (t) return;
						f = s.decodePax(r, e.filenameEncoding), c && (f = { ...c,
							...f
						}), await o(n, i.size);
						continue
					}
					if (a && (i.name = a, a = null), u && (i.linkname = u, u = null), f && (f.path && (i.name = f.path), f.linkpath &&
							(i.linkname = f.linkpath), f.size && (i.size = parseInt(f.size, 10)), i.pax = f, f = null), !i.size ||
						"directory" === i.type) {
						yield {
							header: i,
							body: async function*() {}()
						};
						continue
					}
					let l = i.size;
					const p = r(),
						d = await n.nextLte(Math.min(l, e.highWaterMark));
					l -= d.value.length, l || p.resolve();
					const g = async function*() {
						try {
							for (yield d.value; l;) {
								const {
									done: e,
									value: t
								} = await n.nextLte(l);
								if (e) return void(l = 0);
								l -= t.length, yield t
							}
						} finally {
							p.resolve()
						}
					}();
					if (yield {
							header: i,
							body: g
						}, await p.promise, l)
						for await (const e of g);
					await o(n, i.size)
				}
			} finally {
				await n.return()
			}
		}())
	}, function(e, t, n) {
		"use strict";
		e.exports = () => {
			const e = {};
			return e.promise = new Promise((t, n) => {
				e.resolve = t, e.reject = n
			}), e
		}
	}, function(e, t, n) {
		"use strict";
		const {
			Buffer: r
		} = n(12), s = n(23);
		var i = "0".charCodeAt(0),
			o = r.from("ustar\0", "binary"),
			a = r.from("ustar ", "binary"),
			u = r.from(" \0", "binary"),
			c = function(e, t, n, r) {
				for (; n < r; n++)
					if (e.get(n) === t) return n;
				return r
			};
		var f = function(e, t, n) {
				if (e = e.shallowSlice(t, t + n), t = 0, 128 & e.get(t)) return function(e) {
					var t;
					if (128 === e.get(0)) t = !0;
					else {
						if (255 !== e.get(0)) return null;
						t = !1
					}
					for (var n = !1, r = [], s = e.length - 1; s > 0; s--) {
						var i = e.get(s);
						t ? r.push(i) : n && 0 === i ? r.push(0) : n ? (n = !1, r.push(256 - i)) : r.push(255 - i)
					}
					var o = 0,
						a = r.length;
					for (s = 0; s < a; s++) o += r[s] * Math.pow(256, s);
					return t ? o : -1 * o
				}(e);
				for (; t < e.length && 32 === e.get(t);) t++;
				for (var r = (s = c(e, 32, t, e.length), i = e.length, o = e.length, "number" != typeof s ? o : (s = ~~s) >= i ?
						i : s >= 0 || (s += i) >= 0 ? s : 0); t < r && 0 === e.get(t);) t++;
				return r === t ? 0 : parseInt(e.shallowSlice(t, r).toString(), 8);
				var s, i, o
			},
			h = function(e, t, n, r) {
				return e.shallowSlice(t, c(e, 0, t, t + n)).toString(r)
			};
		t.decodeLongPath = function(e, t) {
			return e = s.isBufferList(e) ? e : new s(e), h(e, 0, e.length, t)
		}, t.decodePax = function(e) {
			e = s.isBufferList(e) ? e : new s(e);
			for (var t = {}; e.length;) {
				for (var n = 0; n < e.length && 32 !== e.get(n);) n++;
				var r = parseInt(e.shallowSlice(0, n).toString(), 10);
				if (!r) return t;
				var i = e.shallowSlice(n + 1, r - 1).toString(),
					o = i.indexOf("=");
				if (-1 === o) return t;
				t[i.slice(0, o)] = i.slice(o + 1), e = e.shallowSlice(r)
			}
			return t
		}, t.decode = function(e, t) {
			var n = 0 === (e = s.isBufferList(e) ? e : new s(e)).get(156) ? 0 : e.get(156) - i,
				r = h(e, 0, 100, t),
				c = f(e, 100, 8),
				l = f(e, 108, 8),
				p = f(e, 116, 8),
				d = f(e, 124, 12),
				g = f(e, 136, 12),
				m = function(e) {
					switch (e) {
						case 0:
							return "file";
						case 1:
							return "link";
						case 2:
							return "symlink";
						case 3:
							return "character-device";
						case 4:
							return "block-device";
						case 5:
							return "directory";
						case 6:
							return "fifo";
						case 7:
							return "contiguous-file";
						case 72:
							return "pax-header";
						case 55:
							return "pax-global-header";
						case 27:
							return "gnu-long-link-path";
						case 28:
						case 30:
							return "gnu-long-path"
					}
					return null
				}(n),
				b = 0 === e.get(157) ? null : h(e, 157, 100, t),
				y = h(e, 265, 32),
				w = h(e, 297, 32),
				k = f(e, 329, 8),
				E = f(e, 337, 8),
				v = function(e) {
					for (var t = 256, n = 0; n < 148; n++) t += e.get(n);
					for (var r = 156; r < 512; r++) t += e.get(r);
					return t
				}(e);
			if (256 === v) return null;
			if (v !== f(e, 148, 8)) throw new Error(
				"Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?");
			if (0 === o.compare(e.slice(257, 263))) e.get(345) && (r = h(e, 345, 155, t) + "/" + r);
			else if (0 !== a.compare(e.slice(257, 263)) || 0 !== u.compare(e.slice(263, 265))) throw new Error(
				"Invalid tar header: unknown format.");
			return 0 === n && r && "/" === r[r.length - 1] && (n = 5), {
				name: r,
				mode: c,
				uid: l,
				gid: p,
				size: d,
				mtime: new Date(1e3 * g),
				type: m,
				linkname: b,
				uname: y,
				gname: w,
				devmajor: k,
				devminor: E
			}
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(23),
			s = n(229);
		e.exports = function(e) {
			const t = s(e);
			let n;
			const i = {
				[Symbol.asyncIterator]: () => i,
				async next(e) {
					if (n) {
						let s;
						if (null == e || n.length === e) s = n, n = null;
						else if (n.length > e) s = n.shallowSlice(0, e), n = n.shallowSlice(e);
						else if (n.length < e) {
							const {
								value: i,
								done: o
							} = await t.next(e - n.length);
							if (o) throw Object.assign(new Error(`stream ended before ${e-n.length} bytes became available`), {
								code: "ERR_UNDER_READ"
							});
							s = new r([n, i]), n = null
						}
						return {
							value: s
						}
					}
					return t.next(e)
				},
				async nextLte(e) {
					let {
						done: t,
						value: s
					} = await i.next();
					return t ? {
						done: t
					} : s.length <= e ? {
						value: s
					} : (s = r.isBufferList(s) ? s : new r(s), n ? n.append(s.shallowSlice(e)) : n = s.shallowSlice(e), {
						value: s.shallowSlice(0, e)
					})
				},
				return: () => t.return()
			};
			return i
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(23);
		e.exports = e => {
			const t = async function*() {
				let t = yield,
					n = new r;
				for await (const s of e) if (t)
					for (n.append(s); n.length >= t;) {
						const e = n.shallowSlice(0, t);
						if (n.consume(t), t = yield e, !t) {
							n.length && (t = yield n, n = new r);
							break
						}
					} else t = yield n.append(s), n = new r;
				if (t) throw Object.assign(new Error(`stream ended before ${t} bytes became available`), {
					code: "ERR_UNDER_READ",
					buffer: n
				})
			}();
			return t.next(), t
		}
	}, function(e, t, n) {
		"use strict";
		const {
			Buffer: r
		} = n(12), s = n(23), {
			S_IFMT: i,
			S_IFBLK: o,
			S_IFCHR: a,
			S_IFDIR: u,
			S_IFIFO: c,
			S_IFLNK: f
		} = n(231), h = n(232), l = n(233), p = parseInt("755", 8), d = parseInt("644", 8), g = r.alloc(1024);

		function m(e) {
			switch (e & i) {
				case o:
					return "block-device";
				case a:
					return "character-device";
				case u:
					return "directory";
				case c:
					return "fifo";
				case f:
					return "symlink"
			}
			return "file"
		}

		function b(e) {
			if (e &= 511) return new s(g.slice(0, 512 - e))
		}

		function y(e) {
			if (!e.pax) {
				const t = l.encode(e);
				if (t) return t
			}
			return function(e) {
				const t = l.encodePax({
						name: e.name,
						linkname: e.linkname,
						pax: e.pax
					}),
					n = {
						name: "PaxHeader",
						mode: e.mode,
						uid: e.uid,
						gid: e.gid,
						size: t.length,
						mtime: e.mtime,
						type: "pax-header",
						linkname: e.linkname && "PaxHeader",
						uname: e.uname,
						gname: e.gname,
						devmajor: e.devmajor,
						devminor: e.devminor
					};
				return new s([l.encode(n), t, b(t.length), l.encode({ ...n,
					size: e.size,
					type: e.type
				})])
			}(e)
		}
		e.exports = () => async function*(e) {
			for await (let {
				header: t,
				body: n
			} of e) {
				if (t.size && "symlink" !== t.type || (t.size = 0), t.type || (t.type = m(t.mode)), t.mode || (t.mode =
						"directory" === t.type ? p : d), t.uid || (t.uid = 0), t.gid || (t.gid = 0), t.mtime || (t.mtime = new Date),
					"string" == typeof n && (n = r.from(n)), r.isBuffer(n) || s.isBufferList(n)) {
					t.size = n.length, yield new s([y(t), n, b(t.size)]);
					continue
				}
				if ("symlink" === t.type && !t.linkname) {
					t.linkname = (await h(n)).toString(), yield y(t);
					continue
				}
				if (yield y(t), "file" !== t.type && "contiguous-file" !== t.type) continue;
				let e = 0;
				for await (const t of n) e += t.length, yield s.isBufferList(t) ? t : new s(t);
				if (e !== t.size) throw new Error("size mismatch");
				const i = b(t.size);
				i && (yield i)
			}
			yield new s(g)
		}
	}, function(e, t, n) {
		"use strict";
		e.exports = {
			RTLD_LAZY: 1,
			RTLD_NOW: 2,
			RTLD_GLOBAL: 8,
			RTLD_LOCAL: 4,
			E2BIG: 7,
			EACCES: 13,
			EADDRINUSE: 48,
			EADDRNOTAVAIL: 49,
			EAFNOSUPPORT: 47,
			EAGAIN: 35,
			EALREADY: 37,
			EBADF: 9,
			EBADMSG: 94,
			EBUSY: 16,
			ECANCELED: 89,
			ECHILD: 10,
			ECONNABORTED: 53,
			ECONNREFUSED: 61,
			ECONNRESET: 54,
			EDEADLK: 11,
			EDESTADDRREQ: 39,
			EDOM: 33,
			EDQUOT: 69,
			EEXIST: 17,
			EFAULT: 14,
			EFBIG: 27,
			EHOSTUNREACH: 65,
			EIDRM: 90,
			EILSEQ: 92,
			EINPROGRESS: 36,
			EINTR: 4,
			EINVAL: 22,
			EIO: 5,
			EISCONN: 56,
			EISDIR: 21,
			ELOOP: 62,
			EMFILE: 24,
			EMLINK: 31,
			EMSGSIZE: 40,
			EMULTIHOP: 95,
			ENAMETOOLONG: 63,
			ENETDOWN: 50,
			ENETRESET: 52,
			ENETUNREACH: 51,
			ENFILE: 23,
			ENOBUFS: 55,
			ENODATA: 96,
			ENODEV: 19,
			ENOENT: 2,
			ENOEXEC: 8,
			ENOLCK: 77,
			ENOLINK: 97,
			ENOMEM: 12,
			ENOMSG: 91,
			ENOPROTOOPT: 42,
			ENOSPC: 28,
			ENOSR: 98,
			ENOSTR: 99,
			ENOSYS: 78,
			ENOTCONN: 57,
			ENOTDIR: 20,
			ENOTEMPTY: 66,
			ENOTSOCK: 38,
			ENOTSUP: 45,
			ENOTTY: 25,
			ENXIO: 6,
			EOPNOTSUPP: 102,
			EOVERFLOW: 84,
			EPERM: 1,
			EPIPE: 32,
			EPROTO: 100,
			EPROTONOSUPPORT: 43,
			EPROTOTYPE: 41,
			ERANGE: 34,
			EROFS: 30,
			ESPIPE: 29,
			ESRCH: 3,
			ESTALE: 70,
			ETIME: 101,
			ETIMEDOUT: 60,
			ETXTBSY: 26,
			EWOULDBLOCK: 35,
			EXDEV: 18,
			PRIORITY_LOW: 19,
			PRIORITY_BELOW_NORMAL: 10,
			PRIORITY_NORMAL: 0,
			PRIORITY_ABOVE_NORMAL: -7,
			PRIORITY_HIGH: -14,
			PRIORITY_HIGHEST: -20,
			SIGHUP: 1,
			SIGINT: 2,
			SIGQUIT: 3,
			SIGILL: 4,
			SIGTRAP: 5,
			SIGABRT: 6,
			SIGIOT: 6,
			SIGBUS: 10,
			SIGFPE: 8,
			SIGKILL: 9,
			SIGUSR1: 30,
			SIGSEGV: 11,
			SIGUSR2: 31,
			SIGPIPE: 13,
			SIGALRM: 14,
			SIGTERM: 15,
			SIGCHLD: 20,
			SIGCONT: 19,
			SIGSTOP: 17,
			SIGTSTP: 18,
			SIGTTIN: 21,
			SIGTTOU: 22,
			SIGURG: 16,
			SIGXCPU: 24,
			SIGXFSZ: 25,
			SIGVTALRM: 26,
			SIGPROF: 27,
			SIGWINCH: 28,
			SIGIO: 23,
			SIGINFO: 29,
			SIGSYS: 12,
			UV_FS_SYMLINK_DIR: 1,
			UV_FS_SYMLINK_JUNCTION: 2,
			O_RDONLY: 0,
			O_WRONLY: 1,
			O_RDWR: 2,
			UV_DIRENT_UNKNOWN: 0,
			UV_DIRENT_FILE: 1,
			UV_DIRENT_DIR: 2,
			UV_DIRENT_LINK: 3,
			UV_DIRENT_FIFO: 4,
			UV_DIRENT_SOCKET: 5,
			UV_DIRENT_CHAR: 6,
			UV_DIRENT_BLOCK: 7,
			S_IFMT: 61440,
			S_IFREG: 32768,
			S_IFDIR: 16384,
			S_IFCHR: 8192,
			S_IFBLK: 24576,
			S_IFIFO: 4096,
			S_IFLNK: 40960,
			S_IFSOCK: 49152,
			O_CREAT: 512,
			O_EXCL: 2048,
			UV_FS_O_FILEMAP: 0,
			O_NOCTTY: 131072,
			O_TRUNC: 1024,
			O_APPEND: 8,
			O_DIRECTORY: 1048576,
			O_NOFOLLOW: 256,
			O_SYNC: 128,
			O_DSYNC: 4194304,
			O_SYMLINK: 2097152,
			O_NONBLOCK: 4,
			S_IRWXU: 448,
			S_IRUSR: 256,
			S_IWUSR: 128,
			S_IXUSR: 64,
			S_IRWXG: 56,
			S_IRGRP: 32,
			S_IWGRP: 16,
			S_IXGRP: 8,
			S_IRWXO: 7,
			S_IROTH: 4,
			S_IWOTH: 2,
			S_IXOTH: 1,
			F_OK: 0,
			R_OK: 4,
			W_OK: 2,
			X_OK: 1,
			UV_FS_COPYFILE_EXCL: 1,
			COPYFILE_EXCL: 1,
			UV_FS_COPYFILE_FICLONE: 2,
			COPYFILE_FICLONE: 2,
			UV_FS_COPYFILE_FICLONE_FORCE: 4,
			COPYFILE_FICLONE_FORCE: 4,
			OPENSSL_VERSION_NUMBER: 269488207,
			SSL_OP_ALL: 2147485780,
			SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION: 262144,
			SSL_OP_CIPHER_SERVER_PREFERENCE: 4194304,
			SSL_OP_CISCO_ANYCONNECT: 32768,
			SSL_OP_COOKIE_EXCHANGE: 8192,
			SSL_OP_CRYPTOPRO_TLSEXT_BUG: 2147483648,
			SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS: 2048,
			SSL_OP_EPHEMERAL_RSA: 0,
			SSL_OP_LEGACY_SERVER_CONNECT: 4,
			SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER: 0,
			SSL_OP_MICROSOFT_SESS_ID_BUG: 0,
			SSL_OP_MSIE_SSLV2_RSA_PADDING: 0,
			SSL_OP_NETSCAPE_CA_DN_BUG: 0,
			SSL_OP_NETSCAPE_CHALLENGE_BUG: 0,
			SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG: 0,
			SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG: 0,
			SSL_OP_NO_COMPRESSION: 131072,
			SSL_OP_NO_QUERY_MTU: 4096,
			SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION: 65536,
			SSL_OP_NO_SSLv2: 0,
			SSL_OP_NO_SSLv3: 33554432,
			SSL_OP_NO_TICKET: 16384,
			SSL_OP_NO_TLSv1: 67108864,
			SSL_OP_NO_TLSv1_1: 268435456,
			SSL_OP_NO_TLSv1_2: 134217728,
			SSL_OP_PKCS1_CHECK_1: 0,
			SSL_OP_PKCS1_CHECK_2: 0,
			SSL_OP_SINGLE_DH_USE: 0,
			SSL_OP_SINGLE_ECDH_USE: 0,
			SSL_OP_SSLEAY_080_CLIENT_DH_BUG: 0,
			SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG: 0,
			SSL_OP_TLS_BLOCK_PADDING_BUG: 0,
			SSL_OP_TLS_D5_BUG: 0,
			SSL_OP_TLS_ROLLBACK_BUG: 8388608,
			ENGINE_METHOD_RSA: 1,
			ENGINE_METHOD_DSA: 2,
			ENGINE_METHOD_DH: 4,
			ENGINE_METHOD_RAND: 8,
			ENGINE_METHOD_EC: 2048,
			ENGINE_METHOD_CIPHERS: 64,
			ENGINE_METHOD_DIGESTS: 128,
			ENGINE_METHOD_PKEY_METHS: 512,
			ENGINE_METHOD_PKEY_ASN1_METHS: 1024,
			ENGINE_METHOD_ALL: 65535,
			ENGINE_METHOD_NONE: 0,
			DH_CHECK_P_NOT_SAFE_PRIME: 2,
			DH_CHECK_P_NOT_PRIME: 1,
			DH_UNABLE_TO_CHECK_GENERATOR: 4,
			DH_NOT_SUITABLE_GENERATOR: 8,
			ALPN_ENABLED: 1,
			RSA_PKCS1_PADDING: 1,
			RSA_SSLV23_PADDING: 2,
			RSA_NO_PADDING: 3,
			RSA_PKCS1_OAEP_PADDING: 4,
			RSA_X931_PADDING: 5,
			RSA_PKCS1_PSS_PADDING: 6,
			RSA_PSS_SALTLEN_DIGEST: -1,
			RSA_PSS_SALTLEN_MAX_SIGN: -2,
			RSA_PSS_SALTLEN_AUTO: -2,
			defaultCoreCipherList: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
			TLS1_VERSION: 769,
			TLS1_1_VERSION: 770,
			TLS1_2_VERSION: 771,
			TLS1_3_VERSION: 772,
			POINT_CONVERSION_COMPRESSED: 2,
			POINT_CONVERSION_UNCOMPRESSED: 4,
			POINT_CONVERSION_HYBRID: 6,
			defaultCipherList: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA"
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(23),
			s = {
				string: () => "",
				buffer: () => r()
			};
		e.exports = async (e, t) => {
			if ((t = t || {}).type && !s[t.type]) throw new Error(`invalid type "${t.type}"`);
			let n, r;
			for await (const i of e) n || (r = t.type || "string" == typeof i ? "string" : "buffer", n = s[r]()),
				"string" === r ? n += i : n.append(i);
			return n || s[t.type || "buffer"]()
		}
	}, function(e, t, n) {
		"use strict";
		const {
			Buffer: r
		} = n(12);
		var s = r.alloc,
			i = "0".charCodeAt(0),
			o = r.from("ustar\0", "binary"),
			a = r.from("00", "binary"),
			u = parseInt("7777", 8),
			c = function(e, t) {
				return (e = e.toString(8)).length > t ? "7777777777777777777".slice(0, t) + " " : "0000000000000000000".slice(
					0, t - e.length) + e + " "
			},
			f = function(e) {
				var t = r.byteLength(e),
					n = Math.floor(Math.log(t) / Math.log(10)) + 1;
				return t + n >= Math.pow(10, n) && n++, t + n + e
			};
		t.encodePax = function(e) {
			var t = "";
			e.name && (t += f(" path=" + e.name + "\n")), e.linkname && (t += f(" linkpath=" + e.linkname + "\n"));
			var n = e.pax;
			if (n)
				for (var s in n) t += f(" " + s + "=" + n[s] + "\n");
			return r.from(t)
		}, t.encode = function(e) {
			var t = s(512),
				n = e.name,
				f = "";
			if (5 === e.typeflag && "/" !== n[n.length - 1] && (n += "/"), r.byteLength(n) !== n.length) return null;
			for (; r.byteLength(n) > 100;) {
				var h = n.indexOf("/");
				if (-1 === h) return null;
				f += f ? "/" + n.slice(0, h) : n.slice(0, h), n = n.slice(h + 1)
			}
			return r.byteLength(n) > 100 || r.byteLength(f) > 155 || e.linkname && r.byteLength(e.linkname) > 100 ? null :
				(t.write(n), t.write(c(e.mode & u, 6), 100), t.write(c(e.uid, 6), 108), t.write(c(e.gid, 6), 116), t.write(c(
					e.size, 11), 124), t.write(c(e.mtime.getTime() / 1e3 | 0, 11), 136), t[156] = i + function(e) {
					switch (e) {
						case "file":
							return 0;
						case "link":
							return 1;
						case "symlink":
							return 2;
						case "character-device":
							return 3;
						case "block-device":
							return 4;
						case "directory":
							return 5;
						case "fifo":
							return 6;
						case "contiguous-file":
							return 7;
						case "pax-header":
							return 72
					}
					return 0
				}(e.type), e.linkname && t.write(e.linkname, 157), o.copy(t, 257), a.copy(t, 263), e.uname && t.write(e.uname,
					265), e.gname && t.write(e.gname, 297), t.write(c(e.devmajor || 0, 6), 329), t.write(c(e.devminor || 0, 6),
					337), f && t.write(f, 345), t.write(c(function(e) {
					for (var t = 256, n = 0; n < 148; n++) t += e[n];
					for (var r = 156; r < 512; r++) t += e[r];
					return t
				}(t), 6), 148), t)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(0);
		e.exports = r(e => () => {
			const t = new URL(e.opts.base);
			return {
				host: t.hostname,
				port: t.port,
				protocol: t.protocol,
				pathname: t.pathname,
				"api-path": t.pathname
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(5),
			i = n(0),
			o = n(1);
		e.exports = i(e => async function(t = {}) {
			const n = await e.post("id", {
					timeout: t.timeout,
					signal: t.signal,
					searchParams: o(t),
					headers: t.headers
				}),
				i = await n.json(),
				a = r(i);
			return a.addresses && (a.addresses = a.addresses.map(e => s(e))), a
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			gen: n(237)(e),
			list: n(238)(e),
			rename: n(239)(e),
			rm: n(240)(e),
			import: n(241)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			const s = await e.post("key/gen", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: i({
						arg: t,
						...n
					}),
					headers: n.headers
				}),
				o = await s.json();
			return r(o)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("key/list", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i(t),
				headers: t.headers
			});
			return ((await n.json()).Keys || []).map(e => r(e))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n, s = {}) => {
			const o = await e.post("key/rename", {
				timeout: s.timeout,
				signal: s.signal,
				searchParams: i({
					arg: [t, n],
					...s
				}),
				headers: s.headers
			});
			return r(await o.json())
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			const s = await e.post("key/rm", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: i({
						arg: t,
						...n
					}),
					headers: n.headers
				}),
				o = await s.json();
			return r(o.Keys[0])
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n, s, o = {}) => {
			"string" != typeof s && (o = s || {}, s = null);
			const a = await e.post("key/import", {
					timeout: o.timeout,
					signal: o.signal,
					searchParams: i({
						arg: t,
						pem: n,
						password: s,
						...o
					}),
					headers: o.headers
				}),
				u = await a.json();
			return r(u)
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			tail: n(243)(e),
			ls: n(244)(e),
			level: n(245)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async function*(t = {}) {
			const n = await e.post("log/tail", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: s(t),
				headers: t.headers
			});
			yield* n.ndjson()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => {
			const n = await e.post("log/ls", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: s(t),
				headers: t.headers
			});
			return (await n.json()).Strings
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n, s = {}) => {
			const o = await e.post("log/level", {
				timeout: s.timeout,
				signal: s.signal,
				searchParams: i({
					arg: [t, n],
					...s
				}),
				headers: s.headers
			});
			return r(await o.json())
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);

		function o(e) {
			switch (e.Type) {
				case 1:
				case 5:
					return "dir";
				case 2:
					return "file";
				default:
					return "unknown"
			}
		}
		e.exports = s(e => async function*(t, n = {}) {
			const s = await e.post("ls", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: "" + (t instanceof Uint8Array ? new r(t) : t),
					...n
				}),
				headers: n.headers
			});
			for await (let e of s.ndjson()) {
				if (e = e.Objects, !e) throw new Error("expected .Objects in results");
				if (e = e[0], !e) throw new Error("expected one array in results.Objects");
				if (e = e.Links, !Array.isArray(e)) throw new Error("expected one array in results.Objects[0].Links");
				for (const n of e) {
					const e = {
						name: n.Name,
						path: t + "/" + n.Name,
						size: n.Size,
						cid: new r(n.Hash),
						type: o(n),
						depth: n.Depth || 1
					};
					n.Mode && (e.mode = parseInt(n.Mode, 8)), void 0 !== n.Mtime && null !== n.Mtime && (e.mtime = {
						secs: n.Mtime
					}, void 0 !== n.MtimeNsecs && null !== n.MtimeNsecs && (e.mtime.nsecs = n.MtimeNsecs)), yield e
				}
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("dns", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i(t),
				headers: t.headers
			});
			return r(await n.json())
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			publish: n(249)(e),
			resolve: n(250)(e),
			pubsub: n(251)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			const s = await e.post("name/publish", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: t,
					...n
				}),
				headers: n.headers
			});
			return r(await s.json())
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async function*(t, n = {}) {
			const r = await e.post("name/resolve", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: s({
					arg: t,
					stream: !0,
					...n
				}),
				headers: n.headers
			});
			for await (const e of r.ndjson()) yield e.Path
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			cancel: n(252)(e),
			state: n(253)(e),
			subs: n(254)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => {
			const s = await e.post("name/pubsub/cancel", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: t,
					...n
				}),
				headers: n.headers
			});
			return r(await s.json())
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("name/pubsub/state", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i(t),
				headers: t.headers
			});
			return r(await n.json())
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => {
			const n = await e.post("name/pubsub/subs", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: s(t),
				headers: t.headers
			});
			return (await n.json()).Strings || []
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			data: n(256)(e),
			get: n(257)(e),
			links: n(258)(e),
			new: n(259)(e),
			patch: n(260)(e),
			put: n(265)(e),
			stat: n(266)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function(t, n = {}) {
			const s = await e.post("object/data", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: i({
						arg: "" + (t instanceof Uint8Array ? new r(t) : t),
						...n
					}),
					headers: n.headers
				}),
				o = await s.arrayBuffer();
			return new Uint8Array(o, o.byteOffset, o.byteLength)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			{
				DAGNode: s,
				DAGLink: i
			} = n(22),
			o = n(0),
			a = n(1),
			u = n(7);
		e.exports = o(e => async (t, n = {}) => {
			const o = await e.post("object/get", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: a({
						arg: "" + (t instanceof Uint8Array ? new r(t) : t),
						dataEncoding: "base64",
						...n
					}),
					headers: n.headers
				}),
				c = await o.json();
			return new s(u(c.Data, "base64pad"), (c.Links || []).map(e => new i(e.Name, e.Size, e.Hash)))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			{
				DAGLink: s
			} = n(22),
			i = n(0),
			o = n(1);
		e.exports = i(e => async (t, n = {}) => {
			const i = await e.post("object/links", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: o({
					arg: "" + (t instanceof Uint8Array ? new r(t) : t),
					...n
				}),
				headers: n.headers
			});
			return ((await i.json()).Links || []).map(e => new s(e.Name, e.Size, e.Hash))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("object/new", {
					timeout: t.timeout,
					signal: t.signal,
					searchParams: i({
						arg: t.template,
						...t
					}),
					headers: t.headers
				}),
				{
					Hash: s
				} = await n.json();
			return new r(s)
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			addLink: n(261)(e),
			appendData: n(262)(e),
			rmLink: n(263)(e),
			setData: n(264)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n, s = {}) => {
			const o = await e.post("object/patch/add-link", {
					timeout: s.timeout,
					signal: s.signal,
					searchParams: i({
						arg: ["" + (t instanceof Uint8Array ? new r(t) : t), n.Name || n.name || "", (n.Hash || n.cid || "").toString() ||
							null
						],
						...s
					}),
					headers: s.headers
				}),
				{
					Hash: a
				} = await o.json();
			return new r(a)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(11),
			i = n(0),
			o = n(1),
			a = n(10),
			u = n(9).default;
		e.exports = i(e => async (t, n, i = {}) => {
			const c = new u,
				f = a([c.signal, i.signal]),
				h = await e.post("object/patch/append-data", {
					timeout: i.timeout,
					signal: f,
					searchParams: o({
						arg: "" + (t instanceof Uint8Array ? new r(t) : t),
						...i
					}),
					...await s(n, c, i.headers)
				}),
				{
					Hash: l
				} = await h.json();
			return new r(l)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n, s = {}) => {
			const o = await e.post("object/patch/rm-link", {
					timeout: s.timeout,
					signal: s.signal,
					searchParams: i({
						arg: ["" + (t instanceof Uint8Array ? new r(t) : t), n.Name || n.name || null],
						...s
					}),
					headers: s.headers
				}),
				{
					Hash: a
				} = await o.json();
			return new r(a)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(11),
			i = n(0),
			o = n(1),
			a = n(10),
			u = n(9).default;
		e.exports = i(e => async (t, n, i = {}) => {
			const c = new u,
				f = a([c.signal, i.signal]),
				{
					Hash: h
				} = await (await e.post("object/patch/set-data", {
					timeout: i.timeout,
					signal: f,
					searchParams: o({
						arg: ["" + (t instanceof Uint8Array ? new r(t) : t)],
						...i
					}),
					...await s(n, c, i.headers)
				})).json();
			return new r(h)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			{
				DAGNode: s
			} = n(22),
			i = n(11),
			o = n(0),
			a = n(1),
			u = n(10),
			c = n(9).default,
			f = n(8),
			h = n(7);
		e.exports = o(e => async (t, n = {}) => {
			let o, l = {
				Data: null,
				Links: []
			};
			if (t instanceof Uint8Array) n.enc || (l = {
				Data: f(t),
				Links: []
			});
			else if (s.isDAGNode(t)) l = {
				Data: f(t.Data),
				Links: t.Links.map(e => ({
					Name: e.Name,
					Hash: e.Hash.toString(),
					Size: e.Tsize
				}))
			};
			else {
				if ("object" != typeof t) throw new Error("obj not recognized");
				l.Data = f(t.Data), l.Links = t.Links
			}
			t instanceof Uint8Array && n.enc ? o = t : (n.enc = "json", o = h(JSON.stringify(l)));
			const p = new c,
				d = u([p.signal, n.signal]),
				g = await e.post("object/put", {
					timeout: n.timeout,
					signal: d,
					searchParams: a(n),
					...await i(o, p, n.headers)
				}),
				{
					Hash: m
				} = await g.json();
			return new r(m)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t, n = {}) => (await e.post("object/stat", {
			timeout: n.timeout,
			signal: n.signal,
			searchParams: i({
				arg: "" + (t instanceof Uint8Array ? new r(t) : t),
				...n
			}),
			headers: n.headers
		})).json())
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			add: n(268)(e),
			addAll: n(73)(e),
			ls: n(269)(e),
			rm: n(270)(e),
			rmAll: n(75)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(73),
			s = n(36),
			i = n(0);
		e.exports = e => {
			const t = r(e);
			return i(() => async function(e, n = {}) {
				return s(t({
					path: e,
					...n
				}, n))
			})(e)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);

		function o(e, t, n) {
			const s = {
				type: e,
				cid: new r(t)
			};
			return n && (s.metadata = n), s
		}
		e.exports = s(e => async function*(t = {}) {
			t.paths && (t.paths = Array.isArray(t.paths) ? t.paths : [t.paths]);
			const n = await e.post("pin/ls", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i({ ...t,
					arg: (t.paths || []).map(e => "" + e),
					stream: !0
				}),
				headers: t.headers
			});
			for await (const e of n.ndjson()) {
				if (e.Keys) {
					for (const t of Object.keys(e.Keys)) yield o(e.Keys[t].Type, t, e.Keys[t].Metadata);
					return
				}
				yield o(e.Type, e.Cid, e.Metadata)
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(75),
			s = n(36),
			i = n(0);
		e.exports = e => {
			const t = r(e);
			return i(() => async function(e, n = {}) {
				return s(t({
					path: e,
					...n
				}, n))
			})(e)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function*(t, n = {}) {
			const s = await e.post("ping", {
				timeout: n.timeout,
				signal: n.signal,
				searchParams: i({
					arg: "" + t,
					...n
				}),
				headers: n.headers,
				transform: r
			});
			yield* s.ndjson()
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			ls: n(273)(e),
			peers: n(274)(e),
			publish: n(275)(e),
			subscribe: n(276)(e),
			unsubscribe: n(277)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => {
			const {
				Strings: n
			} = await (await e.post("pubsub/ls", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: s(t),
				headers: t.headers
			})).json();
			return n || []
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t, n = {}) => {
			n || "object" != typeof t || (n = t || {}, t = null);
			const r = await e.post("pubsub/peers", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: s({
						arg: t,
						...n
					}),
					headers: n.headers
				}),
				{
					Strings: i
				} = await r.json();
			return i || []
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1),
			i = n(11),
			o = n(10),
			a = n(9).default;
		e.exports = r(e => async (t, n, r = {}) => {
			const u = s({
					arg: t,
					...r
				}),
				c = new a,
				f = o([c.signal, r.signal]),
				h = await e.post("pubsub/pub", {
					timeout: r.timeout,
					signal: f,
					searchParams: u,
					...await i(n, c, r.headers)
				});
			await h.text()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(7),
			s = n(8),
			i = n(48)("ipfs-http-client:pubsub:subscribe"),
			o = n(76),
			a = n(0),
			u = n(1);
		e.exports = a((e, t) => {
			const n = o.singleton();
			return async (t, o, a = {}) => {
				let c, f;
				a.signal = n.subscribe(t, o, a.signal);
				const h = new Promise((e, t) => {
						c = e, f = t
					}),
					l = setTimeout(() => c(), 1e3);
				return setTimeout(() => {
					e.post("pubsub/sub", {
						timeout: a.timeout,
						signal: a.signal,
						searchParams: u({
							arg: t,
							...a
						}),
						headers: a.headers
					}).catch(e => {
						n.unsubscribe(t, o), f(e)
					}).then(e => {
						clearTimeout(l), e && (!async function(e, {
							onMessage: t,
							onEnd: n,
							onError: o
						}) {
							o = o || i;
							try {
								for await (const n of e) try {
									if (!n.from) continue;
									t({
										from: s(r(n.from, "base64pad"), "base58btc"),
										data: r(n.data, "base64pad"),
										seqno: r(n.seqno, "base64pad"),
										topicIDs: n.topicIDs
									})
								} catch (a) {
									a.message = "Failed to parse pubsub message: " + a.message, o(a, !1, n)
								}
							} catch (a) {
								"aborted" !== a.type && "AbortError" !== a.name && o(a, !0)
							} finally {
								n()
							}
						}(e.ndjson(), {
							onMessage: o,
							onEnd: () => n.unsubscribe(t, o),
							onError: a.onError
						}), c())
					})
				}, 0), h
			}
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(76);
		e.exports = e => {
			const t = r.singleton();
			return async (e, n) => t.unsubscribe(e, n)
		}
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(3),
			i = n(0),
			o = n(1);
		e.exports = i((e, t) => {
			const i = async function*(t, n = {}) {
				Array.isArray(t) || (t = [t]);
				const i = await e.post("refs", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: o({
						arg: t.map(e => "" + (e instanceof Uint8Array ? new r(e) : e)),
						...n
					}),
					headers: n.headers,
					transform: s
				});
				yield* i.ndjson()
			};
			return i.local = n(279)(t), i
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function*(t = {}) {
			const n = await e.post("refs/local", {
				timeout: t.timeout,
				signal: t.signal,
				transform: r,
				searchParams: i(t),
				headers: t.headers
			});
			yield* n.ndjson()
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			gc: n(281)(e),
			stat: n(77)(e),
			version: n(282)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(2),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function*(t = {}) {
			const n = await e.post("repo/gc", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i(t),
				headers: t.headers,
				transform: e => ({
					err: e.Error ? new Error(e.Error) : null,
					cid: (e.Key || {})["/"] ? new r(e.Key["/"]) : null
				})
			});
			yield* n.ndjson()
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t = {}) => (await (await e.post("repo/version", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: s(t),
			headers: t.headers
		})).json()).Version)
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async function(t, n = {}) {
			const r = await e.post("resolve", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: s({
						arg: t,
						...n
					}),
					headers: n.headers
				}),
				{
					Path: i
				} = await r.json();
			return i
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			bitswap: n(53)(e),
			bw: n(285)(e),
			repo: n(77)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const {
			BigNumber: r
		} = n(14), s = n(0), i = n(1);
		e.exports = s(e => async function*(t = {}) {
			const n = await e.post("stats/bw", {
				timeout: t.timeout,
				signal: t.signal,
				searchParams: i(t),
				headers: t.headers,
				transform: e => ({
					totalIn: new r(e.TotalIn),
					totalOut: new r(e.TotalOut),
					rateIn: new r(e.RateIn),
					rateOut: new r(e.RateOut)
				})
			});
			yield* n.ndjson()
		})
	}, function(e, t, n) {
		"use strict";
		e.exports = e => ({
			addrs: n(287)(e),
			connect: n(288)(e),
			disconnect: n(289)(e),
			localAddrs: n(290)(e),
			peers: n(291)(e)
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(5),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("swarm/addrs", {
					timeout: t.timeout,
					signal: t.signal,
					searchParams: i(t),
					headers: t.headers
				}),
				{
					Addrs: s
				} = await n.json();
			return Object.keys(s).map(e => ({
				id: e,
				addrs: (s[e] || []).map(e => r(e))
			}))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t, n = {}) => {
			t = Array.isArray(t) ? t : [t];
			const r = await e.post("swarm/connect", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: s({
						arg: t.map(e => "" + e),
						...n
					}),
					headers: n.headers
				}),
				{
					Strings: i
				} = await r.json();
			return i || []
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(0),
			s = n(1);
		e.exports = r(e => async (t, n = {}) => {
			t = Array.isArray(t) ? t : [t];
			const r = await e.post("swarm/disconnect", {
					timeout: n.timeout,
					signal: n.signal,
					searchParams: s({
						arg: t.map(e => "" + e),
						...n
					}),
					headers: n.headers
				}),
				{
					Strings: i
				} = await r.json();
			return i || []
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(5),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => {
			const n = await e.post("swarm/addrs/local", {
					timeout: t.timeout,
					signal: t.signal,
					searchParams: i(t),
					headers: t.headers
				}),
				{
					Strings: s
				} = await n.json();
			return (s || []).map(e => r(e))
		})
	}, function(e, t, n) {
		"use strict";
		const r = n(5),
			s = n(0),
			i = n(1);
		e.exports = s(e => async (t = {}) => ((await (await e.post("swarm/peers", {
			timeout: t.timeout,
			signal: t.signal,
			searchParams: i(t),
			headers: t.headers
		})).json()).Peers || []).map(e => {
			const t = {};
			try {
				t.addr = r(e.Addr), t.peer = e.Peer
			} catch (n) {
				t.error = n, t.rawPeerInfo = e
			}
			return e.Muxer && (t.muxer = e.Muxer), e.Latency && (t.latency = e.Latency), e.Streams && (t.streams = e.Streams),
				null != e.Direction && (t.direction = e.Direction), t
		}))
	}, function(e, t, n) {
		"use strict";
		const r = n(3),
			s = n(0),
			i = n(1);
		e.exports = s(e => async function(t = {}) {
			const n = await e.post("version", {
					timeout: t.timeout,
					signal: t.signal,
					searchParams: i(t),
					headers: t.headers
				}),
				s = await n.json();
			return r(s)
		})
	}])
}));
