(function () {
	if (window.cf) {
		return;
	}
	var cf = {
		m: {},
		load: {},
		append: {},
		init: function () { }
	};


	var u = '//cf.qq.com/webplat/info/news_version3/';
	var w = document.documentElement.clientWidth;

	cf.append = {

		'video': function (index, panel) {
			if (panel.isLoad) return;
			var l = 5, _index = (index == 0) ? 0 : index,
				str = '<ul class="v-list">',
				con = rectargetObj_1['msg']['reclist_' + (145 + _index)];
			for (var i = 0; i < l; i++) {
				str += '<li><a class="v-lnk" target="_blank" onclick="pgvSendClick({hottag:\'main.video.panel' + index + "." + i + '\'});" href="//cf.qq.com/v/detail.shtml?G_Biz=1&tid=' + con[i]['iVideoId'] + '"><img width="232" height="120" src="' + con[i]['sIMG'] + '"><div class="v-overlay"></div><span class="v-icon"></span><em class="v-title">' + decodeURIComponent(con[i]['sTitle']) + '</em></a></li>';
			}
			str += "</ul>";
			cf.m.$$('videoList' + index).innerHTML = str;
			panel.isLoad = true;
		},
		//load BBS
		'bbs': function (index) {
			var url = ['125/860/m774/index.js', '125/860/862/m774/index.js'];
			var len = 7;
			if (index == 0 || index == 1) {
				cf.m.loadScript(u + url[index], function () {
					var doc = newsIndexData, ohtml = '<ul class="news-list">';
					for (var i = 0; i < len; i++) {
						if (i == 0) {
							ohtml += '<li class="top-news"><em><a onclick="pgvSendClick({hottag:\'main.newsTab.panel' + index + "." + i + '\'});" target="_blank" href="' + doc[i]["infoPath"] + '">' + decodeURI(doc[i]["sTitle"]) + '</a></em></li>';
						} else {
							ohtml += '<li class="item"><span class="lnk"><a onclick="pgvSendClick({hottag:\'main.newsTab.panel' + index + "." + i + '\'});" href="' + doc[i]["infoPath"] + '" target="_blank">' + decodeURI(doc[i]["sTitle"]) + '</a></span><span class="news-date">' + doc[i]["dtReleaseTime"] + '</span></li>';
						}
					}
					ohtml += '</ul>';
					cf.m.$$('newsList-' + index + '').innerHTML = ohtml;
				});
			}
			if (index == 2) {
				cf.m.loadScript('//apps.game.qq.com/wmp/v3.1/?p0=1&p1=searchNewsKeywordsList&page=1&pagesize=16&order=sIdxTime&r0=script&r1=NewsObj&type=iType&id=282&openId=&agent=&channel=&area=&&_=' + Date.parse(new Date()), function () {
					var j, str = '<ul class="news-list">';
					var doc = NewsObj.msg["result"];
					for (j = 0; j < len; j++) {
						if (j == 0) {
							str += '<li class="top-news"><em><a target="_blank" onclick="pgvSendClick({hottag:\'main.news.panel' + index + "." + j + '\'});" href="//cf.qq.com/cp/a20170113guide/cont.shtml?G_Biz=1&tid=' + doc[j]["iNewsId"] + '">' + doc[j]['sTitle'] + '</a></em></li>';
						} else {
							var oDate = doc[j]["sCreated"];
							str += '<li class="item"><span class="news-link"><a target="_blank" onclick="pgvSendClick({hottag:\'main.news.panel' + index + "." + j + '\'});" href="//cf.qq.com/cp/a20170113guide/cont.shtml?G_Biz=1&tid=' + doc[j]["iNewsId"] + '">' + doc[j]['sTitle'] + '</a></span><span class="news-date">' + oDate.split(' ')[0].slice(5).replace('-', '/') + '</span></li>';
						}
					};
					cf.m.$$('matchList').innerHTML = str + '</ul>';
				})
			}
			if (index == 3) {
				cf.m.loadScript('//ossweb-img.qq.com/images/cf/k1x1_discuz_static/cfNewsLTData.js',
					function () {
						var i, str = '<ul class="news-list">', bbsDataList = cfNewsLTData, _u = '//bbs.cf.qq.com/';
						var len = bbsDataList.length > 7 ? 7 : bbsDataList.length;
						for (i = 0; i < len; i++) {
							if (i == 0) {
								str += '<li class="top-news"><em><a target="_blank" onclick="pgvSendClick({hottag:\'main.news.panel' + index + "." + i + '\'});" href="' + bbsDataList[i].url + '">' + bbsDataList[i].title + '</a></em></li>';
							} else {
								str += '<li class="item"><span class="news-link"><a target="_blank" onclick="pgvSendClick({hottag:\'main.news.panel' + index + "." + i + '\'});" href="' + bbsDataList[i].url + '">' + bbsDataList[i].title + '</a></span><span class="news-date">12/12</span></li>';
							}
						};
						cf.m.$$('bbsList').innerHTML = str + '</ul>';
					});
			}
		},

		//=== S 直播推荐 ====//
		'live': function () {
			var pageCount = 2;
			var url = '//apps.game.qq.com/cf/a20180322cftv/api.php?action=getcate';
			var detail = '//cf.qq.com/act/a20180322cftv/content.shtml?sid='
			$.ajax({
				url: url,
				data: { cateid: 0, page: 1, count: pageCount },
				success: function (e) {
					var str = '';
					var data = e.data.list;
					var len = data.length;
					for (var i = 0; i < len; i++) {
						str += '<li class="fl"><a target="_blank" href="' + detail + data[i]['sid'] + '"><img src="' + data[i]['room_pic'] + '" width="auto" height="112" alt="' + data[i]['room_name'] + '"><p>' + data[i]['nick_name'] + '</p></a></li>';
					}
					cf.m.$$("live-item").innerHTML = str;
				},
				error: function () {
					cf.m.$$("live-item").innerHTML = '加载数据失败，再次刷新页面！';
				},
				dataType: 'jsonp'
			});

		},

		//=== S 赛事====//
		"match": function () {
			var url = '//apps.game.qq.com/wmp/v3.1/?p0=1&p1=searchNewsKeywordsList&page=1&pagesize=6&order=sIdxTime&r0=script&r1=NewsObj&type='
			var l = 7;
			var matchNewList = {
				'star': 'iType&id=282&openId=&agent=&channel=&area=&&_=', //cfpl-d
				'bcls': 'iKeyword&id=4&openId=&agent=&channel=&area=&&_=',
				'tga': 'iKeyword&id=2&openId=&agent=&channel=&area=&&_=',
				'cfpl': 'iKeyword&id=1&openId=&agent=&channel=&area=&&_=',
				'cfs': 'iSubType&id=284&openId=&agent=&channel=&area=&&_=',
				'cfel': 'iKeyword&id=3066&openId=&agent=&channel=&area=&&_',
				'wcg': 'iSubType&id=543&openId=&agent=&channel=&area=&&_=',
			};
			var _init = function () {
				var str = '';
				cf.m.loadScript('//cf.qq.com/webplat/info/news_version3/125/37472/m128/index.js', function () {
					newsIndexData.sort(function (a, b) {
						return a.sField6Value - b.sField6Value;
					});
					var matchInfoList = newsIndexData;
					str += '<div class="match-img"><a class="match-imglnk" onclick="pgvSendClick({hottag:\'main.match.panel0.img\'});" target="_blank" href="' + decodeURIComponent(matchInfoList[0].sRedirectAddress) + '" ><img src="' + decodeURIComponent(matchInfoList[0].sInfoImageAbbrAddrMiddle) + '" width="360" height="148" /></a>';
					str += '<div class="match-top"><em class="state-' + matchInfoList[0].sField5Value + '"><a target="_blank" onclick="pgvSendClick({hottag:\'main.match.panel0.0\'});" href="' + decodeURIComponent(matchInfoList[0].sRedirectAddress) + '">' + decodeURIComponent(matchInfoList[0].sField2Value) + '</a></em><p>时间 : <span class="txt-em">' + decodeURIComponent(matchInfoList[0].sField3Value) + '</span></p><p>地点 : <span>' + decodeURIComponent(matchInfoList[0].sField4Value) + '</span></p></div></div>';
					var hdItem = cf.m.getElementsByClassName('matchTab', 'match-name', 'a');
					for (var i = 0; i < l; i++) {
						hdItem[i].innerHTML = decodeURIComponent(matchInfoList[i].sField1Value);
					};
					var marked = matchInfoList[0]['sField7Value'];
					var _u = url + matchNewList[marked] + Date.parse(new Date());
					cf.m.loadScript(_u, function () {
						var data = NewsObj.msg.result;
						str += '<div class="match-info"><div class="match-news"><ul class="news-list">';
						for (var i = 0; i < 5; i++) {
							var time = data[i]['sCreated'].replace(/-/g, '/').split(' ')[0].substring(5);
							str += '<li class="item"><span class="lnk"><a target="_blank" onclick="pgvSendClick({hottag:\'main.match.panel' + 0 + "." + (i + 1) + '\'});" href="//cf.qq.com/cp/a20170113guide/cont.shtml?G_Biz=1&tid=' + data[i]['iNewsId'] + '">' + data[i]['sTitle'] + '</a></span><span class="news-date">' + time + '</span></li>';
						}
						cf.m.getElementsByClass('matchTab', 'tab-panel')[0].innerHTML = str + "</ul></div></div>";
					})

				});
			};

			var _mate = function (index, panel) {
				if (panel.isLoad) return;
				cf.m.loadScript('//cf.qq.com/webplat/info/news_version3/125/37472/m128/index.js', function () {
					newsIndexData.sort(function (a, b) {
						return a.sField6Value - b.sField6Value;
					});
					var matchInfoList = newsIndexData;
					var marked = matchInfoList[index].sField7Value;
					var _u = url + matchNewList[marked] + Date.parse(new Date());
					var str = '<div class="match-img"><a class="match-imglnk" target="_blank" onclick="pgvSendClick({hottag:\'main.match.panel' + index + ".img" + '\'});" href="' + decodeURIComponent(matchInfoList[index].sRedirectAddress) + '" ><img src="' + decodeURIComponent(matchInfoList[index].sInfoImageAbbrAddrMiddle) + '" width="360" height="148" /></a><div class="match-top"><em  class="state-' + matchInfoList[index].sField5Value + '"><a target="_blank" onclick="pgvSendClick({hottag:\'main.match.panel' + index + ".0" + '\'});" href="' + decodeURIComponent(matchInfoList[index].sRedirectAddress) + '">' + decodeURIComponent(matchInfoList[index].sField2Value) + '</a></em><p>时间 : <span class="txt-em">' + decodeURIComponent(matchInfoList[index].sField3Value) + '</span></p><p>地点 : <span>' + decodeURIComponent(matchInfoList[index].sField4Value) + '</span></p></div></div>';
					//new
					cf.m.loadScript(_u, function () {
						var data = NewsObj.msg.result;
						str += '<div class="match-info"><ul class="news-list">'; 
						for (var i = 0; i < 5; i++) {
                            var time = data[i]['sCreated'].replace(/-/g, '/').split(' ')[0].substring(5);
							str += '<li class="item"><span class="lnk"><a target="_blank" onclick="pgvSendClick({hottag:\'main.match.panel' + index + "." + (i + 1) + '\'});" href="//cf.qq.com/cp/a20170113guide/cont.shtml?G_Biz=1&tid=' + data[i]['iNewsId'] + '">' + data[i]['sTitle'] + '</a></span><span class="news-date">' + time + '</span></li>';
						}
						cf.m.getElementsByClass('matchTab', 'tab-panel')[index].innerHTML = str + "</ul></div>";
						panel.isLoad = true;
					})
				})

			};
			return {
				init: _init,
				mate: _mate
			}
		},
		//=== S 攻略====//
		'guide': function () {
			cf.m.loadScript('//ams.qq.com/wmp/data/js/v3/WMP_ADVTRECLIST_GW_1_23.js', function () {
				var data = rectargetObj_23.msg.reclist_24;
				var str = "";
				var len = data.length; len = len > 5 ? 5 : len;
				for (var x = 0; x < len; x++) {
					str += '<li><a class="rotate-panel" href="' + data[x].sUrl + '" target="_blank" title="' + data[x].sTitle + '">';
					str += '<img width="416" height="260" src="' + data[x].sIMG + '" alt="' + data[x].sTitle + '"/>';
					str += '</a></li>';
				}
				cf.m.$$('c-rotate-list').innerHTML = str;
				cf.guideSlide = new cf.initRotateGD();
			})
			cf.m.loadScript('//ams.qq.com/wmp/data/js/v3/WMP_NEWS_RANKLIST_GW_1.js', function () {
				var data = newsRankObj.msg.newlist;
				var str = "";
				var len = data.length; len = len > 4 ? 5 : len;
				for (var x = 0; x < len; x++) {
					str += '<li><a class="rotate-panel" href="//cf.qq.com/cp/a20170113guide/cont.shtml?G_Biz=1&tid=' + data[x].iNewsId + '" target="_blank" title="' + data[x].sTitle + '">';
					str += '<img src="' + data[x].sIMG + '" alt="' + data[x].sTitle + '"/>';
					str += '<p class="title">' + data[x].sTitle + '</p>';
					str += '<p class="time">' + cf.m.reloadPubdate(data[x].sCreated) + '</p>';
					str += '</a></li>';
				}
				cf.m.$$('c-list').innerHTML = str;
			})
		}
	};

	cf.m.$$ = function (id) {
		return "string" == typeof id ? document.getElementById(id) : id
	};
	cf.m.Extend = function (destination, source) {
		for (var property in source) {
			destination[property] = source[property]
		}
		return destination
	};
	cf.m.in_array = function (needle, haystack, argStrict) {
		var key = '',
			strict = !!argStrict;
		if (strict) {
			for (key in haystack) {
				if (haystack[key] === needle) {
					return true;
				}
			}
		} else {
			for (key in haystack) {
				if (haystack[key] == needle) {
					return true;
				}
			}
		}
		return false;
	};
	cf.m.substring = function (str) {
		if (str.length > 27) {
			return str.substring(0, 27) + '...';
		}
		return str;
	};
	cf.m.getElementsByClass = function (id, className) {
		var o = "string" == typeof id ? cf.m.$$(id) : id;
		var all = o.getElementsByTagName('*');
		var elements = new Array();
		for (var i = 0; i < all.length; i++) {
			if (all[i].className.indexOf(className) != -1) {
				elements[elements.length] = all[i]
			}
		}
		return elements
	};
	cf.m.getElementsByClassName = function (id, className, tagName) {
		var o = "string" == typeof id ? cf.m.$$(id) : id;
		var all = tagName ? o.getElementsByTagName(tagName) : o.getElementsByTagName("div");
		var elements = new Array();
		for (var i = 0; i < all.length; i++) {
			if (all[i].className != className) continue;
			elements[elements.length] = all[i]
		}
		return elements
	};
	cf.m.addEventSimple = function (obj, evt, fn) {
		if (obj.addEventListener) obj.addEventListener(evt, fn, false);
		else if (obj.attachEvent) obj.attachEvent("on" + evt, fn)
	};
	cf.m.loadScript = function (url, callback, charset) {
		var script = document.createElement('script');
		script.type = "text/javascript";
		if (charset) {
			script.charset = charset;
		}
		if (script.readyState) {
			script.onreadystatechange = function () {
				if (script.readyState == "loaded" || script.readyState == "complete") {
					script.onreadystatechange = null;
					if (callback) {
						callback()
					}
				}
			}
		} else {
			script.onload = function () {
				if (callback) {
					callback()
				}
			}
		}
		script.src = url;
		document.body.appendChild(script)
	};
	cf.m.reloadPubdate = function (string) {
		var re = /^(\d{2,4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
		if (re.test(string)) {
			var t = string.match(re);
			var d = new Date(t[1], t[2] - 1, t[3], t[4], t[5], t[6]);
			var c = new Date();
			var s = (c.getTime() - d.getTime()) / 1000;
			var m = Math.floor(s / 60);
			var h = Math.floor(s / 3600);
			var d = Math.floor(s / 86400);
			var n = Math.floor(s / (86400 * 30));
			var y = Math.floor(s / (86400 * 365));
			if (y > 0) return y + "年以前";
			if (n > 0) return n + "个月以前";
			if (d > 0) return d + "天以前";
			if (h > 0) return h + "小时以前";
			if (m > 0) return m + "分钟以前";
		}
		return "刚刚";
	};

	cf.m.report = function (n) {
		var d1 = new Date(),
			imgSendTimePoint = new Image();
		var url = "//isdspeed.qq.com/cgi-bin/r.cgi?flag1=7718&flag2=19&flag3=2&" + n + "=" + (d1 - d0);
		if (Math.random() < 0.3) {
			imgSendTimePoint.src = url
		}
	};
	cf.m.CurrentStyle = function (element) {
		return element.currentStyle || document.defaultView.getComputedStyle(element, null)
	};
	cf.m.Bind = function (object, fun) {
		var args = Array.prototype.slice.call(arguments).slice(2);
		return function () {
			return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)))
		}
	};
	cf.m.forEach = function (array, callback, thisObject) {
		if (array.forEach) {
			array.forEach(callback, thisObject)
		} else {
			for (var i = 0,
				len = array.length; i < len; i++) {
				callback.call(thisObject, array[i], i, array)
			}
		}
	};
	cf.m.Tween = {
		Quart: {
			easeOut: function (t, b, c, d) {
				return - c * ((t = t / d - 1) * t * t * t - 1) + b
			}
		},
		Back: {
			easeOut: function (t, b, c, d, s) {
				if (s == undefined) s = 1.70158;
				return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
			}
		},
		Bounce: {
			easeOut: function (t, b, c, d) {
				if ((t /= d) < (1 / 2.75)) {
					return c * (7.5625 * t * t) + b
				} else if (t < (2 / 2.75)) {
					return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b
				} else if (t < (2.5 / 2.75)) {
					return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b
				} else {
					return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b
				}
			}
		}
	};

	cf.m.debounce = function (callback, delay, context) {
		if (typeof (callback) !== "function") {
			return
		}
		delay = delay || 150;
		context = context || null;
		var timeout;
		var runIt = function () {
			callback.apply(context)
		};
		return (function () {
			window.clearTimeout(timeout);
			timeout = window.setTimeout(runIt, delay)
		})
	};

	//默认点击流
	cf.m.count = function (id, tag, index) {
		var oA = cf.m.$$(id).getElementsByTagName("a");
		for (var i = oA.length - 1; i >= 0; i--) {
			oA[i].setAttribute('onclick', 'pgvSendClick({hottag:"main.' + tag + '.panel' + index + '.' + i + '"});')
		};
	};

	cf.SlideTrans = function (container, slider, count, options) {
		this._slider = cf.m.$$(slider);
		this._container = cf.m.$$(container);
		this._timer = null;
		this._count = Math.abs(count);
		this._target = 0;
		this._t = this._b = this._c = 0;
		this.Index = 0;
		this.SetOptions(options);
		this.Auto = !!this.options.Auto;
		this.Duration = Math.abs(this.options.Duration);
		this.Time = Math.abs(this.options.Time);
		this.Pause = Math.abs(this.options.Pause);
		this.Tween = this.options.Tween;
		this.onStart = this.options.onStart;
		this.onFinish = this.options.onFinish;
		var bVertical = !!this.options.Vertical;
		this._css = bVertical ? "top" : "left";
		var p = cf.m.CurrentStyle(this._container).position;
		p == "relative" || p == "absolute" || (this._container.style.position = "relative");
		this._container.style.overflow = "hidden";
		this._slider.style.position = "absolute";
		this.Change = this.options.Change ? this.options.Change : this._slider[bVertical ? "offsetHeight" : "offsetWidth"] / this._count
	};
	cf.SlideTrans.prototype = {
		SetOptions: function (options) {
			this.options = {
				Vertical: false,
				Auto: true,
				Change: 812,
				Duration: 30,
				Time: 10,
				Pause: 3000,
				onStart: function () { },
				onFinish: function () { },
				Tween: cf.m.Tween.Quart.easeOut
			};
			cf.m.Extend(this.options, options || {})
		},
		Run: function (index) {
			index == undefined && (index = this.Index);
			if(cf.m.brow.isMobile){
				this.Change = w;
				// this._slider.addEventListener('touchstart', this.touchstart.bind(this));
				// this._slider.addEventListener('touchend', this.touchend.bind(this));
			}
			index < 0 && (index = this._count - 1) || index >= this._count && (index = 0);
			this._target = -Math.abs(this.Change) * (this.Index = index);
			this._t = 0;
			this._b = parseInt(cf.m.CurrentStyle(this._slider)[this.options.Vertical ? "top" : "left"]);
			this._c = this._target - this._b;
			this.onStart();
			this.Move();
		},
		Move: function () {
			clearTimeout(this._timer);
			if (this._c && this._t < this.Duration) {
				this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
				this._timer = setTimeout(cf.m.Bind(this, this.Move), this.Time)
			} else {
				this.MoveTo(this._target);
				this.Auto && (this._timer = setTimeout(cf.m.Bind(this, this.Next), this.Pause))
			}
		},
		MoveTo: function (i) {
			this._slider.style[this._css] = i + "px"
		},
		Next: function () {
			this.Run(++this.Index)
		},
		Previous: function () {
			this.Run(--this.Index)
		},
		Stop: function () {
			clearTimeout(this._timer);
			this.MoveTo(this._target)
		},
		touchstart:function(e){
			this.startPoint = e.touches[0];
			console.log(this.startPoint);
			
		},
		touchmove:function(e){
			//this.startPoint = e.touches[0];
		},
		touchend:function(e){
			clearTimeout(this._timer);
			var endPoint = e.changedTouches[0];
			var x = endPoint.clientX - this.startPoint.clientX;
			if (Math.abs(x) > 20) {
				if (x < 0) {
					this.Previous();
				} else {
					this.Next();
				}
			}
		}
	};
	//官方
	cf.initRotate = function (index) {
		var arg = index ? ['rotate-hz', 'rotateList-hz', 'rotateIndex-hz'] : ['rotate', 'rotateList', 'rotateIndex'];
		var nums = [],
			timer,
			n = cf.m.$$(arg[1]).getElementsByTagName("li").length,
			st = new cf.SlideTrans(arg[0], arg[1], n, {
				onStart: function () {
					cf.m.forEach(nums,
						function (o, i) {
							o.className = st.Index == i ? "curr" : ""
						})
				}
			});
		cf.m.addEventSimple(cf.m.$$(arg[0]),'touchstart',function(e){
			st.Auto = false;
			this.startPoint = e.touches[0];
		});
		cf.m.addEventSimple(cf.m.$$(arg[0]),'touchend',function(e){
			clearTimeout(st._timer);
			var endPoint = e.changedTouches[0];
			var x = endPoint.clientX - this.startPoint.clientX;
			if (Math.abs(x) > 20) {
				if (x < 0) {
					st.Previous();
				} else {
					st.Next();
				}
			};
			st.Auto = true;
		});	
		if (index == 1) {
			st.Auto = false;
		};
		setTimeout(function(){  
			var r1box = document.getElementById('rotateBox1'), r2box = document.getElementById('rotateBox2');
			if(cf.m.brow.isMobile){
				r1box.style.width = r2box.style.width = w+'px';
			}
		}, 20);
		
		for (var i = 1; i <= n; AddNum(i++)) { };
		function AddNum(i) {
			var num = cf.m.$$(arg[2]).appendChild(document.createElement("li"));
			var li = cf.m.$$(arg[1]).getElementsByTagName("li"); 
			i--;
			if(cf.m.brow.isMobile){
				li[i].style.width = w+'px';
			}
			var olnks = cf.m.$$(arg[1]).getElementsByTagName("img")[i];
			if (typeof (index) == 'undefined') {
				num.innerHTML = '<span>' + olnks.title + '</span>';
				num.style.width = 100 / n + '%';
			} else {
				num.innerHTML = '<span>' + i + '</span>';
			}
			num.onclick = function () {
				pgvSendClick({ hottag: 'main.rotate.type1.txt' + i });
			}
			num.onmouseover = function () {
				timer = setTimeout(function () {
					num.className = "curr";
					st.Auto = false;
					st.Run(i)
				},
					200)
			};
			num.onmouseout = function () {
				clearTimeout(timer);
				num.className = "";
				st.Auto = true;
				st.Run()
			};
			/*   */
			nums[i] = num;
		};
		st.Run()
	};

	/*玩家专区*/
	cf.initRotateGD = function () {
		var nums = [],
			timer, n = 5;
		st = new cf.SlideTrans("c-rotate-bd", "c-rotate-list", n, {
			Auto: true,
			Change: 416,
			onStart: function () { cf.m.forEach(nums, function (o, i) { o.className = st.Index == i ? "curr" : "" }) }
		});
		for (var i = 1; i <= n; AddNum(i++)) { };
		function AddNum(i) {
			var num = cf.m.$$("c-rotate-index").appendChild(document.createElement("li"));
			num.innerHTML = i--;
			num.onmouseover = function () {
				timer = setTimeout(function () {
					num.className = "curr";
					st.Auto = false;
					st.Run(i)
				},
					200)
			};
			num.onmouseout = function () {
				clearTimeout(timer);
				num.className = "";
				st.Auto = false;
				st.Run()
			};
			nums[i] = num
		};
		st.Run()
	};


	/* login act slide  */
	cf.slide = function (id, num) {
		this.count = num;
		this.slider = cf.m.$$(id);
		this.Tween = cf.m.Tween.Quart.easeOut;
		this.t = this.b = this.c = 0;
		this.timer = null;
		this.index = 0;
		this.change = 126;
		this.duration = 30;
		this.auto = true

	};
	cf.slide.prototype = {
		switchTo: function (n) {
			clearTimeout(this.timer);
			n < 0 && (n = this.count - 1) || n >= this.count && (n = 0);
			if (this.index == n) {
				return
			}
			//slide
			this.target = -Math.abs(this.change) * n;
			this.t = 0;
			this.b = parseInt(cf.m.CurrentStyle(this.slider)["left"]);
			this.c = this.target - this.b;
			this.slide()
			this.index = n
		},
		next: function () {
			var n = this.index + 1;
			this.switchTo(n)
		},
		prev: function () {
			var n = this.index - 1;
			this.switchTo(n)
		},
		slide: function () {
			if (this.c && this.t < this.duration) {
				this.slider.style.left = Math.round(this.Tween(this.t++, this.b, this.c, this.duration)) + 'px';
				setTimeout(cf.m.Bind(this, this.slide), 10)
			} else {
				this.slider.style.left = this.target + 'px';
				if (this.auto) {
					this.timer = setTimeout(cf.m.Bind(this, this.next), this.pause)
				}
			}
		}
	};

	//下拉菜单
	cf.dropDownMenu = function (x, y, h, n) {
		this._x = cf.m.$$(x);
		this._y = cf.m.$$(y);
		this._timer = null;
		this._n = n;
		this._t = 15;
		this._h = h
	};
	cf.dropDownMenu.prototype = {
		init: function () {
			this._x.onmouseover = new Function(this._n + '.st(true)');
			this._x.onmouseout = new Function(this._n + '.st()')
		},
		st: function (f) {
			clearInterval(this._timer);
			var z = this._n;
			if (f) {
				this._timer = setInterval(z + '.sl(1)', this._t)
			} else { this._timer = setInterval(z + '.sl(-1)', this._t); }
		},
		sl: function (f) {
			var c = this._y;
			var h = c.offsetHeight - 3,
				s = 6;
			if ((h <= 0 && f != 1) || (h >= this._h && f == 1)) {
				if (f == 1) {
					c.style.filter = '';
					c.style.opacity = 1
				}
				clearInterval(this._timer);
				return
			};
			var d = (f == 1) ? Math.ceil((this._h - h) / s) : Math.ceil(h / s),// 关闭的时候 f =  -1 ======= d = （170-实际高度）/6
				o = h / this._h;
			c.style.opacity = o;
			c.style.filter = 'alpha(opacity=' + (o * 100) + ')';
			c.style.height = h + (d * f) + 'px';
		}
	};



	//tab
	cf.tabs = function (id, cls, options) {
		this.trigger = cf.m.$$(id).getElementsByTagName("ul")[0].getElementsByTagName("li");
		this.count = this.trigger.length;
		this._id = id;
		this.panel = cf.m.getElementsByClassName(id, cls);
		this.slider = cf.m.getElementsByClassName(id, "bd")[0];
		this.t = null;
		this.index = 0;
		this.setOptions(options);
		this.onStart = this.options.onStart;
		this.event = this.options.event;
		this.timeout = this.options.timeout;
		this.onFinish = this.options.onFinish;
		this.init()
	};
	cf.tabs.prototype = {
		init: function () {
			this.trigger[0].className += " " + this.options.currCls;
			this.panel[0].className += " " + this.options.disCls;
			for (var i = 0; i < this.count; i++) {
				(function (index, that) {
					cf.m.addEventSimple(that.trigger[index], that.options.event,
						function () {
							that.t = setTimeout(function () {
								that.switchTo(index)
							},
								that.timeout)
						});
					if (that.options.event == "mouseover") {
						cf.m.addEventSimple(that.trigger[index], "mouseout",
							function () {
								that.ct(that.t)
							})
					}

				})(i, this)
			}
		},
		setOptions: function (options) {
			this.options = {
				timeout: 60,
				currCls: "on",
				disCls: "dis",
				event: "mouseover",
				onFinish: function () { },
				animation: null
			};
			cf.m.Extend(this.options, options || {})
		},
		switchTo: function (n) {
			if (this.index == n) {
				return
			} else {
				this.trigger[this.index].className = this.trigger[this.index].className.replace(this.options.currCls, "");
				this.panel[this.index].className = this.panel[this.index].className.replace(this.options.disCls, "")
			};
			this.trigger[n].className += " " + this.options.currCls;
			if (this.options.animation) {
				this.options.animation(n, this.slider)
			} else {
				this.panel[n].className += " " + this.options.disCls
			}
			if (this.onFinish) {
				//this.panel[0].isLoad = true;
				this.onFinish(n, this.panel[n], this._id);
			}
			//添加点击流统计
			pgvSendClick({ hottag: 'main.' + this._id + '.tabhd.' + n });
			this.index = n;
		},
		ct: function () {
			clearTimeout(this.t)
		}
	};


	cf.topNav = function () {
		var navs = cf.m.$$('nav').getElementsByTagName('dd');
		var tcs = cf.m.$$('topChannel').getElementsByTagName('a');
		for (var i = 1; i < navs.length; i++) {
			tcs[i].onmouseover = navs[i].onmouseover = (function (n) {
				return function () {
					tcs[n].className = navs[n].className = "active";
				}
			})(i);
			tcs[i].onmouseout = navs[i].onmouseout = (function (n) {
				return function () {
					tcs[n].className = navs[n].className = "";
				}
			})(i)
		}
	};


	//获取最新资料广告数据
	cf.getNewData = function () {
		cf.oDataImgList = [];
		for (var i in oDaTaNew40) {
			if (oDaTaNew40[i][5] == 10) {
				cf.oDataImgList.push(oDaTaNew40[i]);
			}
		};
		cf.oDataImgList.sort(function (a, b) { return a[6] > b[6] ? 1 : -1; });
	};


	/* flash */

	//function gotoLoad(){pgvSendClick({hottag:'main.flash.down'});window.location.href="//cf.qq.com/web201105/download.shtml";};
	cf.m.glb = { nau: navigator.userAgent };
	cf.m.brow = {
		isLowBrow: !-[1,],
		isIE: /MSIE/i.test(cf.m.glb.nau),
		isIE9: /MSIE 9/i.test(cf.m.glb.nau),
		isIE6: /MSIE 6/i.test(cf.m.glb.nau),
		isLowIE: /MSIE 6|MSIE 7/i.test(cf.m.glb.nau),
		isAndr: /Android/i.test(cf.m.glb.nau),
		isApple: /iPhone|iTouch|iPad/i.test(cf.m.glb.nau),
		isBlackBerry: /BlackBerry/i.test(cf.m.glb.nau),
		isWindowsPhone: /IEMobile/i.test(cf.m.glb.nau),
		loadAds: /Android|iPhone|iTouch|BlackBerry|IEMobile/i.test(cf.m.glb.nau),
		isMobile: /Android|iPhone|iTouch|iPad|BlackBerry|IEMobile|Mobile/i.test(cf.m.glb.nau)
	};
	cf.count = function () {

	};

	cf.navi = function(){
		var isShow = 1;
		cf.m.addEventSimple(cf.m.$$("navi"), 'click', function () {
			if(isShow){
				cf.m.$$("maskbg").style.display = "block";
				document.body.className = 'body-navi';
				cf.m.$$("sub-nav").className = 'sub-nav fadeOutLeft';
				isShow = 0;
			}else{
				isShow = 1;
				document.body.className = '';
				cf.m.$$("sub-nav").className = 'sub-nav fadeInLeft';
				cf.m.$$("maskbg").style.display = "none";
			}
		})
		cf.m.addEventSimple(cf.m.$$("maskbg"), 'click', function () {
			isShow = 1;
			document.body.className = '';
			cf.m.$$("sub-nav").className = 'sub-nav fadeInLeft';
			cf.m.$$("maskbg").style.display = "none";
		})
	};
	/*搜索*/
	cf.search = function () {
		cf.m.addEventSimple(cf.m.$$("btn-search"), 'click', function () {
			var txt = cf.m.$$("search-txt").value;
			if (txt !== '') {
				window.open('//cf.qq.com/cp/a20180718search/index.html?keyword=' + encodeURI(txt));
			} else {
				alert('请输入关键词');
				return false
			}
		})
		var a = cf.m.getElementsByClassName("hotwords", '', 'a');
		for (var index = 0; index < a.length; index++) {
			(function (x) {
				cf.m.addEventSimple(a[x], 'click', function () {
					var txt = a[x].innerHTML;
					window.open('//cf.qq.com/cp/a20180718search/index.html?keyword=' + encodeURI(txt));
				})
			})(index)
		}
	};

	//background
	cf.setBackground = function () {
		cf.m.loadScript('//cf.qq.com/webplat/info/news_version3/125/37478/m128/index.js', function () {
			var data = newsIndexData;
			for (var index = 0; index < data.length; index++) {
				var odata = data[index];
				var _index = parseInt(odata['sField1Value']);
				switch (_index) {
					 case 0:
					 	cf.m.$$('lnk-version').href = decodeURIComponent(odata['sRedirectAddress']);
					 	break;
					case 1:
						cf.m.$$('lnk-act').style.backgroundImage = "url(" + decodeURIComponent(odata['sInfoImageAddr']) + ")";
						cf.m.$$('lnk-act').href = decodeURIComponent(odata['sRedirectAddress']);
						break;
					case 2:
						cf.m.$$('wrap').style.backgroundImage = "url(" + decodeURIComponent(odata['sInfoImageAddr']) + ")";
						break;
					default:
						break;
				}
			}
		})
	};

	cf.delayLoad = function () {
		var obj = ['act', 'live', 'entrance', 'p-bd', 'community', 'event', 'brand', 'bot'],
			l = 0,
			isMatch = 1;
		for (var i = l; i < obj.length; i++) {
			var element = $("." + obj[i]);
			if (element.offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop()) + 20) {
				if (!element.hasClass('index-show')) {
					switch (obj[i]) {
						case 'live':
							cf.append.live();
							break;
						case 'p-bd':
							cf.m.loadScript('//ams.qq.com/wmp/data/js/v3/WMP_VDRECLIST_GW_1_1.js', function () {
								var panel = document.getElementById('videoList0');
								cf.append.video(0, panel)
							});
							new cf.tabs("videoTab", "tab-panel", { onFinish: cf.append.video });
							break;
						case 'community':
							cf.append.guide();
							break;
						case 'event':
							if (isMatch) {
								var matchTab = new cf.tabs("matchTab", "tab-panel", { onFinish: cf.append.match().mate });
								cf.append.match().init();
								matchTab.panel[0].isLoad = true;
								cf.m.count('match-panel', 'match', 0);
							}
							isMatch = 0;
							break;
						case 'bot':
							$(".razer,.msi").css("background-image", 'url(//game.gtimg.cn/images/cf/web201105/201809/coop.jpg)');
							break;
						default:
							break;
					}
					element.addClass('index-show');
				}
			}
			if (element.offset().top > parseInt($(window).height()) + parseInt($(window).scrollTop())) {
				l = i;
				break;
			}
		}
	};

	cf.rotateChange = function (index) {
		var nav = document.getElementById('rotateNavBox');
		var li = nav.getElementsByTagName("li");
		var r1box = document.getElementById('rotateBox1'), r2box = document.getElementById('rotateBox2');
		if (index == 1) {
			nav.className = "rotate-nav";
			r1box.style.display = "block";
			r2box.style.display = "none";
			li[0].className = "on";
			li[1].className = "";
			pgvSendClick({ hottag: 'main.rotate.type.1' });
		} else {
			li[0].className = "";
			li[1].className = "on";
			nav.className = "rotate-nav rotate-nav-hzcurr";
			r2box.style.display = "block";
			r1box.style.display = "none";
			var rlist = document.getElementById('rotateList-hz');
			if (rlist.isLoad) {
				return;
			};
			rlist.isLoad = true;
			cf.initRotate(1);
			pgvSendClick({ hottag: 'main.rotate.type.0' });
		}
	};
	cf.cookieGet = function(sName,sDefaultValue){
		var sRE = "(?:; |^)" + sName + "=([^;]*);?";
		var oRE = new RegExp(sRE);
		
		if (oRE.test(document.cookie)) {
			return unescape(RegExp["$1"]);
		} else {
			return sDefaultValue||null;
		}
	};
	cf.cookieSet = function(sName,sValue,iExpireSec,sDomain,sPath,bSecure){
		if(sName==undefined) {
			return;
		}
		if(sValue==undefined) {
			sValue="";
		}
		var oCookieArray = [sName+"="+escape(sValue)];
		if(!isNaN(iExpireSec)){
			var oDate = new Date();
			oDate.setTime(oDate.getTime()+iExpireSec*1000);
			iExpireSec==0 ? '' : oCookieArray.push("expires=" + oDate.toGMTString()) ;
		}
		if(sDomain!=undefined){
			oCookieArray.push("domain="+sDomain);
		}
		if(sPath!=undefined){
			oCookieArray.push("path="+sPath);
		}
		if(bSecure){
			oCookieArray.push("secure");
		}
		document.cookie=oCookieArray.join("; ");
	}; 
    cf.initCookie = function(){
		var cookieUin = cf.cookieGet('uin','');
		if(cookieUin){
			cf.cookieSet("uin",cookieUin,365*24*60*60,"qq.com","/",false);
			cf.cookieSet("uin_cookie",cookieUin,365*24*60*60,"qq.com","/",false);
			cf.cookieSet("ied_qq",cookieUin,365*24*60*60,"qq.com","/",false);
		}
	};
	cf.load = function () {
		if(cf.m.brow.isMobile){
			//移动端
			cf.navi();
		}else{
			//background
			cf.setBackground();	
		}
		// cf.m.loadScript('//ossweb-img.qq.com/images/ams/atm/reporting.js?action=14627');
		cf.append.bbs(0);
		new cf.tabs("newsTab", "tab-panel", { onFinish: cf.append.bbs });
		//new cf.tabs("serTab", "tab-panel");
		cf.m.count('newsComplex', 'news', 0);
		cf.m.count('newNotice', 'news', 1);
		cf.m.count('newMedia', 'news', 2);
		cf.search();
		cf.delayLoad();
		$(window).bind("scroll", function () { cf.delayLoad(); });
		//load tcss
		cf.m.loadScript('//tajs.qq.com/stats?sId=22095803');
		/*合作媒体*/
		cf.mediaList = new cf.dropDownMenu('mediaListSel', 'mediaList', '177', 'cf.mediaList');
		cf.mediaList.init();
		cf.initCookie();
	};

	cf.init = function () {//首屏显示
		cf.m.addEventSimple(window, "load", cf.load);
		cf.m.loadScript('//ossweb-img.qq.com/images/clientpop/js/tgadshow.min.js', function () { }, 'utf-8');
		cf.m.report(2);
	};
	window.cf = cf;
	cf.m.report(1);
	cf.init();
})(window);

