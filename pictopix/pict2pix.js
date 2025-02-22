var pict2pix;
(() => {
	"use strict";
	var t = {
			d: (i, e) => {
				for (var s in e)
					t.o(e, s) &&
						!t.o(i, s) &&
						Object.defineProperty(i, s, { enumerable: !0, get: e[s] });
			},
			o: (t, i) => Object.prototype.hasOwnProperty.call(t, i),
			r: (t) => {
				"undefined" != typeof Symbol &&
					Symbol.toStringTag &&
					Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
					Object.defineProperty(t, "__esModule", { value: !0 });
			},
		},
		i = {};
	t.r(i), t.d(i, { animate: () => v, stop: () => b });
	class e {
		static TWO_PI = 2 * Math.PI;
	}
	class s {
		#config;
		#x;
		#y;
		#originalX;
		#originalY;
		#fromX;
		#fromY;
		#toX;
		#toY;
		#color;
		#dx;
		#dy;
		#transitionTime;
		#realTransitionTime;
		#radio;
		constructor(t, i) {
			(this.#config = t),
				(this.#x = 0),
				(this.#y = 0),
				(this.#originalX = i.x),
				(this.#originalY = i.y),
				this.setFromOrigin(),
				this.setToOrigin(),
				(this.#color = i.color),
				(this.#radio = i.ledSize / 2);
		}
		#calculateDistance() {
			(this.#dx = this.#toX - this.#fromX),
				(this.#dy = this.#toY - this.#fromY);
		}
		setTransitionTime(t) {
			this.#transitionTime = t;
			const i = Math.floor(this.#transitionTime - this.#transitionTime / 10),
				e = Math.floor(this.#transitionTime / 2);
			this.#realTransitionTime = Math.floor(Math.random() * (i - e) + e);
		}
		setFrom(t, i) {
			(this.#fromX = t), (this.#fromY = i), this.#calculateDistance();
		}
		setTo(t, i) {
			(this.#toX = t), (this.#toY = i), this.#calculateDistance();
		}
		setFromPos() {
			(this.#fromX = this.#x),
				(this.#fromY = this.#y),
				this.#calculateDistance();
		}
		setFromOrigin() {
			(this.#fromX = this.#originalX),
				(this.#fromY = this.#originalY),
				this.#calculateDistance();
		}
		setToOrigin() {
			(this.#toX = this.#originalX),
				(this.#toY = this.#originalY),
				this.#calculateDistance();
		}
		setPos(t, i) {
			(this.#x = t), (this.#y = i);
		}
		getX() {
			return this.#x;
		}
		getY() {
			return this.#y;
		}
		getOriginalX() {
			return this.#originalX;
		}
		getOriginalY() {
			return this.#originalY;
		}
		getTargetX() {
			return this.#toX;
		}
		getTargetY() {
			return this.#toY;
		}
		update(t) {
			const i = t / this.#realTransitionTime;
			t <= this.#realTransitionTime
				? ((this.#x = this.#dx * i + this.#fromX),
				  (this.#y = this.#dy * i + this.#fromY))
				: ((this.#x = this.#toX), (this.#y = this.#toY));
		}
		draw(t) {
			t.beginPath(),
				t.arc(this.#x, this.#y, this.#radio, 0, e.TWO_PI),
				t.closePath(),
				(t.fillStyle = this.#color),
				t.fill();
		}
	}
	class a extends class {
		config;
		constructor(t) {
			this.config = t;
		}
		update(t) {}
		draw(t) {}
	} {
		constructor(t) {
			super(t),
				(this.x = Math.random() * this.config.maxWidth),
				(this.y = Math.random() * this.config.maxHeight),
				(this.speed = 0),
				(this.size = 2 * Math.random() + 0.2),
				this.color;
		}
		update(t) {
			(this.y += (3 - this.speed) * t * 0.03 * this.config.verticalSpeed),
				(this.x += (3 - this.speed) * t * 0.03 * this.config.horizontalSpeed),
				this.y >= this.config.maxHeight &&
					this.config.verticalSpeed > 0 &&
					((this.y = 0), (this.x = Math.random() * this.config.maxWidth)),
				this.y < 0 &&
					this.config.verticalSpeed < 0 &&
					((this.y = this.config.maxHeight - 1),
					(this.x = Math.random() * this.config.maxWidth)),
				this.x >= this.config.maxWidth &&
					this.config.horizontalSpeed > 0 &&
					((this.x = 0), (this.y = Math.random() * this.config.maxHeight)),
				this.x < 0 &&
					this.config.horizontalSpeed < 0 &&
					((this.x = this.config.maxWidth - 1),
					(this.y = Math.random() * this.config.maxHeight));
			let i = Math.floor(this.y),
				e = Math.floor(this.x);
			i >= 0 &&
				i < this.config.maxHeight &&
				e >= 0 &&
				e < this.config.maxWidth &&
				((this.speed = this.config.mappedImage[i][e].brightness),
				(this.color = this.config.mappedImage[i][e].color));
		}
		draw(t) {
			t.beginPath(),
				(t.globalAlpha = 1),
				(t.fillStyle = this.color),
				(t.strokeStyle = this.color),
				t.arc(this.x, this.y, this.size, 0, e.TWO_PI),
				t.fill();
		}
	}
	class r extends a {
		#angle = 0;
		constructor(t) {
			super(t);
		}
		update(t) {
			super.update(t),
				(this.#angle += this.speed / 20),
				(this.y += Math.sin(this.#angle)),
				(this.x += Math.cos(this.#angle));
		}
	}
	class h {
		#config;
		#color;
		#x;
		#y;
		#originalX;
		#originalY;
		#toX;
		#toY;
		#fromX;
		#fromY;
		#dx;
		#dy;
		constructor(t, i) {
			(this.#config = t),
				(this.#color = i.color),
				(this.#originalX = i.x),
				(this.#originalY = i.y),
				this.setFromOrigin(),
				this.setToOrigin();
		}
		#calculateDistance() {
			(this.#dx = this.#toX - this.#fromX),
				(this.#dy = this.#toY - this.#fromY);
		}
		setFrom(t, i) {
			(this.#fromX = t), (this.#fromY = i), this.#calculateDistance();
		}
		setTo(t, i) {
			(this.#toX = t), (this.#toY = i), this.#calculateDistance();
		}
		setFromOrigin() {
			(this.#fromX = this.#originalX),
				(this.#fromY = this.#originalY),
				this.#calculateDistance();
		}
		setToOrigin() {
			(this.#toX = this.#originalX),
				(this.#toY = this.#originalY),
				this.#calculateDistance();
		}
		setPosOrigin() {
			(this.#x = this.#originalX), (this.#y = this.#originalY);
		}
		setPos(t, i) {
			(this.#x = t), (this.#y = i);
		}
		getX() {
			return this.#x;
		}
		getY() {
			return this.#y;
		}
		getFromX() {
			return this.#fromX;
		}
		getFromY() {
			return this.#fromY;
		}
		getDx() {
			return this.#dx;
		}
		getDy() {
			return this.#dy;
		}
		getOriginalX() {
			return this.#originalX;
		}
		getOriginalY() {
			return this.#originalY;
		}
		draw(t) {
			this.#x < this.#config.maxWidth &&
				this.#y < this.#config.maxHeight &&
				(t.beginPath(),
				t.arc(this.#x, this.#y, this.getRadio(this.#x, this.#y), 0, e.TWO_PI),
				t.closePath(),
				(t.fillStyle = this.#color),
				t.fill());
		}
		getRadio(t, i) {
			const e = Math.floor(
					(t - this.#config.dotSize / 2) / this.#config.dotSize,
				),
				s = Math.floor((i - this.#config.dotSize / 2) / this.#config.dotSize);
			if (
				s < this.#config.mappedImage.length &&
				e < this.#config.mappedImage[0].length
			) {
				const t = this.#config.mappedImage[s][e].brightness;
				return (this.#config.dotSize * (2.55 - t)) / 4;
			}
			return 0;
		}
	}
	class c {
		static #particles = {
			"straight-particle": (t) => new a(t),
			"twisted-particle": (t) => new r(t),
			"led-matrix": (t, i) => new s(t, i),
			halftone: (t, i) => new h(t, i),
		};
		static createParticle(t, i) {
			return this.#particles[t.particleType]?.(t, i) ?? new a();
		}
	}
	function n(t, i, e) {
		let s = [];
		for (let a = 0; a < e; a++) {
			const e = 4 * a * t.width;
			let r = [];
			for (let s = 0; s < i; s++) {
				const i = 4 * s,
					a = t.data[e + i],
					h = t.data[e + (i + 1)],
					c = t.data[e + (i + 2)],
					n = t.data[e + (i + 3)],
					l = {
						brightness: o(a, h, c),
						alpha: n,
						color: "rgb(" + a + "," + h + "," + c + ")",
					};
				r.push(l);
			}
			s.push(r);
		}
		return s;
	}
	function o(t, i, e) {
		return Math.sqrt(t * t * 0.299 + i * i * 0.587 + e * e * 0.114) / 100;
	}
	function l(t, i) {
		const e = document.createElement("canvas"),
			s = t.width / i,
			a = t.height / i;
		(e.width = s), (e.height = a);
		const r = e.getContext("2d");
		return r.drawImage(t, 0, 0, s, a), r.getImageData(0, 0, s, a);
	}
	class g {
		#config;
		#particlesArray = [];
		constructor(t) {
			this.#config = t;
			let i = document.createElement("canvas");
			(i.width = this.#config.image.width),
				(i.height = this.#config.image.height);
			let e = i.getContext("2d");
			e.drawImage(
				this.#config.image,
				0,
				0,
				this.#config.image.width,
				this.#config.image.height,
			);
			const s = e.getImageData(
				0,
				0,
				this.#config.image.width,
				this.#config.image.height,
			);
			(this.#config.numberOfParticles = this.#config.numberOfParticles || 3e3),
				(this.#config.maxWidth = this.#config.image.width),
				(this.#config.maxHeight = this.#config.image.height),
				(this.#config.mappedImage = n(
					s,
					this.#config.maxWidth,
					this.#config.maxHeight,
				)),
				(this.#config.verticalSpeed = t.verticalSpeed ?? 1),
				(this.#config.horizontalSpeed = t.horizontalSpeed ?? 1);
			for (let i = 0; i < this.#config.numberOfParticles; i++)
				this.#particlesArray.push(c.createParticle(t));
		}
		update(t) {
			for (let i = 0; i < this.#particlesArray.length; i++)
				this.#particlesArray[i].update(t);
		}
		draw(t) {
			(t.globalAlpha = 0.01),
				(t.fillStyle = "rgb(0, 0, 0)"),
				t.fillRect(0, 0, this.#config.maxWidth, this.#config.maxHeight);
			for (let i = 0; i < this.#particlesArray.length; i++)
				this.#particlesArray[i].draw(t);
		}
	}
	class f {
		ledMatrixEffect;
		setLedMatrixEffect(t) {
			this.ledMatrixEffect = t;
		}
		update(t) {}
	}
	class m extends f {
		#config;
		#particlesArray;
		#accumulatedTime = 0;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
			const e = Math.random() * this.#config.maxWidth,
				s = Math.random() * this.#config.maxHeight;
			for (let t = 0; t < this.#particlesArray.length; t++)
				this.#particlesArray[t].setTransitionTime(this.#config.transitionTime),
					this.#particlesArray[t].setFromPos(),
					this.#particlesArray[t].setTo(e, s);
		}
		update(t) {
			if (
				((this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.transitionTime)
			)
				this.ledMatrixEffect.setState(
					x.createLedMatrixState(
						"returning",
						this.#config,
						this.#particlesArray,
					),
				);
			else
				for (let t = 0; t < this.#particlesArray.length; t++)
					this.#particlesArray[t].update(
						this.#accumulatedTime,
						this.#config.transitionTime,
					);
		}
	}
	class d extends f {
		#config;
		#particlesArray;
		#accumulatedTime = 0;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
			const e = (-1 * this.#config.ledSize) / 2;
			for (let t = 0; t < this.#particlesArray.length; t++)
				this.#particlesArray[t].setTransitionTime(this.#config.transitionTime),
					this.#particlesArray[t].setFromPos(),
					this.#particlesArray[t].setTo(
						this.#particlesArray[t].getOriginalX(),
						e,
					);
		}
		update(t) {
			if (
				((this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.transitionTime)
			) {
				for (let t = 0; t < this.#particlesArray.length; t++)
					this.#particlesArray[t].setPos(
						this.#particlesArray[t].getOriginalX(),
						this.#config.maxHeight - 1,
					);
				this.ledMatrixEffect.setState(
					x.createLedMatrixState(
						"returning",
						this.#config,
						this.#particlesArray,
					),
				);
			} else
				for (let t = 0; t < this.#particlesArray.length; t++)
					this.#particlesArray[t].update(
						this.#accumulatedTime,
						this.#config.transitionTime,
					);
		}
	}
	class p extends f {
		#config;
		#particlesArray;
		#accumulatedTime = 0;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
			const e = (-1 * this.#config.ledSize) / 2;
			for (let t = 0; t < this.#particlesArray.length; t++)
				this.#particlesArray[t].setTransitionTime(this.#config.transitionTime),
					this.#particlesArray[t].setFromPos(),
					this.#particlesArray[t].setTo(
						e,
						this.#particlesArray[t].getOriginalY(),
					);
		}
		update(t) {
			if (
				((this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.transitionTime)
			) {
				for (let t = 0; t < this.#particlesArray.length; t++)
					this.#particlesArray[t].setPos(
						this.#config.maxWidth - 1,
						this.#particlesArray[t].getOriginalY(),
					);
				this.ledMatrixEffect.setState(
					x.createLedMatrixState(
						"returning",
						this.#config,
						this.#particlesArray,
					),
				);
			} else
				for (let t = 0; t < this.#particlesArray.length; t++)
					this.#particlesArray[t].update(
						this.#accumulatedTime,
						this.#config.transitionTime,
					);
		}
	}
	class u extends f {
		#config;
		#particlesArray;
		#accumulatedTime = 0;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
			for (let t = 0; t < this.#particlesArray.length; t++)
				this.#particlesArray[t].setTransitionTime(this.#config.transitionTime),
					this.#particlesArray[t].setFromPos(),
					this.#particlesArray[t].setToOrigin();
		}
		update(t) {
			if (
				((this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.transitionTime)
			)
				this.ledMatrixEffect.setState(
					x.createLedMatrixState("idle", this.#config, this.#particlesArray),
				);
			else
				for (let t = 0; t < this.#particlesArray.length; t++)
					this.#particlesArray[t].update(
						this.#accumulatedTime,
						this.#config.transitionTime,
					);
		}
	}
	class y extends f {
		#accumulatedTime = 0;
		#config;
		#particlesArray;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
		}
		update(t) {
			(this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.idleTime &&
					this.ledMatrixEffect.setState(
						x.createLedMatrixState(
							this.#config.type,
							this.#config,
							this.#particlesArray,
						),
					);
		}
	}
	class x {
		static #states = {
			point: (t, i) => new m(t, i),
			horizontal: (t, i) => new d(t, i),
			vertical: (t, i) => new p(t, i),
			returning: (t, i) => new u(t, i),
			idle: (t, i) => new y(t, i),
		};
		static createLedMatrixState(t, i, e) {
			let s;
			return (
				(s = "random" === t ? x.getRandomState() : t),
				x.#states[s]?.(i, e) ?? new m(i, e)
			);
		}
		static getRandomState() {
			const t = Math.floor(3 * Math.random());
			return Object.keys(x.#states)[t];
		}
	}
	class T {
		#config;
		#particlesArray = [];
		#state;
		constructor(t) {
			(this.#config = t),
				(this.#config.maxWidth = this.#config.image.width),
				(this.#config.maxHeight = this.#config.image.height),
				(this.#config.transitionTime = t.transitionTime ?? 2e3),
				(this.#config.idleTime = t.idleTime ?? 5e3),
				(this.#config.ledSize = t.ledSize && t.ledSize >= 4 ? t.ledSize : 4);
			const i = l(this.#config.image, this.#config.ledSize),
				e = n(i, i.width, i.height);
			this.createParticlesFromMappedImage(e, i.width, i.height),
				this.setState(
					x.createLedMatrixState(
						"returning",
						this.#config,
						this.#particlesArray,
					),
				);
		}
		setState(t) {
			(this.#state = t), this.#state.setLedMatrixEffect(this);
		}
		createParticlesFromMappedImage(t) {
			const i = this.#config.ledSize / 2;
			for (var e = 0; e < t.length; e++)
				for (var s = 0; s < t[e].length; s++)
					if (t[e][s].alpha > 128) {
						let a = t[e][s].color,
							r = c.createParticle(this.#config, {
								x: s * this.#config.ledSize + i,
								y: e * this.#config.ledSize + i,
								color: a,
								ledSize: this.#config.ledSize,
							});
						this.#particlesArray.push(r);
					}
		}
		update(t) {
			this.#state.update(t);
		}
		draw(t) {
			t.clearRect(0, 0, this.#config.maxWidth, this.#config.maxHeight);
			for (let i = 0; i < this.#particlesArray.length; i++)
				this.#particlesArray[i].draw(t);
		}
	}
	class A {
		halftoneEffect;
		setHalftoneEffect(t) {
			this.halftoneEffect = t;
		}
		update(t) {}
	}
	class S extends A {
		#config;
		#particlesArray;
		#accumulatedTime = 0;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
			for (let t = 0; t < this.#particlesArray.length; t++)
				this.#particlesArray[t].setFrom(
					this.#particlesArray[t].getOriginalX() * this.#config.separation,
					this.#particlesArray[t].getOriginalY() * this.#config.separation,
				),
					this.#particlesArray[t].setToOrigin();
		}
		update(t) {
			if (
				((this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.transitionTime)
			)
				this.halftoneEffect.setState(
					X.createHalftoneEffectState(
						"idle",
						this.#config,
						this.#particlesArray,
					),
				);
			else
				for (let t = 0; t < this.#particlesArray.length; t++) {
					const i = this.#accumulatedTime / this.#config.transitionTime - 1,
						e =
							this.#particlesArray[t].getDx() * Math.sqrt(1 - i * i * i * i) +
							this.#particlesArray[t].getFromX(),
						s =
							this.#particlesArray[t].getDy() * Math.sqrt(1 - i * i * i * i) +
							this.#particlesArray[t].getFromY();
					this.#particlesArray[t].setPos(e, s);
				}
		}
	}
	class w extends A {
		#config;
		#particlesArray;
		#accumulatedTime = 0;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
		}
		update(t) {
			(this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.idleTime &&
					this.halftoneEffect.setState(
						X.createHalftoneEffectState(
							"returning",
							this.#config,
							this.#particlesArray,
						),
					);
		}
	}
	class M extends A {
		#config;
		#particlesArray;
		#accumulatedTime = 0;
		constructor(t, i) {
			super(), (this.#config = t), (this.#particlesArray = i);
			for (let t = 0; t < this.#particlesArray.length; t++)
				this.#particlesArray[t].setFromOrigin(),
					this.#particlesArray[t].setTo(
						this.#particlesArray[t].getOriginalX() * this.#config.separation,
						this.#particlesArray[t].getOriginalY() * this.#config.separation,
					);
		}
		update(t) {
			if (
				((this.#accumulatedTime += t),
				this.#accumulatedTime > this.#config.transitionTime)
			)
				this.halftoneEffect.setState(
					X.createHalftoneEffectState(
						"going",
						this.#config,
						this.#particlesArray,
					),
				);
			else
				for (let t = 0; t < this.#particlesArray.length; t++) {
					const i = this.#accumulatedTime / this.#config.transitionTime,
						e =
							-this.#particlesArray[t].getDx() * (Math.sqrt(1 - i * i) - 1) +
							this.#particlesArray[t].getFromX(),
						s =
							-this.#particlesArray[t].getDy() * (Math.sqrt(1 - i * i) - 1) +
							this.#particlesArray[t].getFromY();
					this.#particlesArray[t].setPos(e, s);
				}
		}
	}
	class X {
		static #states = {
			going: (t, i) => new S(t, i),
			idle: (t, i) => new w(t, i),
			returning: (t, i) => new M(t, i),
		};
		static createHalftoneEffectState(t, i, e) {
			return X.#states[t]?.(i, e) ?? new HalftoneEffectGoingPointState(i, e);
		}
	}
	class Y {
		#config;
		#particlesArray = [];
		#state;
		constructor(t) {
			(this.#config = t),
				(this.#config.maxWidth = this.#config.image.width),
				(this.#config.maxHeight = this.#config.image.height),
				(this.#config.dotSize = t.dotSize && t.dotSize >= 4 ? t.dotSize : 4),
				(this.#config.transitionTime = t.transitionTime ?? 8e3),
				(this.#config.idleTime = t.idleTime ?? 4e3),
				(this.#config.color = t.color ?? "rgb(30, 30, 30)"),
				(this.#config.separation =
					t.separation && t.separation >= 1 ? t.separation : 10);
			const i = l(this.#config.image, this.#config.dotSize);
			(this.#config.mappedImage = n(i, i.width, i.height)),
				this.createParticlesFromMappedImage(),
				this.setState(
					X.createHalftoneEffectState(
						"going",
						this.#config,
						this.#particlesArray,
					),
				);
		}
		setState(t) {
			(this.#state = t), this.#state.setHalftoneEffect(this);
		}
		createParticlesFromMappedImage() {
			const t = this.#config.dotSize / 2;
			for (var i = 0; i < this.#config.mappedImage.length; i++)
				for (var e = 0; e < this.#config.mappedImage[i].length; e++)
					if (this.#config.mappedImage[i][e].alpha > 128) {
						let s = c.createParticle(this.#config, {
							x: e * this.#config.dotSize + t,
							y: i * this.#config.dotSize + t,
							color: this.#config.color,
							size:
								(this.#config.dotSize *
									(2.55 - this.#config.mappedImage[i][e].brightness)) /
								2,
						});
						this.#particlesArray.push(s);
					}
		}
		update(t) {
			this.#state.update(t);
		}
		draw(t) {
			t.clearRect(0, 0, this.#config.maxWidth, this.#config.maxHeight);
			for (let i = 0; i < this.#particlesArray.length; i++)
				this.#particlesArray[i].draw(t);
		}
	}
	class P {
		static #effects = {
			"straight-particle": (t) => new g(t),
			"twisted-particle": (t) => new g(t),
			"led-matrix": (t) => new T(t),
			halftone: (t) => new Y(t),
		};
		static createParticle(t) {
			return this.#effects[t.particleType]?.(t) ?? new g(t);
		}
	}
	class O {
		#canvas;
		#ctx;
		#reqAnim;
		#lastTime = 0;
		#deltaTime = 0;
		#effect;
		#config;
		running = !1;
		constructor(t) {
			(this.#config = t),
				(this.#canvas = document.createElement("canvas")),
				(this.#canvas.width =
					this.#config.image.width || this.#config.image.naturalWidth),
				(this.#canvas.height =
					this.#config.image.height || this.#config.image.naturalHeight),
				(this.#ctx = this.#canvas.getContext("2d")),
				(this.#effect = P.createParticle(t));
		}
		update(t) {
			this.#effect.update(t);
		}
		draw() {
			this.#effect.draw(this.#ctx);
		}
		start() {
			this.running ||
				((this.#lastTime = 0),
				(this.#config.image.style.display = "none"),
				this.#config.image.parentNode.insertBefore(
					this.#canvas,
					this.#config.image,
				),
				(this.#reqAnim = requestAnimationFrame(this.loop.bind(this))),
				(this.running = !0));
		}
		stop() {
			this.running &&
				((this.#config.image.style.display = "initial"),
				this.#config.image.parentNode.removeChild(this.#canvas),
				window.cancelAnimationFrame(this.#reqAnim),
				(this.running = !1));
		}
		loop(t) {
			this.#lastTime || (this.#lastTime = t),
				(this.#deltaTime = t - this.#lastTime),
				(this.#lastTime = t),
				this.update(this.#deltaTime),
				this.draw(),
				(this.#reqAnim = requestAnimationFrame(this.loop.bind(this)));
		}
	}
	var z = {};
	function v(t) {
		z[t.image.id] || (z[t.image.id] = { pict2pix: new O(t), running: !0 }),
			(z[t.image.id].running = !0),
			z[t.image.id].pict2pix.start();
	}
	function b(t) {
		(z[t].running = !1), z[t].pict2pix.stop();
	}
	document.addEventListener(
		"visibilitychange",
		function () {
			"hidden" === document.visibilityState
				? (function () {
						for (var t in z) z[t].running && z[t].pict2pix.stop();
				  })()
				: (function () {
						for (var t in z) z[t].running && z[t].pict2pix.start();
				  })();
		},
		!1,
	),
		(pict2pix = i);
})();
