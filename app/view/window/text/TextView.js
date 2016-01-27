/**
 *  Edirom Online
 *  Copyright (C) 2014 The Edirom Project
 *  http://www.edirom.de
 *
 *  Edirom Online is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Edirom Online is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Edirom Online.  If not, see <http://www.gnu.org/licenses/>.
 */
Ext.define('EdiromOnline.view.window.text.TextView', {
	extend: 'EdiromOnline.view.window.View',
	
	requires:[],
	
	alias: 'widget.textView',
	
	layout: 'fit',
	
	cls: 'textView',
	
	stage: '',
	
	annotationsVisible: false,
	annotationsLoaded: false,
	annotationsVisibilitySetLocaly: false,
	
	initComponent: function () {
		
		this.addEvents('annotationsVisibilityChange',
		'gotoChapter',
		'documentLoaded');
		
		this.items =[ {
			html: '<div id="' + this.id + '_textCont" class="textViewContent"></div>'
		}];
		
		this.idView = this.id + '_textCont';
		
		this.callParent();
		
		this.on('afterrender', this.createToolbarEntries, this, {
			single: true
		});
		
		this.window.on('loadInternalLink', this.loadInternalId, this);
	},
	
	refreshUserAnnot: function () {
		var me = this;
		if (annotationOn) {
			
			if (me.content != null && typeof me.content !== 'undefined') {
				me.content.annotator('destroy');
			}
			
			me.content = $('#' + me.idView).annotator();
			
			me.content.annotator('addPlugin', 'Auth', {
				tokenUrl: 'http://annotateit.org/api/token',
				autoFetch: true
			});
			
			me.content.annotator('addPlugin', 'Store', {
				prefix: 'http://annotateit.org/api',
				annotationData: {
					'uri': me.placeHolder
				},
				loadFromSearch: {
					'limit': 20,
					'uri': me.placeHolder
				},
				urls: {
					create: '/annotations',
					update: '/annotations/:id',
					destroy: '/annotations/:id',
					search: '/search'
				},
				
				showViewPermissionsCheckbox: true,
				
				showEditPermissionsCheckbox: true
			});
			
			me.content.annotator('addPlugin', 'RefreshViews');
		} else {
			if (me.content != null && typeof me.content !== 'undefined') {
				me.content.annotator('destroy');
			}
		}
	},
		
	createToolbarEntries: function () {
		
		var me = this;
		
		if (me.uri == 'xmldb:exist:///db/apps/contents/librettoSources/freidi-librettoSource_KA-tx4.xml') {
			me.stage = 'last';
			
			me.createStageMenus([ {
				stage: 'first',
				text: 'Text in der Abschrift des Dresdner Kopisten 1 (Juni 1817)',
				checked: false
			},
			{
				stage: 'second',
				text: 'Text mit Korrekturen von Weber und fremder Hand (Juni 1817 – UA 1821)',
				checked: false
			},
			{
				stage: 'third',
				text: 'Text mit Korrekturen des Dresdner Kopisten 2 (Anfang 1822)',
				checked: false
			},
			{
				stage: 'last',
				text: 'Text mit den Zusätzen von Jähns (September 1878)',
				checked: true
			}
			/*, {
			stage: 'genesis',
			text: 'Genese des Textes',
			checked: false
			}*/]);
		} else if (me.uri == 'xmldb:exist:///db/apps/contents/librettoSources/freidi-librettoSource_L-tx2.xml') {
			me.stage = 'last';
			
			me.createStageMenus([ {
				stage: 'first',
				text: 'Text von Kind in der ersten Niederschrift (März bis Mai 1817)',
				checked: false
			},
			{
				stage: 'second',
				text: 'Text von Kind nach der Überarbeitung des Manuskripts (Juni 1817)',
				checked: false
			},
			{
				stage: 'last',
				text: 'Text mit Korrekturen von Kind und Zusätzen von Jähns (September 1878)',
				checked: true
			}
			/*, {
			stage: 'genesis',
			text: 'Genese des Textes',
			checked: false
			}*/]);
		} else if (me.uri == 'xmldb:exist:///db/apps/contents/librettoSources/freidi-librettoSource_K-tx6.xml') {
			me.stage = 'last';
			
			me.createStageMenus([ {
				stage: 'first',
				text: 'Text in der Abschrift des Dresdner Kopisten 3 (August 1819)',
				checked: false
			},
			{
				stage: 'second',
				text: 'Text mit Korrekturen des Berliner Kopisten (Mai 1820)',
				checked: false
			},
			{
				stage: 'last',
				text: 'Text mit Korrekturen von verschiedenen fremden Händen (UA Juni 1821)',
				checked: true
			}
			/*, {
			stage: 'genesis',
			text: 'Genese des Textes',
			checked: false
			}*/]);
		} else if (me.uri == 'xmldb:exist:///db/apps/contents/librettoSources/freidi-librettoSource_KA-tx15.xml') {
			me.stage = 'last';
			
			me.createStageMenus([ {
				stage: 'first',
				text: 'Text des Dresdner Kopisten 2 (August 1821)',
				checked: false
			},
			{
				stage: 'second',
				text: 'Text mit Korrekturen von Weber (August 1821)',
				checked: false
			},
			{
				stage: 'third',
				text: 'Text mit Korrekturen von Mosel (August – November 1821)',
				checked: false
			},
			{
				stage: 'last',
				text: 'Text mit Korrekturen von fremder Hand und Zettler (EA November 1821)',
				checked: true
			}
			/*, {
			stage: 'genesis',
			text: 'Genese des Textes',
			checked: false
			}*/]);
		} else if (me.uri == 'xmldb:exist:///db/apps/contents/librettoSources/freidi-librettoSource_KA-tx21.xml') {
			me.stage = 'last';
			
			me.createStageMenus([ {
				stage: 'first',
				text: 'Text des Dresdner Kopisten 2 (Oktober 1821)',
				checked: false
			},
			{
				stage: 'second',
				text: 'Text mit Korrekturen von Weber (Oktober 1821)',
				checked: false
			},
			{
				stage: 'third',
				text: 'Text mit Korrekturen von Friedrich Ludwig Schmidt (Oktober 1821–Februar 1822)',
				checked: false
			},
			{
				stage: 'last',
				text: 'Text mit Korrekturen von verschiedenen fremden Händen (EA Februar 1822)',
				checked: true
			}
			/*, {
			stage: 'genesis',
			text: 'Genese des Textes',
			checked: false
			}*/]);
		} else if (me.uri == 'xmldb:exist:///db/apps/contents/librettoSources/freidi-librettoSource_K-tx29.xml') {
			me.stage = 'last';
			
			me.createStageMenus([ {
				stage: 'first',
				text: 'Text in der Abschrift von Friedrich und Hugo Langer (August 1823)',
				checked: false
			},
			{
				stage: 'last',
				text: 'Text mit Korrrekturen von verschiedenen fremden Händen (Datierung unklar)',
				checked: true
			}
			/*, {
			stage: 'genesis',
			text: 'Genese des Textes',
			checked: false
			}*/]);
		}
	},
	
	createStageMenus: function (stages) {
		var me = this;
		var stageItems =[];
		
		// {stage:'first', text:'Genese des Textes', checked:false}
		for (var i = 0; i < stages.length; i++) {
			var stage = Ext.create('Ext.menu.CheckItem', {
				group: me.id + '_stages',
				id: me.id + '_stage_' + i,
				checked: stages[i].checked,
				stage: stages[i].stage,
				text: stages[i].text,
				checkHandler: Ext.bind(me.switchTextStages, me,[], 0)
			});
			
			stageItems.push(stage);
		}
		
		me.switchTextStages = Ext.create('Ext.button.Button', {
			text: 'Textschichten',
			indent: false,
			cls: 'menuButton',
			menu: {
				items: stageItems
			}
		});
		me.window.getTopbar().addViewSpecificItem(me.switchTextStages, me.id);
	},
	
	checkGlobalAnnotationVisibility: function (visible) {
		
		var me = this;
		
		if (me.annotationsVisibilitySetLocaly) return;
		
		me.annotationsVisible = visible;
		if (typeof me.toggleAnnotationVisibility != 'undefined')
		me.toggleAnnotationVisibility.setChecked(visible, true);
		
		//TODO: Controller mit einbeziehen
		if (visible && me.annotationsLoaded)
		me.showAnnotations(); else
		this.fireEvent('annotationsVisibilityChange', me, visible);
	},
	
	toggleAnnotations: function (item, state) {
		var me = this;
		me.annotationsVisible = state;
		me.annotationsVisibilitySetLocaly = true;
		
		//TODO: Controller mit einbeziehen
		if (state && me.annotationsLoaded)
		me.showAnnotations(); else
		this.fireEvent('annotationsVisibilityChange', me, state);
	},
	
	toggleNotesVisibility: function (button) {
		var notes = Ext.query('#' + this.id + '_textCont .note');
		Ext.Array.each(notes, function (name, index, notes) {
			Ext.get(name).toggleCls('hidden')
		});
	},
	
	togglePbVisibility: function (button) {
		var notes = Ext.query('#' + this.id + '_textCont .pagebreak');
		Ext.Array.each(notes, function (name, index, notes) {
			Ext.get(name).toggleCls('hidden')
		});
	},
	
	showAnnotations: function (annotations) {
		var me = this;
		
		if (me.annotationsLoaded) {
			var annos = Ext.query('#' + me.id + '_textCont span.annotation');
			Ext.Array.each(annos, function (anno) {
				Ext.get(anno).show();
			});
			
			return;
		}
		
		me.annotationsLoaded = true;
		
		var tpl = Ext.DomHelper.createTemplate('<span id="{0}" class="annotation {1} {2} {3}" data-edirom-annot-id="{3}"></span>');
		
		tpl.compile();
		
		annotations.each(function (annotation) {
			
			var annoId = annotation.get('id');
			var name = annotation.get('title');
			var uri = annotation.get('uri');
			var categories = annotation.get('categories');
			var priority = annotation.get('priority');
			var fn = annotation.get('fn');
			var plist = Ext.Array.toArray(annotation.get('plist'));
			
			Ext.Array.each(plist, function (p) {
				var targetId = p.id.substring(annoId.length + 2);
				var target = me.el.getById(me.id + '_' + targetId);
				
				var shape = tpl.append(target,[me.id + '_' + p.id, categories, priority, annotation.get('id')], true);
				
				shape.on('mouseenter', me.highlightShape, me, shape, true);
				shape.on('mouseleave', me.deHighlightShape, me, shape, true);
				shape.on('mousedown', me.listenForShapeLink, me, {
					stopEvent: true,
					elem: shape,
					fn: fn
				});
				
				var tip = Ext.create('Ext.tip.ToolTip', {
					target: me.id + '_' + p.id,
					cls: 'annotationTip',
					width: 500,
					maxWidth: 500,
					height: 300,
					dismissDelay: 0,
					anchor: 'left',
					html: getLangString('Annotation_plus_Title', name)
				});
				
				tip.on('afterrender', function () {
					Ext.Ajax.request({
						url: 'data/xql/getAnnotation.xql',
						method: 'GET',
						params: {
							uri: uri,
							target: 'tip'
						},
						success: function (response) {
							this.update(response.responseText);
						},
						scope: this
					});
				},
				tip);
			},
			me);
		},
		me);
	},
	
	highlightShape: function (event, owner, shape) {
		shape.addCls('highlighted');
		
		var annotId = shape.getAttribute('data-edirom-annot-id');
		Ext.select('div[data-edirom-annot-id=' + annotId + ']', this.el).addCls('combinedHighlight');
		Ext.select('span[data-edirom-annot-id=' + annotId + ']', this.el).addCls('combinedHighlight');
	},
	
	deHighlightShape: function (event, owner, shape) {
		shape.removeCls('highlighted');
		
		var annotId = shape.getAttribute('data-edirom-annot-id');
		Ext.select('div[data-edirom-annot-id=' + annotId + ']', this.el).removeCls('combinedHighlight');
		Ext.select('span[data-edirom-annot-id=' + annotId + ']', this.el).removeCls('combinedHighlight');
	},
	
	listenForShapeLink: function (e, dom, args) {
		var me = this;
		
		if (e.button != 0) return;
		
		args.elem.on('mouseup', me.openShapeLink, me, {
			single: true,
			stopEvent: true,
			fn: args.fn
		});
	},
	
	openShapeLink: function (e, dom, args) {
		eval(args.fn);
	},
	
	hideAnnotations: function () {
		var me = this;
		var annos = Ext.query('#' + me.id + '_textCont span.annotation');
		Ext.Array.each(annos, function (anno) {
			Ext.get(anno).hide();
		});
	},
	
	//TODO: in mixin verpacken, wenn möglich
	setAnnotationFilter: function (priorities, categories) {
		var me = this;
		
		if (priorities.getTotalCount() == 0 && categories.getTotalCount() == 0) return;
		
		me.toggleAnnotationVisibility = Ext.create('Ext.menu.CheckItem', {
			id: me.id + '_showAnnotations',
			checked: me.annotationsVisible,
			text: getLangString('view.window.text.TextView_showAnnotations'),
			checkHandler: Ext.bind(me.toggleAnnotations, me,[], true)
		});
		
		me.annotMenu = Ext.create('Ext.button.Button', {
			text: getLangString('view.window.text.TextView_annotMenu'),
			indent: false,
			menu: {
				items:[
				me.toggleAnnotationVisibility]
			}
		});
		me.window.getTopbar().addViewSpecificItem(me.annotMenu, me.id);
		
		var prioritiesItems =[];
		priorities.each(function (priority) {
			prioritiesItems.push({
				text: priority.get('name'),
				priorityId: priority.get('id'),
				checked: true,
				handler: Ext.bind(me.annotationFilterChanged, me)
			});
		});
		
		me.annotPrioritiesMenu = Ext.create('Ext.menu.Menu', {
			items: prioritiesItems
		});
		
		me.annotMenu.menu.add({
			id: me.id + '_annotCategoryFilter',
			text: getLangString('view.window.text.TextView_prioMenu'),
			menu: me.annotPrioritiesMenu
		});
		
		var categoriesItems =[];
		categories.each(function (category) {
			categoriesItems.push({
				text: category.get('name'),
				categoryId: category.get('id'),
				checked: true,
				handler: Ext.bind(me.annotationFilterChanged, me)
			});
		});
		
		me.annotCategoriesMenu = Ext.create('Ext.menu.Menu', {
			items: categoriesItems
		});
		
		me.annotMenu.menu.add({
			id: me.id + '_annotPriorityFilter',
			text: getLangString('view.window.text.TextView_categoriesMenu'),
			menu: me.annotCategoriesMenu
		});
		
		me.annotMenu.show();
	},
	
	annotationFilterChanged: function (item, event) {
		var me = this;
		
		if (! me.annotationsVisible) return;
		
		var visiblePriorities =[];
		me.annotPrioritiesMenu.items.each(function (item) {
			if (item.checked)
			visiblePriorities.push(item.priorityId);
		});
		var visibleCategories =[];
		me.annotCategoriesMenu.items.each(function (item) {
			if (item.checked)
			visibleCategories.push(item.categoryId);
		});
		
		var annotations = Ext.query('#' + this.id + '_textCont span.annotation');
		var fn = Ext.bind(function (annotation) {
			var className = annotation.className.replace('annotation', '').trim();
			var classes = className.split(' ');
			
			var hasCategory = false;
			var hasPriority = false;
			
			for (var i = 0; i < classes.length; i++) {
				hasCategory |= Ext.Array.contains(visibleCategories, classes[i]);
				hasPriority |= Ext.Array.contains(visiblePriorities, classes[i]);
			}
			
			Ext.get(annotation).setVisible(hasCategory & hasPriority);
		},
		me);
		
		if (annotations.each)
		annotations.each(fn); else
		Ext.Array.each(annotations, fn);
	},
	
	setContent: function (text) {
		
		var me = this;
		
		Ext.fly(me.id + '_textCont').update(text);
		this.fireEvent('documentLoaded', me);
		
		Tipped.create('.tipped', { position: 'top', maxWidth: 300 });
		
		Ext.Array.each(Ext.query('.scrollto'), function(dom, n, all) {
            var elem = Ext.get(dom);
            var scrollTo = elem.getAttribute('data-footnote');
            elem.on('click', Ext.bind(me.scrollToId, me, [scrollTo]));
        }, me);
		
		me.placeHolder = me.uri + '?view=textView' + (me.stage != null && typeof me.stage !== 'undefined' ? '&stage=' + me.stage: '');
		
		if (annotationOn) {
			
			if (me.content != null && typeof me.content !== 'undefined') {
				me.content.annotator('destroy');
			}
			$(document).ready(function () {
				me.content = $('#' + me.id + '_textCont').annotator();
				
				me.content.annotator('addPlugin', 'Auth', {
					tokenUrl: 'http://annotateit.org/api/token',
					autoFetch: true
				});
				
				me.content.annotator('addPlugin', 'Store', {
					prefix: 'http://annotateit.org/api',
					annotationData: {
						'uri': me.placeHolder
					},
					loadFromSearch: {
						'limit': 20,
						'uri': me.placeHolder
					},
					urls: {
						create: '/annotations',
						update: '/annotations/:id',
						destroy: '/annotations/:id',
						search: '/search'
					},
					
					showViewPermissionsCheckbox: true,
					
					showEditPermissionsCheckbox: true
				});
				me.content.annotator('addPlugin', 'RefreshViews');
			});
		}
	},

	setChapters: function (chapters) {
		var me = this;
		
		if (chapters.getTotalCount() == 0) return;
		
		me.gotoMenu = Ext.create('Ext.button.Button', {
			text: getLangString('view.window.text.TextView_gotoMenu'),
			indent: false,
			cls: 'menuButton',
			menu: {
				items:[]
			}
		});
		me.window.getTopbar().addViewSpecificItem(me.gotoMenu, me.id);
		
		me.chapters = chapters;
		
		var chapterItems =[];
		chapters.each(function (chapter) {
			chapterItems.push({
				text: chapter.get('name'),
				handler: Ext.bind(me.gotoChapter, me, chapter.get('id'), true)
			});
		});
		
		me.gotoMenu.menu.add(chapterItems/*{
		id: me.id + '_gotoChapter',
		text: getLangString('view.window.text.TextView_gotoChapter'),
		menu: {
		items: chapterItems
		}
		}*/);
		
		me.gotoMenu.show();
	},
	
	gotoChapter: function (menuItem, event, chapterId) {
		this.fireEvent('gotoChapter', this, chapterId);
	},
	
	getWeightForInternalLink: function (uri, type, id) {
		var me = this;
		
		if (me.uri != uri)
		return 0;
		
		if (type == 'unknown' || type == 'graphic' || type == 'surface' || type == 'zone')
		return 0;
		
		return 70;
	},
	
	loadInternalId: function (internalId, internalIdType) {
		var me = this;
		
		var container = Ext.fly(me.id + '_textCont');
		var elem = container.getById(me.id + '_' + internalId);
		if (elem) {
			me.window.requestForActiveView(me);
			me.scrollToId(internalId);
		}
	},
	
	scrollToId: function (id) {
		
		var elem = Ext.get(this.id + '_' + id);
		var showHide = !elem.isVisible();
        
        if(showHide) elem.show();
        
        Ext.getDom(elem).scrollIntoView(true);
        
        if(showHide) elem.hide();
	},
	
	getContentConfig: function () {
		var me = this;
		return {
			id: this.id
		};
	},
	
	switchTextStages: function (menuItem, e) {
		
		if (menuItem.checked === false) return;
		
		var me = this;
		me.stage = menuItem.stage;
		
		window.doAJAXRequest('data/xql/getText.xql',
		'GET', {
			uri: me.uri,
			stage: me.stage,
			idPrefix: me.id + '_',
			term: me.window.term,
			path: me.window.path
		},
		Ext.bind(function (response) {
			this.setContent(response.responseText, me.uri);
		},
		me));
	}
});