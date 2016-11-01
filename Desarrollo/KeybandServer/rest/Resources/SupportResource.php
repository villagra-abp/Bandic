<?php
class SupportResource {
	public function getParams(){
		$PARAMS = array_slice($_GET, 1, count($_GET) - 1,true);
		return $PARAMS;
	}
	public function extractOrder($params){
		if(array_key_exists('order', $params) || array_key_exists('by', $params)){
			$order = array();
			if(array_key_exists('order', $params))
				if($params['order'])
					$order += array("order" => $params['order']);
			if(array_key_exists('by', $params))
				if($params['by'])
					$order += array("by" => $params['by']);
			return $order;
		}else{
			return null;
		}
	}
	public function extractPagination($params){
		$pagination = array();
		if(array_key_exists('initrow', $params) && array_key_exists('pagesize', $params) 
			&& $params['initrow'] && $params['pagesize']){
			$pagination += array("initrow" => $params['initrow']);
			$pagination += array("pagesize" => $params['pagesize']);
			return $pagination;
		}else{
			return null;
		}
	}
	public function extractWhere($params){
		$where = array();
		foreach($params as $key => $key_value) {
			if($key!="order" && $key!="by" && $key!="pagesize" && $key!="initrow" && $key_value!=null){
				$where += array($key => $key_value);
			}
		}
		if(count($where)==0)
			return null;
			else
				return $where;
	}
}//end class
?>