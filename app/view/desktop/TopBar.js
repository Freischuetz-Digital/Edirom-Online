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
Ext.define('EdiromOnline.view.desktop.TopBar', {
	extend: 'Ext.toolbar.Toolbar',
	
	requires:[
	'Ext.button.Split',
	'Ext.form.field.Text'],
	
	alias: 'widget.topbar',
	id: 'ediromToolbar',
	
	initComponent: function () {
		
		var me = this;
		
		me.homeButton = Ext.create('Ext.button.Button', {
			id: 'homeBtn',
			cls: 'taskSquareButton home',
			tooltip: {
				text: getLangString('view.desktop.TaskBar_home'), align: 'tl-bl'
			}
		});
		
		me.workCombo = Ext.create('Ext.button.Button', {
			text: 'Werk',
			id: 'workSwitch',
			cls: 'insetButton',
			indent: false,
			menu: {
				items:[]
			}
		});
		
		me.searchButton = Ext.create('Ext.button.Button', {
			id: 'searchBtn',
			cls: 'taskSquareButton search',
			tooltip: {
				text: getLangString('view.desktop.TaskBar_search'), align: 'tl-bl'
			},
			action: 'openSearchWindow'
		});
		
		me.searchTextField = Ext.create('Ext.form.TextField', {
			width: 180,
			id: 'searchTextFieldTop'
		});
		
		me.searchButton.textField = me.searchTextField;
		
		me.annotateItButton = Ext.create('Ext.button.Button', {
			icon: 'resources/css/Bubble.png',
			tooltip: {
				text: 'AnnotateIt'
			},
			handler: this.openLoginWindow
		});
		
		me.items =[
		new Ext.toolbar.Toolbar({
			flex: 1,
			cls: 'ux-desktop-topbar-flex',
			items:[
			me.homeButton, {
				xtype: 'tbtext', text: 'Freischütz', id: 'homeBtnLabel'
			},
			this.workCombo,
			'->',
			//me.searchTextField,
			me.searchButton,
			'-',
			me.annotateItButton]
		})];
		
		me.callParent();
	},
	
	
	/**
	 * Handler for get AnnotatorIt home page
	 */
	openLoginWindow: function () {
		
		var desktop = EdiromOnline.getApplication().getController('desktop.Desktop').getActiveDesktop();
		var existingWindows = desktop.getActiveWindowsSet(true);		
		var storedViews =[];		
		for (var i = 0; i < existingWindows.items.length; i++) {
			var view = existingWindows.items[i];
			if (view.getActiveView().idView.indexOf('_headerCont') > -1 
				|| view.getActiveView().idView.indexOf('_textCont') > -1 
				|| view.getActiveView().idView.indexOf('_summaryCont') > -1) {				
				storedViews.push(view);
			}
		}
		if (storedViews.length > 0) {
			var win = new EdiromOnline.view.desktop.RefreshDialog();
			win.show();
			win.setViews(storedViews);
		}
		
		
		new Ext.Window({
			title: "Login to AnnotateIt",
			width: 700,
			height: 500,
			modal: true,
			layout: 'fit',
			
			items:[ {
				xtype: "component",
				autoEl: {
					tag: "iframe",
					src: "http://annotateit.org/user/login"
				}
			}],
			listeners: {
				'close': function (win) {
					
					var content = $('#' + this.id).annotator();
					content.annotator('addPlugin', 'Auth', {
						tokenUrl: 'http://annotateit.org/api/token',
						autoFetch: true
					});
					annotationOn = true;
					
					$(document).ajaxError(function (event, jqxhr, settings, exception) {
						if (jqxhr.status == 401) {
							annotationOn = false;
						}
					});
				}
			}
		}).show();
	}
});