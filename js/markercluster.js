function MarkerClusterer(t, e, r) {
    this.extend(MarkerClusterer, google.maps.OverlayView), this.map_ = t, this.markers_ = [], this.clusters_ = [], this.sizes = [53, 56, 66, 78, 90], this.styles_ = [], this.ready_ = !1;
    var s = r || {};
    this.gridSize_ = s.gridSize || 60, this.minClusterSize_ = s.minimumClusterSize || 2, this.maxZoom_ = s.maxZoom || null, this.styles_ = s.styles || [], this.imagePath_ = s.imagePath || this.MARKER_CLUSTER_IMAGE_PATH_, this.imageExtension_ = s.imageExtension || this.MARKER_CLUSTER_IMAGE_EXTENSION_, this.zoomOnClick_ = !0, null != s.zoomOnClick && (this.zoomOnClick_ = s.zoomOnClick), this.averageCenter_ = !1, null != s.averageCenter && (this.averageCenter_ = s.averageCenter), this.setupStyles_(), this.setMap(t), this.prevZoom_ = this.map_.getZoom();
    var o = this;
    google.maps.event.addListener(this.map_, "zoom_changed", function() {
        var t = o.map_.getZoom();
        o.prevZoom_ != t && (o.prevZoom_ = t, o.resetViewport())
    }), google.maps.event.addListener(this.map_, "idle", function() {
        o.redraw()
    }), e && e.length && this.addMarkers(e, !1)
}

function Cluster(t) {
    this.markerClusterer_ = t, this.map_ = t.getMap(), this.gridSize_ = t.getGridSize(), this.minClusterSize_ = t.getMinClusterSize(), this.averageCenter_ = t.isAverageCenter(), this.center_ = null, this.markers_ = [], this.bounds_ = null, this.clusterIcon_ = new ClusterIcon(this, t.getStyles(), t.getGridSize())
}

