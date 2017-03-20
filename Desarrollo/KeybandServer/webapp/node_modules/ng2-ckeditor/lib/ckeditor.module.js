"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var ckeditor_component_1 = require('./ckeditor.component');
/**
 * CKEditorModule
 */
var CKEditorModule = (function () {
    function CKEditorModule() {
    }
    CKEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        ckeditor_component_1.CKEditorComponent,
                    ],
                    exports: [
                        ckeditor_component_1.CKEditorComponent,
                    ]
                },] },
    ];
    /** @nocollapse */
    CKEditorModule.ctorParameters = [];
    return CKEditorModule;
}());
exports.CKEditorModule = CKEditorModule;
//# sourceMappingURL=ckeditor.module.js.map