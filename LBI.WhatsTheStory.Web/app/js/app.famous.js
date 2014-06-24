define(function (require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    //    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var GridLayout = require('famous/views/GridLayout');
    var View = require('famous/core/View');

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    //    var logo = new ImageSurface({
    //        size: [200, 200],
    //        content: 'http://code.famo.us/assets/famous_logo.svg',
    //        classes: ['double-sided']
    //    });

    //    var initialTime = Date.now();
    //    var centerSpinModifier = new Modifier({
    //        origin: [0.5, 0.5],
    //        transform: function () {
    //            return Transform.rotateY(.002 * (Date.now() - initialTime));
    //        }
    //    });

    //    mainContext.add(centerSpinModifier).add(logo);

    var grid = new GridLayout({
        dimensions: [4, 3]
    });

    var views = [];
    grid.sequenceFrom(views);

    var stocks = [
        { symbol: "MCD", name: "McDonalds", logoUrl: "http://img2.wikia.nocookie.net/__cb20121218204619/logopedia/images/archive/b/ba/20130603135454!Mcdonalds_logo.png" },
        { symbol: "", name: "Samsung", logoUrl: "http://placehold.it/350x200" },
        { symbol: "", name: "Pfizer", logoUrl: "http://placehold.it/350x200" },
        { symbol: "", name: "Altria", logoUrl: "http://placehold.it/350x200" },
        { symbol: "", name: "Coca-Cola", logoUrl: "http://placehold.it/350x200" }
    ];

    for (var i in stocks) {
        var view = new View();

        var centerModifier = new Modifier({
            origin: [0.5, 0.5]
        });

        var surface = new Surface({
            content: '<img src="' + stocks[i].logoUrl + '" style="height: 200px" alt="..."><div class="caption"><h3>' + stocks[i].name + '</h3><p>...</p></div>',
            //            size: [300, 100],
            classes: ['red-bg']
        });

        surface.on('click', function () { console.log('poop'); });

        view.add(centerModifier).add(surface);

        views.push(view);
    }
    mainContext.add(grid);
});



//var Engine = require('famous/core/Engine');
//var Surface = require('famous/core/Surface');
//var Transform = require('famous/core/Transform');
//var StateModifier = require('famous/modifiers/StateModifier');
//var Easing = require('famous/transitions/Easing');
//var Lightbox = require('famous/views/Lightbox');
//var DeviceView = require('./DeviceView');

//var mainContext = Engine.createContext();

//var device, lightbox;
//var slides = [];
//var index = 0;

//var lightboxOptions = {
//    inOpacity: 1,
//    outOpacity: 1,
//    inTransform: Transform.translate(320, 0, 0),
//    outTransform: Transform.translate(-320, 0, 1),
//    inTransition: { duration: 400, curve: Easing.outBack },
//    outTransition: { duration: 150, curve: Easing.easeOut }
//};

//createDevice();
//createSlides();
//createLightbox();

//function createDevice() {
//    var deviceOptions = {
//        type: 'iphone',
//        height: window.innerHeight - 100
//    };

//    device = new DeviceView(deviceOptions);

//    var deviceModifier = new StateModifier({
//        size: device.getSize(),
//        origin: [0.5, 0.5]
//    });

//    mainContext.add(deviceModifier).add(device);
//}

//function createSlides() {
//    var slideContent = [
//    '<img src="http://launch.famo.us/fu-assets/hello/slide1.png" width="100%">',
//    '<img src="http://launch.famo.us/fu-assets/hello/slide2.png" width="100%">',
//    '<img src="http://launch.famo.us/fu-assets/hello/slide3.png" width="100%">'];

//    var background = new Surface({
//        properties: {
//            backgroundColor: '#FA5C4F'
//        }
//    });

//    device.add(background);

//    for (var i = 0; i < slideContent.length; i++) {
//        var slide = new Surface({
//            content: slideContent[i],
//            properties: {
//                color: 'white',
//                lineHeight: '200%',
//                textAlign: 'center',
//                fontSize: '36px',
//                cursor: 'pointer'
//            }
//        });

//        slide.on('click', showNextSlide);

//        slides.push(slide);
//    }
//}

//function createLightbox() {
//    lightbox = new Lightbox(lightboxOptions);
//    device.add(lightbox);
//    lightbox.show(slides[0]);
//}

//function showNextSlide() {
//    index++;
//    if (index >= slides.length) index = 0;
//    lightbox.show(slides[index]);
//}