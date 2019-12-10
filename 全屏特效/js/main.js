// var swiperContainer = document.querySelector(".swiper-container");
// var swiperWrapper = swiperContainer.querySelector(".swiper-wrapper");
// var swiperSlides = swiperWrapper.querySelectorAll(".swiper-slide");
// var swiperPagination = swiperContainer.querySelector(".swiper-pagination");
// var swiperPaginationDots = [];
// var current = 1;

// function showCurrent(current) {
// 	// swiperSlides.item(current).style.opacity = '1'
// 	swiperSlides.forEach(function(swiperSlide, index, swiperSlides) {
// 		if (current - 1 === index) {
// 			swiperSlide.style.opacity = "1";
// 		} else {
// 			swiperSlide.style.opacity = "0";
// 		}
// 	});

// 	// 小点点
// 	swiperPaginationDots.forEach(function(dot, index, dots) {
// 		if (current - 1 === index) {
// 			dot.classList.add("active");
// 		} else {
// 			dot.classList.remove("active");
// 		}
// 	});
// }

// function createPagination() {
// 	swiperSlides.forEach(function(swiperSlide, index, swiperSlides) {
// 		var node = document.createElement("span");
// 		node.index = index;
// 		swiperPaginationDots.push(node);
// 		swiperPagination.appendChild(node);

// 		node.addEventListener("click", function() {
// 			// console.log(this.index);
// 			showCurrent(this.index + 1);
// 		});
// 	});
// }

// createPagination();

//新版
function MySwiper(elementSelect, params) {
	this.params = params;
	this.current = this.params.current || 1;

	this.swiperContainer = document.querySelector(elementSelect);
	this.swiperWrapper = this.swiperContainer.querySelector(".swiper-wrapper");
	this.swiperSlides = this.swiperWrapper.querySelectorAll(".swiper-slide");

	// 初始化

	if (this.params.pagination) {
		if (this.params.pagination instanceof Object) {
			// console.log(this.swiperContainer.querySelector('.zzz'));
			this.swiperPagination = this.swiperContainer.querySelector(".zzz");
		} else {
			this.swiperPagination = this.swiperContainer.querySelector(".swiper-pagination");
		}
		this.createPagination();
	}

	this.init();
}
MySwiper.prototype.init = function() {
	var _this = this;
	this.showCurrent();

	//自动
	if (this.params.autoplay) {
		if (this.params.autoplay instanceof Object) {
			this.id = setInterval(function() {
				_this.next();
			}, this.params.autoplay.delay);
		} else {
			this.id = setInterval(function() {
				_this.next();
			}, 3000);
		}
	}
};
//
MySwiper.prototype.showCurrent = function() {
	this.swiperSlides.forEach(function(swiperSlide, index, swiperSlides) {
		if (this.current - 1 === index) {
			swiperSlide.style.opacity = "1";
		} else {
			swiperSlide.style.opacity = "0";
		}
	}, this);

	//点点
	if (this.params.pagination) {
		this.swiperPaginationDots.forEach(function(dot, index, dots) {
			if (this.current - 1 === index) {
				dot.classList.add("active");
			} else {
				dot.classList.remove("active");
			}
		}, this);
	}
};
//
MySwiper.prototype.next = function() {
	this.current =
		this.current >= this.swiperSlides.length ? 1 : ++this.current;
	this.showCurrent();
};
MySwiper.prototype.prev = function() {
	this.current =
		this.current <= 1 ? this.swiperSlides.length : --this.current;
	this.showCurrent();
};
//
MySwiper.prototype.createPagination = function() {
	this.swiperPaginationDots = [];
	if (this.swiperPagination.hasChildNodes()) {
		this.swiperPaginationDots = Array.prototype.slice.call(this.swiperPagination.children);
		this.swiperPaginationDots.forEach(function(element, index, children) {
			element.index = index;
			var _this = this;
			element.addEventListener("click", function() {
				_this.current = this.index + 1;
				_this.showCurrent();
			});
		}, this);
	} else {
		this.swiperSlides.forEach(function(swiperSlide, index, swiperSlides) {
			var node = document.createElement("span");
			node.index = index;
			this.swiperPaginationDots.push(node);
			this.swiperPagination.appendChild(node);

			var _this = this;
			node.addEventListener("click", function() {
				// console.log(this.index);
				console.log(_this);
				_this.current = this.index + 1;
				_this.showCurrent();
			});
		}, this);
	}
};
//
var swiper = "Swiper。";
document.title = swiper;
var newswiper = swiper.split("");
setInterval(function() {
    newswiper.push(newswiper.shift());
    document.title = newswiper.join("");
}, 700);