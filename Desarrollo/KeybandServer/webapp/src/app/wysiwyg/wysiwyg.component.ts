import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

declare var tinymce: any;
@Component({
  selector: 'app-wysiwyg',
  templateUrl: './wysiwyg.component.html',
  styleUrls: ['./wysiwyg.component.css'],
 
})

export class WysiwygComponent implements OnInit, AfterViewInit, OnDestroy {

constructor(){}
@Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();

 ngOnInit(){}

  editor;

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: 'assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}