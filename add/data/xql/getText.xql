xquery version "3.0";

import module namespace eutil="http://www.edirom.de/xquery/util" at "../../EdiromOnline/data/xqm/util.xqm";
declare namespace request="http://exist-db.org/xquery/request";

declare namespace tei="http://www.tei-c.org/ns/1.0";

declare option exist:serialize "method=xhtml media-type=text/html omit-xml-declaration=yes indent=yes";

let $uri := request:get-parameter('uri', '')
let $idPrefix := request:get-parameter('idPrefix', '')
let $term := request:get-parameter('term', '')
let $path := request:get-parameter('path', '')
let $page := request:get-parameter('page', '')

let $uri := if($uri = 'xmldb:exist:///db/contents/texts/C_07_Handexemplar.xml')
            then(
                if(request:get-parameter('stage', '') = 'first')
                then('xmldb:exist:///db/contents/texts/C_07_Handexemplar_first_stage.xml')
                else if(request:get-parameter('stage', '') = 'second')
                then('xmldb:exist:///db/contents/texts/C_07_Handexemplar_second_stage.xml')
                else if(request:get-parameter('stage', '') = 'third')
                then('xmldb:exist:///db/contents/texts/C_07_Handexemplar_third_stage.xml')
                else if(request:get-parameter('stage', '') = 'last')
                then('xmldb:exist:///db/contents/texts/C_07_Handexemplar_last_stage.xml')
                else('xmldb:exist:///db/contents/texts/C_07_Handexemplar_first_stage.xml')
            )
            else($uri)

let $doc := eutil:getDoc($uri)/root()

let $xslInstruction := $doc//processing-instruction(xml-stylesheet)
let $xslInstruction := for $i in util:serialize($xslInstruction, ())
                        return
                        if(matches($i, 'type="text/xsl"'))
                        then(substring-before(substring-after($i, 'href="'), '"'))
                        else()


let $doc := if($term eq '')then($doc)else($doc//tei:text[ft:query(., $term)]/ancestor::tei:TEI)
let $doc := if($term eq '')then($doc)else(util:expand($doc))

let $doc := if($page eq '')then($doc)else(
    let $pb1 := $doc//tei:pb[@facs eq '#' || $page]/@n
    let $pb2 := ($doc//tei:pb[@facs eq '#' || $page]/following::tei:pb)[1]/@n
    return
        transform:transform($doc, doc('../../EdiromOnline/data/xslt/reduceToPage.xsl'), <parameters><param name="pb1" value="{$pb1}"/><param name="pb2" value="{$pb2}"/></parameters>)
)

let $base := replace(system:get-module-load-path(), 'embedded-eXist-server', '') (:TODO:)
let $xsl := if($xslInstruction)then($xslInstruction)else('../../EdiromOnline/data/xslt/teiBody2HTML.xsl')

let $doc := transform:transform($doc, doc($xsl), <parameters><param name="base" value="{concat($base, '/../../EdiromOnline/data/xslt/')}"/><param name="textType" value="{if(contains($uri, 'referenceTexts'))then('freidi_reference')else if(contains($uri, 'texts'))then('freidi_libretto')else('text')}"/></parameters>)
return
    transform:transform($doc, doc('../../EdiromOnline/data/xslt/edirom_idPrefix.xsl'), <parameters><param name="idPrefix" value="{$idPrefix}"/></parameters>)
