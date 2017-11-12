# ADDS A PAGE WITH A CEWP 

Function DeployWebPart($PagePath, $CewpPath, $WebPartTitle)
{
	$PageUrl = $SERVER_RELATIVE_WEB + "/" +$PagePath
	$CewpLink = $TARGET_SITE_URL + "/" + $CewpPath

	$ErrorActionPreference = "Stop";

	$webpart = "<?xml version='1.0' encoding='utf-8'?>
	<WebPart xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns='http://schemas.microsoft.com/WebPart/v2'>
	  <Title>"+ $WebPartTitle +"</Title>
	  <FrameType>None</FrameType>
	  <Description />
	  <IsIncluded>true</IsIncluded>
	  <PartOrder>0</PartOrder>
	  <FrameState>Normal</FrameState>
	  <Height />
	  <Width />
	  <ChromeType>None</ChromeType>
	  <AllowRemove>true</AllowRemove>
	  <AllowZoneChange>true</AllowZoneChange>
	  <AllowMinimize>true</AllowMinimize>
	  <AllowConnect>true</AllowConnect>
	  <AllowEdit>true</AllowEdit>
	  <AllowHide>true</AllowHide>
	  <IsVisible>true</IsVisible>
	  <DetailLink />
	  <HelpLink />
	  <HelpMode>Modeless</HelpMode>
	  <Dir>Default</Dir>
	  <PartImageSmall />
	  <MissingAssembly>Cannot import this Web Part.</MissingAssembly>
	  <PartImageLarge>/_layouts/15/images/mscontl.gif</PartImageLarge>
	  <IsIncludedFilter />
	  <ContentLink>" + $CewpLink + "</ContentLink>
	  <Assembly>Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c</Assembly>
	  <TypeName>Microsoft.SharePoint.WebPartPages.ContentEditorWebPart</TypeName>
	  <ContentLink xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor'>"+ $CewpLink + "</ContentLink>
	  <Content xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
	  <PartStorage xmlns='http://schemas.microsoft.com/WebPart/v2/ContentEditor' />
	</WebPart>"

	try{
		# Remove the webpart:
		Remove-PnPWebPart -Title $WebPartTitle -ServerRelativePageUrl $PageUrl

		# Now add the webpart back:
		Add-PnPWebPartToWebPartPage -ServerRelativePageUrl $PageUrl -XML $webpart -ZoneId Main -ZoneIndex 3
		
		write-host `'$PagePath`' added web part: `'$WebPartTitle`' -foreground "green"
		write-host "    `'$WebPartTitle`' webpart added" -foreground "green"
	}
	catch{
		$ErrorMessage = $_.Exception.Message
		write-host Error while deploying $PagePath with a webpart `'$WebPartTitle`' CEWP: `'$CewpPath`' -ForegroundColor red		
		throw $_.Exception
	}
}