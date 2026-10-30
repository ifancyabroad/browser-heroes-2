param(
	[string]$LibraryRoot = 'C:\Users\edgar\OneDrive\Documents\Game Assets\6000FantasyIcons\SkillsIcons'
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$LibraryRoot = (Resolve-Path -LiteralPath $LibraryRoot).Path.TrimEnd('\', '/')
$outputDirectory = Join-Path $PSScriptRoot '../references/icon-library'
New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null
$files = @(Get-ChildItem -LiteralPath $LibraryRoot -Recurse -File -Filter '*.png' | Sort-Object FullName)
$groups = @($files | Group-Object DirectoryName)
$entries = [System.Collections.Generic.List[object]]::new()
$indexLines = [System.Collections.Generic.List[string]]::new()
$indexLines.Add('# SkillsIcons visual index')
$indexLines.Add('')
$indexLines.Add("Static snapshot of all $($files.Count) PNGs in the SkillsIcons library, including background variants. Unity .meta files are excluded.")
$indexLines.Add('')
$indexLines.Add('Open the sheets as images, then inspect shortlisted originals at full size. Labels are snapshot IDs; manifest.json maps each ID to its source path, SHA-256, dimensions, sheet, row, and column. Paths are relative to libraryRoot in the manifest; substitute another root if the library moves. Row and column numbers start at 1.')
$indexLines.Add('')
$indexLines.Add('Review all collections visually rather than limiting discovery to filenames. Transparent images are shown on a dark grey background. Sheets do not record game usage: check the current repository for exact and visually similar duplicates before selecting an icon. The library is assumed fixed; regeneration is unnecessary for normal skill creation.')
$indexLines.Add('')
$indexLines.Add('| Source folder | Icons | Contact sheets |')
$indexLines.Add('| --- | ---: | --- |')

$titleFont = [System.Drawing.Font]::new('Arial', 15)
$labelFont = [System.Drawing.Font]::new('Arial', 9)
$nameFont = [System.Drawing.Font]::new('Arial', 8)
$white = [System.Drawing.Brushes]::White
$grey = [System.Drawing.Brushes]::LightGray
$border = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(65, 65, 65))
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]90)
$pageNumber = 0
$iconNumber = 0

try {
	foreach ($group in $groups) {
		$folder = $group.Name.Substring($LibraryRoot.Length + 1).Replace('\', '/')
		$links = [System.Collections.Generic.List[string]]::new()
		for ($offset = 0; $offset -lt $group.Count; $offset += 100) {
			$pageNumber++
			$pageName = 'sheet-{0:D2}.jpg' -f $pageNumber
			$pageFiles = @($group.Group | Select-Object -Skip $offset -First 100)
			$rows = [int][Math]::Ceiling($pageFiles.Count / 10.0)
			$sheet = [System.Drawing.Bitmap]::new(1440, (64 + $rows * 158))
			$graphics = [System.Drawing.Graphics]::FromImage($sheet)
			try {
				$graphics.Clear([System.Drawing.Color]::FromArgb(32, 32, 32))
				$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
				$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
				$graphics.DrawString("Sheet $pageNumber - $folder", $titleFont, $white, 12, 8)
				$graphics.DrawString("Icons $($offset + 1)-$($offset + $pageFiles.Count) of $($group.Count) in this folder", $labelFont, $grey, 12, 38)
				for ($i = 0; $i -lt $pageFiles.Count; $i++) {
					$file = $pageFiles[$i]
					$iconNumber++
					$id = 'ICON-{0:D4}' -f $iconNumber
					$column = $i % 10
					$row = [int][Math]::Floor($i / 10)
					$x = $column * 144
					$y = 64 + $row * 158
					$image = [System.Drawing.Image]::FromFile($file.FullName)
					try {
						$scale = [Math]::Min(104.0 / $image.Width, 104.0 / $image.Height)
						$width = [int][Math]::Round($image.Width * $scale)
						$height = [int][Math]::Round($image.Height * $scale)
						$graphics.DrawImage($image, [int]($x + (144 - $width) / 2), [int]($y + (108 - $height) / 2), $width, $height)
						$graphics.DrawString($id, $labelFont, $white, ($x + 5), ($y + 109))
						$labelRectangle = [System.Drawing.RectangleF]::new(($x + 5), ($y + 125), 134, 31)
						$graphics.DrawString($file.BaseName, $nameFont, $grey, $labelRectangle)
						$graphics.DrawRectangle($border, $x, $y, 143, 157)
						$entries.Add([ordered]@{
							id = $id
							relativePath = $file.FullName.Substring($LibraryRoot.Length + 1).Replace('\', '/')
							sha256 = (Get-FileHash -LiteralPath $file.FullName -Algorithm SHA256).Hash.ToLowerInvariant()
							width = $image.Width
							height = $image.Height
							sheet = $pageName
							row = $row + 1
							column = $column + 1
						})
					} finally {
						$image.Dispose()
					}
				}
				$sheet.Save((Join-Path $outputDirectory $pageName), $jpegEncoder, $encoderParameters)
			} finally {
				$graphics.Dispose()
				$sheet.Dispose()
			}
			$links.Add("[$pageNumber]($pageName)")
		}
		$indexLines.Add("| $folder | $($group.Count) | $($links -join ', ') |")
	}
	$manifest = [ordered]@{ libraryRoot = $LibraryRoot; iconCount = $entries.Count; sheetCount = $pageNumber; icons = @($entries.ToArray()) }
	$utf8 = [System.Text.UTF8Encoding]::new($false)
	[System.IO.File]::WriteAllText((Join-Path $outputDirectory 'manifest.json'), (($manifest | ConvertTo-Json -Depth 5) + "`n"), $utf8)
	[System.IO.File]::WriteAllText((Join-Path $outputDirectory 'index.md'), (($indexLines -join "`n") + "`n"), $utf8)
	Write-Output "Indexed $($entries.Count) icons across $pageNumber sheets in $outputDirectory"
} finally {
	$titleFont.Dispose()
	$labelFont.Dispose()
	$nameFont.Dispose()
	$border.Dispose()
	$encoderParameters.Dispose()
}
