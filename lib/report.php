<?php
  class Report 
  {
    protected $boardInfo;
    protected $wordList;


    public function __construct($boardInfo,$wordList)
    {
      $this->boardInfo = $boardInfo;
      $this->wordList  = $wordList;
    }

     
  }
?>
