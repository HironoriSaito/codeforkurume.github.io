/**
 * Created by minto on 15/08/19.
 */

var Search = new Object();

/**
 * text����AreaModel�������Ă���(name�Ƃ̊��S��v)
 * text�ƈ�v������̂��������null��Ԃ�
 */
Search.getMatchArea = function(text){
    var return_value = null;
    function searchMatchName(area){
        if(area.name==text){
            return_value = area;
        }
    }

    var data = AreaModel.data;
    data.forEach(searchMatchName);
    return return_value;
};

/**
 * text���猟���⊮�̌����擾����
 * return AreaModel
 */
Search.getCandidate = function(text){
    var return_area = [];
    function pushCandidate(area){
        if(area.name.indexOf(text)!=-1 || area.furigana.indexOf(text)!=-1){
            return_area.push(area);
        }
    }

    AreaModel.data.forEach(pushCandidate);
    return return_area;
};

/**
 * Select�̒���Candidate���X�V����
 */
Search.changeSelectCandidate = function(areas){
    function updateDiv(div, text){
        console.log(div);
        $(div).text(text);
    }

    var select = $("#candidates");
    var children = select.children();
    //�����㏑��
    var length = Math.min(children.length, areas.length);
    for(var i=0;i<length;i++){
        updateDiv(children[i], areas[i].name);
    }

    //�㏑�����ĂȂ��������󕶎��Ŗ��߂�
    while(length<children.length){
        updateDiv(children[length], "");
        length++;
    }
};

/**
 * �����p��input���ύX���ꂽ�Ƃ��̏����B
 */
Search.updateInput = function(){
    var input = $("#input_area").val();
    var area = Search.getMatchArea(input);

    if(area!=null){
        var area_master = AreaMasterModel.data[area.mastercode-1];
        console.log(area_master);
    }

    var area_candidate = Search.getCandidate(input);
    Search.changeSelectCandidate(area_candidate);
    console.log("candidate: "+area_candidate[0].name);
    console.log(input);
};

Search.changeSelect = function(e){
    console.log(e);
    var area_name = $(e.target).text();
    var input_area = $("#input_area");
    input_area.val(area_name);
    Search.updateInput();

    console.log(area_name);
};

$("#input_area").keyup(Search.updateInput);

$(".candidate").click(Search.changeSelect);