function ClusterIcon(t, e, r) {
    t.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView), this.styles_ = e, this.padding_ = r || 0, this.cluster_ = t, this.center_ = null, this.map_ = t.getMap(), this.div_ = null, this.sums_ = null, this.visible_ = !1, this.setMap(this.map_)
}
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = "https://googlemaps.github.io/js-marker-clusterer/images/m", MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = "png", MarkerClusterer.prototype.extend = function(t, e) {
    return function(t) {
        for (var e in t.prototype) this.prototype[e] = t.prototype[e];
        return this
    }.apply(t, [e])
}, MarkerClusterer.prototype.onAdd = function() {
    this.setReady_(!0)
}, MarkerClusterer.prototype.draw = function() {}, MarkerClusterer.prototype.setupStyles_ = function() {
    if (!this.styles_.length)
        for (var t, e = 0; t = this.sizes[e]; e++) this.styles_.push({
            url: this.imagePath_ + (e + 1) + "." + this.imageExtension_,
            height: t,
            width: t
        })
}, MarkerClusterer.prototype.fitMapToMarkers = function() {
    for (var t, e = this.getMarkers(), r = new google.maps.LatLngBounds, s = 0; t = e[s]; s++) r.extend(t.getPosition());
    this.map_.fitBounds(r)
}, MarkerClusterer.prototype.setStyles = function(t) {
    this.styles_ = t
}, MarkerClusterer.prototype.getStyles = function() {
    return this.styles_
}, MarkerClusterer.prototype.isZoomOnClick = function() {
    return this.zoomOnClick_
}, MarkerClusterer.prototype.isAverageCenter = function() {
    return this.averageCenter_
}, MarkerClusterer.prototype.getMarkers = function() {
    return this.markers_
}, MarkerClusterer.prototype.getTotalMarkers = function() {
    return this.markers_.length
}, MarkerClusterer.prototype.setMaxZoom = function(t) {
    this.maxZoom_ = t
}, MarkerClusterer.prototype.getMaxZoom = function() {
    return this.maxZoom_
}, MarkerClusterer.prototype.calculator_ = function(t, e) {
    for (var r = 0, s = t.length, o = s; 0 !== o;) o = parseInt(o / 10, 10), r++;
    return {
        text: s,
        index: r = Math.min(r, e)
    }
}, MarkerClusterer.prototype.setCalculator = function(t) {
    this.calculator_ = t
}, MarkerClusterer.prototype.getCalculator = function() {
    return this.calculator_
}, MarkerClusterer.prototype.addMarkers = function(t, e) {
    for (var r, s = 0; r = t[s]; s++) this.pushMarkerTo_(r);
    e || this.redraw()
}, MarkerClusterer.prototype.pushMarkerTo_ = function(t) {
    if (t.isAdded = !1, t.draggable) {
        var e = this;
        google.maps.event.addListener(t, "dragend", function() {
            t.isAdded = !1, e.repaint()
        })
    }
    this.markers_.push(t)
}, MarkerClusterer.prototype.addMarker = function(t, e) {
    this.pushMarkerTo_(t), e || this.redraw()
}, MarkerClusterer.prototype.removeMarker_ = function(t) {
    var e = -1;
    if (this.markers_.indexOf) e = this.markers_.indexOf(t);
    else
        for (var r, s = 0; r = this.markers_[s]; s++)
            if (r == t) {
                e = s;
                break
            } return -1 != e && (t.setMap(null), this.markers_.splice(e, 1), !0)
}, MarkerClusterer.prototype.removeMarker = function(t, e) {
    var r = this.removeMarker_(t);
    return !(e || !r) && (this.resetViewport(), this.redraw(), !0)
}, MarkerClusterer.prototype.removeMarkers = function(t, e) {
    for (var r, s = !1, o = 0; r = t[o]; o++) {
        var i = this.removeMarker_(r);
        s = s || i
    }
    return !e && s ? (this.resetViewport(), this.redraw(), !0) : void 0
}, MarkerClusterer.prototype.setReady_ = function(t) {
    this.ready_ || (this.ready_ = t, this.createClusters_())
}, MarkerClusterer.prototype.getTotalClusters = function() {
    return this.clusters_.length
}, MarkerClusterer.prototype.getMap = function() {
    return this.map_
}, MarkerClusterer.prototype.setMap = function(t) {
    this.map_ = t
}, MarkerClusterer.prototype.getGridSize = function() {
    return this.gridSize_
}, MarkerClusterer.prototype.setGridSize = function(t) {
    this.gridSize_ = t
}, MarkerClusterer.prototype.getMinClusterSize = function() {
    return this.minClusterSize_
}, MarkerClusterer.prototype.setMinClusterSize = function(t) {
    this.minClusterSize_ = t
}, MarkerClusterer.prototype.getExtendedBounds = function(t) {
    var e = this.getProjection(),
        r = new google.maps.LatLng(t.getNorthEast().lat(), t.getNorthEast().lng()),
        s = new google.maps.LatLng(t.getSouthWest().lat(), t.getSouthWest().lng()),
        o = e.fromLatLngToDivPixel(r);
    o.x += this.gridSize_, o.y -= this.gridSize_;
    var i = e.fromLatLngToDivPixel(s);
    i.x -= this.gridSize_, i.y += this.gridSize_;
    var n = e.fromDivPixelToLatLng(o),
        a = e.fromDivPixelToLatLng(i);
    return t.extend(n), t.extend(a), t
}, MarkerClusterer.prototype.isMarkerInBounds_ = function(t, e) {
    return e.contains(t.getPosition())
}, MarkerClusterer.prototype.clearMarkers = function() {
    this.resetViewport(!0), this.markers_ = []
}, MarkerClusterer.prototype.resetViewport = function(t) {
    for (var e, r = 0; e = this.clusters_[r]; r++) e.remove();
    var s;
    for (r = 0; s = this.markers_[r]; r++) s.isAdded = !1, t && s.setMap(null);
    this.clusters_ = []
}, MarkerClusterer.prototype.repaint = function() {
    var r = this.clusters_.slice();
    this.clusters_.length = 0, this.resetViewport(), this.redraw(), window.setTimeout(function() {
        for (var t, e = 0; t = r[e]; e++) t.remove()
    }, 0)
}, MarkerClusterer.prototype.redraw = function() {
    this.createClusters_()
}, MarkerClusterer.prototype.distanceBetweenPoints_ = function(t, e) {
    if (!t || !e) return 0;
    var r = (e.lat() - t.lat()) * Math.PI / 180,
        s = (e.lng() - t.lng()) * Math.PI / 180,
        o = Math.sin(r / 2) * Math.sin(r / 2) + Math.cos(t.lat() * Math.PI / 180) * Math.cos(e.lat() * Math.PI / 180) * Math.sin(s / 2) * Math.sin(s / 2);
    return 6371 * (2 * Math.atan2(Math.sqrt(o), Math.sqrt(1 - o)))
}, MarkerClusterer.prototype.addToClosestCluster_ = function(t) {
    for (var e = 4e4, r = null, s = (t.getPosition(), 0); n = this.clusters_[s]; s++) {
        var o = n.getCenter();
        if (o) {
            var i = this.distanceBetweenPoints_(o, t.getPosition());
            i < e && (e = i, r = n)
        }
    }
    var n;
    r && r.isMarkerInClusterBounds(t) ? r.addMarker(t) : ((n = new Cluster(this)).addMarker(t), this.clusters_.push(n))
}, MarkerClusterer.prototype.createClusters_ = function() {
    if (this.ready_)
        for (var t, e = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(), this.map_.getBounds().getNorthEast()), r = this.getExtendedBounds(e), s = 0; t = this.markers_[s]; s++) !t.isAdded && this.isMarkerInBounds_(t, r) && this.addToClosestCluster_(t)
}, Cluster.prototype.isMarkerAlreadyAdded = function(t) {
    if (this.markers_.indexOf) return -1 != this.markers_.indexOf(t);
    for (var e, r = 0; e = this.markers_[r]; r++)
        if (e == t) return !0;
    return !1
}, Cluster.prototype.addMarker = function(t) {
    if (this.isMarkerAlreadyAdded(t)) return !1;
    if (this.center_) {
        if (this.averageCenter_) {
            var e = this.markers_.length + 1,
                r = (this.center_.lat() * (e - 1) + t.getPosition().lat()) / e,
                s = (this.center_.lng() * (e - 1) + t.getPosition().lng()) / e;
            this.center_ = new google.maps.LatLng(r, s), this.calculateBounds_()
        }
    } else this.center_ = t.getPosition(), this.calculateBounds_();
    t.isAdded = !0, this.markers_.push(t);
    var o = this.getVisibleMarkers(),
        i = o.length;
    if (i < this.minClusterSize_ && t.getMap() != this.map_ && t.setMap(this.map_), i == this.minClusterSize_)
        for (var n = 0; n < i; n++) o[n].setMap(null);
    return i >= this.minClusterSize_ && t.setMap(null), this.updateIcon(), !0
}, Cluster.prototype.getMarkerClusterer = function() {
    return this.markerClusterer_
}, Cluster.prototype.getBounds = function() {
    for (var t, e = new google.maps.LatLngBounds(this.center_, this.center_), r = this.getMarkers(), s = 0; t = r[s]; s++) e.extend(t.getPosition());
    return e
}, Cluster.prototype.remove = function() {
    this.clusterIcon_.remove(), this.markers_.length = 0, delete this.markers_
}, Cluster.prototype.getSize = function() {
    return this.markers_.length
}, Cluster.prototype.getMarkers = function() {
    return this.markers_
}, Cluster.prototype.getVisibleMarkers = function() {
    var t = [];
    for (var e in this.markers_) {
        var r = this.markers_[e];
        r.visible && t.push(r)
    }
    return t
}, Cluster.prototype.getCenter = function() {
    return this.center_
}, Cluster.prototype.calculateBounds_ = function() {
    var t = new google.maps.LatLngBounds(this.center_, this.center_);
    this.bounds_ = this.markerClusterer_.getExtendedBounds(t)
}, Cluster.prototype.isMarkerInClusterBounds = function(t) {
    return this.bounds_.contains(t.getPosition())
}, Cluster.prototype.getMap = function() {
    return this.map_
}, Cluster.prototype.updateIcon = function() {
    var t = this.map_.getZoom(),
        e = this.markerClusterer_.getMaxZoom(),
        r = this.getVisibleMarkers();
    if (e && e < t)
        for (var s, o = 0; s = r[o]; o++) s.setMap(this.map_);
    else {
        if (this.markers_.length < this.minClusterSize_) return void this.clusterIcon_.hide();
        var i = this.markerClusterer_.getStyles().length,
            n = this.markerClusterer_.getCalculator()(r, i);
        "0" == n.text ? this.clusterIcon_.hide() : (this.clusterIcon_.setCenter(this.center_), this.clusterIcon_.setSums(n), this.clusterIcon_.show())
    }
}, ClusterIcon.prototype.triggerClusterClick = function(t) {
    var e = this.cluster_.getMarkerClusterer();
    google.maps.event.trigger(e, "clusterclick", this.cluster_, t), e.isZoomOnClick() && this.map_.fitBounds(this.cluster_.getBounds())
}, ClusterIcon.prototype.onAdd = function() {
    if (this.div_ = document.createElement("DIV"), this.visible_) {
        var t = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(t), this.div_.innerHTML = this.sums_.text
    }
    this.getPanes().overlayMouseTarget.appendChild(this.div_);
    var e = this;
    google.maps.event.addDomListener(this.div_, "click", function(t) {
        e.triggerClusterClick(t)
    })
}, ClusterIcon.prototype.getPosFromLatLng_ = function(t) {
    var e = this.getProjection().fromLatLngToDivPixel(t);
    return "object" == typeof this.iconAnchor_ && 2 === this.iconAnchor_.length ? (e.x -= this.iconAnchor_[0], e.y -= this.iconAnchor_[1]) : (e.x -= parseInt(this.width_ / 2, 10), e.y -= parseInt(this.height_ / 2, 10)), e
}, ClusterIcon.prototype.draw = function() {
    if (this.visible_) {
        var t = this.getPosFromLatLng_(this.center_);
        this.div_.style.top = t.y + "px", this.div_.style.left = t.x + "px"
    }
}, ClusterIcon.prototype.hide = function() {
    this.div_ && (this.div_.style.display = "none"), this.visible_ = !1
}, ClusterIcon.prototype.show = function() {
    if (this.div_) {
        var t = this.getPosFromLatLng_(this.center_);
        this.div_.style.cssText = this.createCss(t), this.div_.style.display = ""
    }
    this.visible_ = !0
}, ClusterIcon.prototype.remove = function() {
    this.setMap(null)
}, ClusterIcon.prototype.onRemove = function() {
    this.div_ && this.div_.parentNode && (this.hide(), this.div_.parentNode.removeChild(this.div_), this.div_ = null)
}, ClusterIcon.prototype.setSums = function(t) {
    this.sums_ = t, this.text_ = t.text, this.index_ = t.index, this.div_ && (this.div_.innerHTML = t.text), this.useStyle()
}, ClusterIcon.prototype.useStyle = function() {
    var t = Math.max(0, this.sums_.index - 1);
    t = Math.min(this.styles_.length - 1, t);
    var e = this.styles_[t];
    this.url_ = e.url, this.height_ = e.height, this.width_ = e.width, this.textColor_ = e.textColor, this.anchor_ = e.anchor, this.textSize_ = e.textSize, this.backgroundPosition_ = e.backgroundPosition, this.iconAnchor_ = e.iconAnchor
}, ClusterIcon.prototype.setCenter = function(t) {
    this.center_ = t
}, ClusterIcon.prototype.createCss = function(t) {
    var e = [];
    e.push("background-image:url(" + this.url_ + ");");
    var r = this.backgroundPosition_ ? this.backgroundPosition_ : "0 0";
    e.push("background-position:" + r + ";"), "object" == typeof this.anchor_ ? ("number" == typeof this.anchor_[0] && 0 < this.anchor_[0] && this.anchor_[0] < this.height_ ? e.push("height:" + (this.height_ - this.anchor_[0]) + "px; padding-top:" + this.anchor_[0] + "px;") : "number" == typeof this.anchor_[0] && this.anchor_[0] < 0 && -this.anchor_[0] < this.height_ ? e.push("height:" + this.height_ + "px; line-height:" + (this.height_ + this.anchor_[0]) + "px;") : e.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px;"), "number" == typeof this.anchor_[1] && 0 < this.anchor_[1] && this.anchor_[1] < this.width_ ? e.push("width:" + (this.width_ - this.anchor_[1]) + "px; padding-left:" + this.anchor_[1] + "px;") : e.push("width:" + this.width_ + "px; text-align:center;")) : e.push("height:" + this.height_ + "px; line-height:" + this.height_ + "px; width:" + this.width_ + "px; text-align:center;");
    var s = this.textColor_ ? this.textColor_ : "black",
        o = this.textSize_ ? this.textSize_ : 11;
    return e.push("cursor:pointer; top:" + t.y + "px; left:" + t.x + "px; color:" + s + "; position:absolute; font-size:" + o + "px; font-family:Arial,sans-serif; font-weight:bold"), e.join("")
}, (window.MarkerClusterer = MarkerClusterer).prototype.addMarker = MarkerClusterer.prototype.addMarker, MarkerClusterer.prototype.addMarkers = MarkerClusterer.prototype.addMarkers, MarkerClusterer.prototype.clearMarkers = MarkerClusterer.prototype.clearMarkers, MarkerClusterer.prototype.fitMapToMarkers = MarkerClusterer.prototype.fitMapToMarkers, MarkerClusterer.prototype.getCalculator = MarkerClusterer.prototype.getCalculator, MarkerClusterer.prototype.getGridSize = MarkerClusterer.prototype.getGridSize, MarkerClusterer.prototype.getExtendedBounds = MarkerClusterer.prototype.getExtendedBounds, MarkerClusterer.prototype.getMap = MarkerClusterer.prototype.getMap, MarkerClusterer.prototype.getMarkers = MarkerClusterer.prototype.getMarkers, MarkerClusterer.prototype.getMaxZoom = MarkerClusterer.prototype.getMaxZoom, MarkerClusterer.prototype.getStyles = MarkerClusterer.prototype.getStyles, MarkerClusterer.prototype.getTotalClusters = MarkerClusterer.prototype.getTotalClusters, MarkerClusterer.prototype.getTotalMarkers = MarkerClusterer.prototype.getTotalMarkers, MarkerClusterer.prototype.redraw = MarkerClusterer.prototype.redraw, MarkerClusterer.prototype.removeMarker = MarkerClusterer.prototype.removeMarker, MarkerClusterer.prototype.removeMarkers = MarkerClusterer.prototype.removeMarkers, MarkerClusterer.prototype.resetViewport = MarkerClusterer.prototype.resetViewport, MarkerClusterer.prototype.repaint = MarkerClusterer.prototype.repaint, MarkerClusterer.prototype.setCalculator = MarkerClusterer.prototype.setCalculator, MarkerClusterer.prototype.setGridSize = MarkerClusterer.prototype.setGridSize, MarkerClusterer.prototype.setMaxZoom = MarkerClusterer.prototype.setMaxZoom, MarkerClusterer.prototype.onAdd = MarkerClusterer.prototype.onAdd, MarkerClusterer.prototype.draw = MarkerClusterer.prototype.draw, Cluster.prototype.getCenter = Cluster.prototype.getCenter, Cluster.prototype.getSize = Cluster.prototype.getSize, Cluster.prototype.getMarkers = Cluster.prototype.getMarkers, Cluster.prototype.getVisibleMarkers = Cluster.prototype.getVisibleMarkers, ClusterIcon.prototype.onAdd = ClusterIcon.prototype.onAdd, ClusterIcon.prototype.draw = ClusterIcon.prototype.draw, ClusterIcon.prototype.onRemove = ClusterIcon.prototype.onRemove;