fetch(new Request('json/laws.json')).then( (response) => {return response.json()} ).then( (jj) => 
{
    var j = jj[0] ; 
    var lawCount = j.Laws.length ; 
    document.querySelector( "main" ).appendChild( document.createElement( "div" ) ) ; 
    var main = document.querySelector( "main div" ) ; 
    var cover = document.createElement( "span" ) ; 
    main.setAttribute( "ahhhhaaaahaha" , "" ) ; 
    main.appendChild( cover ) ; 
    cover.setAttribute( "id" , "COVER" ) ; 
    cover.innerHTML = "<button onclick=\"window.print()\">列印</button><div>臺中市立臺中第一高級中等學校<br/>學生自治聯合會</div><h1>法規彙編</h1><br/><span>113-2</span>"

    //目錄
    var catalogue = document.createElement( "span" ) , contents = document.createElement( "span" ) ; 
    contents.innerText = "目錄" ; 
    main.appendChild( catalogue ) ; 
    catalogue.appendChild( contents ) ; 
    contents.setAttribute( "class" , "title" ) ; 
    var a = 0 , b = 0 , c = 0 , d = 0 , e = 0 , h1 = document.createElement( "h1" ) , h2 = document.createElement( "h1" ) , h3 = document.createElement( "h1" ) , h4 = document.createElement( "h1" ) , h5 = document.createElement( "h1" ) , h6 = document.createElement( "h1" ) ; 
    let A = document.createElement( "div" ) ; 
    A.setAttribute( "id" , "A" ) ; 
    h1.innerText = "中央法規" ; 
    A.appendChild( h1 ) ; 
    let B = document.createElement( "div" ) ; 
    B.setAttribute( "id" , "B" ) ; 
    h2.innerText = "行政法規" ; 
    B.appendChild( h2 ) ; 
    let C = document.createElement( "div" ) ; 
    C.setAttribute( "id" , "C" ) ; 
    h3.innerText = "選舉法規" ; 
    C.appendChild( h3 ) ; 
    let D = document.createElement( "div" ) ; 
    D.setAttribute( "id" , "D" ) ; 
    h4.innerText = "立法法規" ; 
    D.appendChild( h4 ) ; 
    let E = document.createElement( "div" ) ; 
    E.setAttribute( "id" , "E" ) ; 
    h5.innerText = "司法法規" ; 
    E.appendChild( h5 ) ; 
    let F = document.createElement( "div" ) ; 
    F.setAttribute( "id" , "F" ) ; 
    h6.innerText = "廢止法規" ; 
    F.appendChild( h6 ) ; 
    for( i = 0 ; i < lawCount ; i++ ) 
    {
        if( j.Laws[i].LawCategory[0] == "中" && j.Laws[i].LawCategory[4] != "/" ) 
        {
            let aa = document.createElement( "a" ) ; 
            aa.setAttribute( "href" , "#" + i ) ; 
            aa.innerText = j.Laws[i].LawName ; 
            A.appendChild( aa ) ; 
            a ++ ; 
        }
        else if( j.Laws[i].LawCategory[0] == "行" && j.Laws[i].LawCategory[4] != "/" ) 
        {
            let aa = document.createElement( "a" ) ; 
            aa.setAttribute( "href" , "#" + i ) ; 
            aa.innerText = j.Laws[i].LawName ; 
            B.appendChild( aa ) ; 
            b ++ ; 
        }
        else if( j.Laws[i].LawCategory[0] == "立" && j.Laws[i].LawCategory[4] != "/" ) 
        {
            let aa = document.createElement( "a" ) ; 
            aa.setAttribute( "href" , "#" + i ) ; 
            aa.innerText = j.Laws[i].LawName ; 
            D.appendChild( aa ) ; 
            d ++ ; 
        }
        else if( j.Laws[i].LawCategory[0] == "司" && j.Laws[i].LawCategory[4] != "/" ) 
        {
            let aa = document.createElement( "a" ) ; 
            aa.setAttribute( "href" , "#" + i ) ; 
            aa.innerText = j.Laws[i].LawName ; 
            E.appendChild( aa ) ; 
            e ++ ; 
        }
        else if( j.Laws[i].LawCategory[5] == "選" ) 
        {
            let aa = document.createElement( "a" ) ; 
            aa.setAttribute( "href" , "#" + i ) ; 
            aa.innerText = j.Laws[i].LawName ; 
            C.appendChild( aa ) ; 
            c ++ ; 
        }
        else if( j.Laws[i].LawCategory[0] == "廢" ) 
        {
            let aa = document.createElement( "a" ) ; 
            aa.setAttribute( "href" , "#" + i ) ; 
            aa.innerText = j.Laws[i].LawName ; 
            F.appendChild( aa ) ; 
        }
    }
    for( i = 0 ; i < lawCount ; i++ ) 
    {
        if( i == 0 ) 
        {
            let spann = document.createElement( "span" ) ; 
            main.appendChild( spann ) ; 
            spann.setAttribute( "class" , "break" ) ; 
            spann.innerHTML = "<div style=\"display:inline;\">中央法規</span>" ; 
        }
        else if( i == a ) 
        {
            let spann = document.createElement( "span" ) ; 
            main.appendChild( spann ) ; 
            spann.setAttribute( "class" , "break" ) ; 
            spann.innerHTML = "<div style=\"display:inline;\">行政法規</span>" ; 
        }
        else if( i == a + b ) 
        {
            let spann = document.createElement( "span" ) ; 
            main.appendChild( spann ) ; 
            spann.setAttribute( "class" , "break" ) ; 
            spann.innerHTML = "<div style=\"display:inline;\">選舉法規</span>" ; 
        }
        else if( i == a + b + c ) 
        {
            let spann = document.createElement( "span" ) ; 
            main.appendChild( spann ) ; 
            spann.setAttribute( "class" , "break" ) ; 
            spann.innerHTML = "<div style=\"display:inline;\">立法法規</span>" ; 
        }
        else if( i == a + b + c + d ) 
        {
            let spann = document.createElement( "span" ) ; 
            main.appendChild( spann ) ; 
            spann.setAttribute( "class" , "break" ) ; 
            spann.innerHTML = "<div style=\"display:inline;\">司法法規</span>" ; 
        }
        else if( i == a + b + c + d + e ) 
        {
            let spann = document.createElement( "span" ) ; 
            main.appendChild( spann ) ; 
            spann.setAttribute( "class" , "break" ) ; 
            spann.innerHTML = "<div style=\"display:inline;\">廢止法規</span>" ; 
        }
        let div = document.createElement("div") ; 
        div.setAttribute( "id" , i ) ; 
        main.appendChild( div ) ; 
    }
    catalogue.appendChild( A ) ; 
    catalogue.appendChild( B ) ; 
    catalogue.appendChild( C ) ; 
    catalogue.appendChild( D ) ; 
    catalogue.appendChild( E ) ; 
    catalogue.appendChild( F ) ; 
    var law = main.querySelectorAll( "main > div > div" ) ; 
    for( i = 0 ; i < law.length ; i++ ) 
    {
        // 法規名稱
        law[i].appendChild( document.createElement("div") ).setAttribute( "class" , "title" ) ; 
        function ab() 
        {
            // 廢止備註
            if( j.Laws[i].LawAbandonNote == "廢" ) 
            {
                return "（廢）" 
            }
            else 
            {
                return "" 
            }
        }
        function ac() 
        {
            if( j.Laws[i].LawLevel == "命令" ) 
            {
                if( j.Laws[i].LawName.match( /臺中第一高級中學/ ) != null ) 
                { 
                    return "臺中第一高級中學" + j.Laws[i].LawName.split( /臺中第一高級中學/ )[1].replace( /^/ , "<br/>" ) 
                }
                else if( j.Laws[i].LawName.match( /臺中市立臺中第一高級中等學校學生自治聯合會/ ) != null ) 
                {
                    if( j.Laws[i].LawAbandonNote == "廢" ) 
                    {
                        return "臺中市立臺中第一高級中等學校" + j.Laws[i].LawName.split( /臺中市立臺中第一高級中等學校/ )[1].replace( /^/ , "<br/>" ) 
                    }
                    else 
                    {
                        return "臺中市立臺中第一高級中等學校學生自治聯合會" + j.Laws[i].LawName.split( /臺中市立臺中第一高級中等學校學生自治聯合會/ )[1].replace( /^/ , "<br/>" )  
                    }
                }
            } 
            else 
            {
                if( j.Laws[i].LawAbandonNote == "廢" ) 
                {
                    return "臺中市立臺中第一高級中等學校" + j.Laws[i].LawName.split( /臺中市立臺中第一高級中等學校/ )[1].replace( /^/ , "<br/>" ) 
                }
                else 
                {
                    return "臺中市立臺中第一高級中等學校學生自治聯合會" + j.Laws[i].LawName.split( /臺中市立臺中第一高級中等學校學生自治聯合會/ )[1].replace( /^/ , "<br/>" ) 
                }
            }
        }
        document.querySelectorAll( ".title" )[i + 1].innerHTML =  "<span class=\"abandoned\">" + ab() + "</span><span>" + ac() + "</span>" ; 



        // 立法沿革
        var legislativeHistory = document.createElement("ol") ; 
        law[i].appendChild( legislativeHistory ) ; 
        legislativeHistory.setAttribute( "class" , "legislativeHistory" ) ; 
        legislativeHistory.innerHTML += "<li>" + j.Laws[i].LawHistories.replace(/(?:\r\n)/g, "</li><li>") + "</li>" ; 



        // 前言
        var foreword = "<p>" + j.Laws[i].LawForeword.replace(/(?:\r\n)/g, "<br/>") + "</p>" ; 
        if( j.Laws[i].LawForeword != "" ) 
        {
            law[i].appendChild( document.createElement("div") ).setAttribute( "class" , "Foreword" ) ; 
            document.querySelector( ".Foreword" ).innerHTML = "<span>宗旨</span><br/>" + foreword + "<br/>" ; 
        }


        // 內文
        const articleLength = j.Laws[i].LawArticles.length ; 
        var main = document.createElement("div") ; 
        law[i].appendChild( main ) ; 
        for( ii = 0 ; ii < articleLength ; ii++ )
        {
            var articleContent = j.Laws[i].LawArticles[ii].ArticleContent.replace(/(?:\r\n)/g, "</span></li><li><span>") ; 
            var articleTitle ; 
            j.Laws[i].LawArticles[ii].ArticleNo == "" ? articleTitle = j.Laws[i].LawArticles[ii].ArticleNo : articleTitle = j.Laws[i].LawArticles[ii].ArticleNo + "&nbsp;" ; 
            main.innerHTML += "<h6>" + articleTitle + "</h6>" ; 
            function aaa() 
            {
                if( j.Laws[i].LawArticles[ii].ArticleContent[0] == "第" ) 
                {
                    main.innerHTML += "<h1><span>" + articleContent.replace( / /g , "&#x00A0;" ) + "</span></h1><br/>" ; 
                }
                else if( j.Laws[i].LawArticles[ii].ArticleContent[3] == "第" ) 
                {
                    main.innerHTML += "<h2><span>" + articleContent.replace( / /g , "&#x00A0;" ) + "</span></h2><br/>" ; 
                }
                else if( j.Laws[i].LawArticles[ii].ArticleContent[6] == "第" ) 
                {
                    main.innerHTML += "<h3><span>" + articleContent.replace( / /g , "&#x00A0;" ) + "</span></h3><br/>" ; 
                }
                else if( j.Laws[i].LawArticles[ii].ArticleContent[9] == "第" ) 
                {
                    main.innerHTML += "<h4><span>" + articleContent.replace( / /g , "&#x00A0;" ) + "</span></h4><br/>" ; 
                }
                else if( j.Laws[i].LawArticles[ii].ArticleContent[12] == "第" ) 
                {
                    main.innerHTML += "<h5><span>" + articleContent.replace( / /g , "&#x00A0;" ) + "</span></h5><br/>" ; 
                }
            }
            function aaaaaa() 
            {
                function aaaaaaaaa(aC) 
                {
                    var articleBR = articleContent.split( "</span></li><li><span>" ) ; 
                    if( articleBR.length != 1 ) 
                    {
                        aC += "<ol class=\"paragraph\">" ; 
                        for( iii = 0 ; iii < articleBR.length ; iii++ ) 
                        {
                            if( articleBR[iii].match( /[一二三四五六七八九十]+\u3001/ ) != null && articleBR[iii].split( /[一二三四五六七八九十]+\u3001/ ).length == 2 ) 
                            {
                                aC += "<span><span>" + articleBR[iii].split( /\u3001/ )[0] + "\u{3001}</span>" ; 
                                aC += articleBR[iii].split( /[一二三四五六七八九十]+\u3001/ )[1].replace( /^/ , "<span>" ) + "</span></span>" ; 
                            }
                            if( articleBR[iii].match( /\uFF08[一二三四五六七八九十]+\uFF09|\uFF08[\uFF10-\uFF19]+\uFF09|\uFF08[0-9]+\uFF09/ ) != null && articleBR[iii].split( /\uFF08[一二三四五六七八九十]+\uFF09|\uFF08[\uFF10-\uFF19]+\uFF09|\uFF08[0-9]+\uFF09/ ).length == 2 ) 
                            {
                                aC += "<span><span>" + articleBR[iii].split( /\uFF09/ )[0] + "\u{FF09}</span>" ; 
                                aC += articleBR[iii].split( /\uFF08[一二三四五六七八九十]+\uFF09|\uFF08[\uFF10-\uFF19]+\uFF09|\uFF08[0-9]+\uFF09/ )[1].replace( /^/ , "<span>" ) + "</span></span>" ; 
                            }
                            if( articleBR[iii].match( /[\uFF10-\uFF19]+\u3001|[0-9]+\u3001/ ) != null && articleBR[iii].split( /[\uFF10-\uFF19]+\u3001|[0-9]+\u3001/ ).length == 2 ) 
                            {
                                aC += "<span class=\"of\"><span>" + articleBR[iii].split( /\u3001/ )[0] + "\u{3001}</span>" ; 
                                aC += articleBR[iii].split( /[\uFF10-\uFF19]+\u3001|[0-9]+\u3001/ )[1].replace( /^/ , "<span>" ) + "</span></span>" ; 
                            }
                            if( articleBR[iii].match( /[0-9]+\u002E|[\uFF10-\uFF19]+\u002E/) != null && articleBR[iii].split( /[\uFF10-\uFF19]+\u002E|[0-9]+\u002E/ ).length == 2 ) 
                            {
                                aC += "<span class=\"of\"><span>" + articleBR[iii].split( /\u002E/ )[0] + "\u{002E}</span>" ; 
                                aC += articleBR[iii].split( /[\uFF10-\uFF19]+\u002E|[0-9]+\u002E/ )[1].replace( /^/ , "<span>" ) + "</span></span>" ; 
                            }
                            if( ( articleBR[iii].match( /[一二三四五六七八九十]+\u3001/ ) == null || articleBR[iii].split( /[一二三四五六七八九十]+\u3001/ ).length != 2 ) && ( articleBR[iii].match( /\uFF08[一二三四五六七八九十]+\uFF09|\uFF08[\uFF10-\uFF19]+\uFF09|\uFF08[0-9]+\uFF09/ ) == null || articleBR[iii].split( /\uFF08[一二三四五六七八九十]+\uFF09|\uFF08[\uFF10-\uFF19]+\uFF09|\uFF08[0-9]+\uFF09/ ).length != 2 ) && ( articleBR[iii].match( /[\uFF10-\uFF19]+\u3001|[0-9]+\u3001/ ) == null || articleBR[iii].split( /[\uFF10-\uFF19]+\u3001|[0-9]+\u3001/ ).length != 2 ) && ( articleBR[iii].match( /[0-9]+\u002E|[\uFF10-\uFF19]+\u002E/) == null && articleBR[iii].split( /[\uFF10-\uFF19]+\u002E|[0-9]+\u002E/ ).length != 2 ) ) 
                            {
                                aC += "<li>" + articleBR[iii] + "</li>" ; 
                            }
                        }
                        if( aC.split( /<li>/ ).length > 2 ) 
                        {
                            aC = aC.replace( /class="paragraph"/ , "class=\"paragraph showNum\"" ) ; 
                        }
                    }
                    else 
                    {
                        aC += "<ol class=\"paragraph\"><li><span>" + articleContent + "</span></li>" ; 
                    }
                    return aC 
                }
                main.innerHTML += "<article>" + aaaaaaaaa("") + "</ol></article><br/>" ; 
            }
            j.Laws[i].LawArticles[ii].ArticleNo == "" ? aaa() : aaaaaa() ; 
        }
    }


    // cover 
    var spn = document.createElement( "span" ) ; 
    var contributes = "" ; 
    var publishDate = "中華民國" + ( j.UpdateDate.split( "/" )[0] - 1911 ) + "年" + j.UpdateDate.split( "/" )[1] + "月" + j.UpdateDate.split( "/" )[2] + "日" ; //出版日期
    main.appendChild( spn ) ; 
    spn.setAttribute( "id" , "COVER-BACK" ) ; 
    spn.setAttribute( "style" , "line-height:1.3;" ) ; 
    spn.innerHTML = "<h1><span>臺中市立臺中第一高級中等學校學生自治聯合會&nbsp;法規彙編<span></h1><ul><li><span>出版者：</span><span>臺中市立臺中第一高級中等學校學生自治聯合會第三十屆學生會自治部</span></li><li><span>發行人：</span><span>卓祐宸</span></li><li><span>編輯：</span><span>卓祐宸" + contributes + "</span></li><li><span>網站：</span><a href=\"https://sites.google.com/view/tcfshsu\" style=\"color:#00f;font-family:\'Noto Sans\',sans-serif;\">https://sites.google.com/view/tcfshsu</a></li><li><span>定價：</span><span>免費供大眾下載使用</span></li><li><span>出版日期：</span><span>" + publishDate + "</span></li></ul>"
    window.print() ; 
}).catch( (err) => 
{ 
    let errorMessage = document.createElement( "div" ) ; 
    errorMessage.setAttribute( "style" , "display:flex;justify-content:center;align-items:center;width:100%;height:100vh;" ) ; 
    errorMessage.innerHTML = "<span style=\"font-size:10rem;font-family:\'\u{004E}oto \u{0053}ans \u{0054}\u{0043}\',sans-serif;line-height:2;text-align:center;color:#f00;font-weight:900;\">" + err + "</span>" ; 
    document.querySelector( "main" ).appendChild( errorMessage ) ; 
}) ; 