'use strict';

import _ from 'lodash';
import ClassNames from 'classnames';
import moment from 'moment-timezone';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TetherComponent from 'react-tether';

import DatePickerCalendar from './DatePickerCalendar.react';
import DatePickerInput from './DatePickerInput.react';

import DatePickerUtils from '../utils/DatePickerUtils.js';

class DatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputHasValue: false,
            isCalendarOpen: false,
            presetLink: 'open'
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !_.isEqual(this.props, nextProps) || !_.isEqual(this.state, nextState);
    }

    render() {
        const { buttonClear, className, classNameInput,
            date, dateEnd, dateFormat,
            dateSecondaryEnd, dateSecondaryStart, dateStart,
            disabled, error, events,
            excludeDates, filterDates, id,
            includeDates, locale, maxDate,
            minDate, required, tabIndex,
            type, uxMode } = this.props;
        const containerClasses = ClassNames('ui', 'date-picker', className);
        const calendarJSX = (
            <DatePickerCalendar
                buttonClear={buttonClear}
                date={this._convertTimestamp(date)}
                dateEnd={this._convertTimestamp(dateEnd)}
                dateSecondaryEnd={this._convertTimestamp(dateSecondaryEnd)}
                dateSecondaryStart={this._convertTimestamp(dateSecondaryStart)}
                dateStart={this._convertTimestamp(dateStart)}
                events={events}
                excludeDates={excludeDates}
                filterDates={filterDates}
                includeDates={includeDates}
                locale={locale}
                maxDate={maxDate}
                minDate={minDate}
                onApplyClick={this.props.onApplyClick}
                onClearClick={this._onClearClick.bind(this)}
                onClose={this._onCalendarClickOutside.bind(this)}
                onMonthChange={this._onMonthChange.bind(this)}
                onSelect={this._onSelect.bind(this)}
                ref="calendar"
                type={type || 'singleDate'}
                uxMode={uxMode}
            />
        );

        return (
            <div className={containerClasses}>
                {uxMode === 'input' ? (
                    <TetherComponent
                        attachment={'top left'}
                        classPrefix="date-picker-tether"
                        constraints={[{
                            to: 'window',
                            attachment: 'together'
                        }]}
                        targetAttachment={'bottom left'}
                        targetOffset={'10px 0'}
                    >
                        <DatePickerInput
                            className={classNameInput}
                            date={this._convertTimestamp(date)}
                            dateEnd={this._convertTimestamp(dateEnd)}
                            dateFormat={dateFormat}
                            dateSecondaryEnd={this._convertTimestamp(dateSecondaryEnd)}
                            dateSecondaryStart={this._convertTimestamp(dateSecondaryStart)}
                            dateStart={this._convertTimestamp(dateStart)}
                            disabled={disabled}
                            error={error}
                            excludeDates={excludeDates}
                            filterDates={filterDates}
                            hasValue={this._hasValue.bind(this)}
                            id={id}
                            includeDates={includeDates}
                            locale={locale}
                            maxDate={maxDate}
                            minDate={minDate}
                            onBlur={this._onInputBlur.bind(this)}
                            onClick={this._onInputClick.bind(this)}
                            onDone={this._setOpen.bind(this)}
                            onFocus={this._onInputFocus.bind(this)}
                            onSelect={this._onSelect.bind(this)}
                            open={this.state.isCalendarOpen}
                            ref="input"
                            required={required}
                            setSelected={this._setSelected.bind(this)}
                            tabIndex={tabIndex}
                            type={type || 'singleDate'}
                            uxMode={uxMode}
                        />

                        {this.state.isCalendarOpen ? calendarJSX : null}
                    </TetherComponent>
                ) : (
                    <div>
                        {type === 'dateRange' ? (
                            <div>
                                <ul className="date-picker date-picker-presets">
                                    <li>
                                        <a
                                            className={ClassNames('font-size-xsmall', {
                                                'color-static': this.state.presetLink !== 'open',
                                                'color-text': this.state.presetLink === 'open',
                                                'text-decoration-underline': this.state.presetLink === 'open'
                                            })}
                                            onClick={this._onPresetClick.bind(this, 'open')}
                                        >
                                            Open
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className={ClassNames('font-size-xsmall', {
                                                'color-static': this.state.presetLink !== 'pastWeek',
                                                'color-text': this.state.presetLink === 'pastWeek',
                                                'text-decoration-underline': this.state.presetLink === 'pastWeek'
                                            })}
                                            onClick={this._onPresetClick.bind(this, 'pastWeek')}
                                        >
                                            Past Week
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className={ClassNames('font-size-xsmall', {
                                                'color-static': this.state.presetLink !== 'monthToDate',
                                                'color-text': this.state.presetLink === 'monthToDate',
                                                'text-decoration-underline': this.state.presetLink === 'monthToDate'
                                            })}
                                            onClick={this._onPresetClick.bind(this, 'monthToDate')}
                                        >
                                            Month-To-Date
                                        </a>
                                    </li>

                                    <li>
                                        <a
                                            className={ClassNames('font-size-xsmall', {
                                                'color-static': this.state.presetLink !== 'custom',
                                                'color-text': this.state.presetLink === 'custom',
                                                'text-decoration-underline': this.state.presetLink === 'custom'
                                            })}
                                            onClick={this._onPresetClick.bind(this, 'custom')}
                                        >
                                            Custom
                                        </a>
                                    </li>
                                </ul>

                                <DatePickerInput
                                    dateEnd={this._convertTimestamp(dateEnd)}
                                    dateStart={this._convertTimestamp(dateStart)}
                                    disabled={disabled}
                                    hasValue={this._hasValue.bind(this)}
                                    locale={locale}
                                    onClick={this._onInputClick.bind(this)}
                                    onSelect={this._onSelect.bind(this)}
                                    open={this.state.isCalendarOpen}
                                    type={type}
                                    uxMode={uxMode}
                                />
                            </div>
                        ) : null}

                        {type === 'servicePeriodRange' ? (
                            <div>
                                <p className="font-size-xxsmall color-static" style={{ margin: 0 }}>
                                    Start Service Period
                                </p>

                                <p style={{ margin: '0 0 22px' }}>
                                    {dateStart && dateEnd ? (
                                        <span>
                                            {`${this._convertTimestamp(dateStart).locale(locale || moment.locale()).format('MM/DD/YYYY')} - ${this._convertTimestamp(dateEnd).locale(locale || moment.locale()).format('MM/DD/YYYY')}`}
                                        </span>
                                    ) : (
                                        <span>mm/dd/yyyy - mm/dd/yyyy</span>
                                    )}
                                </p>

                                <p className="font-size-xxsmall color-static" style={{ margin: 0 }}>
                                    End Service Period
                                </p>

                                <p style={{ margin: '0 0 22px' }}>
                                    {dateSecondaryStart && dateSecondaryEnd ? (
                                        <span>
                                            {`${this._convertTimestamp(dateSecondaryStart).locale(locale || moment.locale()).format('MM/DD/YYYY')} - ${this._convertTimestamp(dateSecondaryEnd).locale(locale || moment.locale()).format('MM/DD/YYYY')}`}
                                        </span>
                                    ) : (
                                        <span>mm/dd/yyyy - mm/dd/yyyy</span>
                                    )}
                                </p>
                            </div>
                        ) : null}

                        {calendarJSX}
                    </div>
                )}
            </div>
        );
    }

    _convertTimestamp(timestamp) {
        return !_.isNull(timestamp) && !_.isUndefined(timestamp) ? moment.unix(timestamp).utc() : null;
    }

    _hasValue(date) {
        this.setState({ inputHasValue: !_.isNull(date) && !_.isEmpty(date) });
    }

    _onCalendarClickOutside(event) {
        this._setOpen(false);

        this.props.onClickOutside ? this.props.onClickOutside() : null;
    }

    _onClearClick(event) {
        const { type } = this.props;

        if (type === 'dateRange') {
            this._onPresetClick('open');
        } else if (type === 'servicePeriodRange' || type === 'servicePeriodRangeEnd' || type === 'servicePeriodRangeStart') {
            this.props.onChange({
                dateFirstChoice: null,
                dateSecondChoice: null
            });
        } else {
            this._setSelected(null);
        }
    }

    _onInputBlur(event) {
        if (this.state.isCalendarOpen) {
            ReactDOM.findDOMNode(this.refs.input).focus();
        } else {
            if (_.isFunction(this.props.onBlur)) {
                this.props.onBlur(event);
            }
        }
    }

    _onInputClick() {
        this._setOpen(true);
    }

    _onInputFocus(event) {
        if (_.isFunction(this.props.onFocus)) {
            this.props.onFocus(event);
        }

        this._setOpen(true);
    }

    _onMonthChange(month, year) {
        if (typeof this.props.onMonthChange === 'function') {
            this.props.onMonthChange(month, year);
        }
    }

    _onPresetClick(type) {
        let activePreset;

        if (type === 'open') {
            activePreset = 'open';

            this.props.onChange({
                dateEnd: null,
                dateStart: null
            });
        } else if (type === 'pastWeek') {
            activePreset = 'pastWeek';

            this.props.onChange({
                dateEnd: moment().subtract(1, 'day').unix(),
                dateStart: moment().subtract(1, 'week').unix()
            });
        } else if (type === 'monthToDate') {
            activePreset = 'monthToDate';

            this.props.onChange({
                dateEnd: moment().unix(),
                dateStart: moment().subtract(1, 'month').unix()
            });
        } else if (type === 'custom') {
            activePreset = 'custom';
        }

        this.setState({ presetLink: activePreset });
    }

    _onSelect(date, dateType, clear) {
        const { dateEnd, dateSecondaryEnd, dateSecondaryStart, dateStart, type } = this.props;

        if (type === 'dateRange') {
            const dateObj = {
                dateEnd: dateEnd,
                dateStart: dateStart
            };
            const isDateBeforeDateStart = (_.isUndefined(dateType) || dateType === 'dateStart') && date.isBefore(this._convertTimestamp(dateStart));
            const isDateBeforeDateEnd = (_.isUndefined(dateType) || dateType === 'dateEnd') && date.isBefore(this._convertTimestamp(dateEnd));
            const isDateAfterDateEnd = (_.isUndefined(dateType) || dateType === 'dateEnd') && date.isAfter(this._convertTimestamp(dateEnd));

            if (!clear &&
                !dateStart ||
                (dateStart && !dateEnd && isDateBeforeDateStart) ||
                (dateStart && dateEnd && isDateBeforeDateStart) ||
                (dateType === 'dateStart' && dateStart && dateEnd && date.isBefore(this._convertTimestamp(dateEnd)))
            ) {
                dateObj.dateStart = date.unix();
                this.props.onChange(dateObj);

                this.setState({ presetLink: 'custom' });
            }

            if (!clear &&
                !isDateBeforeDateStart && (
                (dateStart && !dateEnd) ||
                (dateStart && dateEnd && isDateBeforeDateEnd) ||
                (dateStart && dateEnd && isDateAfterDateEnd)
            )) {
                dateObj.dateEnd = date.unix();
                this.props.onChange(dateObj);

                this.setState({ presetLink: 'custom' });
            }

            // Reset selections
            if (clear ||
                (_.isNumber(dateStart) && _.isNumber(dateEnd)) &&
                (_.isEqual(dateStart, dateEnd) && _.isEqual(dateEnd, date.unix()))
            ) {
                dateObj.dateStart = null;
                dateObj.dateEnd = null;

                this.props.onChange(dateObj);
                this._hasValue(null);

                this.setState({ presetLink: 'open' });
            }
        } else if (type === 'servicePeriod') {
            this.props.onChange(_.isObject(date) && date.clone().isValid() ? date.clone().unix() : null);
            this._hasValue(date);
        } else if (type === 'servicePeriodRange' || type === 'servicePeriodRangeEnd' || type === 'servicePeriodRangeStart') {
            const dateObj = {
                dateFirstChoice: dateStart,
                dateSecondChoice: dateSecondaryStart
            };
            const isDateBeforeDateStart = date.isBefore(this._convertTimestamp(dateStart));
            const isDateAfterDateEnd = date.isAfter(this._convertTimestamp(dateEnd));
            const isDateBeforeDateSecondaryStart = date.isBefore(this._convertTimestamp(dateSecondaryStart));

            if (!dateStart && !dateEnd ||
                (dateStart && dateEnd && isDateBeforeDateStart)
            ) {
                dateObj.dateFirstChoice = date.unix();
                this.props.onChange(dateObj);
            }

            if ((dateStart && dateEnd && isDateAfterDateEnd) ||
                (dateStart && dateEnd && dateSecondaryStart && dateSecondaryEnd && isDateBeforeDateSecondaryStart)
            ) {
                dateObj.dateSecondChoice = date.unix();
                this.props.onChange(dateObj);
            }
        } else {
            this.props.onChange(date.unix());
            this._hasValue(date);
        }
    }

    _setOpen(open) {
        this.setState({ isCalendarOpen: open });
    }

    _setSelected(date) {
        if (_.isFunction(this.props.onChange) && !DatePickerUtils.isSameDay(this._convertTimestamp(this.props.date), date)) {
            this.props.onChange(date);
        }

        this._hasValue(date);
    }
}

