import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'

})
export class HomePage {}
function keyFecha(date) {
    return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? "0" : "") + "-" + date.getDate();
};

function urlFecha(date) {
    return 'http://api.sbif.cl/api-sbifv3/recursos_api/uf/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/dias/' + date.getDate() + '?apikey=8aec5bf26d6f4e688be412db8940226eff6fb92a&formato=json';
};

function urlFecha2(date) {
    return 'http://mindicador.cl/api/uf/' + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
};

function readSBIF($http,$scope){
    $http.get(urlFecha($scope.ufdata.date)).success(function (data) {
        $scope.ufdata.today = parseFloat(data.UFs[0].Valor.replace(".", "").replace(",", "."));
        window.localStorage['calcula-uf-uf-' + keyFecha($scope.ufdata.date)] = $scope.ufdata.today;
        $scope.ufdata.error="";
    }).error(function (data) {$scope.ufdata.today = read2($http,$scope); $scope.ufdata.error=""});
}

function read2($http,$scope){
    $http.get(urlFecha2($scope.ufdata.date)).success(function (data) {
        if(typeof data.serie[0] === 'undefined'){
            $scope.ufdata.today = 0; $scope.ufdata.error="sin datos"
        }else{
            $scope.ufdata.today = data.serie[0].valor;
            window.localStorage['calcula-uf-uf-' + keyFecha($scope.ufdata.date)] = $scope.ufdata.today;
            $scope.ufdata.error="";
        }
    }).error(function (data) {$scope.ufdata.today = 0; $scope.ufdata.error="sin datos"});
}

angular.module('starter.controllers', [])

.controller('UFCtrl', function ($scope, $http) {
    //formato de pesos
    Number.prototype.formatMoney = function (c, d, t) {
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    //permitir traer de otros dias seleccionable
    $scope.ufdata = {
        date: new Date(),
        today: 0,
        inputclp: 0,
        error: "",
        inputuf: 0,
        inputufcalc: "0"
    };

    $scope.changeFecha = function () {
        //trae UF data del local storage, si no está cargar con la api y guardar
        if (!window.localStorage['calcula-uf-uf-' + keyFecha($scope.ufdata.date)] 
            || window.localStorage['calcula-uf-uf-' + keyFecha($scope.ufdata.date)] == ''
            || window.localStorage['calcula-uf-uf-' + keyFecha($scope.ufdata.date)] == 0) {
            readSBIF($http,$scope);
        } else {
            $scope.ufdata.error="";
            $scope.ufdata.today = parseFloat(window.localStorage['calcula-uf-uf-' + keyFecha($scope.ufdata.date)]);
            if($scope.ufdata.today == 0){
                readSBIF($http,$scope);
            }
        }
    };

    $scope.changeFecha();

});