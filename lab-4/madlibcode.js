/********************************************************************************/
/*										
/*	Functions to get items from a madlib and do replace		
/*										
********************************************************************************/

function getItems(madlib) {
   let mad = madlib.content;
   let rslt = [ ];
   mad.replace(/\[([^\])]*)\]/g,
      function (mat,p1,off,str) {
		   rslt.push(p1)
      }
   );
   return rslt;
}


function replaceItems(madlib,items) {
   let mad = madlib.content;
   let i = 0;
   let r = mad.replace(/\[([^\])]*)\]/g,
      function (mat,p1,off,str) {
         return items[i++];
      }
   );
   return r;
}



