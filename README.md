# javascripdesign

ViewModel: Knockout's ViewModel is similar to the Octopus. It separates the Model and the View

Declarative Bindings: Bindings allow you to connect the View and Model in a direct and simple way.

Automatic UI Refresh: Knockout's will update the View when the Model changes. And with the right declarative bindings, Knockout can update the Model when elements in the View change (such as input elements, checkboxes, etc).

Dependency Tracking: Knockout allows you to create a relationship between parts of the Model, and will automatically update Model data that depends on other Model data when that other Model data changes.

//to link data to view that may change:
var favnum = ko.observable(40)
favnum()
//to check observable(...), run the following
console.dir(foo);
foo
VM276:2 function d(){if(0<arguments.length)return d.Wa(c,arguments[0])&&(d.X(),c=arguments[0],d.W()),this;a.k.Ob(d);return c}B: function (){return c}G: ObjectW: function (){d.notifySubscribers(c)}X: function (){d.notifySubscribers(c,arguments: nullcaller: nulllength: 0name: "d"peek: function (){return c}prototype: dconstructor: function d(){if(0<arguments.length)return d.Wa(c,arguments[0])&&(d.X(),c=arguments[0],d.W()),this;a.k.Ob(d);return c}__proto__: Objectrb: 1valueHasMutated: function (){d.notifySubscribers(c)}valueWillMutate: function (){d.notifySubscribers(c,__proto__: Object<function scope>
//To find ko version:
ko
//array
var f = ko.observablearrays([1,2,3])
f.push(5) //Just like jQuery, .each(), .attr(), etc observables(array) are functions as well as objects with keys, hence you can use f.push(0)
foo()
//Computed observables, derived object from others through function
//bindings, data-bind, in html

