///
/// Copyright © 2016-2023 The Thingsboard Authors
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///     http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PageComponent } from '@shared/components/page.component';
import { ColorRange } from '@shared/models/widget-settings.models';
import { TbPopoverComponent } from '@shared/components/popover.component';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@core/core.state';
import { deepClone } from '@core/utils';
import {
  ColorRangeSettingsComponent
} from '@home/components/widget/lib/settings/common/color-range-settings.component';

@Component({
  selector: 'tb-color-range-panel',
  templateUrl: './color-range-panel.component.html',
  providers: [],
  styleUrls: ['./color-settings-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColorRangePanelComponent extends PageComponent implements OnInit {

  @Input()
  colorRangeSettings: Array<ColorRange>;

  @Input()
  popover: TbPopoverComponent<ColorRangePanelComponent>;

  @Input()
  settingsComponents: ColorRangeSettingsComponent[];

  @Output()
  colorRangeApplied = new EventEmitter<Array<ColorRange>>();

  colorRangeFormGroup: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder,
              protected store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
    this.colorRangeFormGroup = this.fb.group(
      {
        rangeList: [this.colorRangeSettings, []]
      }
    );
  }

  copyColorSettings(comp: ColorRangeSettingsComponent) {
    this.colorRangeSettings = deepClone(comp.modelValue);
    this.colorRangeFormGroup.get('rangeList').patchValue(this.colorRangeSettings || [], {emitEvent: false});
    this.colorRangeFormGroup.markAsDirty();
  }

  cancel() {
    this.popover?.hide();
  }

  applyColorRangeSettings() {
    const colorRangeSettings = this.colorRangeFormGroup.get('rangeList').value;
    this.colorRangeApplied.emit(colorRangeSettings);
  }

}
