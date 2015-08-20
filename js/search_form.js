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
    var select = $("#candidates");

    function pushDiv(div, text){
        var div = $(
            "<div></div>",
            {
                text: text,
                "class": "candidate"
            }
        );
        select.append(div);
    }

    select.empty();
    //����ǉ�
    var children = select.children();
    var length = Math.min(MaxCandidateNum, areas.length);
    for(var i=0;i<length;i++){
        pushDiv(children[i], areas[i].name);
    }
    $(".candidate").click(Search.changeSelect);
};

/**
 * �����p��input���ύX���ꂽ�Ƃ��̏����B
 */
Search.updateInput = function(){
    var input = $("#input_area").val();
    var area = Search.getMatchArea(input);

    if(area!=null){
        var area_master = AreaMasterModel.data[area.mastercode-1];
        Event.getInstance().$emit("updateArea", area_master, area);
    }

    var area_candidate = Search.getCandidate(input);
    Search.changeSelectCandidate(area_candidate);
};

Search.changeSelect = function(e){
    var area_name = $(e.target).text();
    var input_area = $("#input_area");
    input_area.val(area_name);
    Search.updateInput();
};

$("#input_area").keyup(Search.updateInput);