angular.module('Eggly', [
    'categories',
    'categories.bookmark'
])


.controller('MainCtrl', function($scope){
	$scope.categories = [
            {"id": 0, "name": "Development"},
            {"id": 1, "name": "Design"},
            {"id": 2, "name": "Exercise"},
            {"id": 3, "name": "Humor"}
        ];

        $scope.bookmarks = [
            {"id": 0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
            {"id": 1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
            {"id": 2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
            {"id": 3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
            {"id": 4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
            {"id": 5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
            {"id": 6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
            {"id": 7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
            {"id": 8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
        ];

    $scope.currentCategory = null; 
    
    function setCurrentCategory(category){
    	$scope.currentCategory = category;

        cancelCreating();
        cancelEditing();
    }

    function isCurrentCategory(category){
    	return $scope.currentCategory !== null && category.name === $scope.currentCategory.name;
    } setCurrentCategory;


    $scope.isCurrentCategory = isCurrentCategory;
    $scope.setCurrentCategory = setCurrentCategory;


    function resetCreateForm() {
        $scope.newBookmark = {
            title: '',
            url: '',
            category: $scope.currentCategory.name
        };
    }

    //-------------------------------------------------------------------------------------------------
    // CRUD
    //-------------------------------------------------------------------------------------------------

    //CREATE
    function createBookmark(bookmark){
        bookmark.id = $scope.bookmarks.length; 
        $scope.bookmarks.push(bookmark);

        resetCreateForm();
    }

    $scope.createBookmark = createBookmark;

    //EDIT
    $scope.editedBookmark = null;

    function setEditedBookmark(bookmark) {
        $scope.editedBookmark = angular.copy(bookmark);
    }

    $scope.setEditedBookmark = setEditedBookmark;

    //UPDATE
    function updateBookmark(bookmark) {
        var index = _.findIndex($scope.bookmarks, function(bkmark){
            return bkmark.id == bookmark.id;
        });

        $scope.bookmarks[index] = bookmark;

        $scope.editedBookmark = null; 
        $scope.isEditing = false;
    }

    function isSelectedBookmark(bookmarkId) {
        return $scope.editedBookmark !== null && $scope.editedBookmark.id === bookmarkId;
    }

    //DELETE
    function deleteBookmark(bookmark){
        _.remove($scope.bookmarks, function(bkmark){
            return bkmark.id == bookmark.id;
        });
    }

    $scope.setEditedBookmark = setEditedBookmark;
    $scope.updateBookmark = updateBookmark;
    $scope.isSelectedBookmark = isSelectedBookmark;
    $scope.deleteBookmark = deleteBookmark;

    //-------------------------------------------------------------------------------------------------
    // CREATING AND EDITING STATES
    //-------------------------------------------------------------------------------------------------

    //default state
    $scope.isCreating = false; 
    $scope.isEditing = false; 

    function startCreating() {
        $scope.isCreating = true; 
        $scope.isEditing = false; 

        resetCreateForm();
    }

    function cancelCreating() {
        $scope.isCreating = false;
    }

    function startEditing() {
        $scope.isCreating = false; 
        $scope.isEditing = true; 
    }

   function cancelEditing() {
        $scope.isEditing = false; 
        $scope.editedBookmark = null; //when cancel is press the bookmark selected is not hightlighted
   }

    function shouldShowCreating(){
        return $scope.currentCategory && !$scope.isEditing;
    }
   
   function shouldShowEditing(){
        return $scope.isEditing && !$scope.isCreating;
   }


    $scope.startCreating = startCreating;
    $scope.cancelCreating = cancelCreating;
    $scope.startEditing = startEditing; 
    $scope.cancelEditing = cancelEditing;
    $scope.shouldShowCreating = shouldShowCreating;
    $scope.shouldShowEditing = shouldShowEditing;



});