const typeEnums = [ 'dateRange', 'servicePeriod', 'servicePeriodRange', 'servicePeriodRangeEnd', 'servicePeriodRangeStart', 'singleDate' ];
const uxModeEnums = [ 'input', 'calendar' ];

DatePicker.propTypes = {
    buttonClear: React.PropTypes.bool,
    className: React.PropTypes.string,
    classNameInput: React.PropTypes.string,
    date: React.PropTypes.number,
    dateEnd: React.PropTypes.number,
    dateFormat: React.PropTypes.string,
    dateSecondaryEnd: React.PropTypes.number,
    dateSecondaryStart: React.PropTypes.number,
    dateStart: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    errorMessage: React.PropTypes.string,
    events: React.PropTypes.array,
    excludeDates: React.PropTypes.array,
    filterDates: React.PropTypes.func,
    id: React.PropTypes.string,
    includeDates: React.PropTypes.array,
    locale: React.PropTypes.string,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object,
    onApplyClick: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func.isRequired,
    onFocus: React.PropTypes.func,
    onMonthChange: React.PropTypes.func,
    required: React.PropTypes.bool,
    tabIndex: React.PropTypes.number,
    type: React.PropTypes.oneOf(typeEnums),
    uxMode: React.PropTypes.oneOf(uxModeEnums)
};

export default DatePicker;
