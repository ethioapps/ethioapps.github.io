"use strict";
$(document).ready(function(e){
    $('body').fadeIn(1000)

    //showpages
    $('.showpage').on('click', function(e){
        e.preventDefault()
        $('.navigation ul li').removeClass('active');
        $(this).parent('li').addClass('active');

        $('.body').removeClass('show');
        $('.body').removeClass('hide');
        $('.body').addClass('hide');
        $('#'+$(this).data('page')).removeClass('hide');
        $('#'+$(this).data('page')).addClass('show');
    })

    //salary calculator btn
    $('#calculateSalary').on('click', function(e) {
        e.preventDefault()
        var basic_salary = parseFloat($.trim($('#input_basic_salary').val()));
        var allowance = parseFloat($.trim($('#input_allowance').val()));
        var result = '';
        if (basic_salary !== '' && basic_salary <= 999999999999) {
            if (allowance !== '' && allowance <= 999999999999) {
                result = calculate_salary(basic_salary, allowance);
            } else {
                $('#r_allowance').html('&nbsp; 0.00');
                result = calculate_salary(basic_salary, 0);
            }
            $('#r_main_net_salary').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.net_salary).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_basic_salary').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.basic_salary).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            if (result.allowance !== 0) {
                if (result.allowance_msg === 'max_exceed') {
                    alert(
                        'Maximum allowance can\'t be greater than '+accounting.formatMoney(parseFloat(result.allowed_allowance).toFixed(2), { symbol: '', format: "%v%s" })+'');
                    $('#r_allowance').html('&nbsp;0.00');
                } else if (result.allowance_msg === 'max_allowed') {
                    alert('Maximum allowance for this salary can\'t be greater than '+accounting.formatMoney(parseFloat(result.maximum_allowance).toFixed(2), { symbol: '', format: "%v%s" })+'');
                    $('#r_allowance').html('&nbsp;0.00');
                } else {
                    $('.alert_error').hide();
                    $('#r_allowance').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.allowance).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
                }
            }
            $('#r_taxable_amount').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.taxable_amount).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_income_tax').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.income_tax).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_employee_pension').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.employee_pension).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_company_pension').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.company_pension).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_total_deduction').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.total_deduction).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_net_salary').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.net_salary).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_per_day').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.per_day).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_per_hour').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.per_hour).toFixed(2), { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_12am_4pm').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result._12am_4pm).toFixed(2), { symbol: '', format: "%v%s" }) + '/Hour</strong>');
            $('#r_4pm_12pm').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result._4pm_12am).toFixed(2), { symbol: '', format: "%v%s" }) + '/Hour</strong>');
            $('#r_weekend').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.weekend).toFixed(2), { symbol: '', format: "%v%s" }) + '/Hour</strong>');
            $('#r_public_holiday').html('&nbsp;<strong>' + accounting.formatMoney(parseFloat(result.public_holiday).toFixed(2), { symbol: '', format: "%v%s" }) + '/Hour</strong>');
        }
    });

    //Salary fields clear
    $('#SalaryfieldClear').on('click', function(e) {
        e.preventDefault();
        $('#input_basic_salary').val('');
        $('#input_allowance').val('');
        $('#r_main_net_salary').html('&nbsp;0.00');
        $('#r_basic_salary').html('&nbsp;0.00');
        $('#r_allowance').html('&nbsp;0.00');
        $('#r_taxable_amount').html('&nbsp;0.00');
        $('#r_income_tax').html('&nbsp;0.00');
        $('#r_employee_pension').html('&nbsp;0.00');
        $('#r_company_pension').html('&nbsp;0.00');
        $('#r_total_deduction').html('&nbsp;0.00');
        $('#r_net_salary').html('&nbsp;0.00');
        $('#r_per_day').html('&nbsp;0.00');
        $('#r_per_hour').html('&nbsp;0.00');
        $('#r_12am_4pm').html('&nbsp;0.00');
        $('#r_4pm_12pm').html('&nbsp;0.00');
        $('#r_weekend').html('&nbsp;0.00');
        $('#r_public_holiday').html('&nbsp;0.00');
    });

    //handle withVATToggle
    $('#withvatToggle').on('change', function(){
        if($(this).prop('checked')){
            $(this).attr('data-withvat', 'Yes');
        }else{
            $(this).attr('data-withvat', 'No');
        }
    })

    //vat calculator
    $('#calculateVAT').on('click', function(e) {
        e.preventDefault();
        var VATamount = parseFloat($.trim($('#VATamount_input').val()));
        var withVAT = $('#withvatToggle').attr('data-withvat');
        if ((VATamount !== '') && (VATamount <= 999999999999)) {
            var result = calculateVAT(VATamount, withVAT);
            $('#r_withVAT_val').html('&nbsp;<strong>' + accounting.formatMoney(result.withVAT, { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_withoutVAT_val').html('&nbsp;<strong>' + accounting.formatMoney(result.withoutVAT, { symbol: '', format: "%v%s" }) + '</strong>');
            $('#r_VAT_val').html('&nbsp;<strong>' + accounting.formatMoney(result.VAT, { symbol: '', format: "%v%s" }) + '</strong>');
        }
    });

    //VAT fields clear
    $('#VATfieldClear').on('click', function(e) {
        e.preventDefault();
        $('#withvatToggle').bootstrapToggle('on')
        $('#VATamount_input').val('');
        $('#r_withVAT_val').html('&nbsp;0.00');
        $('#r_withoutVAT_val').html('&nbsp;0.00');
        $('#r_VAT_val').html('&nbsp;0.00');
    });

    //salary calculator function
    function calculate_salary(basic_salary, allowance) {
        var allowed_allowance = 2400;
        var maximum_allowance;
        var allowance_msg;
        var income_tax = '';
        var employee_pension = '';
        var company_pension = '';
        var total_deduction = '';
        var net_salary = '';
        var per_day = '';
        var per_hour = '';
        var _12am_4pm = '';
        var _4pm_12am = '';
        var weekend = '';
        var public_holiday = '';
        if (basic_salary < 600) {
            income_tax = 0;
        } else if (basic_salary < 1650) {
            income_tax = (basic_salary * 0.10) - 60;
        } else if (basic_salary < 3200) {
            income_tax = (basic_salary * 0.15) - 142.5;
        } else if (basic_salary < 5250) {
            income_tax = (basic_salary * 0.20) - 302.5;
        } else if (basic_salary < 7800) {
            income_tax = (basic_salary * 0.25) - 565;
        } else if (basic_salary < 10900) {
            income_tax = (basic_salary * 0.30) - 955;
        } else if (basic_salary > 10901) {
            income_tax = (basic_salary * 0.35) - 1500;
        }
        employee_pension = basic_salary * 0.07;
        company_pension = basic_salary * 0.10;
        total_deduction = income_tax + employee_pension;
        maximum_allowance = basic_salary * 0.25;
        if (allowance > allowed_allowance) {
            allowance_msg = 'max_exceed';
            net_salary = basic_salary - total_deduction;
        } else if (allowance > maximum_allowance) {
            allowance_msg = 'max_allowed';
            net_salary = basic_salary - total_deduction;
        } else {
            net_salary = (basic_salary + allowance) - total_deduction;
        }
        per_day = net_salary / 30;
        per_hour = per_day / 8;
        _12am_4pm = per_hour * 1.25;
        _4pm_12am = per_hour * 1.5;
        weekend = per_hour * 2.25;
        public_holiday = per_hour * 2.5;
        var result = {
            'basic_salary': basic_salary,
            'allowance': allowance,
            'allowance_msg': allowance_msg,
            'allowed_allowance': allowed_allowance,
            'maximum_allowance': maximum_allowance,
            'taxable_amount': basic_salary,
            'income_tax': income_tax,
            'employee_pension': employee_pension,
            'company_pension': company_pension,
            'total_deduction': total_deduction,
            'net_salary': net_salary,
            'per_day': per_day,
            'per_hour': per_hour,
            '_12am_4pm': _12am_4pm,
            '_4pm_12am': _4pm_12am,
            'weekend': weekend,
            'public_holiday': public_holiday
        };
        return result;
    }

    //vat calculator function
    function calculateVAT(VATamount, withVAT) {

        var vat_amount = 1.15;
        var vat = 0;
        var result = 0;
        VATamount = parseFloat(VATamount);
        if (withVAT === 'Yes') {
            result = parseFloat(VATamount / vat_amount).toFixed(2);
            vat = parseFloat(VATamount - result).toFixed(2);
            result = {
                'withVAT': VATamount,
                'withoutVAT': result,
                'VAT': vat
            };
            return result;

        } else if (withVAT === 'No') {
            result = parseFloat(VATamount * vat_amount).toFixed(2);
            vat = parseFloat(result - VATamount).toFixed(2);
            result = {
                'withVAT': result,
                'withoutVAT': VATamount,
                'VAT': vat
            };

            return result;
        }

    }
})