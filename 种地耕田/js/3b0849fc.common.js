var Common = {
	init: function() {
		this.setMenu(),
			this.setVideoForMobile(),
			this.setClientNav(),
			this.setJoinUsClick(),
			this.setSubMenu(),
			this.gotop();
	},
	project: "ow",
	setToken: function() {},
	setWxShare: function(a, b, c) {
		var d = a ? a : "",
			e = b ? b : "https://overwatch.nosdn.127.net/1/share.jpg",
			f = c ? c : "";
		WX_Share({
			appId: "wx0bdaa6f4aef41c77",
			title: d,
			desc: "",
			img: e,
			link: f,
			scope: "ow"
		});
		var g = '<div style="display:none;"><img src="' + e + '"></div>';
		$("body").prepend(g);
	},
	setSubMenu: function() {
		$(".m-has-children").click(function() {
			$(this).toggleClass("m-open"),
				$(this)
					.siblings(".nav-menu")
					.toggleClass("m-open"),
				$(this)
					.parent("li")
					.siblings()
					.find(".nav-menu,.m-has-children")
					.removeClass("m-open");
		}),
			$(window).on("scroll", function() {
				$(".m-has-children, .nav-menu").removeClass("m-open");
			});
	},
	setJoinUsClick: function() {
		$(".joinus,.cs-joinus").click(function() {
			neteaseTracker(
				!1,
				"http://ow.blizzard.cn/joinus",
				"加入我们",
				"overwatchclick"
			),
				DATracker.track("footer_btn_joinus", {
					name: "页面底部加入我们"
				});
		});
	},
	whichAnimationEvent: function() {
		var a,
			b = document.createElement("fakeelement"),
			c = {
				animation: "animationend",
				OAnimation: "oAnimationEnd",
				MozAnimation: "animationend",
				WebkitAnimation: "webkitAnimationEnd"
			};
		for (a in c) if (void 0 !== b.style[a]) return c[a];
		return !1;
	},
	ieVersion: function(a) {
		var b = window.navigator.userAgent.toLowerCase(),
			c = RegExp("msie " + a + ".0", "i");
		return $.browser.msie && c.test(b);
	},
	checkSite: function() {
		location.href =
			Common.ieVersion(8) || Common.ieVersion(7) || Common.ieVersion(6)
				? "/browser-check.html"
				: "/home";
	},
	setVideoForMobile: function() {
		var a = $("video");
		Common.isMobile() && a.removeAttr("autoplay");
	},
	video: {
		setVideoPop: function(a, b, c) {
			var d = this;
			a.on("click", function() {
				var a = $(this).attr("data-flv"),
					e = $(this).attr("data-video"),
					f = d.showVideoHtml([a, e], b, c);
				new JV.lightBox(f, { model: !0 });
			});
		},
		showVideoHtml: function(a, b, c) {
			var d,
				e = this;
			return (d = Modernizr.video
				? e.showIosVideo(a[1], b, c)
				: e.showFlvVideo(
						"http://v.163.com/swf/video/NetEaseFlvPlayerV3.swf",
						b,
						c,
						a[0]
				  ));
		},
		showFlvVideo: function(a, b, c, d) {
			var e =
				'<div class="hos_lightbox" style="width:' +
				b +
				"px; height:" +
				c +
				'px;"><div class="lightBox_bg"><object width="' +
				b +
				'" height="' +
				c +
				'" id="FPlayer" data="' +
				a +
				'" type="application/x-shockwave-flash"><param value="transparent" name="wmode" /><param value="true" name="allowFullScreen" /><param value="always" name="allowscriptaccess" /><param value="' +
				a +
				'" allownetworking="all" name="movie" /><param value="' +
				d +
				'" name="flashvars" /></object></div></div>';
			return e;
		},
		showIosVideo: function(a, b, c) {
			var d =
				'<video width="' +
				b +
				'" height="' +
				c +
				'" controls="controls" autoplay="false" preload="auto"><source src="' +
				a +
				'" type="video/mp4"> 您的浏览器暂时无法播放此视频.</video>';
			return d;
		}
	},
	validate: {
		digits: function(a) {
			var b = /^[0-9]+$/;
			return b.test(a);
		},
		mobile: function(a) {
			var b = /^[1][3-8]\d{9}$/;
			return b.test(a);
		},
		email: function(a) {
			var b = /^[0-9a-zA-Z+_.-]+@[0-9a-zA-Z_-]+\.[0-9a-zA-Z_.-]+$/;
			return b.test(a);
		},
		p_code: function(a) {
			var b = /^\d{6}$/;
			return b.test(a);
		}
	},
	libs: {
		baseSlide: function() {
			var a = $(".ui-slider");
			a.each(function(a, b) {
				var c = $(".ui-slider-pic", $(b)),
					d = c.children(),
					e = $(".ui-slider-txt", $(b)),
					f = e.children(),
					g = $(".prev", $(b)),
					h = $(".next", $(b)),
					i = $(".ui-slider-active", $(b)),
					j = d.index(i);
				g.click(function() {
					return (
						j--,
						0 > j && (j = d.length - 1),
						d
							.eq(j)
							.siblings()
							.hide()
							.stop(!0, !0)
							.end()
							.fadeIn(),
						f
							.eq(j)
							.siblings()
							.hide()
							.stop(!0, !0)
							.end()
							.fadeIn(),
						!1
					);
				}),
					h.click(function() {
						return (
							j++,
							j == d.length && (j = 0),
							d
								.eq(j)
								.siblings()
								.hide()
								.stop(!0, !0)
								.end()
								.fadeIn(),
							f
								.eq(j)
								.siblings()
								.hide()
								.stop(!0, !0)
								.end()
								.fadeIn(),
							!1
						);
					});
			});
		},
		baseTabs: function(a, b, c) {
			a.live(c, function() {
				var c = $(this),
					d = a.index(c);
				c
					.addClass("active")
					.siblings()
					.removeClass("active"),
					b
						.eq(d)
						.show()
						.siblings()
						.hide();
			});
		},
		baseLightBox: function(a, b, c) {
			var d =
				'<div style="width:' +
				b +
				"px; height:" +
				c +
				'px;" class="hos_lightbox">' +
				a +
				"</div>";
			$.hos.lightBox(d, { model: !0 });
		},
		lightBox: function(a, b, c) {
			var d = Common.getBoxwrap(b, c);
			(d[3] = a), $.hos.lightBox(d.join(""), { model: !0, hasClose: !1 });
		},
		lightImg: function(a, b, c) {
			var d = "",
				e = "";
			"undefined" != typeof b && (d = "width:" + b + "px;"),
				"undefined" != typeof c && (e = "height:" + c + "px");
			var f =
				'<div style="' +
				d +
				e +
				'" class="hos_lightbox"><img style="' +
				d +
				e +
				'" alt="" src="' +
				a +
				'"></div>';
			$.hos.lightBox(f, { model: !0 });
		}
	},
	isObjectNull: function(a) {
		var b = 0;
		for (var c in a) b++;
		return 0 == b ? !0 : !1;
	},
	isMobile: function() {
		var a = /(android|iPhone|iPad|iPod|mobile)/gi;
		return a.test(navigator.userAgent);
	},
	getData: function(a, b, c, d) {
		if (Common.isObjectNull(b)) var b = { t: new Date().getTime() };
		else b.t = new Date().getTime();
		var e;
		(e = "undefined" == typeof d ? "html" : "json"),
			$.get(
				a,
				b,
				function(a) {
					c(a);
				},
				e
			);
	},
	addFlash: function(a, b, c, d) {
		var e = {
			menu: "false",
			allowFullScreen: "false",
			allowScriptAccess: "true",
			bgcolor: "#12110f",
			quality: "high",
			wmode: "transparent",
			base: "."
		};
		"music" == arguments[4] && (e.wmode = "window"),
			swfobject.embedSWF(a, b, c, d, "9.0.0", "", "", e);
	},
	formatDate: function(a) {
		{
			var b = new Date(a),
				c = b.getFullYear(),
				d = b.getMonth() + 1,
				e = b.getDate();
			b.getHours(), b.getMinutes(), b.getSeconds();
		}
		return (
			10 > d && (d = "0" + d),
			10 > e && (e = "0" + e),
			c + "-" + d + "-" + e
		);
	},
	setFastClick: function() {
		FastClick.attach(document.body);
	},
	setMenu: function() {
		function a() {
			i &&
				((i = 0),
				k.velocity("stop", !0),
				k.velocity(
					{ top: 0 },
					{ duration: 200, easing: "easeOutCirc" }
				));
		}
		function b() {
			i ||
				((i = 1),
				k.velocity("stop", !0),
				k.velocity(
					{ top: 80 },
					{ duration: 200, easing: "easeOutCirc" }
				));
		}
		function c() {
			h ||
				((h = 1),
				j.velocity("stop", !0),
				j.velocity(
					{ maxWidth: "100%" },
					{ duration: 100, easing: "easeOutCirc" }
				));
		}
		function d() {
			h &&
				((h = 0),
				j.velocity("stop", !0),
				j.velocity(
					{ maxWidth: 1600 },
					{ duration: 100, easing: "easeOutCirc" }
				));
		}
		function e() {
			var e =
					window.pageYOffset ||
					window.scrollY ||
					n.scrollTop ||
					m.documentElement.scrollTop,
				f =
					window.innerWidth ||
					m.documentElement.clientWidth ||
					n.clientWidth,
				g = 80;
			768 > f ? (a(), c()) : f >= 768 && g >= e && (b(), d());
		}
		function f() {
			var e =
					window.pageYOffset ||
					window.scrollY ||
					n.scrollTop ||
					m.documentElement.scrollTop,
				f =
					n.scrollHeight > n.clientHeight &&
					"fixed" !== n.style.position,
				g =
					window.innerWidth ||
					m.documentElement.clientWidth ||
					n.clientWidth,
				h = 80;
			e > h && f && g >= 768
				? (a(), c())
				: h >= e && f && g >= 768 && (b(), d());
		}
		function g() {
			f(),
				e(),
				$(m).on("scroll", _.throttle(f, 32)),
				$(window).on("resize", _.throttle(e, 32)),
				j.find(".m-burger").on("click", function(a) {
					a.preventDefault(),
						$(".slide-menu,.blackout").toggleClass("open", !0),
						$(".slide-menu .close,.blackout").one("click", function(
							a
						) {
							a.preventDefault(),
								$(".slide-menu,.blackout").toggleClass(
									"open",
									!1
								);
						});
				}),
				j.find(".m-bnet").on("click", function(a) {
					a.preventDefault(),
						l.toggleClass("out", !0),
						$("#nav-blackout,.nav-remove-icon").one(
							"click",
							function(a) {
								a.preventDefault(), l.toggleClass("out", !1);
							}
						);
				});
		}
		var h = 0,
			i = 1,
			j = $("nav[role=main]"),
			k = ($("nav[role=mobile]"), $(".navbars")),
			l = $(".nav-mobile-menu-wrap.right"),
			m = window.document,
			n = window.document.body;
		g();
	},
	setClientNav: function() {
		function a() {
			$(c).each(function() {
				$(this)
					.parent()
					.removeClass("open");
			});
		}
		Login.setLogin("ow");
		var b = $(".dropdown-section");
		Login.params.isLogin
			? Login.params.tag_name
				? (b.eq(0).addClass("hidden"),
				  $(".battletag").html(Login.params.tag_name),
				  $(".code").html(Login.params.battle_code),
				  $(".nav-logout").attr("href", Login.params.logout_url),
				  $(".username").html(
						Login.params.tag_name + '<b class="caret"></b>'
				  ),
				  $(".nav-box")
						.eq(0)
						.addClass("hidden"))
				: (b.eq(0).addClass("hidden"),
				  b.eq(1).addClass("hidden"),
				  $(".username").html('您的通行证<b class="caret"></b>'),
				  $(".nav-logout").attr("href", Login.params.logout_url),
				  $(".nav-login-btn").attr("href", Login.params.logout_url),
				  $(".nav-box")
						.eq(0)
						.addClass("hidden"),
				  $(".battletag").html("请设置战网昵称"))
			: ($(".nav-login-btn").attr("href", Login.params.login_url),
			  $(".username").html('您的通行证<b class="caret"></b>'),
			  b
					.eq(1)
					.addClass("hidden")
					.end()
					.eq(3)
					.addClass("hidden"),
			  $(".nav-box")
					.eq(1)
					.addClass("hidden")
					.end()
					.eq(2)
					.addClass("hidden"));
		var c = "[data-toggle='dropdown']",
			d = function(a) {
				var b = $(a).on("click.dropdown", this.toggle);
				$("html").on("click.dropdown", function() {
					b.parent().removeClass("open");
				});
			};
		(d.prototype = {
			constructor: d,
			toggle: function() {
				var b,
					c,
					d = $(this);
				return (
					(b = d.parent()),
					(c = b.hasClass("open")),
					a(),
					c || b.toggleClass("open"),
					d.focus(),
					b.trigger("toggle.dropdown", [!c]),
					!1
				);
			}
		}),
			($.fn.dropdown = function(a) {
				return this.each(function() {
					var b = $(this),
						c = b.data("dropdown");
					c || b.data("dropdown", (c = new d(this))),
						"string" == typeof a && c[a].call(b);
				});
			}),
			($.fn.dropdown.Constructor = d),
			$(document)
				.on("click", a)
				.on("click", ".dropdown-menu", function(a) {
					a.stopPropagation();
				})
				.on("click", c, d.prototype.toggle);
	},
	setShare: function(a, b) {
		var a =
				void 0 != a
					? a
					: "《守望先锋》是暴雪出品的首款团队射击游戏，现已正式来到中国。游戏以近未来地球为背景，来自全球的超级英雄们将使用自己独特的能力在战场上厮杀，带给玩家顶尖的射击体验。",
			b =
				void 0 != b
					? b
					: "https://overwatch.nosdn.127.net/1/images/home/header-bg.jpg";
		(window._bd_share_config = {
			common: { bdText: a, bdDesc: "", bdUrl: "", bdPic: b },
			share: [{ bdSize: 16 }]
		}),
			$("body").append(
				'<script src="https://fs-web.bnet.163.com/jv/jaina-share-bd/1.0.1/package/dist/static/api/js/share.min.js?v=' +
					Math.floor(9999999 * Math.random()) +
					'"></script>'
			);
	},
	gotop: function(a) {
		Common.isMobile()
			? $("#gotop").hide()
			: ($(window).scroll(function() {
					var b = $(window).scrollTop(),
						c = $("#gotop");
					a || (a = 200), b > a ? c.show() : c.hide();
			  }),
			  $.sc2.scrollTo({ trigger: "#gotop" }));
	}
};
