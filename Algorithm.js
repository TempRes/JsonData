var INF = 123456789;

//Dijkstra 最短路径
function Dijkstra(source, target, adjMatrix, indexMatrix, n){
	var totalDist = 0;
	var edgeSet = new Array();
	for (var i = 0; i < n; i++){
		edgeSet[i] = new Array();
	}
	//最短距离数组
	var dist = new Array();
	for (var i = 0; i < n; i++){
		dist[i] = INF;
	}
	//异常处理
	if ((source == -1)||(target == -1)){
		return {
			edgeSet: edgeSet,
			totalDist: dist[target],
			disArray: dist
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

	//整理所有路径
	for (var i = 0; i < n; i++){
		var temp = i;
		while (temp != source){
			if (indexMatrix[prev[temp]][temp] == -1) break;
			edgeSet[i].push(indexMatrix[prev[temp]][temp]);
			temp = prev[temp];
		}
	}

	return {
		edgeSet: edgeSet[target],
		totalDist: dist[target],
		disArray: dist,
		AllPaths: edgeSet
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

//介数中心度
function BetweenCentrality(edges, adjMatrix, indexMatrix, n){
	var countArray = new Array();
	for (var i = 0; i < n; i++){
		countArray[i] = 0;
	}
	
	//遍历所有边并计数
	for (var i = 0; i < n; i++){
		var result = Dijkstra(i, 50, adjMatrix, indexMatrix, n);
		for (var j = 0; j < n; j++){
			if (result.AllPaths[j].length == 0) continue;
			for (var k = 0; k < result.AllPaths[j].length; k++){
				countArray[edges[result.AllPaths[j][k]]['target'].index]++;
				countArray[edges[result.AllPaths[j][k]]['source'].index]++;
			}
		}
	}
	
	return {
		betweenArray: countArray
	}
}

//紧密中心度
function CloseCentrality(adjMatrix, indexMatrix, n){
	var sumArray = new Array();
	//遍历所有边并求和
	for (var i = 0; i < n; i++){
		var result = Dijkstra(i, 50, adjMatrix, indexMatrix, n);
		sumArray[i] = 0;
		for (var j = 0; j < n; j++){
			if (result.disArray[j] >= INF)
				continue;
			sumArray[i] += result.disArray[j];
		}
	}
	
	return {
		closeArray: sumArray
	}
}