function ACTTemplateFinish() {
	var str = '';
	var serverTime = typeof (json_curdate) !== "undefined" ? +new Date(json_curdate.replace(/-/g, "/")) : 0;
	var img = $("#act-items li img");
	if (img.length > 0) {
		img.each(function () {
			var endTime = $(this).attr('endTime');
			endTime = new Date(endTime.replace(/-/g, "/"));
			var endDay = (endTime - serverTime) / 1000 / 60 / 60 / 24;
			if (Math.ceil(endDay) > 0) {
				str = "<p class='time'>" + Math.ceil(endDay) + "天后结束</p>";
			} else {
				str = "<p class='time'>已结束</p>";
			}
			$(this).after(str);
		})
	}
}

function gpmAdProcess() { cf.initRotate(); document.getElementById('loading').style.display="none"}
gpmLoadScript = function (url, callback) { var script = document.createElement('script'); script.type = "text/javascript"; if (script.readyState) { script.onreadystatechange = function () { if (script.readyState == "loaded" || script.readyState == "complete") { script.onreadystatechange = null; if (callback) { callback() } } } } else { script.onload = function () { if (callback) { callback() } } } script.src = url; document.body.appendChild(script) };
//setTimeout(function(){gpmLoadScript('//ossweb-img.qq.com/images/clientpop/js/gpmtips.js',function(){});},3000);

var setSite = { //设置网站属性
	siteType: "os", //必填项:"os"代表是官网，如果不是，则填写actName例如a20160701xxx
	pageType: "main", //必填项:本页面的定位；按照页面含义填写例如main||list||detail||download||share||page1||pageN
	pageName: "首页", //必填项:页面中文名
	osact: 0, //选填项:是否是官网专题(在官网运营的专题)boolean；默认是0；可以在链接上加入参数osact=1来灵活设置
	ingame: 0, //选填项:是否投放在游戏APP内boolean；默认是0；可以在链接上加入参数ingame=1来灵活设置
	stayTime: 0 //选填项:是否需要统计停留时长boolean；默认是0
}
if (typeof (pgvMain) == 'function') { pgvMain(); }