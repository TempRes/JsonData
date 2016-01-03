var INF = 123456789;

//Dijkstra 最短路径
function Dijkstra(source, target, adjMatrix, indexMatrix, n){
	var totalDist = 0;
	var edgeSet = new Array();
	if ((source == -1)||(target == -1)){
		return {
			edgeSet:edgeSet,
			totalDist:totalDist
		}
	}
	//创建点集合向量
	var nodeused = new Array();
	for (var i = 0; i < n; i++){
		nodeused[i] = 0;	//0代表该点尚未加入路径
	}
	nodeused[source] = 1;		//1代表该边已加入路径
	//prev路径数组
	var prev = new Array();
	for (var i = 0; i < n; i++){
		prev[i] = source;
	}
	var mainNode = source;
	//最短距离数组
	var dist = new Array();
	for (var i = 0; i < n; i++){
		dist[i] = INF;
	}
	dist[source] = 0;
	//寻找最短路径
	while(1){
		var next = -1;
		var dis = INF;
		//遍历mainNode的所有边
		for (var i = 0; i < n; i++){
			if (nodeused[i])
				continue;
			//修改dist和prev
			if (adjMatrix[mainNode][i] + dist[mainNode] < dist[i]){
				dist[i] = adjMatrix[mainNode][i] + dist[mainNode];
				prev[i] = mainNode;
			}
			//选出最短路径
			if (dist[i] < dis){
				dis = dist[i];
				next = i;
			}
		}
		if (next == -1){
			break;
		}
		//修改主要路径
		nodeused[next] = 1;
		mainNode = next;
	}
	//整理路径
	var temp = target;
	while (temp != source){
		edgeSet.push(indexMatrix[prev[temp]][temp]);
		temp = prev[temp];
	}
	
	return {
		edgeSet: edgeSet,
		totalDist: dist[target]
	}
}

//Prim 最小生成树
function Prim(root, adjMatrix, indexMatrix, n){
	var totalDist = 0;
	var edgeSet = new Array();
	if (root == -1){
		return {
			edgeSet:edgeSet,
			totalDist:totalDist
		}
	}
	//创建点集合向量
	var nodeused = new Array();
	for (var i = 0; i < n; i++){
		nodeused[i] = 0;	//0代表该点尚未加入树
	}
	nodeused[root] = 1;		//1代表该边已加入树
	//生成树
	while (1){
		var minDist = INF;
		var source = -1;
		var target = -1;
		for (var i = 0; i < n; i++){
			if (nodeused[i]){
				for (var j = 0; j < n; j++){
					if (!nodeused[j]){
						if (adjMatrix[i][j] < minDist){
							minDist = adjMatrix[i][j];
							source = i;
							target = j;
						}
					}
				}
			}
		}
		if ((source == -1)||(target == -1)){
			break;
		}
		totalDist += minDist;
		nodeused[target] = 1;
		edgeSet.push(indexMatrix[source][target]);
	}
	
	return {
		edgeSet:edgeSet,
		totalDist:totalDist
	}
}
