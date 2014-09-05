!function t(e,o,n){function i(a,s){if(!o[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(r)return r(a,!0);throw new Error("Cannot find module '"+a+"'")}var l=o[a]={exports:{}};e[a][0].call(l.exports,function(t){var o=e[a][1][t];return i(o?o:t)},l,l.exports,t,e,o,n)}return o[a].exports}for(var r="function"==typeof require&&require,a=0;a<n.length;a++)i(n[a]);return i}({1:[function(t){"use strict";t("./modules/common/module"),t("./modules/data/module"),t("./modules/view-data/module"),t("./modules/view/module")},{"./modules/common/module":3,"./modules/data/module":9,"./modules/view-data/module":11,"./modules/view/module":18}],2:[function(t,e){"use strict";function o(t){function e(e){t.log(e.name)}return{trace:e}}o.$inject=["$log"],e.exports=o},{}],3:[function(t,e){"use strict";var o=t("./provider/cache-storage"),n=t("./service/geolocation"),i=t("./factory/tracer");e.exports=angular.module("velocity.common",[]).provider("CacheStorage",o).service("Geolocation",n).factory("Tracer",i)},{"./factory/tracer":2,"./provider/cache-storage":4,"./service/geolocation":5}],4:[function(t,e){"use strict";function o(){var t=null;this.setStrategy=function(e){t=e},this.$get=function(e,o){function n(){c||(c=!0,e(function(){t.setItem(r,JSON.stringify(a)),c=!1},0))}function i(t){var e=t in a?a[t]:{},o=angular.extend({},{id:t});a[t]=e;var i={put:function(t,o){return e[t]=o,n(),o},get:function(t){return e[t]},remove:function(t){delete e[t],n()},removeAll:function(){e={},n()},destroy:function(){e=null,o=null,delete s[t],delete a[t],n()},info:function(){return angular.extend({},o)}};return s[t]=i,i}null===t&&this.setStrategy(o.localStorage);var r="ng:storage",a=t.getItem(r)?JSON.parse(t.getItem(r)):{},s={},c=!1;return i.info=function(){var t={};return angular.forEach(s,function(e,o){t[o]=e.info()}),t},i.get=function(t){return s[t]},i},this.$get.$inject=["$timeout","$window"]}e.exports=o},{}],5:[function(t,e){"use strict";function o(t,e){this.getCurrentPosition=function(){var o=t.defer();return e.navigator.geolocation.getCurrentPosition(o.resolve,o.reject),o.promise}}o.$inject=["$q","$window"],e.exports=o},{}],6:[function(t,e){"use strict";function o(t,e){var o=t.$get();e.setStrategy(o.sessionStorage)}o.$inject=["$windowProvider","CacheStorageProvider"],e.exports=o},{}],7:[function(t,e){"use strict";e.exports={url:"http://data.keolis-rennes.com/json/",version:"2.0",key:"618UNE6MRZ1E43L"}},{}],8:[function(t,e){"use strict";function o(t){var e=t;return e("velocity:http-cache")}o.$inject=["CacheStorage"],e.exports=o},{}],9:[function(t,e){"use strict";var o=t("./config/cache"),n=t("./constant/api"),i=t("./service/bike-stations"),r=t("./factory/http-cache");e.exports=angular.module("velocity.data",["ngResource","velocity.common"]).config(o).constant("OpenDataApi",n).factory("HttpCache",r).service("BikeStationsData",i)},{"./config/cache":6,"./constant/api":7,"./factory/http-cache":8,"./service/bike-stations":10}],10:[function(t,e){"use strict";function o(t,e,o,n){function i(e){return t({url:n.url,method:"GET",params:{version:n.version,key:n.key,cmd:e},cache:o})}this.getBikeStations=function(){return i("getbikestations")}}o.$inject=["$http","$log","HttpCache","OpenDataApi"],e.exports=o},{}],11:[function(t,e){"use strict";var o=t("./service/bike-stations");e.exports=angular.module("velocity.view-data",["velocity.data"]).service("BikeStationsViewData",o)},{"./service/bike-stations":12}],12:[function(t,e){"use strict";function o(t){return parseInt(t,10)}function n(t,e){this.getBikeStations=function(){function n(t){var e=t.data.opendata.answer.data.station;e=e.map(function(t){return{id:t.number,latitude:t.latitude,longitude:t.longitude,name:t.name,totalslots:o(t.slotsavailable)+o(t.bikesavailable),slotsavailable:o(t.slotsavailable),bikesavailable:o(t.bikesavailable),district:t.district}}),i.resolve(e)}var i=t.defer();return e.getBikeStations().then(n,i.reject),i.promise},this.getBikeStationById=function(e){function o(t){t.forEach(function(t){e===t.id&&n.resolve(t)})}var n=t.defer();return this.getBikeStations().then(o,n.reject),n.promise}}n.$inject=["$q","BikeStationsData"],e.exports=n},{}],13:[function(t,e){"use strict";function o(t,e){t.when("/welcome",{templateUrl:"views/welcome.html",controller:"WelcomeController as ctrl"}).when("/bike-stations",{templateUrl:"views/bike-stations.html",controller:"BikeStationsController as ctrl"}).when("/bike-stations/:id",{templateUrl:"views/bike-station-detail.html",controller:"BikeStationDetailController as ctrl"}).otherwise({redirectTo:"/welcome"}),e.html5Mode(!1)}o.$inject=["$routeProvider","$locationProvider"],e.exports=o},{}],14:[function(t,e){"use strict";function o(t,e,o,n){function i(){n.getCurrentPosition().then(function(e){var o=e.coords,n=new google.maps.LatLng(o.latitude,o.longitude);t.map.setCenter(n),t.markers.push(new google.maps.Marker({map:t.map,position:n,icon:"https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png"}))})}t.station={},t.map={},t.options={zoom:15,mapTypeId:google.maps.MapTypeId.ROADMAP},t.markers=[],o.getBikeStationById(e.id).then(function(e){var o=new google.maps.LatLng(e.latitude,e.longitude);t.station=e,t.map.panTo(o),t.markers.push(new google.maps.Marker({map:t.map,position:o,icon:"https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png"}))}),this.geolocalize=i}o.$inject=["$scope","$routeParams","BikeStationsViewData","Geolocation"],e.exports=o},{}],15:[function(t,e){"use strict";function o(t,e){t.stations=[],e.getBikeStations().then(function(e){t.stations=e})}o.$inject=["$scope","BikeStationsViewData"],e.exports=o},{}],16:[function(t,e){"use strict";function o(t){t.links=[]}o.$inject=["$scope"],e.exports=o},{}],17:[function(t,e){"use strict";function o(t){t.appVersion=n.version}var n=t("../../../../../package");o.$inject=["$scope"],e.exports=o},{"../../../../../package":19}],18:[function(t,e){"use strict";var o=t("./controller/navigation"),n=t("./controller/welcome"),i=t("./controller/bike-stations"),r=t("./controller/bike-station-detail"),a=t("./config/route");e.exports=angular.module("velocity.view",["ngRoute","ngTouch","ui.map","velocity.common","velocity.view-data"]).config(a).controller("NavigationController",o).controller("WelcomeController",n).controller("BikeStationsController",i).controller("BikeStationDetailController",r)},{"./config/route":13,"./controller/bike-station-detail":14,"./controller/bike-stations":15,"./controller/navigation":16,"./controller/welcome":17}],19:[function(t,e){e.exports={name:"velocity",version:"0.0.3",repository:{type:"git",url:"https://github.com/ghoullier/velocity.git"},scripts:{postinstall:"bower install",postupdate:"bower update",start:"gulp"},devDependencies:{bower:"~1.3.9",browserify:"~3.46.0","connect-livereload":"~0.4.0",express:"~4.1.1",gulp:"~3.8.6","gulp-autoprefixer":"0.0.7","gulp-browserify":"~0.5.0","gulp-concat":"~2.2.0","gulp-embedlr":"~0.5.2","gulp-gh-pages":"^0.3.3","gulp-htmlmin":"^0.2.0","gulp-jshint":"~1.5.5","gulp-livereload":"~1.3.1","gulp-ng-annotate":"^0.2.0","gulp-plumber":"^0.6.5","gulp-sass":"~0.7.1","gulp-uglify":"^0.3.1","gulp-util":"~2.2.14",minimist:"^1.1.0","tiny-lr":"0.0.7"},engines:{node:">=0.10.0"},license:"MIT"}},{}]},{},[1]);