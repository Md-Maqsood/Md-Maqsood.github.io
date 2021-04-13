let cellElements=document.getElementsByClassName('cell');
for (let i = 0; i < cellElements.length; i++) {
    cellElements[i].addEventListener('input', function(event){
        let cellElement=event.target;
        cellElement.value=cellElement.value.charAt(0)
        cellElement.style.backgroundColor='#EEEEEE';
        if(cellElement.value==""){
            cellElement.style.backgroundColor='white';
        }
    });  
}

function readSudoku(){
    sudoku='';
    for(let i=0;i<81;i++){
        cellId='cell-'+i;
        cell=document.getElementById(cellId)
        if(cell.value==''){
            sudoku+='0';
        }
        else{
            sudoku+=cell.value;
        }
    }
    return sudoku;
}

const getSudokuSolutionFromServer=(sudoku)=>{
    let sol='';
    server_url="https://mqsd-sudoku.herokuapp.com/solve/"+"?sudoku="+sudoku;
    makeServiceCall("GET",server_url,true)
        .then(responseText=>{
            sol_response=JSON.parse(responseText);
            sol=sol_response.solution;
            writeTheSolution(sudoku, sol);
        }).catch(error=>{
            console.log("GET error :"+error);
            sol='';
            writeTheSolution(sudoku, sol);
        });
}

function writeTheSolution(sudoku, solution){   
    if(solution=='x'){
        alert("The sudoku has no solution or has multiple solutions!")
    }
    else{
        for(let i=0; i<81; i++){
            cellId='cell-'+i;
            cellElement = document.getElementById(cellId)
            cellElement.value = solution.charAt(i);
            if(sudoku.charAt(i)=='0'){
                cellElement.style.backgroundColor='#FFFFFF';
            }
        }
    }
}


function solve(){
    let sudoku=readSudoku();
    getSudokuSolutionFromServer(sudoku);
}

document.getElementById('solve').addEventListener('click',solve)