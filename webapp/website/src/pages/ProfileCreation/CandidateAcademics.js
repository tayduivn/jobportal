import React,{Component} from 'react';

import ProgressBar     	from '../../blocks/ProgressBar/ProgressBar.js';
import TitleLayout       from '../../blocks/TitleLayout/TitleLayout.js';
import Academics      	 from '../../blocks/Academics/Academics.js';

class CandidateAcademics extends Component{
	constructor(props){
		super(props);

	}

	
	render(){
		return(
				<div className="mainPagesWrapper col-lg-12">
					<div className="row">
						<ProgressBar/>
					</div>
					<div className="basicInfoWrapper row">
						<div className=" col-lg-8 col-lg-offset-2 BasicInfoBlock">
							<TitleLayout title="Academics" subtitle="Education Qualification" pageNumber="4"/>
							<Academics/>
						</div>
					</div>
				</div>
			);
	}
}

export default CandidateAcademics;