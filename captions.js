window.onload = function() {
	alert("ONLOAD")
	var dictionary;
	var iPlayerContainer = $('#player-container')
	var iCurrentSubs;
	addjQuery();

	// ADD jQuery
	function addjQuery(){
		var script = document.createElement('script');
		script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
		script.type = 'text/javascript';
		document.getElementsByTagName('head')[0].appendChild(script)
		console.log("jquery added");
	}


	// get dictionary

	$.getJSON( "https://rawgit.com/web1991t/textfiles/master/DICTIONARY_chat_415092182.json", function( data ) {
		dictionary = data;
		console.log("Dictionary was downloaded");
		console.log(data.length);
	}); 


	// show subtitles

	function showSubtitles(word){
			
		var iblock = document.getElementsByClassName('iblock');

		while(iblock[0]) {
			iblock[0].parentNode.removeChild(iblock[0]);
		}

		var iSub = document.createElement('div');
		//var iPlayer = document.getElementById('player-container')
		
		iSub.id = 'iblock';
		iSub.className = 'iblock';
		iSub.innerText = word;
		iSub.style.position = "absolute";
		iSub.style.zIndex = "9999";
		iSub.style.color = "white";
		iSub.style.fontSize = "1.3em";
		iSub.style.backgroundColor = "black";
		iSub.style.textAlign = "center";
		iSub.style.left = (iPlayerContainer.css('width').replace("px","") / 4.7) + "px";
		iSub.style.top = (iPlayerContainer.css('height').replace("px","") / 1.38) + "px";
		
		iPlayerContainer[0].appendChild(iSub);
	}

	// check selection
		
	iPlayerContainer.click(function(event){
			var text = getSelectionText().trim().replace(/ /g,'+');
			if (text!='') {
				console.log(encodeURIComponent(text));
				$.ajax('https://json2jsonp.com/?url=https://api.lingualeo.com/gettranslates?word=' + encodeURIComponent(text), {
					contentType: 'application/json',
					dataType: 'jsonp',
					success : function(data){
					console.log(data);
					toggleDictionary(data,text);
				}
			})
	}
	});	


	function toggleDictionary(data,word){
		if(checkWord(word)){
			var element = checkWord(word);
				// debugger;
				var index = dictionary.indexOf(element);
				dictionary.splice(index, 1);
				console.log("Remove fom dictionary");
				checkDictionary(iCurrentSubs,false)
				return
		}
		var translation = {word: word, 
		translation: data.translate[0].value}
		console.log("add into dictionary")
		console.log(translation);
		dictionary.push(translation);
		checkDictionary(iCurrentSubs,false)
	}


	function getSelectionText() {
		var text = "";
		if (window.getSelection) {
			text = window.getSelection().toString();
		} else if (document.selection && document.selection.type != "Control") {
			text = document.selection.createRange().text.replaceAll(/[^A-Za-z\s\'\-]/,"");
		}
		return text;
	}

	// check word in dictionary

	function checkDictionary(word,firstCall) {
		if (firstCall){
				debugger;
				console.log("CHANGE I CURRENT SUBS===================")
				console.log(word)
				iCurrentSubs = word
		}

		var wordsArray = word.replaceAll("\n"," ").replaceAll(/[^A-Za-z\s\'\-]/,"").split(" ")
		for(var i=0;i<wordsArray.length;i++){
			var entry = checkWord(wordsArray[i]);
			// debugger;
			if(entry){
				var translation = entry.translation
				var translationMessage = "\n" + wordsArray[i].toUpperCase() + ": " + translation;
				if(!word.includes(translationMessage)){
					console.log(word)
					console.log("replace with " + translation)
					word = word + translationMessage;
				}
				
			}
		}
		showSubtitles(word)
		return word
	}; 

	function checkWord(word) {
		// debugger;
		for(var i=0;i<dictionary.length;i++){
			if(dictionary[i].word.trim().toLowerCase() == word.trim().toLowerCase()){
				return(dictionary[i])
			}
		}
	}





	String.prototype.replaceAll = function(search, replacement) {
		var target = this;
		return target.replace(new RegExp(search, 'g'), replacement);
	};
}

(function(g) {
    var window = this;
    var x4 = function(a) {
        var b = {
            format: a.B,
            languageCode: a.A,
            languageName: a.D,
            displayName: g.cI(a),
            kind: a.C,
            name: a.F,
            id: a.Ia,
            is_servable: a.M,
            is_default: a.isDefault,
            is_translateable: a.H,
            vss_id: a.G
        };
        a.o && (a = a.o,
        b.translationLanguage = {
            languageCode: a.languageCode,
            languageName: a.languageName,
            languageOriginal: a.o,
            id: a.id,
            is_default: a.isDefault
        });
        return b
    }
      , y4 = function(a) {
        return a.o ? a.o.languageCode : a.A
    }
      , SBa = function(a, b) {
        var c = new g.bI;
        c.A = a.A;
        c.D = a.D;
        c.F = a.F;
        c.C = a.C;
        c.isDefault = !1;
        c.H = a.H;
        c.G = a.G;
        c.J = a.J;
        c.o = b;
        return c
    }
      , z4 = function(a, b, c, d, e, f, k) {
        f = void 0 === f ? !1 : f;
        k = void 0 === k ? null : k;
        g.PQ.call(this, a, a + b, {
            priority: c,
            namespace: "captions"
        });
        this.windowId = d;
        this.text = e;
        this.D = f;
        this.A = k
    }
      , A4 = function(a, b, c, d, e) {
        g.PQ.call(this, a, a + b, {
            priority: c,
            namespace: "captions"
        });
        this.id = d;
        this.params = e;
        this.A = []
    }
      , C4 = function(a) {
        a = void 0 === a ? {} : a;
        var b = "_" + B4++;
        return new A4(0,0x8000000000000,0,b,a)
    }
      , D4 = function(a, b, c, d, e, f) {
        var k = {};
        g.Ga(k, b);
        g.Ga(k, a.params);
        g.Ga(k, c);
        var l = {};
        g.Ga(l, b.ob);
        a.params.ob && g.Ga(l, a.params.ob);
        g.Ga(l, c.ob);
        k.ob = l;
        g.W.call(this, {
            I: "div",
            N: "caption-window",
            U: {
                id: "caption-window-" + a.id,
                dir: 1 == k.Xk ? "rtl" : "ltr",
                tabindex: "0",
                "aria-live": "assertive",
                lang: k.lang
            },
            P: [{
                I: "span",
                N: "captions-text"
            }]
        });
        this.D = [];
        this.M = !1;
        this.H = a;
        this.G = [];
        this.J = [];
        this.Ca = e;
        this.za = f;
        this.F = null;
        this.aa = .96 * e;
        this.ka = .96 * f;
        this.A = k;
        this.va = c;
        this.C = this.o["captions-text"];
        this.oa = null != this.C.style["box-decoration-break"] || null != this.C.style["-webkit-box-decoration-break"];
        this.O = d / 360 * 16;
        this.type = 0;
        this.ga = this.O * TBa(l);
        a = new g.$F(this.element,!0);
        g.N(this, a);
        a.subscribe("dragstart", this.EP, this);
        a.subscribe("dragmove", this.DP, this);
        a.subscribe("dragend", this.CP, this);
        this.ia = this.ha = 0;
        a = "";
        this.A.windowOpacity && (a = g.Jt(this.A.windowColor),
        a = "rgba(" + a[0] + "," + a[1] + "," + a[2] + "," + this.A.windowOpacity + ")");
        b = {
            "background-color": a,
            display: !1 === this.A.isVisible ? "none" : "",
            "text-align": UBa[this.A.textAlign]
        };
        this.oa && (b["border-radius"] = a ? this.ga / 8 + "px" : "");
        g.Ch(this.element, b);
        switch (this.A.Mf) {
        case 0:
        case 1:
        case 2:
            g.T(this.element, "ytp-caption-window-top");
            break;
        case 6:
        case 7:
        case 8:
            g.T(this.element, "ytp-caption-window-bottom")
        }
    }
      , TBa = function(a) {
        var b = 1 + .25 * (a.fontSizeIncrement || 0);
        if (0 == a.offset || 2 == a.offset)
            b *= .8;
        return b
    }
      , E4 = function(a, b) {
        var c = {}
          , d = b.background ? b.background : a.A.ob.background;
        if (null != b.backgroundOpacity || b.background) {
            var e = null != b.backgroundOpacity ? b.backgroundOpacity : a.A.ob.backgroundOpacity;
            d = g.Jt(d);
            c.background = "rgba(" + d[0] + "," + d[1] + "," + d[2] + "," + e + ")";
            a.oa && (c["box-decoration-break"] = "clone",
            c["border-radius"] = a.ga / 8 + "px")
        }
        if (null != b.fontSizeIncrement || null != b.offset)
            c["font-size"] = a.O * TBa(b) + "px";
        d = 1;
        e = b.color || a.A.ob.color;
        if (b.color || null != b.textOpacity)
            e = g.Jt(e),
            d = null == b.textOpacity ? a.A.ob.textOpacity : b.textOpacity,
            e = "rgba(" + e[0] + "," + e[1] + "," + e[2] + "," + d + ")",
            c.color = e,
            c.fill = e;
        var f = b.charEdgeStyle;
        0 == f && (f = null);
        if (f) {
            e = "rgba(34, 34, 34, " + d + ")";
            var k = "rgba(204, 204, 204, " + d + ")";
            b.uy && (k = e = b.uy);
            var l = a.O / 16 / 2
              , m = Math.max(l, 1)
              , n = Math.max(2 * l, 1)
              , p = Math.max(3 * l, 1)
              , r = Math.max(5 * l, 1);
            d = [];
            switch (f) {
            case 4:
                for (; p <= r; p += l)
                    d.push(n + "px " + n + "px " + p + "px " + e);
                break;
            case 1:
                n = 2 <= window.devicePixelRatio ? .5 : 1;
                for (f = m; f <= p; f += n)
                    d.push(f + "px " + f + "px " + e);
                break;
            case 2:
                d.push(m + "px " + m + "px " + k);
                d.push("-" + m + "px -" + m + "px " + e);
                break;
            case 3:
                for (p = 0; 5 > p; p++)
                    d.push("0 0 " + n + "px " + e)
            }
            c["text-shadow"] = d.join(", ")
        }
        e = "";
        switch (b.fontFamily) {
        case 1:
            e = '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
            break;
        case 2:
            e = '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
            break;
        case 3:
            e = '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
            break;
        case 5:
            e = '"Comic Sans MS", Impact, Handlee, fantasy';
            break;
        case 6:
            e = '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
            break;
        case 7:
            e = g.NE() ? '"Carrois Gothic SC", sans-serif-smallcaps' : '"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif';
            break;
        case 0:
        case 4:
            e = '"YouTube Noto", Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif'
        }
        e && (c["font-family"] = e);
        e = b.offset;
        null == e && (e = a.A.ob.offset);
        switch (e) {
        case 0:
            c["vertical-align"] = "sub";
            break;
        case 2:
            c["vertical-align"] = "super"
        }
        7 == b.fontFamily && (c["font-variant"] = "small-caps");
        b.bold && (c["font-weight"] = "bold");
        b.vf && (c["font-style"] = "italic");
        b.underline && (c["text-decoration"] = "underline");
        b.Xs && (c.visibility = "hidden");
        return c
    }
      , VBa = function(a, b, c) {
        a.M = a.M || !!c;
        var d = {};
        g.Ga(d, a.A.ob);
        g.Ga(d, c || b.A);
        g.Ga(d, a.va.ob);
        c = a.G[0];
        if (c && d.background == c.background && d.backgroundOpacity == c.backgroundOpacity && !!d.Xs == !!c.Xs && d.charEdgeStyle == c.charEdgeStyle) {
            var e;
            for (e = 0; e < a.G.length; e++)
                if (g.ec(d, a.G[e])) {
                    var f = a.J[e];
                    break
                }
            if (!f) {
                e = {};
                for (var k in d)
                    d[k] != c[k] && (e[k] = d[k]);
                f = g.Md("SPAN");
                g.Ch(f, E4(a, e));
                a.J[0].appendChild(f);
                e = 1
            }
            a.J.length = e;
            a.G.length = e
        } else
            a.J.length = 0,
            a.G.length = 0,
            f = g.Md("SPAN"),
            g.Ch(f, E4(a, d)),
            a.C.appendChild(f);
        a.F && a.F.parentNode != f && (g.Td(a.F),
        f.appendChild(a.F));
		checkDictionary(b.text,true);
        c = (k = g.w(b.text)) ? b.text.split("\n") : [b.text];
        for (e = 0; e < c.length; e++) {
            var l = c[e];
            if (0 < e || 0 == a.D.length || !b.D) {
                if (0 < e || 0 != a.D.length) {
                    var m = g.Md("BR");
                    //f.appendChild(m)
                }
                //f.appendChild(g.Od("\u00a0"));
                a.F = g.Od("\u00a0");
                //f.appendChild(a.F)
            }
            l && (m = a.F,
            m.parentNode && m.parentNode.insertBefore(k ? g.Od(l) : l, m))
        }
        a.G.push(d);
        a.J.push(f);
        a.D.push(b)
    }
      , WBa = function() {}
      , G4 = function() {
        this.C = this.A = this.mode = this.B = 0;
        this.D = new F4(this);
        this.F = new F4(this);
        this.o = [];
        this.clear()
    }
      , YBa = function(a, b, c) {
        if (255 == a && 255 == b || !a && !b)
            return {
                On: a,
                Pn: b,
                result: 0
            };
        a = XBa[a];
        b = XBa[b];
        if (a & 128) {
            if (!(b & 128) && 0 != c.o && c.A == b)
                return {
                    On: a,
                    Pn: b,
                    result: 1
                }
        } else if (b & 128 && 1 <= a && 31 >= a)
            return {
                On: a,
                Pn: b,
                result: 2
            };
        return {
            On: a,
            Pn: b,
            result: 3
        }
    }
      , $Ba = function(a, b, c, d) {
        255 == b && 255 == c || !b && !c ? (45 == ++a.C && a.reset(),
        a.D.o.clear(),
        a.F.o.clear()) : (a.C = 0,
        ZBa(a.D, b, c, d))
    }
      , aCa = function(a, b) {
        a.o.sort(function(a, b) {
            var c = a.time - b.time;
            return 0 == c ? a.order - b.order : c
        });
        for (var c = 0; c < a.o.length; c++) {
            var d = a.o[c];
            a.A = d.time;
            0 == d.type ? $Ba(a, d.my, d.oy, b) : 1 == d.type && a.B & 496 && ZBa(a.F, d.my, d.oy, b)
        }
        a.o.length = 0
    }
      , H4 = function() {
        this.o = 0
    }
      , I4 = function() {
        this.A = this.B = this.o = 0
    }
      , J4 = function() {
        this.timestamp = this.Ee = 0
    }
      , K4 = function(a) {
        this.B = [];
        for (var b = 0; 15 >= b; b++) {
            this.B[b] = [];
            for (var c = 0; 32 >= c; c++)
                this.B[b][c] = new J4
        }
        this.o = this.A = this.row = 0;
        this.style = new H4;
        this.D = a;
        this.C = 0
    }
      , L4 = function(a, b) {
        if (3 == a.style.o) {
            for (var c = 0, d = 0, e = a.D.A + 0, f = "", k = "", l = e, m = 1; 15 >= m; ++m) {
                for (var n = !1, p = d ? d : 1; 32 >= p; ++p) {
                    var r = a.B[m][p];
                    if (0 != r.Ee) {
                        0 == c && (c = m,
                        d = p);
                        n = String.fromCharCode(r.Ee);
                        var v = r.timestamp;
                        v < e && (e = v);
                        r.timestamp = l;
                        k && (f += k,
                        k = "");
                        f += n;
                        n = !0
                    }
                    if ((0 == r.Ee || 32 == p) && n) {
                        k = "\n";
                        break
                    } else if (d && !n)
                        break
                }
                if (c && !n)
                    break
            }
            f && b.D(c, d, e, l, f)
        } else
            for (d = c = 0,
            f = e = a.D.A + 0,
            k = 1; 15 >= k; ++k)
                for (l = "",
                m = 1; 32 >= m; ++m)
                    if (p = a.B[k][m],
                    r = p.Ee,
                    0 != r && (0 == c && (c = k,
                    d = m),
                    n = String.fromCharCode(r),
                    v = p.timestamp,
                    v <= e && (e = v),
                    l += n,
                    p.reset()),
                    32 == m || 0 == r)
                        l && b.D(c, d, e, f, l),
                        e = f,
                        l = "",
                        d = c = 0
    }
      , fCa = function(a, b) {
        switch (a) {
        case 0:
            return bCa[(b & 127) - 32];
        case 1:
            return cCa[b & 15];
        case 2:
            return dCa[b & 31];
        case 3:
            return eCa[b & 31]
        }
        return 0
    }
      , M4 = function(a) {
        return a.B[a.row][a.A]
    }
      , N4 = function(a, b, c) {
        2 <= b && 1 < a.A && (--a.A,
        M4(a).Ee = 0);
        var d = M4(a);
        d.timestamp = a.D.A + 0;
        d.Ee = fCa(b, c);
        32 > a.A && a.A++
    }
      , gCa = function(a, b, c, d) {
        for (var e = 0; e < d; e++)
            for (var f = 0; 32 >= f; f++)
                a.B[b + e][f].fo(a.B[c + e][f])
    }
      , O4 = function(a, b, c) {
        for (var d = 0; d < c; d++)
            for (var e = 0; 32 >= e; e++)
                a.B[b + d][e].reset()
    }
      , P4 = function(a) {
        a.row = 0 < a.o ? a.o : 1;
        a.A = 1;
        O4(a, 0, 15)
    }
      , Q4 = function(a) {
        this.C = a;
        this.D = 0;
        this.style = new H4;
        this.F = new K4(a);
        this.G = new K4(a);
        this.H = new K4(a);
        this.A = this.F;
        this.B = this.G;
        this.o = this.A
    }
      , R4 = function(a, b, c) {
        var d = a.A
          , e = !1;
        switch (a.style.get()) {
        case 4:
            if (0 < d.o)
                break;
        case 1:
        case 2:
            L4(d, c),
            P4(a.A),
            P4(a.B),
            d.row = 15,
            d.o = b,
            e = !0
        }
        a.style.set(3);
        a.o = d;
        a.o.style = a.style;
        a.C.mode = 1 << d.C;
        e ? d.A = 1 : d.o != b && (d.o > b ? (L4(d, c),
        O4(d, d.row - d.o, b)) : d.row < b && (b = d.o),
        d.o = b)
    }
      , hCa = function(a) {
        a.style.set(1);
        a.o = a.B;
        a.o.o = 0;
        a.o.style = a.style;
        a.C.mode = 1 << a.o.C
    }
      , iCa = function(a) {
        a.style.set(4);
        a.o = a.H;
        a.o.style = a.style;
        a.C.mode = 1 << a.o.C
    }
      , F4 = function(a) {
        this.A = a;
        this.o = new I4;
        this.D = 0;
        this.B = new Q4(a);
        this.F = new Q4(a);
        this.C = this.B
    }
      , ZBa = function(a, b, c, d) {
        a.o.update();
        b = YBa(b, c, a.o);
        switch (b.result) {
        case 0:
            return;
        case 1:
        case 2:
            return
        }
        var e = b.On;
        c = b.Pn;
        if (32 <= e || !e)
            a.A.mode & a.A.B && (b = e,
            b & 128 && (b = 127),
            c & 128 && (c = 127),
            a = a.C.o,
            b & 96 && N4(a, 0, b),
            c & 96 && N4(a, 0, c),
            0 != b && 0 != c && 3 == a.style.o && L4(a, d));
        else if (e & 16)
            a: if (!a.o.matches(e, c) && (b = a.o,
            b.B = e,
            b.A = c,
            b.o = 2,
            b = e & 8 ? a.F : a.B,
            a.C = b,
            a.A.mode = 1 << (a.D << 2) + (b.D << 1) + (4 == b.style.o ? 1 : 0),
            (a.A.mode | 1 << (a.D << 2) + (b.D << 1) + (4 != b.style.o ? 1 : 0)) & a.A.B))
                if (c & 64) {
                    d = [11, 11, 1, 2, 3, 4, 12, 13, 14, 15, 5, 6, 7, 8, 9, 10][(e & 7) << 1 | c >> 5 & 1];
                    a = c & 16 ? 4 * ((c & 14) >> 1) : 0;
                    c = b.o;
                    switch (b.style.get()) {
                    case 4:
                        d = c.row;
                        break;
                    case 3:
                        if (d != c.row) {
                            if (d < c.o && (d = c.o,
                            d == c.row))
                                break;
                            var f = 1 + c.row - c.o
                              , k = 1 + d - c.o;
                            gCa(c, k, f, c.o);
                            b = f;
                            e = c.o;
                            k < f ? (f = k + e - f,
                            0 < f && (b += f,
                            e -= f)) : (f = f + e - k,
                            0 < f && (e -= f));
                            O4(c, b, e)
                        }
                    }
                    c.row = d;
                    c.A = a + 1
                } else
                    switch (e & 7) {
                    case 1:
                        switch (c & 112) {
                        case 32:
                            N4(b.o, 0, 32);
                            break a;
                        case 48:
                            57 == c ? (b = b.o,
                            M4(b).Ee = 0,
                            32 > b.A && b.A++) : N4(b.o, 1, c & 15)
                        }
                        break;
                    case 2:
                        c & 32 && N4(b.o, 2, c & 31);
                        break;
                    case 3:
                        c & 32 && N4(b.o, 3, c & 31);
                        break;
                    case 4:
                    case 5:
                        if (32 <= c && 47 >= c)
                            switch (c) {
                            case 32:
                                hCa(b);
                                break;
                            case 33:
                                b = b.o;
                                1 < b.A && (--b.A,
                                M4(b).Ee = 0);
                                break;
                            case 36:
                                b = b.o;
                                d = M4(b);
                                for (a = 0; 15 >= a; a++)
                                    for (c = 0; 32 >= c; c++)
                                        if (b.B[a][c] == d) {
                                            for (; 32 >= c; c++)
                                                b.B[a][c].reset();
                                            break
                                        }
                                break;
                            case 37:
                                R4(b, 2, d);
                                break;
                            case 38:
                                R4(b, 3, d);
                                break;
                            case 39:
                                R4(b, 4, d);
                                break;
                            case 40:
                                N4(b.o, 0, 32);
                                break;
                            case 41:
                                b.style.set(2);
                                b.o = b.A;
                                b.o.o = 0;
                                b.o.style = b.style;
                                b.C.mode = 1 << b.o.C;
                                break;
                            case 42:
                                d = b.H;
                                d.o = 15;
                                d.style.set(4);
                                P4(d);
                                iCa(b);
                                break;
                            case 43:
                                iCa(b);
                                break;
                            case 44:
                                a = b.A;
                                switch (b.style.get()) {
                                case 1:
                                case 2:
                                case 3:
                                    L4(a, d)
                                }
                                O4(a, 0, 15);
                                break;
                            case 45:
                                b: {
                                    a = b.o;
                                    switch (b.style.get()) {
                                    default:
                                    case 2:
                                    case 1:
                                        break b;
                                    case 4:
                                        if (15 > a.row) {
                                            ++a.row;
                                            a.A = 1;
                                            break b
                                        }
                                    case 3:
                                    }
                                    2 > a.o && (a.o = 2,
                                    a.row < a.o && (a.row = a.o));
                                    b = a.row - a.o + 1;
                                    L4(a, d);
                                    gCa(a, b, b + 1, a.o - 1);
                                    O4(a, a.row, 1)
                                }
                                break;
                            case 46:
                                O4(b.B, 0, 15);
                                break;
                            case 47:
                                L4(b.A, d);
                                d = b.B;
                                a = b.C.A + 0;
                                for (c = 1; 15 >= c; ++c)
                                    for (e = 1; 32 >= e; ++e)
                                        d.B[c][e].timestamp = a;
                                d = b.B;
                                b.B = b.A;
                                b.A = d;
                                hCa(b)
                            }
                        break;
                    case 7:
                        switch (c) {
                        case 33:
                        case 34:
                        case 35:
                            b = b.o,
                            32 < (b.A += c & 3) && (b.A = 32)
                        }
                    }
    }
      , S4 = function() {}
      , T4 = function(a) {
        this.A = a;
        this.o = null
    }
      , kCa = function(a, b, c) {
        var d = a.getAttribute("t");
        d = d ? (0,
        window.parseInt)(d, 10) : 1E3 * (0,
        window.parseFloat)(a.getAttribute("start") || 0);
        var e = a.getAttribute("d");
        e = e ? (0,
        window.parseFloat)(e) : 1E3 * (0,
        window.parseFloat)(a.getAttribute("dur") || 0);
        b = a.getAttribute("w") || b;
        var f = !!a.getAttribute("append")
          , k = f ? 6 : 5;
        a = g.ks("<html>" + (a.firstChild && a.firstChild.nodeValue || "") + "</html>");
        jCa(d, e, k, b, f, a.firstChild, {}, c)
    }
      , jCa = function(a, b, c, d, e, f, k, l) {
        switch (f.tagName) {
        case "b":
            k.bold = !0;
            break;
        case "i":
            k.vf = !0;
            break;
        case "u":
            k.underline = !0;
            break;
        case "font":
            var m = f.getAttribute("color");
            U4.test(m);
            k.color = m
        }
        for (m = 0; m < f.childNodes.length; m++) {
            var n = f.childNodes[m];
            if (3 == n.nodeType)
                l.push(new z4(a,b,c,d,n.nodeValue,e || 0 < m,g.$b(k) ? void 0 : k));
            else {
                var p = {};
                g.Ga(p, k);
                jCa(a, b, c, d, e || 0 < m, n, p, l)
            }
        }
    }
      , V4 = function() {
        this.A = {};
        this.o = null
    }
      , W4 = function(a) {
        this.C = {};
        this.J = {};
        this.K = {};
        this.D = "_" + B4++;
        this.F = a;
        this.H = {};
        this.A = this.o = null;
        this.G = !0
    }
      , X4 = function(a, b) {
        var c = a.getAttribute(b);
        if (null != c)
            return (0,
            window.parseFloat)(c)
    }
      , Y4 = function(a, b) {
        var c = a.getAttribute(b);
        if (null != c)
            return "1" == c
    }
      , Z4 = function(a, b) {
        var c = X4(a, b);
        if (void 0 != c)
            return c
    }
      , $4 = function(a, b) {
        var c = a.getAttribute(b);
        if (null != c)
            return U4.test(c),
            c
    }
      , lCa = function(a, b) {
        var c = {}
          , d = b.getAttribute("ws");
        g.Ga(c, d ? a.K[d] : a.F);
        d = Z4(b, "mh");
        null != d && (c.fu = d);
        d = Z4(b, "ju");
        null != d && (c.textAlign = d);
        d = Z4(b, "pd");
        null != d && (c.Xk = d);
        d = $4(b, "wfc");
        null != d && (c.windowColor = d);
        d = X4(b, "wfo");
        void 0 != d && (c.windowOpacity = d / 255);
        return c
    }
      , mCa = function(a, b) {
        var c = {}
          , d = b.getAttribute("wp");
        d && g.Ga(c, a.J[d]);
        d = Z4(b, "ap");
        null != d && (c.Mf = d);
        d = X4(b, "cc");
        null != d && (c.Rr = d);
        d = X4(b, "ah");
        null != d && (c.Xe = d);
        d = X4(b, "rc");
        null != d && (c.oq = d);
        d = X4(b, "av");
        null != d && (c.rg = d);
        return c
    }
      , nCa = function(a, b, c, d) {
        var e = {};
        g.Ga(e, mCa(a, b));
        g.Ga(e, lCa(a, b));
        d ? g.ec(e, a.F) ? (d = a.D,
        e = a.F) : d = "_" + B4++ : d = b.getAttribute("id") || "_" + B4++;
        a = X4(b, "t") + c;
        b = X4(b, "d") || 0x8000000000000;
        return new A4(a,b,0,d,e)
    }
      , a5 = function(a, b, c) {
        this.G = c;
        this.version = this.F = this.C = this.o = 0;
        this.A = new window.DataView(a);
        this.B = []
    }
      , b5 = function(a) {
        var b = a.o;
        a.o += 1;
        return a.A.getUint8(b)
    }
      , c5 = function(a) {
        var b = a.o;
        a.o += 4;
        return a.A.getUint32(b)
    }
      , d5 = function(a, b) {
        this.A = a;
        this.track = "CC3" == b.D ? 4 : 0;
        this.o = new G4;
        this.o.B = 1 << this.track
    }
      , pCa = function(a) {
        if (g.w(a))
            return !1;
        a = new a5(a,8,0);
        return oCa(a)
    }
      , oCa = function(a) {
        if (!(a.o < a.A.byteLength) || 1380139777 != c5(a))
            return !1;
        a.version = b5(a);
        if (1 < a.version)
            return !1;
        b5(a);
        b5(a);
        b5(a);
        return !0
    }
      , qCa = function() {
        this.A = [];
        this.o = []
    }
      , e5 = function(a, b) {
        return b ? a.o.concat(a.A) : a.o
    }
      , f5 = function(a, b) {
        switch (b.C) {
        case "asr":
            var c = a.A;
            g.La(c, (0,
            g.A)(b.K, b)) || c.push(b);
            break;
        default:
            c = a.o,
            g.La(c, (0,
            g.A)(b.K, b)) || c.push(b)
        }
    }
      , g5 = function() {}
      , rCa = function(a, b, c, d, e, f, k, l, m) {
        switch (k.tagName) {
        case "b":
            l.bold = !0;
            break;
        case "i":
            l.vf = !0;
            break;
        case "u":
            l.underline = !0
        }
        for (var n = 0; n < k.childNodes.length; n++) {
            var p = k.childNodes[n];
            if (3 == p.nodeType)
                p = new z4(b,c,d,e.id,p.nodeValue,f || 0 < n,g.$b(l) ? void 0 : l),
                m.push(p),
                e.A.push(p);
            else {
                var r = {};
                g.Ga(r, l);
                rCa(a, b, c, d, e, !0, p, r, m)
            }
        }
    }
      , h5 = function(a) {
        var b = 0;
        a = g.q(a.split(":"));
        for (var c = a.next(); !c.done; c = a.next())
            b = 60 * b + (0,
            window.parseFloat)(c.value);
        return 1E3 * b
    }
      , sCa = function(a, b, c, d) {
        d = Object.assign({
            fu: 0
        }, d);
        return new A4(a,b,c,"_" + B4++,d)
    }
      , i5 = function(a) {
        g.M.call(this);
        this.zA = !!a;
        this.A = new qCa;
        this.G = [];
        this.o = null
    }
      , uCa = function(a) {
        var b = {};
        if (a = y4(a))
            b.lang = a,
            tCa.test(a) && (b.Xk = 1);
        return b
    }
      , vCa = function(a, b, c, d, e) {
        d = d || 0;
        e = e || 0;
        if (!g.w(b)) {
            var f = new window.DataView(b);
            if (1718909296 == f.getUint32(4) && (f = g.AK(f, 1835295092),
            b = b.slice(f.dataOffset, f.dataOffset + f.size),
            !pCa(b) && (b = g.me(new window.Uint8Array(b)),
            !b)))
                return []
        }
        if (g.w(b)) {
            if ("WEBVTT" == b.substring(0, 6))
                return a.o || (a.o = new g5),
                a.o.B(b, d);
            b = g.ks(b);
            if (!b || !b.firstChild)
                return [];
            if (!a.o)
                if ("timedtext" == b.firstChild.tagName)
                    3 == (0,
                    window.parseInt)(b.firstChild.getAttribute("format"), 10) ? a.o = new W4(uCa(c)) : a.o = new V4;
                else
                    try {
                        return a.o = new T4(uCa(c)),
                        a.o.B(b, d)
                    } catch (k) {
                        return g.iE(k),
                        a.o = null,
                        []
                    }
            return a.o.B(b, d)
        }
        try {
            if (pCa(b))
                return a.o || (a.o = new d5(e,c)),
                a.o.B(b, d)
        } catch (k) {
            g.iE(k),
            a.o = null
        }
        return []
    }
      , j5 = function(a) {
        i5.call(this, a.Vn);
        this.C = void 0;
        this.B = null;
        this.G = a.captionTranslationLanguages
    }
      , k5 = function() {
        this.ub = []
    }
      , l5 = function(a, b, c, d, e, f) {
        g.M.call(this);
        this.L = a;
        this.C = b;
        this.F = new k5;
        this.o = null;
        this.J = d;
        this.M = f;
        this.B = this.A = null;
        this.H = c;
        this.G = e || !1;
        this.K = new g.ou(this.TA,1E3,this);
        g.N(this, this.K);
        this.D = new g.VF(this);
        g.N(this, this.D);
        this.D.R(b, "seekto", this.ZB);
        this.ZB(b.getCurrentTime());
        this.TA()
    }
      , wCa = function(a, b) {
        var c = a.o;
        a.o = g.Ja(a.H.Ig(b).o);
        c != a.o && a.M && a.M()
    }
      , xCa = function(a, b) {
        var c = g.UL(b, a.L, {}).Wa()
          , d = {
            format: "RAW",
            withCredentials: !0
        };
        a.G && (d.responseType = "arraybuffer");
        a.B = g.aF(c, d, 3, 100).then((0,
        g.A)(a.uU, a));
        a.A = b;
        c = a.F;
        d = a.A.o[0].ya;
        var e = g.eb(c.ub, d);
        0 <= e || 0 > e && 1 == (-e - 1) % 2 || (e = -e - 1,
        0 < e && 1 == d - c.ub[e - 1] && e < c.ub.length && 1 == c.ub[e] - d ? (g.Ta(c.ub, e),
        g.Ta(c.ub, e - 1)) : 0 < e && 1 == d - c.ub[e - 1] ? c.ub[e - 1] = d : e < c.ub.length && 1 == c.ub[e] - d ? c.ub[e] = d : (g.ab(c.ub, e, 0, d),
        g.ab(c.ub, e + 1, 0, d)))
    }
      , m5 = function(a, b) {
        i5.call(this);
        this.B = a;
        this.C = b;
        this.D = null;
        this.F = !1
    }
      , yCa = function(a, b) {
        if (b in a.B.o)
            return a.B.o[b];
        if (g.vM(a.B))
            for (var c in a.B.o) {
                var d = a.B.o[c];
                if (g.tI(d.info.mimeType) && ("386" != c || !g.Y(a.C).experiments.o("html5_manifestless_captions_fmt3_killswitch")))
                    return d
            }
        return null
    }
      , n5 = function(a, b) {
        return a.Ba && null != a.pa || g.Y(b).Ma && null != a.pa && null != a.pa.o.rawcc
    }
      , o5 = function(a, b, c, d, e, f) {
        D4.call(this, a, b, c, d, e, f);
        this.type = 1
    }
      , p5 = function(a, b, c, d, e, f) {
        D4.call(this, a, b, c, d, e, f);
        g.T(this.element, "ytp-caption-window-rollup");
        this.type = 2;
        this.L = this.T = 0;
        this.Z = this.K = window.NaN;
        this.sa = null;
        this.da = new g.ou(this.zU,433,this);
        g.N(this, this.da)
    }
      , q5 = function(a) {
        if (!a.T) {
            var b = g.Md("SPAN");
            g.Ch(b, E4(a, a.A.ob));
            a.C.appendChild(b);
            b.appendChild(g.Od("M"));
            var c = b.offsetHeight
              , d = g.Md("BR");
            b.appendChild(d);
            b.appendChild(g.Od("M"));
            a.T = b.offsetHeight - c;
            a.C.removeChild(b)
        }
        return a.T
    }
      , zCa = function(a) {
        if ((0,
        window.isNaN)(a.K)) {
            var b = a.A.Rr;
            if (b) {
                var c = g.Md("SPAN");
                g.ae(c, "\u2013".repeat(b));
                g.Ch(c, E4(a, a.A.ob));
                a.C.appendChild(c);
                a.K = c.offsetWidth;
                a.C.removeChild(c)
            } else
                a.K = 0
        }
        return a.K
    }
      , r5 = function(a, b, c, d) {
        i5.call(this, d);
        c = c || g.uE(a).hl || "";
        c = c.split("_").join("-");
        this.D = g.wE(a, {
            hl: c
        });
        this.C = b;
        this.F = {};
        this.B = null
    }
      , u5 = function(a) {
        g.GU.call(this, a);
        this.C = g.Y(a);
        this.B = a.getVideoData();
        this.oa = g.hU(a);
        this.K = a;
        var b = null
          , c = g.FD("yt-html5-player-modules::subtitlesModuleData");
        c && (b = new g.oD(c));
        this.aa = b;
        this.F = {
            ob: {}
        };
        this.H = {
            ob: {}
        };
        this.O = [];
        this.T = {};
        this.ba = {};
        this.M = !1;
        this.sa = "1" == this.B.qc.cc_auto_caps || "1" == this.C.Bc.cc_auto_caps;
        b = "3" == this.C.C && !!g.AU(a) && g.AU(a).an();
        this.G = (c = !this.C.experiments.o("web_player_native_controls_live_captions_fix_killswitch")) ? b && !this.B.Ba : b;
        this.ia = c && b && this.B.Ba && n5(this.B, this.K);
        c = b = this.A = this.D = this.J = this.L = this.Z = this.ka = null;
        this.G || (b = new g.lu(this.EF,void 0,this),
        g.N(this, b),
        c = new g.ou(this.jW,2E3,this),
        g.N(this, c));
        this.da = b;
        this.ha = c;
        this.Y = new g.VF(this);
        g.N(this, this.Y);
        this.G || this.Y.R(a, "resize", this.ew);
        this.Y.R(a, "onPlaybackAudioChange", this.sR);
        this.Y.R(a, "crn_captions", this.EN, this);
        this.Y.R(a, "crx_captions", this.FN, this);
        s5(this, t5(this, "display-settings") || {})
    }
      , ACa = function(a) {
        if (1 == a.C.mh || 1 == a.B.mh || "alwayson" == g.JP(a.B, "yt:cc"))
            return !0;
        if (2 == a.C.mh) {
            var b = t5(a, "module-enabled");
            if (null != b)
                return !!b
        }
        if (a.B.captionTracks.length)
            var c = a.o.getAudioTrack().Kr;
        return "ON" == c || "on" == g.JP(a.B, "yt:cc")
    }
      , v5 = function(a, b) {
        if (a.A && (void 0 === b || !b) || !a.B.captionTracks.length)
            return !1;
        var c = a.o.getAudioTrack();
        return !!c.wo || "FORCED_ON" == c.Kr
    }
      , x5 = function(a, b) {
        if (a.D) {
            var c = e5(a.D.A, b || a.sa);
            if (a.J && a.J.o)
                return a.J.o;
            for (var d = [a.B.lh, a.C.lh, g.JP(a.B, "yt:cc_default_lang")], e = 0; e < d.length; e++)
                for (var f = 0; f < c.length; f++)
                    if (y4(c[f]) == d[e])
                        return c[f];
            return a.J && a.J.es ? a.J.es : (d = c.find(function(a) {
                return a.isDefault
            })) ? d : c[0] || w5(a)
        }
        return null
    }
      , w5 = function(a) {
        return a.J && a.J.wo
    }
      , BCa = function(a, b) {
        for (var c = g.AU(a.K).na().textTracks, d = a.A.toString(), e = 0; e < c.length; e++) {
            var f = c[e];
            f.id == d && (b ? "showing" != f.mode && (f.mode = "showing") : "showing" == f.mode && (f.mode = "disabled"))
        }
    }
      , z5 = function(a, b, c, d) {
        a.loaded && a.unload();
        null != c && (a.M = c,
        a.M && y5(a, "module-enabled", !!b));
        a.A = b;
        v5(a) && (a.A = w5(a));
        a.load(d)
    }
      , CCa = function(a) {
        if (a.A != w5(a)) {
            if (a.M && !g.zN(a.C) && !g.GN(a.C)) {
                g.ru(a.ha);
                var b = C4({
                    Mf: 0,
                    Xe: 5,
                    rg: 5,
                    oq: 2,
                    textAlign: 0,
                    Xk: 0,
                    lang: "en"
                });
                a.Z = [b];
                var c = ["Click ", " for settings"];
                if (!a.ka) {
                    var d = new g.FH(g.zra());
                    g.N(a, d);
                    a.ka = d.element
                }
                d = b.end - b.start;
                var e = g.cI(a.A);
                e && a.Z.push(new z4(b.start,d,0,b.id,e));
                a.Z.push(new z4(b.start,d,0,b.id,c[0]), new z4(b.start,d,0,b.id,a.ka,!0), new z4(b.start,d,0,b.id,c[1],!0));
                g.uU(a.o, a.Z);
                g.pu(a.ha)
            }
            if (a.M || g.zN(a.C))
                y5(a, "module-enabled", !0),
                a.J && (a.J.o = a.A);
            (a = g.fU(a.o.app)) && a.F && g.aQ(a.F.B)
        }
    }
      , DCa = function(a, b) {
        var c = g.m_(a.oa, !0).height;
        if (!c)
            return null;
        var d = a.oa.Sa();
        switch (null != b.params.fu ? b.params.fu : b.params.XW ? 2 : 1 < b.A.length ? 1 : 0) {
        case 1:
            return new o5(b,a.F,a.H,c,d.width,d.height);
        case 2:
            return new p5(b,a.F,a.H,c,d.width,d.height);
        default:
            return new D4(b,a.F,a.H,c,d.width,d.height)
        }
    }
      , s5 = function(a, b, c) {
        var d = A5.ob;
        a.F = {};
        g.Ga(a.F, A5);
        a.F.ob = {};
        g.Ga(a.F.ob, d);
        a.H = {
            ob: {}
        };
        var e = b.backgroundOverride ? a.H : a.F
          , f = b.background || d.background;
        U4.test(f);
        e.ob.background = f;
        e = b.colorOverride ? a.H : a.F;
        f = b.color || d.color;
        U4.test(f);
        e.ob.color = f;
        e = b.windowColorOverride ? a.H : a.F;
        f = b.windowColor || A5.windowColor;
        U4.test(f);
        e.windowColor = f;
        e = b.backgroundOpacityOverride ? a.H : a.F;
        f = b.backgroundOpacity;
        null == f && (f = d.backgroundOpacity);
        e.ob.backgroundOpacity = f;
        e = b.fontSizeIncrementOverride ? a.H : a.F;
        f = b.fontSizeIncrement;
        null == f && (f = d.fontSizeIncrement);
        e.ob.fontSizeIncrement = f;
        f = b.fontStyleOverride ? a.H : a.F;
        e = b.fontStyle;
        null == e && (e = d.bold && d.vf ? 3 : d.bold ? 1 : d.vf ? 2 : 0);
        f = f.ob;
        switch (e) {
        case 1:
            f.bold = !0;
            delete f.vf;
            break;
        case 2:
            delete f.bold;
            f.vf = !0;
            break;
        case 3:
            f.bold = !0;
            f.vf = !0;
            break;
        default:
            delete f.bold,
            delete f.vf
        }
        e = b.textOpacityOverride ? a.H : a.F;
        f = b.textOpacity;
        null == f && (f = d.textOpacity);
        e.ob.textOpacity = f;
        e = b.windowOpacityOverride ? a.H : a.F;
        f = b.windowOpacity;
        null == f && (f = A5.windowOpacity);
        e.windowOpacity = f;
        e = b.charEdgeStyleOverride ? a.H : a.F;
        f = b.charEdgeStyle;
        null == f && (f = d.charEdgeStyle);
        e.ob.charEdgeStyle = f;
        e = b.fontFamilyOverride ? a.H : a.F;
        f = b.fontFamily;
        null == f && (f = d.fontFamily);
        e.ob.fontFamily = f;
        a.loaded && a.ew();
        c && y5(a, "display-settings", b)
    }
      , FCa = function(a, b) {
        if (b && !a.L) {
            var c = C4({
                Xk: 0,
                lang: "en"
            });
            a.L = [c, new z4(c.start,c.end - c.start,0,c.id,"Captions look like this")];
            g.uU(a.o, a.L)
        } else
            !b && a.L && (ECa(a, a.L),
            a.L = null)
    }
      , ECa = function(a, b) {
        g.wU(a.o, b);
        (0,
        g.C)(b, function(a) {
            g.Ua(this.O, a)
        }, a);
        a.da.Wj()
    }
      , GCa = function(a, b) {
        return a && g.w(a) && U4.test(a) ? a : b
    }
      , HCa = function(a, b) {
        return g.ta(a) && !(0,
        window.isNaN)(a) ? Math.max(0, Math.min(1, (0,
        window.parseFloat)(a))) : b
    }
      , ICa = function(a, b) {
        return g.ta(a) && !(0,
        window.isNaN)(a) ? g.ld(a, -2, 4) : b
    }
      , t5 = function(a, b) {
        if (!a.aa)
            return null;
        try {
            var c = a.aa.get(b)
        } catch (d) {
            a.aa.remove(b)
        }
        return c
    }
      , y5 = function(a, b, c) {
        if (a.aa)
            try {
                a.aa.set(b, c)
            } catch (d) {}
    };
    g.AX.prototype.Fj = g.ca(9, function() {
        for (var a = g.zd(window.document, "track", void 0, this.o), b = 0; b < a.length; b++)
            g.Td(a[b])
    });
    g.a_.prototype.Fj = g.ca(8, function() {
        this.o.Fj()
    });
    g.AX.prototype.an = g.ca(7, function() {
        return !!this.o.textTracks
    });
    g.a_.prototype.an = g.ca(6, function() {
        return this.o.an()
    });
    g.AX.prototype.ql = g.ca(5, function(a) {
        for (var b = 0; b < a.length; b++)
            this.o.appendChild(a[b])
    });
    g.a_.prototype.ql = g.ca(4, function(a) {
        this.o.ql(a)
    });
    g.hK.prototype.Ho = g.ca(2, function(a) {
        return (a = this.qh(a)) ? a.A : 0
    });
    g.lM.prototype.Ho = g.ca(1, function() {
        return 0
    });
    g.bI.prototype.K = g.ca(0, function(a) {
        return a ? this.toString() == a.toString() : !1
    });
    var tCa = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Arab|Hebr|Thaa|Nkoo|Tfng))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i
      , U4 = /^#(?:[0-9a-f]{3}){1,2}$/i;
    var UBa = ["left", "right", "center"];
    var A5 = {
        windowColor: "#080808",
        windowOpacity: 0,
        textAlign: 2,
        Mf: 7,
        Xe: 50,
        rg: 100,
        ob: {
            background: "#080808",
            backgroundOpacity: .75,
            charEdgeStyle: 0,
            color: "#fff",
            fontFamily: 4,
            fontSizeIncrement: 0,
            textOpacity: 1,
            offset: 1
        }
    };
    g.t(z4, g.PQ);
    g.t(A4, g.PQ);
    var B4 = 0;
    g.t(D4, g.W);
    g.h = D4.prototype;
    g.h.EP = function(a, b) {
        var c = g.Th(this.element, this.element.parentElement);
        this.ha = a - c.x;
        this.ia = b - c.y;
        g.T(this.element, "ytp-dragging")
    }
    ;
    g.h.DP = function(a, b) {
        var c = g.Wh(this.element)
          , d = a - this.ha - .02 * this.Ca
          , e = b - this.ia - .02 * this.za
          , f = (d + c.width / 2) / this.aa * 3;
        f = Math.floor(g.ld(f, 0, 2));
        var k = (e + c.height / 2) / this.ka * 3;
        k = Math.floor(g.ld(k, 0, 2));
        var l = f + 3 * k;
        d = (d + f / 2 * c.width) / this.aa;
        d = 100 * g.ld(d, 0, 1);
        c = (e + k / 2 * c.height) / this.ka;
        c = 100 * g.ld(c, 0, 1);
        this.H.params.Mf = l;
        this.H.params.rg = c;
        this.H.params.Xe = d;
        this.A.Mf = l;
        this.A.rg = c;
        this.A.Xe = d;
        this.uE()
    }
    ;
    g.h.CP = function() {
        g.Cq(this.element, "ytp-dragging")
    }
    ;
    g.h.uE = function() {
        this.kj(this.D)
    }
    ;
    g.h.Wb = function() {
        return this.type
    }
    ;
    g.h.kj = function(a) {
        var b = Math.min(this.Bz(), this.aa)
          , c = this.Az();
        g.Ch(this.element, {
            top: 0,
            left: 0,
            right: "",
            bottom: "",
            width: b ? b + "px" : "",
            height: c ? c + "px" : "",
            "max-width": "96%",
            "max-height": "96%",
            margin: "",
            transform: ""
        });
        this.Br(a);
        a = {
            transform: "",
            top: "",
            left: "",
            width: b ? b + "px" : "",
            height: c ? c + "px" : "",
            "max-width": "",
            "max-height": ""
        };
        var d = .96 * this.A.Xe + 2
          , e = this.A.Mf;
        switch (e) {
        case 0:
        case 3:
        case 6:
            a.left = d + "%";
            break;
        case 1:
        case 4:
        case 7:
            a.left = d + "%";
            d = this.C.offsetWidth;
            b || d ? (b = b || d + 1,
            a.width = b + "px",
            a["margin-left"] = b / -2 + "px") : a.transform += " translateX(-50%)";
            break;
        case 2:
        case 5:
        case 8:
            a.right = 100 - d + "%"
        }
        b = .96 * this.A.rg + 2;
        switch (e) {
        case 0:
        case 1:
        case 2:
            a.top = b + "%";
            break;
        case 3:
        case 4:
        case 5:
            a.top = b + "%";
            (c = c || this.element.clientHeight) ? (a.height = c + "px",
            a["margin-top"] = c / -2 + "px") : a.transform += " translateY(-50%)";
            break;
        case 6:
        case 7:
        case 8:
            a.bottom = 100 - b + "%"
        }
        g.Ch(this.element, a)
    }
    ;
    g.h.Br = function(a) {
        var b;
        for (b = 0; b < a.length && a[b] == this.D[b]; b++)
            ;
        if (this.M || this.D.length > b)
            b = 0,
            this.M = !1,
            this.D = [],
            this.G = [],
            this.J = [],
            this.F = null,
            g.Rd(this.C);
        for (; b < a.length; b++)
            VBa(this, a[b])
    }
    ;
    g.h.Bz = function() {
        return 0
    }
    ;
    g.h.Az = function() {
        return 0
    }
    ;
    WBa.prototype.D = function() {}
    ;
    G4.prototype.clear = function() {
        this.C = this.A = this.mode = 0;
        this.o = [];
        this.reset()
    }
    ;
    G4.prototype.reset = function() {
        this.mode = 0;
        this.D.reset(0);
        this.F.reset(1)
    }
    ;
    var XBa = [128, 1, 2, 131, 4, 133, 134, 7, 8, 137, 138, 11, 140, 13, 14, 143, 16, 145, 146, 19, 148, 21, 22, 151, 152, 25, 26, 155, 28, 157, 158, 31, 32, 161, 162, 35, 164, 37, 38, 167, 168, 41, 42, 171, 44, 173, 174, 47, 176, 49, 50, 179, 52, 181, 182, 55, 56, 185, 186, 59, 188, 61, 62, 191, 64, 193, 194, 67, 196, 69, 70, 199, 200, 73, 74, 203, 76, 205, 206, 79, 208, 81, 82, 211, 84, 213, 214, 87, 88, 217, 218, 91, 220, 93, 94, 223, 224, 97, 98, 227, 100, 229, 230, 103, 104, 233, 234, 107, 236, 109, 110, 239, 112, 241, 242, 115, 244, 117, 118, 247, 248, 121, 122, 251, 124, 253, 254, 127, 0, 129, 130, 3, 132, 5, 6, 135, 136, 9, 10, 139, 12, 141, 142, 15, 144, 17, 18, 147, 20, 149, 150, 23, 24, 153, 154, 27, 156, 29, 30, 159, 160, 33, 34, 163, 36, 165, 166, 39, 40, 169, 170, 43, 172, 45, 46, 175, 48, 177, 178, 51, 180, 53, 54, 183, 184, 57, 58, 187, 60, 189, 190, 63, 192, 65, 66, 195, 68, 197, 198, 71, 72, 201, 202, 75, 204, 77, 78, 207, 80, 209, 210, 83, 212, 85, 86, 215, 216, 89, 90, 219, 92, 221, 222, 95, 96, 225, 226, 99, 228, 101, 102, 231, 232, 105, 106, 235, 108, 237, 238, 111, 240, 113, 114, 243, 116, 245, 246, 119, 120, 249, 250, 123, 252, 125, 126, 255];
    H4.prototype.set = function(a) {
        this.o = a
    }
    ;
    H4.prototype.get = function() {
        return this.o
    }
    ;
    I4.prototype.clear = function() {
        this.o = 0
    }
    ;
    I4.prototype.update = function() {
        this.o = 2 == this.o ? 1 : 0
    }
    ;
    I4.prototype.matches = function(a, b) {
        return 0 != this.o && a == this.B && b == this.A
    }
    ;
    J4.prototype.fo = function(a) {
        this.Ee = a.Ee;
        this.timestamp = a.timestamp
    }
    ;
    J4.prototype.reset = function() {
        this.timestamp = this.Ee = 0
    }
    ;
    K4.prototype.debugString = function() {
        for (var a = "\n", b = 1; 15 >= b; ++b) {
            for (var c = 1; 32 >= c; ++c) {
                var d = this.B[b][c];
                a = 0 == d.Ee ? a + "_" : a + String.fromCharCode(d.Ee)
            }
            a += "\n"
        }
        return a
    }
    ;
    K4.prototype.reset = function(a) {
        for (var b = 0; 15 >= b; b++)
            for (var c = 0; 32 >= c; c++)
                this.B[b][c].reset();
        this.C = a;
        this.o = 0;
        this.A = this.row = 1
    }
    ;
    var bCa = [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 225, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 233, 93, 237, 243, 250, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 231, 247, 209, 241, 9632]
      , cCa = [174, 176, 189, 191, 8482, 162, 163, 9834, 224, 32, 232, 226, 234, 238, 244, 251]
      , dCa = [193, 201, 211, 218, 220, 252, 8216, 161, 42, 39, 9473, 169, 8480, 183, 8220, 8221, 192, 194, 199, 200, 202, 203, 235, 206, 207, 239, 212, 217, 249, 219, 171, 187]
      , eCa = [195, 227, 205, 204, 236, 210, 242, 213, 245, 123, 125, 92, 94, 95, 124, 126, 196, 228, 214, 246, 223, 165, 164, 9475, 197, 229, 216, 248, 9487, 9491, 9495, 9499];
    Q4.prototype.reset = function(a, b) {
        this.D = b;
        this.style.set(2);
        this.A = this.F;
        this.B = this.G;
        this.o = this.A;
        var c = (a << 2) + (b << 1);
        this.F.reset(c);
        this.G.reset(c);
        this.H.reset((a << 2) + (b << 1) + 1)
    }
    ;
    F4.prototype.reset = function(a) {
        this.D = a;
        this.o.clear();
        this.C = this.B;
        this.B.reset(a, 0);
        this.F.reset(a, 1)
    }
    ;
    S4.prototype.reset = function() {}
    ;
    g.t(T4, S4);
    T4.prototype.B = function(a) {
        var b = [];
        this.o || (this.o = C4(this.A),
        b.push(this.o));
        a = Array.from(a.firstChild.childNodes);
        a = g.q(a);
        for (var c = a.next(); !c.done; c = a.next())
            kCa(c.value, this.o.id, b);
        return b
    }
    ;
    g.t(V4, S4);
    V4.prototype.B = function(a) {
        var b = [];
        this.o || (this.o = C4(),
        this.A[this.o.id] = this.o,
        b.push(this.o));
        for (a = a.firstChild.firstChild; a; ) {
            switch (a.tagName) {
            case "window":
                var c = a
                  , d = c.getAttribute("id");
                a: {
                    var e = c
                      , f = this.A[d];
                    if (e.getAttribute("t") || e.getAttribute("start")) {
                        c = e.getAttribute("start") ? 1E3 * (0,
                        window.parseFloat)(e.getAttribute("start")) : (0,
                        window.parseInt)(e.getAttribute("t"), 10);
                        f && (f.end >= c ? f.end = c : f = null);
                        switch (e.getAttribute("op")) {
                        case "kill":
                            c = null;
                            break a;
                        case "define":
                            f = null
                        }
                        f || (f = C4());
                        var k = {};
                        f && (g.Ga(k, f.params),
                        f = f.params.ob) && (k.ob = {},
                        g.Ga(k.ob, f));
                        e.getAttribute("rc") && (k.oq = (0,
                        window.parseInt)(e.getAttribute("rc"), 10));
                        e.getAttribute("cc") && (k.Rr = (0,
                        window.parseInt)(e.getAttribute("cc"), 10));
                        e.getAttribute("ap") && (f = (0,
                        window.parseInt)(e.getAttribute("ap"), 10),
                        k.Mf = 0 > f || 8 < f ? 7 : f);
                        e.getAttribute("ah") && (k.Xe = (0,
                        window.parseInt)(e.getAttribute("ah"), 10));
                        e.getAttribute("av") && (k.rg = (0,
                        window.parseInt)(e.getAttribute("av"), 10));
                        e.getAttribute("vs") && (k.isVisible = !!e.getAttribute("vs"));
                        e.getAttribute("ju") && (k.textAlign = (0,
                        window.parseInt)(e.getAttribute("ju"), 10));
                        e.getAttribute("pd") && (k.Xk = 1,
                        0 == (0,
                        window.parseInt)(e.getAttribute("pd"), 10) && (k.Xk = 0));
                        e.getAttribute("bc") && (k.ob || (k.ob = {}),
                        k.ob.backgroundColor = e.getAttribute("bc"));
                        e.getAttribute("bo") && (k.ob || (k.ob = {}),
                        k.ob.backgroundOpacity = (0,
                        window.parseInt)(e.getAttribute("bo"), 10) / 100);
                        e.getAttribute("fc") && (k.ob || (k.ob = {}),
                        k.ob.color = e.getAttribute("fc"));
                        e.getAttribute("sd") && (k.XW = (0,
                        window.parseInt)(e.getAttribute("sd"), 10));
                        f = (0,
                        window.parseInt)(e.getAttribute("d"), 10) || 1E3 * (0,
                        window.parseFloat)(e.getAttribute("dur")) || 0x8000000000000;
                        e = e.getAttribute("id") || "_" + B4++;
                        c = new A4(c,f,0,e,k)
                    } else
                        c = null
                }
                this.A[d] = c;
                b.push(c);
                break;
            case "text":
                for (d = [],
                kCa(a, this.o.id, d),
                d = g.q(d),
                c = d.next(); !c.done; c = d.next())
                    c = c.value,
                    this.A[c.windowId] && b.push(c)
            }
            a = a.nextSibling
        }
        return b
    }
    ;
    g.t(W4, S4);
    W4.prototype.reset = function() {
        this.H = {};
        this.A = this.o = null;
        this.G = !0
    }
    ;
    W4.prototype.B = function(a, b) {
        a.firstChild.getAttribute("format");
        b = b || 0;
        Number.isFinite(b);
        var c = Array.from(a.firstChild.childNodes);
        c = g.q(c);
        for (var d = c.next(); !d.done; d = c.next())
            if (d = d.value,
            1 == d.nodeType)
                switch (d.tagName) {
                case "head":
                    var e = d;
                    break;
                case "body":
                    var f = d
                }
        if (e)
            for (e = Array.from(e.childNodes),
            e = g.q(e),
            c = e.next(); !c.done; c = e.next())
                if (c = c.value,
                1 == c.nodeType)
                    switch (c.tagName) {
                    case "pen":
                        d = c.getAttribute("id");
                        var k = this.C
                          , l = {}
                          , m = c.getAttribute("p");
                        m && g.Ga(l, this.C[m]);
                        m = Y4(c, "b");
                        null != m && (l.bold = m);
                        m = Y4(c, "i");
                        null != m && (l.vf = m);
                        m = Y4(c, "u");
                        null != m && (l.underline = m);
                        m = Z4(c, "et");
                        null != m && (l.charEdgeStyle = m);
                        m = Z4(c, "of");
                        null != m && (l.offset = m);
                        m = $4(c, "bc");
                        null != m && (l.background = m);
                        m = $4(c, "ec");
                        null != m && (l.uy = m);
                        m = $4(c, "fc");
                        null != m && (l.color = m);
                        m = Z4(c, "fs");
                        void 0 != m && 0 != m && (l.fontFamily = m);
                        m = X4(c, "sz");
                        void 0 != m && (l.fontSizeIncrement = m / 100 - 1);
                        m = X4(c, "bo");
                        void 0 != m && (l.backgroundOpacity = m / 255);
                        c = X4(c, "fo");
                        void 0 != c && (l.textOpacity = c / 255);
                        k[d] = l;
                        break;
                    case "ws":
                        d = c.getAttribute("id");
                        this.K[d] = lCa(this, c);
                        break;
                    case "wp":
                        d = c.getAttribute("id"),
                        this.J[d] = mCa(this, c)
                    }
        if (f) {
            e = b;
            c = [];
            f = Array.from(f.childNodes);
            f = g.q(f);
            for (d = f.next(); !d.done; d = f.next())
                if (d = d.value,
                1 == d.nodeType)
                    switch (d.tagName) {
                    case "w":
                        this.o = nCa(this, d, e, !1);
                        (d = this.H[this.o.id]) && d.end > this.o.start && (d.end = this.o.start);
                        this.H[this.o.id] = this.o;
                        c.push(this.o);
                        break;
                    case "p":
                        var n = e;
                        k = [];
                        l = d.getAttribute("w") || this.D;
                        m = !!Y4(d, "a");
                        n = (X4(d, "t") || 0) + n;
                        var p = X4(d, "d") || 5E3;
                        m || (!this.G && this.A && this.A.windowId == l && this.A.end > n && (this.A.end = n),
                        this.A && "\n" == this.A.text && (this.A.text = ""));
                        var r = m ? 6 : 5
                          , v = this.C[d.getAttribute("p")]
                          , D = d.childNodes;
                        D.length && (this.G = null != d.getAttribute("d"));
                        for (var H = 0; H < D.length; H++) {
                            var L = D[H];
                            0 < H && (m = !0);
                            var S = void 0;
                            1 == L.nodeType && (S = L);
                            if (S && "s" == S.tagName) {
                                var ha = S;
                                L = n;
                                S = p;
                                var Za = l
                                  , jb = m
                                  , $c = r
                                  , Bf = ha.textContent ? ha.textContent : ""
                                  , nb = this.C[ha.getAttribute("p")];
                                ha = X4(ha, "t") || 0;
                                L = new z4(L + ha,S - ha,$c,Za,Bf,jb,nb)
                            } else
                                L = new z4(n,p,r,l,L.textContent || "",m,v);
                            k.push(L);
                            this.A = L
                        }
                        if (0 < k.length)
                            for (k[0].windowId == this.D && (this.o = nCa(this, d, e, !0),
                            c.push(this.o)),
                            d = g.q(k),
                            k = d.next(); !k.done; k = d.next())
                                k = k.value,
                                k.windowId = this.o.id,
                                this.o.A.push(k),
                                c.push(k)
                    }
            e = c
        } else
            e = [];
        return e
    }
    ;
    g.t(a5, WBa);
    a5.prototype.D = function(a, b, c, d, e) {
        if (c < d) {
            var f = "_" + B4++;
            c = c / 1E3 - this.G;
            d = d / 1E3 - this.G;
            a = new A4(c,d - c,5,f,{
                textAlign: 0,
                Mf: 0,
                Xe: 2.5 * b,
                rg: 5.33 * a
            });
            e = new z4(c,d - c,5,f,e);
            this.B.push(a);
            this.B.push(e)
        }
    }
    ;
    g.t(d5, S4);
    d5.prototype.B = function(a) {
        a = new a5(a,a.byteLength,this.A);
        if (oCa(a)) {
            for (; a.o < a.A.byteLength; )
                for (0 == a.version ? a.C = c5(a) * (1E3 / 45) : 1 == a.version && (a.C = 4294967296 * c5(a) + c5(a)),
                a.F = b5(a); 0 < a.F; a.F--) {
                    var b = b5(a)
                      , c = b5(a)
                      , d = b5(a);
                    b & 4 && (b & 3) == this.track && (0 == this.track || 1 == this.track) && (b = this.o,
                    b.o.push({
                        time: a.C,
                        type: this.track,
                        my: c,
                        oy: d,
                        order: b.o.length
                    }))
                }
            aCa(this.o, a);
            return a.B
        }
        return []
    }
    ;
    d5.prototype.reset = function() {
        this.o.clear()
    }
    ;
    g.t(g5, S4);
    g5.prototype.B = function(a, b) {
        for (var c = [], d = a.split(JCa), e = 1; e < d.length; e++) {
            var f = d[e]
              , k = b;
            if ("" != f && !KCa.test(f)) {
                var l = B5.exec(f);
                if (l && 4 <= l.length) {
                    var m = h5(l[1])
                      , n = h5(l[2]) - m;
                    m += k;
                    var p, r = p = void 0, v = void 0, D = void 0, H = l[3];
                    l = {
                        textAlign: 2
                    };
                    H = g.q(H ? H.split(" ") : []);
                    for (var L = H.next(); !L.done; L = H.next())
                        if (L = L.value.split(":"),
                        2 == L.length) {
                            var S = L[1];
                            switch (L[0]) {
                            case "line":
                                L = S.split(",");
                                L[0].endsWith("%") && (D = L[0],
                                l.rg = Number.parseInt(D, 10),
                                2 == L.length && (v = L[1].trim()));
                                break;
                            case "position":
                                L = S.split(",");
                                r = L[0];
                                l.Xe = Number.parseInt(r, 10);
                                2 == L.length && (p = L[1].trim());
                                break;
                            case "align":
                                switch (S) {
                                case "start":
                                    l.textAlign = 0;
                                    break;
                                case "middle":
                                    l.textAlign = 2;
                                    break;
                                case "end":
                                    l.textAlign = 1
                                }
                            }
                        }
                    D || (l.rg = 100,
                    v || (v = "end"));
                    if (!r)
                        switch (l.textAlign) {
                        case 0:
                            l.Xe = 0;
                            break;
                        case 1:
                            l.Xe = 100;
                            break;
                        default:
                            l.Xe = 50
                        }
                    r = 0;
                    switch (v) {
                    case "center":
                        r += 3;
                        break;
                    case "end":
                        r += 6;
                        break;
                    default:
                        r += 0
                    }
                    switch (p) {
                    case "line-left":
                        r += 0;
                        break;
                    case "center":
                        r += 1;
                        break;
                    case "line-right":
                        r += 2;
                        break;
                    default:
                        switch (l.textAlign) {
                        case 0:
                            r += 0;
                            break;
                        case 2:
                            r += 1;
                            break;
                        case 1:
                            r += 2
                        }
                    }
                    l.Mf = 0 > r || 8 < r ? 7 : r;
                    p = l;
                    f = f.substring(B5.lastIndex).replace(/[\x01-\x09\x0b-\x1f]/g, "");
                    r = p;
                    p = f;
                    f = {};
                    if (0 > p.indexOf("<") && 0 > p.indexOf("&"))
                        k = sCa(m, n, 5, r),
                        n = new z4(m,n,5,k.id,p,!1,g.$b(f) ? void 0 : f),
                        c.push(k),
                        c.push(n),
                        k.A.push(n);
                    else
                        for (v = p.split(LCa),
                        1 == v.length ? (p = 5,
                        r = sCa(m, n, p, r)) : (D = p = 6,
                        r = Object.assign({
                            Rr: 32
                        }, r),
                        r = new A4(m,n,D,"_" + B4++,r)),
                        c.push(r),
                        D = m,
                        l = 0; l < v.length; l++)
                            H = v[l],
                            0 == l % 2 ? (L = g.ks("<html>" + H + "</html>"),
                            L.getElementsByTagName("parsererror").length ? (S = L.createElement("span"),
                            S.appendChild(L.createTextNode(H))) : S = L.firstChild,
                            rCa(this, D, n - (D - m), p, r, 0 < l, S, f, c)) : D = h5(H) + k
                }
                B5.lastIndex = 0
            }
        }
        return c
    }
    ;
    var KCa = /^NOTE/
      , JCa = /(?:\r\n|\r|\n){2,}/
      , B5 = RegExp("^((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})[\\t ]+--\x3e[\\t ]+((?:[\\d]{2}:)?[\\d]{2}:[\\d]{2}\\.[\\d]{3})(?:[\\t ]*)(.*)(?:\\r\\n|\\r|\\n)", "gm")
      , LCa = /<((?:[\d]{2}:)?[\d]{2}:[\d]{2}\.[\d]{3})>/;
    g.t(i5, g.M);
    i5.prototype.trackCount = function() {
        return e5(this.A, !0).length
    }
    ;
    i5.prototype.Xd = function() {
        this.o = null
    }
    ;
    i5.prototype.X = function() {
        g.M.prototype.X.call(this);
        this.Xd()
    }
    ;
    i5.prototype.bE = function() {
        return !1
    }
    ;
    g.t(j5, i5);
    g.h = j5.prototype;
    g.h.Yt = function(a, b) {
        var c = this.Pl(a)
          , d = (0,
        g.A)(function(c) {
            this.B = null;
            b(c.responseText, a)
        }, this);
        this.Xd();
        this.B = g.EE(c, {
            format: "RAW",
            onSuccess: d,
            withCredentials: !0
        })
    }
    ;
    g.h.Zt = function(a, b, c, d) {
        this.C = c;
        if (d)
            for (b = g.q(d.captionTracks),
            c = b.next(); !c.done; c = b.next())
                f5(this.A, c.value);
        a()
    }
    ;
    g.h.Pl = function(a) {
        var b = a.Wa()
          , c = {};
        if (this.C || a.B)
            c.fmt = this.C || "srv" + a.B;
        a.o && (c.tlang = a.o.languageCode);
        return g.wE(b, c)
    }
    ;
    g.h.Xd = function() {
        i5.prototype.Xd.call(this);
        this.B && this.B.abort()
    }
    ;
    g.h.X = function() {
        this.Xd();
        i5.prototype.X.call(this)
    }
    ;
    k5.prototype.contains = function(a) {
        a = g.eb(this.ub, a);
        return 0 <= a || 0 > a && 1 == (-a - 1) % 2
    }
    ;
    k5.prototype.length = function() {
        return this.ub.length / 2
    }
    ;
    g.t(l5, g.M);
    g.h = l5.prototype;
    g.h.X = function() {
        g.M.prototype.X.call(this);
        this.B && this.B.cancel()
    }
    ;
    g.h.ZB = function(a) {
        var b = this;
        if (this.H.kk())
            var c = this.D.R(this.C, "progresssync", function() {
                b.H.index.Lb() && (b.reset(),
                b.o = null,
                wCa(b, b.C.getCurrentTime()),
                b.D.Ha(c))
            });
        else
            wCa(this, a)
    }
    ;
    g.h.reset = function() {
        this.F = new k5;
        this.B && (this.B.cancel(),
        this.B = null)
    }
    ;
    g.h.TA = function() {
        var a;
        if (a = null !== this.o)
            a = this.o,
            a = a.o.Rg(a);
        !a || this.B || this.o && 30 < this.o.startTime - this.C.getCurrentTime() || (a = this.o,
        a = a.o.rk(a),
        !g.Y(this.C).experiments.o("disable_captions_unknown_requests") && !a.o[0].duration) || (this.F.contains(a.o[0].ya) || xCa(this, a),
        this.o = g.Ja(a.o));
        this.K.start()
    }
    ;
    g.h.uU = function(a) {
        var b = !(this.G ? a.response : a.responseText) || 400 <= a.status;
        if (!g.Y(this.C).experiments.o("disable_captions_redirects_redux")) {
            var c = g.qM(a);
            if (c) {
                a = g.UL(this.A, this.L, {});
                b = this.A;
                g.QL(b.A, a, c);
                b.requestId = a.get("req_id");
                xCa(this, this.A);
                return
            }
        }
        b || null === this.J || (this.G ? this.J(a.response, 1E3 * this.A.o[0].startTime, this.A.o[0].ya) : this.J(a.responseText, 1E3 * this.A.o[0].startTime, this.A.o[0].ya));
        this.B = this.A = null
    }
    ;
    g.t(m5, i5);
    g.h = m5.prototype;
    g.h.Yt = function(a, b) {
        this.Xd();
        var c = yCa(this, a.A);
        if (c) {
            var d = c.index.Ho(c.index.pf());
            g.Y(this.C).experiments.o("html5_disable_caption_starttime") || (d -= c.index.Ud(c.index.pf()));
            d *= 1E3;
            var e = g.Y(this.C).Ma;
            this.D = new l5(new g.zL,this.C,c,function(c, e, l) {
                b(c, a, e, d, l)
            }
            ,e || g.pI(c.info),(0,
            g.A)(function() {
                this.D && this.D.reset();
                this.o && this.o.reset();
                this.F = !0
            }, this))
        }
    }
    ;
    g.h.bE = function() {
        var a = this.F;
        this.F = !1;
        return a
    }
    ;
    g.h.Zt = function(a) {
        if (g.Y(this.C).Ma)
            f5(this.A, new g.bI({
                format: 1,
                languageCode: "rawcc",
                languageName: "CC1",
                name: "",
                is_servable: !0,
                is_default: !0,
                is_translateable: !1
            })),
            f5(this.A, new g.bI({
                format: 1,
                languageCode: "rawcc",
                languageName: "CC3",
                name: "",
                is_servable: !0,
                is_default: !0,
                is_translateable: !1
            }));
        else
            for (var b in this.B.o) {
                var c = this.B.o[b];
                if (g.tI(c.info.mimeType) && "rawcc" != b && ("386" != b || !g.Y(this.C).experiments.o("html5_manifestless_captions_fmt3_killswitch"))) {
                    var d = "en"
                      , e = "English"
                      , f = ".en";
                    if (c = c.info.captionTrack)
                        d = c.languageCode,
                        e = c.displayName,
                        f = c.vssId;
                    f5(this.A, new g.bI({
                        format: 1,
                        languageCode: d,
                        languageName: e,
                        name: "",
                        is_servable: !0,
                        is_default: !0,
                        is_translateable: !1,
                        vss_id: f
                    }))
                }
            }
        a()
    }
    ;
    g.h.Xd = function() {
        i5.prototype.Xd.call(this);
        this.D && (this.D.dispose(),
        this.D = null)
    }
    ;
    g.h.Pl = function() {
        return ""
    }
    ;
    g.h.X = function() {
        this.Xd();
        i5.prototype.X.call(this)
    }
    ;
    g.t(o5, D4);
    o5.prototype.Br = function(a) {
        var b = this.H.A;
        D4.prototype.Br.call(this, a);
        for (a = a.length; a < b.length; a++) {
            var c = b[a];
            if (f && c.A == e)
                var d = f;
            else {
                d = {};
                g.Ga(d, c.A);
                g.Ga(d, MCa);
                var e = c.A;
                var f = d
            }
            VBa(this, c, d)
        }
    }
    ;
    var MCa = {
        Xs: !0
    };
    g.t(p5, D4);
    g.h = p5.prototype;
    g.h.uE = function() {
        g.qu(this.da)
    }
    ;
    g.h.zU = function() {
        g.Cq(this.element, "ytp-rollup-mode");
        this.kj(this.sa, !0)
    }
    ;
    g.h.Bz = function() {
        return this.L
    }
    ;
    g.h.Az = function() {
        return this.H.params.oq * q5(this)
    }
    ;
    g.h.kj = function(a, b) {
        this.sa = a;
        if (q5(this)) {
            for (var c = 0, d = 0; d < this.D.length && c < a.length; d++)
                this.D[d] == a[c] && c++;
            0 < c && c < a.length && (a = this.D.concat(a.slice(c)));
            c = this.L;
            this.L = 0;
            D4.prototype.kj.call(this, a);
            d = this.C.offsetWidth + 1;
            this.L = Math.max(zCa(this), c, d);
            c = this.H.params.oq * q5(this) - this.C.offsetHeight;
            c != this.Z && (b || (0,
            window.isNaN)(this.Z) || (g.T(this.element, "ytp-rollup-mode"),
            g.pu(this.da)),
            g.Ch(this.C, "transform", c ? "translateY(" + c + "px)" : ""),
            this.Z = c);
            D4.prototype.kj.call(this, a)
        } else
            D4.prototype.kj.call(this, a)
    }
    ;
    g.t(r5, i5);
    g.h = r5.prototype;
    g.h.Yt = function(a, b) {
        var c = this.Pl(a)
          , d = (0,
        g.A)(function(c) {
            this.B = null;
            b(c.responseText, a)
        }, this);
        this.Xd();
        this.B = g.EE(c, {
            format: "RAW",
            onSuccess: d,
            withCredentials: !0
        })
    }
    ;
    g.h.Zt = function(a, b, c) {
        var d = this.D;
        b = {
            type: "list",
            tlangs: 1,
            v: this.C,
            fmts: Number(b || !1),
            vssids: 1
        };
        this.zA && (b.asrs = 1);
        d = g.wE(d, b);
        b = (0,
        g.A)(function(b) {
            this.B = null;
            if ((b = b.responseXML) && b.firstChild) {
                for (var d = this.A, e = g.q(b.getElementsByTagName("track")), l = e.next(); !l.done; l = e.next()) {
                    var m = l.value;
                    l = m.getAttribute("formats");
                    var n = m.getAttribute("lang_code")
                      , p = m.getAttribute("lang_translated")
                      , r = m.getAttribute("name")
                      , v = m.getAttribute("kind")
                      , D = m.getAttribute("id")
                      , H = "true" == m.getAttribute("lang_default")
                      , L = "true" == m.getAttribute("cantran");
                    m = m.getAttribute("vss_id");
                    f5(d, new g.bI({
                        formats: l,
                        format: c,
                        languageCode: n,
                        languageName: p,
                        name: r,
                        kind: v,
                        id: D,
                        is_servable: !0,
                        is_translateable: L,
                        vss_id: m,
                        is_default: H
                    }))
                }
                b = b.getElementsByTagName("target");
                d = b.length;
                for (e = 0; e < d; e++)
                    l = b[e].getAttribute("lang_code"),
                    n = b[e].getAttribute("lang_translated"),
                    p = b[e].getAttribute("lang_original"),
                    r = b[e].getAttribute("id"),
                    v = "true" == b[e].getAttribute("lang_default"),
                    l = {
                        languageCode: l,
                        languageName: n,
                        languageOriginal: p,
                        id: r,
                        is_default: v
                    },
                    this.F[l.languageCode] = l.languageName,
                    this.G.push(new g.aI(l))
            }
            a()
        }, this);
        this.Xd();
        this.B = g.EE(d, {
            format: "RAW",
            onSuccess: b,
            withCredentials: !0
        })
    }
    ;
    g.h.Pl = function(a) {
        var b = this.D
          , c = {
            v: this.C,
            type: "track",
            lang: a.A,
            name: a.F,
            kind: a.C,
            fmt: a.B
        };
        a.o && (c.tlang = y4(a));
        return b = g.wE(b, c)
    }
    ;
    g.h.Xd = function() {
        i5.prototype.Xd.call(this);
        this.B && this.B.abort()
    }
    ;
    g.h.X = function() {
        this.Xd();
        i5.prototype.X.call(this)
    }
    ;
    g.t(u5, g.GU);
    g.h = u5.prototype;
    g.h.X = function() {
        if (this.G) {
            var a = g.AU(this.K);
            a && a.Fj()
        } else
            FCa(this, !1);
        g.GU.prototype.X.call(this)
    }
    ;
    g.h.uB = function() {
        return this.G ? !this.B.Ba : this.ia || v5(this) ? !0 : ACa(this)
    }
    ;
    g.h.load = function(a) {
        g.GU.prototype.load.call(this);
        this.J = this.o.getAudioTrack();
        if (this.D || a)
            this.A && (this.G && !this.C.experiments.o("disable_native_caption_api") ? BCa(this, !0) : a ? this.KD(a, this.A) : 3 != this.o.Ra() && this.D.Yt(this.A, (0,
            g.A)(this.KD, this))),
            this.A && this.A != w5(this) ? this.o.xa("captionschanged", x4(this.A)) : this.o.xa("onCaptionsTrackListChanged");
        else {
            var b;
            n5(this.B, this.K) ? b = new m5(this.B.pa,this.o) : this.B.captionTracks.length ? b = new j5(this.B) : b = new r5(this.B.Wn,this.B.videoId,this.B.lh || this.C.lh || g.JP(this.B, "yt:cc_default_lang") || this.C.za,this.B.Vn);
            this.D = b;
            b.Zt((0,
            g.A)(this.cV, this), !0, this.G ? "vtt" : void 0, this.o.getAudioTrack())
        }
    }
    ;
    g.h.unload = function() {
        this.G ? this.C.experiments.o("disable_native_caption_api") ? g.AU(this.K).Fj() : this.A && BCa(this, !1) : (this.ha && g.ru(this.ha),
        g.xU(this.o, "captions"),
        this.O = [],
        this.D && this.D.Xd(),
        this.L && g.uU(this.o, this.L),
        this.ew());
        g.GU.prototype.unload.call(this);
        var a = g.fU(this.o.app);
        a && a.F && g.aQ(a.F.B);
        this.o.xa("captionschanged", {})
    }
    ;
    g.h.cV = function() {
        var a;
        this.M || ACa(this) ? a = x5(this, this.M) : v5(this) && (a = w5(this));
        if (this.G || this.ia) {
            for (var b = e5(this.D.A, !0), c = [], d = 0; d < b.length; d++) {
                var e = b[d]
                  , f = {
                    kind: "subtitles",
                    label: g.cI(e),
                    srclang: y4(e),
                    id: e.toString()
                };
                this.ia || (f.src = this.D.Pl(e));
                e == a && (f["default"] = 1);
                c.push(g.K("TRACK", f))
            }
            g.AU(this.K).ql(c);
            (a = g.AU(this.K).na()) && a.textTracks && a.textTracks.addEventListener && !this.C.experiments.o("disable_native_caption_api") && this.Y.R(a.textTracks, "change", this.dV)
        } else
            !this.A && a && z5(this, a),
            this.o.xa("onCaptionsTrackListChanged"),
            this.o.xa("onApiChange")
    }
    ;
    g.h.dV = function() {
        for (var a = g.AU(this.K).na().textTracks, b = null, c = 0; c < a.length; c++)
            if ("showing" == a[c].mode)
                a: {
                    b = e5(this.D.A, !0);
                    for (var d = 0; d < b.length; d++)
                        if (b[d].toString() == a[c].id) {
                            b = b[d];
                            break a
                        }
                    b = null
                }
        (this.loaded ? this.A : null) != b && z5(this, b, !0)
    }
    ;
    g.h.kX = function() {
        this.C.experiments.o("disable_native_caption_api") ? this.loaded && !this.G && this.unload() : !this.A && this.G || this.unload()
    }
    ;
    g.h.KD = function(a, b, c, d, e) {
        a && (this.D.bE() && (this.O = [],
        g.xU(this.K, "captions"),
        this.da.Wj()),
        a = vCa(this.D, a, b, c, d),
        this.C.experiments.o("debug_web_player_live_captions_segment_numbers") && c && e && (c = a.reduce(function(a, b) {
            return b.start < a ? b.start : a
        }, Number.MAX_SAFE_INTEGER),
        b = a.reduce(function(a, b) {
            return b.end > a ? b.end : a
        }, c) - c,
        d = new A4(c,b,0,"_" + B4++,{
            Mf: 2,
            Xe: 100,
            rg: 0
        }),
        a.push(d),
        e = new z4(c,b,0,d.id,"sq=" + e),
        a.push(e)),
        g.uU(this.o, a),
        this.M && !this.ia && CCa(this),
        this.M = !1)
    }
    ;
    g.h.EN = function(a) {
        this.O.push(a);
        this.da.Wj()
    }
    ;
    g.h.FN = function(a) {
        g.Ua(this.O, a);
        var b = n5(this.B, this.K) && this.C.Ma;
        !this.C.experiments.o("disable_remove_displayed_close_caption_cue") && b && g.wU(this.o, [a]);
        this.da.Wj()
    }
    ;
    g.h.ZV = function(a) {
        if (a instanceof A4) {
            var b = this.T[a.id];
            b && b.H != a && (b.dispose(),
            delete this.T[a.id],
            b = null);
            b || (b = DCa(this, a)) && (this.T[a.id] = b)
        } else
            b = a.windowId,
            this.ba[b] || (this.ba[b] = []),
            this.ba[b].push(a)
    }
    ;
    g.h.jW = function() {
        ECa(this, this.Z);
        this.Z = null
    }
    ;
    g.h.EF = function() {
        this.da.stop();
        g.ac(this.ba);
        this.O.sort(g.QQ);
        var a = this.O;
        if (this.L) {
            var b = (0,
            g.Ud)(a, function(a) {
                return -1 == this.L.indexOf(a)
            }, this);
            b.length && (a = b)
        }
        (0,
        g.C)(a, this.ZV, this);
        g.Mb(this.T, function(a, b) {
            this.ba[b] ? (a.element.parentNode || g.zU(this.o, a.element, 4),
            a.kj(this.ba[b])) : (a.dispose(),
            delete this.T[b])
        }, this)
    }
    ;
    g.h.tE = function() {
        s5(this, {}, !0)
    }
    ;
    g.h.Gs = function() {
        var a = A5.ob;
        a = {
            background: a.background,
            backgroundOpacity: a.backgroundOpacity,
            charEdgeStyle: a.charEdgeStyle,
            color: a.color,
            fontFamily: a.fontFamily,
            fontSizeIncrement: a.fontSizeIncrement,
            fontStyle: a.bold && a.vf ? 3 : a.bold ? 1 : a.vf ? 2 : 0,
            textOpacity: a.textOpacity,
            windowColor: A5.windowColor,
            windowOpacity: A5.windowOpacity
        };
        var b = t5(this, "display-settings"), c;
        for (c in b)
            null != b[c] && (a[c] = b[c]);
        return a
    }
    ;
    g.h.iw = function(a, b) {
        var c = {};
        g.Ga(c, t5(this, "display-settings"));
        g.Ga(c, a);
        s5(this, c, b);
        this.o.V("captionssettingschanged")
    }
    ;
    g.h.ew = function() {
        !this.G && this.loaded && (g.Mb(this.T, function(a, b) {
            a.dispose();
            delete this.T[b]
        }, this),
        this.EF())
    }
    ;
    g.h.nu = function(a, b) {
        switch (a) {
        case "fontSize":
            if ((0,
            window.isNaN)(b))
                break;
            var c = g.ld(b, -2, 4);
            this.iw({
                fontSizeIncrement: c
            });
            return c;
        case "reload":
            b && !this.G && z5(this, this.A, !0);
            break;
        case "stickyLoading":
            void 0 != b && this.C.Gb && y5(this, "module-enabled", !!b);
            break;
        case "track":
            if (!this.D)
                return {};
            if (b) {
                if (this.G)
                    break;
                if (!g.Ca(b))
                    break;
                if (g.$b(b)) {
                    z5(this, null, !0);
                    break
                }
                var d;
                c = e5(this.D.A, !0);
                for (var e = 0; e < c.length; e++) {
                    var f = c[e];
                    f.A != b.languageCode || d && f.D != b.languageName || (d = b.translationLanguage ? SBa(f, b.translationLanguage) : f)
                }
                !d || d == this.A && this.loaded || z5(this, d, !0)
            } else
                return this.loaded && this.A && this.A != w5(this) ? x4(this.A) : {};
            return "";
        case "tracklist":
            return this.D ? (0,
            g.I)(e5(this.D.A, !(!b || !b.includeAsr)), function(a) {
                return x4(a)
            }) : [];
        case "translationLanguages":
            return this.D ? this.D.G : [];
        case "displaySettings":
            d = this.Gs();
            if (g.zN(this.C) && b && g.Ca(b))
                if (b.reset)
                    this.tE();
                else {
                    f = {};
                    for (c in b)
                        switch (c) {
                        case "color":
                        case "background":
                        case "windowColor":
                            f[c] = GCa(b[c], d[c]);
                            break;
                        case "textOpacity":
                        case "backgroundOpacity":
                        case "windowOpacity":
                            f[c] = HCa(b[c], d[c]);
                            break;
                        case "charEdgeStyle":
                            var k = g.p1[b[c]];
                            f[c] = g.ta(k) ? k : d[c];
                            break;
                        case "fontSizeIncrement":
                            f[c] = ICa(b[c], d[c]);
                            break;
                        case "fontFamilyOption":
                            k = g.o1[b[c]];
                            f.fontFamily = g.ta(k) ? k : d[c];
                            break;
                        case "fontStyle":
                            k = g.q1[b[c]],
                            f[c] = g.ta(k) ? k : d[c]
                        }
                    for (e in f)
                        f[e + "Override"] = !0;
                    this.iw(f, !0);
                    d = this.Gs()
                }
            d.fontFamilyOption = g.zxa[d.fontFamily];
            d.charEdgeStyle = g.Axa[d.charEdgeStyle];
            d.fontStyle = g.Bxa[d.fontStyle];
            return d;
        case "sampleSubtitles":
            this.G || void 0 == b || FCa(this, !!b);
            break;
        case "xmlTrack":
            b && this.C.Gb && (this.G || z5(this, new g.bI({
                languageName: b.name
            }), !1, b.xml))
        }
    }
    ;
    g.h.CN = function() {
        var a = "reload fontSize track tracklist translationLanguages displaySettings sampleSubtitle".split(" ");
        this.C.Gb && a.push("stickyLoading", "xmlTrack");
        return a
    }
    ;
    g.h.DN = function() {
        var a = this.A;
        return a ? {
            cc: a.G
        } : {}
    }
    ;
    g.h.uF = function() {
        this.loaded && this.A && this.A != w5(this) ? (y5(this, "module-enabled", !1),
        this.unload(),
        v5(this, !0) && z5(this, w5(this), !1)) : z5(this, this.A == w5(this) ? x5(this, !0) : this.A, !0)
    }
    ;
    g.h.sR = function() {
        var a = this.A == w5(this);
        v5(this, a) ? z5(this, this.o.getAudioTrack().wo, !1) : this.B.captionTracks.length && (this.loaded && this.unload(),
        this.uB() && (a ? z5(this, x5(this), !1) : this.load()))
    }
    ;
    g.xX.captions = u5;
}
)(_yt_player);
