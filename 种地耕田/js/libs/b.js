!(function(a) {
	(JV.popSlider = function(b, c) {
		var d = {
			isShowNum: !0,
			loading:
				"https://wow.nosdn.127.net/1/images/wow/10-year/passport/loading.gif",
			data: [],
			prevCallback: function() {},
			nextCallback: function() {}
		};
		(this.items = a(b)),
			(this.cfg = a.extend({}, d, c)),
			(this.prevCallback = this.cfg.prevCallback),
			(this.nextCallback = this.cfg.nextCallback),
			(this.data = this.cfg.data),
			(this.isShowNum = this.cfg.isShowNum),
			(this.loading = this.cfg.loading),
			this.init();
	}),
		(JV.popSlider.prototype = {
			index: 0,
			setPopHtml: function(a) {
				var b = this,
					c = {},
					d = [],
					e = "";
				if (((d[0] = b.data[a]), (c.slide_data = d), b.data.length)) {
					e =
						b.isShowNum && 1 != b.data.length
							? ' style="display:block"'
							: ' style="display:none"';
					var f = [
						"{@each slide_data as item,index}",
						'<div class="w-light-box">',
						'<div class="head">',
						"{@if item.title}",
						'<div class="title">${item.title}</div>',
						"{@/if}",
						'<div class="num"' +
							e +
							">" +
							(a + 1) +
							"/" +
							b.data.length +
							"</div>",
						"</div>",
						'<div class="content"{@if !item.info} style="height:85%"{@/if}>',
						"{@if item.pic}",
						'<img class="pic" src="${item.pic}" alt=""><img class="loading" src="' +
							b.loading +
							'" alt="" />',
						"{@else}",
						"${item.video|setVideo,item.flv,item.width,item.height}",
						"{@/if}",
						"</div>",
						'<div class="control"' + e + ">",
						'<a class="prev" href="javascript:void(0);"></a><a class="next" href="javascript:void(0);"></a>',
						"</div>",
						"{@if item.info}",
						'<div class="info">${item.info}</div>',
						"{@/if}",
						"</div>",
						"{@/each}"
					].join("");
					juicer.register("setVideo", b.setVideo);
					var g = juicer(f, c);
					return g;
				}
			},
			setVideo: function(a, b, c, d) {
				if (Modernizr.video && Common.ieVersion(9))
					var e = [
						'<embed height="' +
							d +
							'" type="application/x-shockwave-flash" width="' +
							c +
							'" src="http://v.163.com/swf/video/NetEaseFlvPlayerV3.swf" allowScriptAccess="always" quality="high" allowFullScreen="true" flashvars="' +
							b +
							'">'
					];
				else
					var e = [
						'<video width="' +
							c +
							'" height="' +
							d +
							'" controls="controls" autoplay="autoplay" preload="auto"><source src="' +
							a +
							'" type="video/mp4">您的浏览器暂时无法播放此视频.</video>'
					];
				return e;
			},
			setSlider: function() {
				var b = this;
				b.items.click(function() {
					var c = a(this);
					return (
						(index = b.items.index(c)),
						b.setSliderHtml(index),
						(b.index = index),
						!1
					);
				});
			},
			setControl: function() {
				var b = this,
					c = a(".w-light-box:visible"),
					d = a(".next", c),
					e = a(".prev", c),
					f = a(".pic", c),
					g = a(".loading", c),
					h = b.data.length;
				f.imgpreload(function() {
					g.hide(), f.show();
				}),
					d.click(function() {
						b.index == h - 1 ? (b.index = 0) : b.index++,
							b.setHandleCallback(b.index),
							b.nextCallback();
					}),
					e.click(function() {
						0 == b.index ? (b.index = h - 1) : b.index--,
							b.setHandleCallback(b.index),
							b.prevCallback();
					});
			},
			setHandleCallback: function(b) {
				var c = this,
					d = a(".w-light-box:visible"),
					e = a(".pic", d),
					f = a(".loading", d),
					g = a(".num", d),
					h = a(".content", d),
					i = a(".info", d),
					j = a(".title", d),
					k = c.data.length,
					l = c.data[b];
				if (null == c.data[0].video)
					e.attr("src", l.pic),
						e.imgpreload(function() {
							f.hide(), e.show();
						});
				else {
					var m = c.setVideo(l.video, l.flv, l.width, l.height);
					a("video")[0].pause(), h.html(m.join(""));
				}
				null != c.data[0].info && i.html(l.info),
					null != c.data[0].title && j.html(l.title),
					g.html(c.index + 1 + "/" + k);
			},
			setSliderHtml: function(a) {
				var b = this,
					c = b.setPopHtml(a);
				new JV.lightBox(c, {
					model: !0,
					callback: function() {
						b.setControl();
					}
				});
			},
			init: function() {
				this.setSlider();
			}
		});
})(jQuery);
