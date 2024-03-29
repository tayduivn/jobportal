import ReactDOM 							from 'react-dom'
import { library } 							from '@fortawesome/fontawesome-svg-core'
import { fab } 								from '@fortawesome/free-brands-svg-icons'

import {	faAlignRight, faCheckSquare, 
	     	faCoffee, faRing, faMapMarkedAlt,
	     	faUniversity, faFileAlt, faAdjust,
	     	faChalkboardTeacher, faCity,
	     	faWarehouse, faIdCardAlt,
	     	faNetworkWired, faUserClock,
	     	faIndustry, faMapMarkerAlt,
	     	faUser, faBusinessTime,
	      	faBriefcase, faEnvelope,
	      	faUsers, faSearch, faSignOutAlt,
	      	faEllipsisH, faTrashAlt, 
	      	faPencilAlt, faHome
	   } 									from '@fortawesome/free-solid-svg-icons'
 
library.add(fab, faCheckSquare, faAlignRight,
 			faRing, faMapMarkedAlt, faUniversity,
 			faFileAlt, faAdjust, faChalkboardTeacher,
 			faCity, faWarehouse, faIdCardAlt,
 			faNetworkWired, faUserClock, faIndustry,
 			faMapMarkerAlt, faCoffee, faUser,
 			faBusinessTime, faBriefcase, faEnvelope,
 			faUsers, faSearch, faSignOutAlt, 
 			faEllipsisH, faTrashAlt, faPencilAlt,
 			faHome)
