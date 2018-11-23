app.controller('profileCtrl', ($scope, toastr, $http, $window) => {
   $scope.user = null;
   $scope.init = () => {
      $http.get('user/?id='+$scope.user.id).then(function(result) {
         $scope.user = result.data[0]
         $scope.getProductos()
      })
   if (!$scope.user) $window.location.href = '/';
};
$scope.logout = () => {
   $http.get('/logout')
   .then((response) => {
      toastr.success('Sesión cerrada', 'Éxito');
      $window.location.href = '/';
   });
};
$scope.getProds = (id) =>{ 
   $http.get('/product?id=' + id).then(function(result) {
      var res = result.data[0]
      $scope.prods.push(res)
   }).catch(function() {
      return null
   });
};
$scope.getWL = (id) =>{
   $http.get('/product?id=' + id).then(function(result) {
      var res = result.data[0]
      $scope.prodsWL.push(res)
   }).catch(function() {
      return null
   });
};
$scope.getProductos = () =>{ 
   var prod = $scope.user.products
   var prodWL = $scope.user.wishList
   if(prod != undefined)
      prod.forEach(element => {
      $scope.getProds(element)
   });
   
   if(prodWL != undefined)
      prodWL.forEach(element =>{
         $scope.getWL(element)
      })
   };

$scope.cambiaProdModal = (p) =>{ 
   $scope.prodModal = p
};

$scope.getVendedor = (id) => {
   $scope.prodModal = id
   $http.get('/user?id=' + id.seller).then(function(result) {
      var res = result.data[0]
      $scope.sellers.push(res)
   }).catch(function() {
      return null
   });
}
});